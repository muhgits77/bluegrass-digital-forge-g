/**
 * BLUEGRASS DIGITAL FORGE — Demo Storage Utilities
 *
 * localStorage: lightweight metadata-only backup (no base64 images).
 * IndexedDB: full backup when localStorage quota is tight or images are large.
 */

import type { Demo } from "./demos";

export const STORAGE_KEY = "bdf_demos_v1";
export const STORAGE_META_KEY = "bdf_demos_meta_v1";

const IDB_NAME = "bdf_demos_db";
const IDB_VERSION = 1;
const IDB_STORE = "backups";
const IDB_FULL_KEY = "full_v1";

export type StorageMeta = {
  version: 1;
  savedAt: number;
  count: number;
  strippedImageCount: number;
  bytesEstimate: number;
  source: "admin" | "import" | "sync" | "reset";
};

export type MinimalDemo = Demo & { _imageStripped?: boolean };

export type SaveBackupResult = {
  localOk: boolean;
  indexedDbOk: boolean;
  strippedImageCount: number;
  localError?: string;
  indexedDbError?: string;
};

export type StorageStatus = {
  localBytes: number;
  meta: StorageMeta | null;
  indexedDbAvailable: boolean;
  quotaExceeded: boolean;
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/** Strip data: URLs — they blow past the ~5 MB localStorage cap with 20+ demos. */
export function stripBase64Images(demos: Demo[]): {
  minimal: MinimalDemo[];
  strippedCount: number;
} {
  let strippedCount = 0;
  const minimal = demos.map((d) => {
    if (d.image?.startsWith("data:")) {
      strippedCount++;
      const { image: _img, ...rest } = d;
      return { ...rest, _imageStripped: true };
    }
    return { ...d };
  });
  return { minimal, strippedCount };
}

/** Restore demos from minimal backup (stripped images stay undefined). */
export function restoreFromMinimal(minimal: MinimalDemo[]): Demo[] {
  return minimal.map(({ _imageStripped, ...d }) => ({
    ...d,
    image: d.image || undefined,
  }));
}

function openIdb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, IDB_VERSION);
    req.onerror = () => reject(req.error ?? new Error("IndexedDB open failed"));
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
  });
}

async function idbSet(key: string, value: unknown): Promise<void> {
  const db = await openIdb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, "readwrite");
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error ?? new Error("IndexedDB write failed"));
    };
    tx.objectStore(IDB_STORE).put(value, key);
  });
}

async function idbGet<T>(key: string): Promise<T | null> {
  try {
    const db = await openIdb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, "readonly");
      const req = tx.objectStore(IDB_STORE).get(key);
      req.onsuccess = () => {
        db.close();
        resolve((req.result as T) ?? null);
      };
      req.onerror = () => {
        db.close();
        reject(req.error ?? new Error("IndexedDB read failed"));
      };
    });
  } catch {
    return null;
  }
}

/** Load minimal backup from localStorage (migrates legacy full payloads). */
export function loadMinimalBackup(): Demo[] | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    return restoreFromMinimal(parsed as MinimalDemo[]);
  } catch (e) {
    console.warn("[DemoStorage] Failed to parse localStorage backup", e);
    return null;
  }
}

/** Load full backup from IndexedDB. */
export async function loadFullBackup(): Promise<Demo[] | null> {
  if (!isBrowser() || typeof indexedDB === "undefined") return null;
  try {
    const data = await idbGet<Demo[]>(IDB_FULL_KEY);
    if (!Array.isArray(data) || data.length === 0) return null;
    return data;
  } catch (e) {
    console.warn("[DemoStorage] IndexedDB load failed", e);
    return null;
  }
}

/** Save lightweight localStorage backup + full IndexedDB copy. */
export async function saveBackup(
  demos: Demo[],
  source: StorageMeta["source"] = "admin"
): Promise<SaveBackupResult> {
  if (!isBrowser()) {
    return { localOk: false, indexedDbOk: false, strippedImageCount: 0 };
  }

  const { minimal, strippedCount } = stripBase64Images(demos);
  const payload = JSON.stringify(minimal);
  const result: SaveBackupResult = {
    localOk: false,
    indexedDbOk: false,
    strippedImageCount: strippedCount,
  };

  try {
    localStorage.setItem(STORAGE_KEY, payload);
    const meta: StorageMeta = {
      version: 1,
      savedAt: Date.now(),
      count: demos.length,
      strippedImageCount: strippedCount,
      bytesEstimate: payload.length * 2,
      source,
    };
    localStorage.setItem(STORAGE_META_KEY, JSON.stringify(meta));
    result.localOk = true;
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    result.localError = msg;
    console.error("[DemoStorage] localStorage backup failed:", msg);
    if (msg.includes("QuotaExceeded") || (e as DOMException)?.name === "QuotaExceededError") {
      try {
        localStorage.removeItem(STORAGE_KEY);
        const ultraMinimal = minimal.map(({ description, image, ...rest }) => ({
          ...rest,
          description: description.slice(0, 120),
          image: image?.startsWith("data:") ? undefined : image,
        }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ultraMinimal));
        result.localOk = true;
        console.warn("[DemoStorage] Saved ultra-minimal backup after quota error");
      } catch (e2) {
        result.localError = e2 instanceof Error ? e2.message : String(e2);
      }
    }
  }

  if (typeof indexedDB !== "undefined") {
    try {
      await idbSet(IDB_FULL_KEY, demos);
      result.indexedDbOk = true;
    } catch (e) {
      result.indexedDbError = e instanceof Error ? e.message : String(e);
      console.warn("[DemoStorage] IndexedDB backup failed:", result.indexedDbError);
    }
  }

  return result;
}

export function getStorageMeta(): StorageMeta | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_META_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StorageMeta;
  } catch {
    return null;
  }
}

export function getStorageStatus(): StorageStatus {
  if (!isBrowser()) {
    return { localBytes: 0, meta: null, indexedDbAvailable: false, quotaExceeded: false };
  }
  const raw = localStorage.getItem(STORAGE_KEY);
  const meta = getStorageMeta();
  return {
    localBytes: raw ? raw.length * 2 : 0,
    meta,
    indexedDbAvailable: typeof indexedDB !== "undefined",
    quotaExceeded: false,
  };
}

/** Clear local backups only — does NOT touch Supabase. */
export function clearLocalBackups(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_META_KEY);
}

/** Clear IndexedDB full backup. */
export async function clearIndexedDbBackup(): Promise<void> {
  if (!isBrowser() || typeof indexedDB === "undefined") return;
  try {
    const db = await openIdb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, "readwrite");
      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => {
        db.close();
        reject(tx.error);
      };
      tx.objectStore(IDB_STORE).delete(IDB_FULL_KEY);
    });
  } catch (e) {
    console.warn("[DemoStorage] Failed to clear IndexedDB", e);
  }
}