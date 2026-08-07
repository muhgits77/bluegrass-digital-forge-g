"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Plus, Edit2, Trash2, Save, RefreshCw, Download, Upload, 
  Lock, X, Copy, Code2, Cloud, CloudOff, AlertTriangle, Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdminAnalytics from "@/components/AdminAnalytics";
import {
  getDemos, getDemosWithMeta, addDemo, updateDemo, deleteDemo, resetToDefaults,
  generateUniqueSlug, generateDemosTsCode, Demo, DemoDataSource,
  uploadDemoImage, dispatchDemosPublished, forceSyncToSupabase,
  getSupabaseStatus, getLocalStorageStatus, FEATURED_HOMEPAGE_LIMIT,
  normalizeDemos,
} from "@/lib/demos";
import type { SupabaseConnectionStatus } from "@/lib/supabase";
import { CONTACT_EMAIL } from "@/lib/constants";
import {
  loginAdmin,
  logoutAdmin,
  isAdminAuthenticated,
  sendMagicLink,
  sendPasswordReset,
} from "@/lib/adminAuth";

// ==================================================================
// ADMIN PANEL — BLUEGRASS DIGITAL FORGE
// Dark modern professional style (separate from warm public Kentucky theme)
//
// - Auth: Supabase Auth (email + password / magic link / password reset) + fixed admin token (see lib/adminAuth.ts)
// - Session persisted via Supabase client (persistSession / autoRefreshToken)
// - CRUD uses Supabase (forge_demos) as PRIMARY + Supabase Storage for images
// - Graceful fallback to localStorage/IndexedDB on Supabase failure
// - "Export to demos.ts" still works for baking into DEFAULT_DEMOS
// - Public pages prefer Supabase when present so changes go live instantly
// ==================================================================

type FormData = Omit<Demo, "id">;

type Tab = "Dashboard" | "Demos" | "Analytics" | "Lock";

const emptyForm: FormData = {
  title: "",
  slug: "",
  category: "",
  href: "",
  description: "",
  image: "",
  sortOrder: 99,
  visible: true,
  featured: false,
};

// Suggested categories for the admin form. Used by the datalist for quick selection
// but the input remains freeform so users can type arbitrary custom categories.
const categories = [
  "Restaurant",
  "Steakhouse",
  "Food Truck",
  "Mexican Restaurant",
  "Korean BBQ",
  "Bakery",
  "Coffee Shop",
  "Donut Shop",
  "Bookstore",
  "Wedding Venue",
  "Fencing Services",
  "Land & Pasture Services",
  "Auto Service",
  "Fitness Studio",
  "Food Truck Tool",
  "Retail",
  "Specialty Retail",
  "Template Library",
  "Other",
];

export default function AdminPanel() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSendingMagicLink, setIsSendingMagicLink] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);

  const authBusy = isLoggingIn || isSendingMagicLink || isSendingReset;

  const [demos, setDemos] = useState<Demo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [formError, setFormError] = useState("");

  const [publishMessage, setPublishMessage] = useState("");
  const [publishMessageType, setPublishMessageType] = useState<"success" | "error" | "warning">("success");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isForceSyncing, setIsForceSyncing] = useState(false);

  const [dataSource, setDataSource] = useState<DemoDataSource>("defaults");
  const [supabaseStatus, setSupabaseStatus] = useState<SupabaseConnectionStatus | null>(null);
  const [storageBytes, setStorageBytes] = useState(0);

  const [isSaving, setIsSaving] = useState(false);
  const [successToast, setSuccessToast] = useState("");
  const [errorToast, setErrorToast] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>("Demos");

  // Export to demos.ts modal state (new targeted feature)
  const [showTsExportModal, setShowTsExportModal] = useState(false);
  const [tsExportCode, setTsExportCode] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const refreshStatus = useCallback(async () => {
    const [status, storage] = await Promise.all([
      getSupabaseStatus(),
      Promise.resolve(getLocalStorageStatus()),
    ]);
    setSupabaseStatus(status);
    setStorageBytes(storage.localBytes);
  }, []);

  const loadDemos = useCallback(async () => {
    const result = await getDemosWithMeta();
    setDemos([...result.demos].sort((a, b) => a.sortOrder - b.sortOrder));
    setDataSource(result.source);
    await refreshStatus();
    if (result.supabaseError && result.source !== "supabase") {
      setErrorToast(`Loaded from ${result.source} — Supabase unavailable: ${result.supabaseError}`);
      setTimeout(() => setErrorToast(""), 6000);
    }
  }, [refreshStatus]);

  // Load auth + demos on mount and when auth changes
  useEffect(() => {
    if (authed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void loadDemos();
    }
  }, [authed, loadDemos]);

  // Re-load when storage changes (multi-tab support)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "bdf_demos_v1") {
        loadDemos();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [loadDemos]);

  // Restore Supabase Auth session (and clear legacy client-only auth flag)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem("bdf_admin_authed");
    } catch {
      /* ignore */
    }

    let cancelled = false;
    void (async () => {
      const ok = await isAdminAuthenticated();
      if (!cancelled) setAuthed(ok);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  function applyOperationResult(
    result: { demos: Demo[]; supabaseOk: boolean; error?: string; warning?: string },
    successMsg: string
  ) {
    const sorted = [...result.demos].sort((a, b) => a.sortOrder - b.sortOrder);
    setDemos(sorted);
    dispatchDemosPublished(sorted);

    if (result.supabaseOk) {
      showSuccessToast(successMsg);
      if (result.warning) showWarningToast(result.warning);
    } else {
      showErrorToast(result.error ?? "Save failed — data kept in local backup only.");
      if (result.warning) showWarningToast(result.warning);
    }
    void refreshStatus();
    return sorted;
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (authBusy) return;

    setIsLoggingIn(true);
    setAuthError("");
    setAuthSuccess("");

    try {
      const result = await loginAdmin(email, password, adminToken);
      if (result.ok) {
        setAuthed(true);
        setEmail("");
        setPassword("");
        setAdminToken("");
        setAuthError("");
        setAuthSuccess("");
        void loadDemos();
      } else {
        setAuthError(result.error);
      }
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Sign-in failed.");
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function handleSendMagicLink() {
    if (authBusy) return;

    if (!email.trim() || !adminToken) {
      setAuthError("Email and admin token are required to send a magic link.");
      setAuthSuccess("");
      return;
    }

    setIsSendingMagicLink(true);
    setAuthError("");
    setAuthSuccess("");

    try {
      const result = await sendMagicLink(email, adminToken);
      if (result.ok) {
        setPassword("");
        setAuthSuccess(result.message ?? "Magic link sent — check your inbox.");
      } else {
        setAuthError(result.error);
      }
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Could not send magic link.");
    } finally {
      setIsSendingMagicLink(false);
    }
  }

  async function handleForgotPassword() {
    if (authBusy) return;

    if (!email.trim() || !adminToken) {
      setAuthError("Email and admin token are required to reset your password.");
      setAuthSuccess("");
      return;
    }

    setIsSendingReset(true);
    setAuthError("");
    setAuthSuccess("");

    try {
      const result = await sendPasswordReset(email, adminToken);
      if (result.ok) {
        setPassword("");
        setAuthSuccess(result.message ?? "Password reset email sent — check your inbox.");
      } else {
        setAuthError(result.error);
      }
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Could not send password reset.");
    } finally {
      setIsSendingReset(false);
    }
  }

  async function handleLogout() {
    await logoutAdmin();
    setAuthed(false);
    setDemos([]);
    setShowModal(false);
    setEmail("");
    setPassword("");
    setAdminToken("");
    setAuthError("");
    setAuthSuccess("");
  }

  // ==================== IMAGE UPLOAD HANDLERS (Drag & Drop + Preview) ====================
  // Supabase Storage is PRIMARY for uploaded images (bucket: "demos").
  // - Drag & drop or file select → uploadImageToDemosBucket (via uploadDemoImage wrapper)
  // - On success: stores the returned public URL in the demo record (via Supabase + LS backup)
  // - On ANY failure (no bucket, no keys, network, policy): falls back to base64 exactly like before
  // - Manual URL entry and /assets/ paths remain fully supported.
  // - UI, dropzone, preview, and remove button unchanged.
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleImageUpload(file: File) {
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (JPG, PNG, WebP recommended).");
      return;
    }
    if (file.size > 2.5 * 1024 * 1024) {
      alert("Image must be under 2.5 MB. Compress the file or add it to /public/assets/ manually.");
      return;
    }

    const uploadResult = await uploadDemoImage(file);
    if (uploadResult.url) {
      updateForm("image", uploadResult.url);
      showSuccessToast("Image uploaded to Supabase Storage.");
      return;
    }

    const detail = uploadResult.error
      ? `Supabase upload failed: ${uploadResult.error}`
      : "Supabase image upload failed. Enter an /assets/demo-name.jpg path or check Storage bucket policies.";

    showErrorToast(detail);
  }

  function handleDrag(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  }

  function triggerFileSelect() {
    fileInputRef.current?.click();
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
      e.target.value = ""; // allow re-selecting same file
    }
  }

  function removeImage(e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    updateForm("image", "");
  }

  // Open create modal
  function openNewDemo() {
    setEditingId(null);
    const nextOrder = demos.length > 0 
      ? Math.max(...demos.map(d => d.sortOrder)) + 10 
      : 10;
    setForm({
      ...emptyForm,
      sortOrder: nextOrder,
      featured: false,
    });
    setFormError("");
    setShowModal(true);
  }

  // Open edit modal
  function openEditDemo(demo: Demo) {
    setEditingId(demo.id);
    setForm({
      title: demo.title,
      slug: demo.slug,
      category: demo.category,
      href: demo.href,
      description: demo.description,
      image: demo.image || "",
      sortOrder: demo.sortOrder,
      visible: demo.visible,
      featured: !!demo.featured,
    });
    setFormError("");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
    setIsSaving(false);
  }

  function updateForm<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm(prev => {
      const next = { ...prev, [key]: value };
      // Auto-generate slug when title changes (only for new or if slug is empty/default)
      if (key === "title" && !editingId) {
        next.slug = generateUniqueSlug(value as string);
      }
      return next;
    });
    if (formError) setFormError("");
  }

  // Validate and save form — complete working logic for Create + Edit
  async function handleSaveDemo(e: React.FormEvent) {
    e.preventDefault();
    if (isSaving) return;

    setFormError("");

    // Required: title, slug, category, live URL (as specified)
    if (!form.title.trim() || !form.slug.trim() || !form.category.trim() || !form.href.trim()) {
      setFormError("Title, Slug, Category, and Live URL are required.");
      return;
    }

    const trimmedSlug = form.slug.trim();

    // Minimal slug format validation (robustness)
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(trimmedSlug)) {
      setFormError("Slug must be lowercase letters, numbers and single hyphens (no leading/trailing hyphen).");
      return;
    }

    // Final uniqueness check against live data (Supabase or LS)
    const latestForCheck = await getDemos();
    const slugTaken = latestForCheck.some((d) => d.slug === trimmedSlug && d.id !== (editingId || undefined));
    if (slugTaken) {
      setFormError("Slug must be unique. Change the slug or title.");
      return;
    }

    setIsSaving(true);

    try {
      const demoData: Omit<Demo, "id"> = {
        title: form.title.trim(),
        slug: trimmedSlug,
        category: form.category.trim(),
        href: form.href.trim().replace(/\/$/, ""), // trim trailing slash for cleanliness
        description: (form.description || "").trim(),
        // Image can be: Supabase Storage public URL (preferred), /assets/ path, or base64 (fallback only)
        // We pass through exactly what handleImageUpload or the URL field provided.
        image: form.image?.trim() || undefined,
        sortOrder: Number(form.sortOrder) || 99,
        visible: !!form.visible,
        featured: !!form.featured,
      };

      if (demoData.image?.startsWith("data:")) {
        setFormError(
          "Base64 images cannot be saved to Supabase. Upload via drag-and-drop or use an /assets/ path."
        );
        setIsSaving(false);
        return;
      }

      const result = editingId
        ? await updateDemo(editingId, demoData)
        : await addDemo(demoData);

      applyOperationResult(
        result,
        editingId ? "Demo updated successfully." : "Demo created successfully."
      );

      if (result.supabaseOk) closeModal();
    } catch (err) {
      console.error("Save demo failed:", err);
      setFormError("Failed to save demo. Check console and try again.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This permanently removes it from Supabase and local backups.`)) return;
    const result = await deleteDemo(id);
    applyOperationResult(result, `"${title}" deleted from Supabase and local backup.`);
  }

  async function handleToggleVisible(id: string, current: boolean) {
    const result = await updateDemo(id, { visible: !current });
    applyOperationResult(result, current ? "Demo hidden." : "Demo visible.");
  }

  async function handleToggleFeatured(id: string, current: boolean) {
    const nextFeatured = !current;
    if (nextFeatured) {
      const featuredCount = demos.filter((d) => d.featured).length;
      if (featuredCount >= FEATURED_HOMEPAGE_LIMIT) {
        showWarningToast(
          `Homepage shows only ${FEATURED_HOMEPAGE_LIMIT} featured cards (by sort order). This demo is marked featured — reorder or unfeature another if needed.`
        );
      }
    }
    const result = await updateDemo(id, { featured: nextFeatured });
    applyOperationResult(
      result,
      nextFeatured ? "Added to homepage Featured Work." : "Removed from homepage Featured Work."
    );
  }

  async function handleSortOrderChange(id: string, newOrder: number) {
    const result = await updateDemo(id, { sortOrder: newOrder });
    applyOperationResult(result, "Sort order updated.");
  }

  /** Swap sortOrder with neighboring featured demo (↑ / ↓ in Featured Work section). */
  async function handleFeaturedReorder(id: string, direction: "up" | "down") {
    const featured = [...demos]
      .filter((d) => d.featured)
      .sort((a, b) => a.sortOrder - b.sortOrder);
    const idx = featured.findIndex((d) => d.id === id);
    if (idx < 0) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= featured.length) return;

    const a = featured[idx];
    const b = featured[swapIdx];
    const orderA = a.sortOrder;
    const orderB = b.sortOrder;

    // Optimistic UI
    setDemos((prev) =>
      prev
        .map((d) => {
          if (d.id === a.id) return { ...d, sortOrder: orderB };
          if (d.id === b.id) return { ...d, sortOrder: orderA };
          return d;
        })
        .sort((x, y) => x.sortOrder - y.sortOrder)
    );

    const resultA = await updateDemo(a.id, { sortOrder: orderB });
    if (!resultA.supabaseOk && resultA.error) {
      applyOperationResult(resultA, "Reorder partially failed.");
      return;
    }
    const resultB = await updateDemo(b.id, { sortOrder: orderA });
    applyOperationResult(resultB, "Featured order updated.");
  }

  async function handlePublish() {
    setIsPublishing(true);
    const sorted = [...demos].sort((a, b) => a.sortOrder - b.sortOrder);

    const syncResult = await forceSyncToSupabase(sorted);
    setDemos(syncResult.demos.sort((a, b) => a.sortOrder - b.sortOrder));
    dispatchDemosPublished(syncResult.demos);

    if (syncResult.ok) {
      showPublishHint(
        `✓ Published to Supabase (${syncResult.upserted} demos${syncResult.deleted ? `, ${syncResult.deleted} removed` : ""}). Local backup refreshed.`,
        "success"
      );
    } else if (syncResult.upserted > 0 || syncResult.deleted > 0) {
      showPublishHint(
        `Publish partially failed: ${syncResult.error?.message ?? "Unknown error"}${syncResult.error?.hint ? ` — ${syncResult.error.hint}` : ""}.`,
        "warning"
      );
    } else {
      showPublishHint(
        `Publish failed: ${syncResult.error?.message ?? "Unknown error"}. Export JSON as backup.`,
        "error"
      );
    }

    await refreshStatus();
    setIsPublishing(false);
  }

  async function handleForceSync() {
    setIsForceSyncing(true);
    const syncResult = await forceSyncToSupabase(demos);
    setDemos(syncResult.demos.sort((a, b) => a.sortOrder - b.sortOrder));
    dispatchDemosPublished(syncResult.demos);

    if (syncResult.ok) {
      showPublishHint(
        `✓ Force Sync complete — ${syncResult.upserted} upserted${syncResult.deleted ? `, ${syncResult.deleted} orphans removed` : ""}.`,
        "success"
      );
      setDataSource("supabase");
    } else if (syncResult.upserted > 0 || syncResult.deleted > 0) {
      showPublishHint(
        `Force Sync partially failed: ${syncResult.error?.message ?? "Check console"}${syncResult.error?.hint ? ` — ${syncResult.error.hint}` : ""}.`,
        "warning"
      );
    } else {
      showPublishHint(
        `Force Sync failed: ${syncResult.error?.message ?? "Check console"}. Data preserved in IndexedDB/local backup.`,
        "error"
      );
    }

    await refreshStatus();
    setIsForceSyncing(false);
  }

  async function handleReset() {
    const customCount = demos.length;
    const msg = [
      "Reset local backups to factory defaults?",
      `You currently have ${customCount} demos loaded from ${dataSource}.`,
      "This does NOT delete Supabase rows — use Force Sync afterward to reconcile.",
      "Export JSON first if you want a safety copy.",
    ].join("\n\n");
    if (!confirm(msg)) return;

    const result = await resetToDefaults();
    setDemos(result.demos);
    setDataSource("defaults");
    dispatchDemosPublished(result.demos);
    showPublishHint("Local backups reset to factory defaults. Supabase unchanged.", "warning");
    await refreshStatus();
  }

  async function handleClearLocalStorage() {
    const msg = [
      "Clear local browser backups (localStorage + IndexedDB)?",
      "Your Supabase data will NOT be deleted.",
      "After clearing, click Reload or Force Sync to restore from Supabase.",
      "If Supabase is unavailable, unsynced local-only demos may be lost.",
    ].join("\n\n");
    if (!confirm(msg)) return;

    const { clearLocalBackups, clearIndexedDbBackup } = await import("@/lib/demoStorage");
    clearLocalBackups();
    await clearIndexedDbBackup();
    await loadDemos();
    showPublishHint("Local backups cleared. Reloaded from best available source.", "warning");
  }

  async function handleExport() {
    const current = await getDemos();
    const data = JSON.stringify(current, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bluegrass-demos-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Export clean TypeScript for the hardcoded DEFAULT_DEMOS in lib/demos.ts
  // (Useful for source control / no-Supabase deployments). Public uses getPublicDemos().
  async function handleExportToDemosTs() {
    const currentList = await getDemos();
    const current = [...currentList].sort((a, b) => a.sortOrder - b.sortOrder);
    const code = generateDemosTsCode(current);
    setTsExportCode(code);
    setCopySuccess(false);
    setShowTsExportModal(true);
  }

  function closeTsExportModal() {
    setShowTsExportModal(false);
    setTsExportCode("");
    setCopySuccess(false);
  }

  async function copyTsCode() {
    try {
      await navigator.clipboard.writeText(tsExportCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2200);
    } catch {
      // Fallback for older browsers / no clipboard permission
      const textarea = document.createElement("textarea");
      textarea.value = tsExportCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2200);
    }
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (!Array.isArray(imported) || imported.length === 0) {
          throw new Error("File must contain an array of demos");
        }
        const valid = imported.every((d: Demo) => d.title && d.href && typeof d.sortOrder === "number");
        if (!valid) throw new Error("Invalid demo format");

        const cleaned = normalizeDemos(
          imported.map((d: Demo) => ({
            ...d,
            image: d.image?.startsWith("data:") ? undefined : d.image,
          }))
        );

        setDemos(cleaned);
        const syncResult = await forceSyncToSupabase(cleaned);
        dispatchDemosPublished(syncResult.demos);
        setDemos(syncResult.demos.sort((a, b) => a.sortOrder - b.sortOrder));

        if (syncResult.ok) {
          showPublishHint(`Import successful — ${syncResult.upserted} demos synced to Supabase.`, "success");
          setDataSource("supabase");
        } else {
          showPublishHint(
            `Import saved locally but Supabase sync failed: ${syncResult.error?.message}. Use Force Sync.`,
            "warning"
          );
        }
        await refreshStatus();
      } catch {
        showErrorToast("Import failed. Use a valid exported JSON file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function showPublishHint(msg: string, type: "success" | "error" | "warning" = "success") {
    setPublishMessage(msg);
    setPublishMessageType(type);
    setTimeout(() => setPublishMessage(""), type === "error" ? 8000 : 5000);
  }

  function showSuccessToast(msg: string) {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(""), 3200);
  }

  function showErrorToast(msg: string) {
    setErrorToast(msg);
    setTimeout(() => setErrorToast(""), 7000);
  }

  function showWarningToast(msg: string) {
    showPublishHint(msg, "warning");
  }

  function dataSourceLabel(source: DemoDataSource): string {
    const labels: Record<DemoDataSource, string> = {
      supabase: "Supabase (live)",
      indexeddb: "IndexedDB backup",
      localStorage: "localStorage backup",
      defaults: "Factory defaults",
    };
    return labels[source];
  }

  const showLogin = authed === false;
  const showPending = authed === null;
  const tabs: Tab[] = ["Dashboard", "Demos", "Analytics", "Lock"];

  /** Homepage Featured Work queue — sorted for reorder UI (max shown on site = FEATURED_HOMEPAGE_LIMIT). */
  const featuredDemos = demos
    .filter((d) => d.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const featuredOnHomepage = featuredDemos.slice(0, FEATURED_HOMEPAGE_LIMIT);

  return (
    <div className="min-h-screen bg-[#050708] text-[#e8e3d9]">
      {/* === MODERN DYNAMIC TOP NAV === */}
      <div className="sticky top-0 z-50 border-b border-[#18232f] bg-[#050708]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-5 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#facc15] shadow-[0_0_0_6px_rgba(250,204,21,0.08)]" />
            <span className="text-sm font-semibold tracking-[0.24em] uppercase text-[#f8f5d6]">Admin Panel</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              const isLock = tab === "Lock";

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => (isLock ? handleLogout() : setActiveTab(tab))}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                    isActive && !isLock
                      ? "bg-[#132847] text-white shadow-[0_16px_40px_-20px_rgba(37,99,235,0.8)]"
                      : isLock
                      ? "rounded-full border border-[#2d3748] bg-[#07101a] px-5 py-2 text-sm font-semibold text-[#9aa6ad] hover:border-red-500 hover:text-red-400"
                      : "text-[#9aa6ad] hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 py-8 md:py-10">
        {showPending ? (
          <div className="rounded-[28px] border border-[#182c43] bg-[#07101a] p-10 text-center text-[#9aa6ad] shadow-lg">
            <div className="text-lg font-semibold text-white mb-2">Loading admin experience…</div>
            <p className="text-sm text-[#8a9599]">Checking Supabase session and preparing the admin panel.</p>
          </div>
        ) : showLogin ? (
          <div className="mx-auto max-w-2xl">
            <div className="bg-[#0c1013] border border-[#1a2225] rounded-3xl p-8 sm:p-9">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#1f2528] flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#3ddbd9]" />
                </div>
                <div>
                  <div className="font-semibold tracking-tight text-xl">Bluegrass Digital Forge</div>
                  <div className="text-[#8a9599] text-sm">Admin Panel — Monticello, KY</div>
                </div>
              </div>

              <h1 className="text-2xl font-semibold tracking-tight mb-2">Admin sign in</h1>
              <p className="text-[#9aa6ad] text-[14.5px] mb-6">
                Secure access via Supabase Auth. Email, password, and admin token required.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="label mb-1.5 block" htmlFor="admin-email">
                    Email
                  </label>
                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input w-full text-base"
                    placeholder="you@example.com"
                    autoFocus
                    disabled={authBusy}
                    required
                  />
                </div>

                <div>
                  <label className="label mb-1.5 block" htmlFor="admin-password">
                    Password
                  </label>
                  <input
                    id="admin-password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input w-full text-base"
                    placeholder="••••••••••••"
                    disabled={authBusy}
                    required
                  />
                </div>

                <div>
                  <label className="label mb-1.5 block" htmlFor="admin-token">
                    Admin Token
                  </label>
                  <input
                    id="admin-token"
                    type="password"
                    autoComplete="off"
                    value={adminToken}
                    onChange={(e) => setAdminToken(e.target.value)}
                    className="input w-full text-base"
                    placeholder="••••••••••••"
                    disabled={authBusy}
                    required
                  />
                </div>

                {authError && (
                  <div className="text-sm text-red-400" role="alert">
                    {authError}
                  </div>
                )}

                {authSuccess && (
                  <div className="text-sm text-[#34d399]" role="status">
                    {authSuccess}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={authBusy}
                  className="w-full btn bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-2xl transition flex items-center justify-center gap-2"
                >
                  {isLoggingIn ? "Signing in…" : "Sign In to Admin"}
                </button>
              </form>

              <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-6">
                <button
                  type="button"
                  onClick={handleSendMagicLink}
                  disabled={authBusy}
                  className="text-sm text-[#9aa6ad] hover:text-[#3ddbd9] underline-offset-4 hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3ddbd9] rounded-sm"
                >
                  {isSendingMagicLink ? "Sending magic link…" : "Send magic link instead"}
                </button>
                <span className="hidden sm:inline text-[#2d3748]" aria-hidden>
                  ·
                </span>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={authBusy}
                  className="text-sm text-[#9aa6ad] hover:text-[#3ddbd9] underline-offset-4 hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3ddbd9] rounded-sm"
                >
                  {isSendingReset ? "Sending reset email…" : "Forgot password?"}
                </button>
              </div>

              <p className="text-[11px] text-center text-[#6b787e] mt-6">
                Protected with Supabase Auth. Session persists until you sign out.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
              <div className="max-w-2xl">
                <div className="uppercase tracking-[2.2px] text-[11px] text-[#facc15] font-semibold mb-1.5">
                  {activeTab.toUpperCase()}
                </div>
                <h1 className="text-[34px] md:text-4xl font-extrabold tracking-[-1.6px] leading-none text-white">
                  {activeTab === "Dashboard"
                    ? "Demo Manager"
                    : activeTab === "Demos"
                    ? "Manage Live Demos"
                    : activeTab === "Analytics"
                    ? "Analytics Overview"
                    : "Session Locked"}
                </h1>
                <p className="text-[#9aa6ad] mt-3 text-[15px] leading-relaxed">
                  {activeTab === "Lock"
                    ? "You have been logged out."
                    : activeTab === "Dashboard"
                    ? "Overview and quick actions for the Bluegrass Digital Forge."
                    : "These appear on the public /work page."}
                </p>
              </div>

              {(activeTab === "Demos" || activeTab === "Dashboard") && (
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={handleForceSync}
                    disabled={isForceSyncing || isPublishing}
                    className="inline-flex items-center gap-2 rounded-2xl border border-[#243530] hover:bg-[#111518] disabled:opacity-60 px-5 py-3 text-[14px] font-medium transition whitespace-nowrap"
                  >
                    <RefreshCw size={16} className={isForceSyncing ? "animate-spin" : ""} />
                    {isForceSyncing ? "Syncing..." : "Force Sync"}
                  </button>
                  <button
                    onClick={handlePublish}
                    disabled={isPublishing || isForceSyncing}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-70 px-7 py-3 text-[15px] font-semibold transition active:scale-[0.985] whitespace-nowrap"
                  >
                    <Save size={17} /> {isPublishing ? "Publishing..." : "Publish Changes"}
                  </button>
                </div>
              )}
            </div>

            {/* Shared toast / publish messages — visible for Dashboard + Demos + Analytics */}
            <AnimatePresence>
              {publishMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mb-6 rounded-2xl px-5 py-3 text-sm flex items-center gap-3 ${
                    publishMessageType === "error"
                      ? "border border-red-900/50 bg-[#1a0f0f] text-red-300"
                      : publishMessageType === "warning"
                      ? "border border-amber-900/40 bg-[#1a1508] text-amber-200"
                      : "border border-[#3b82f6]/30 bg-[#0a1320] text-[#a5c3ff]"
                  }`}
                >
                  {publishMessage}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {successToast && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mb-6 rounded-2xl border border-[#10b981]/40 bg-[#061c14] px-5 py-3.5 text-sm flex items-center gap-3 text-[#34d399] shadow-sm"
                >
                  <span className="font-medium">✓</span> {successToast}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {errorToast && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mb-6 rounded-2xl border border-red-900/50 bg-[#1a0f0f] px-5 py-3.5 text-sm flex items-start gap-3 text-red-300"
                >
                  <AlertTriangle size={16} className="mt-0.5 shrink-0" /> {errorToast}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Status bar only for dashboard/demos tabs */}
            {(activeTab === "Demos" || activeTab === "Dashboard") && (
              <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-[#1a2225] bg-[#0c1013] px-5 py-3.5 text-sm">
                {supabaseStatus?.connected ? (
                  <span className="inline-flex items-center gap-2 text-[#34d399]">
                    <Cloud size={16} /> Supabase connected
                    {supabaseStatus.rowCount != null && (
                      <span className="text-[#6b787e]">({supabaseStatus.rowCount} rows)</span>
                    )}
                  </span>
                ) : supabaseStatus?.configured ? (
                  <span className="inline-flex items-center gap-2 text-amber-400">
                    <CloudOff size={16} /> Supabase error: {supabaseStatus.error?.message ?? "unreachable"}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-[#9aa6ad]">
                    <CloudOff size={16} /> Supabase not configured — using local backups only
                  </span>
                )}
                <span className="h-4 w-px bg-[#1f2528] hidden sm:block" />
                <span className="text-[#8a9599]">
                  Data source: <span className="text-[#e8e3d9]">{dataSourceLabel(dataSource)}</span>
                </span>
                <span className="h-4 w-px bg-[#1f2528] hidden sm:block" />
                <span className="text-[#8a9599]">
                  Local backup: ~{Math.round(storageBytes / 1024)} KB
                  {storageBytes > 400_000 && (
                    <span className="text-amber-400 ml-1.5 inline-flex items-center gap-1">
                      <AlertTriangle size={13} /> large
                    </span>
                  )}
                </span>
              </div>
            )}

            {activeTab === "Analytics" && <AdminAnalytics />}

            {activeTab === "Lock" && (
              <div className="mx-auto max-w-2xl rounded-[28px] border border-[#18232f] bg-[#07101a] p-10 text-center text-[#e8e3d9] shadow-lg">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0f172a] text-[#3ddbd9] mb-4">
                  <Lock size={24} />
                </div>
                <h2 className="text-3xl font-semibold text-white mb-3">Admin Locked</h2>
                <p className="text-[#9aa6ad] mb-6">
                  The admin panel is locked. Click sign out to end your Supabase session and return to the login screen.
                </p>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#3b82f6] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2563eb] transition"
                >
                  Sign out
                </button>
              </div>
            )}

            {activeTab === "Dashboard" && (
              <>
                <div className="rounded-[28px] border border-[#18232f] bg-[#07101a] p-8 mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div>
                      <div className="uppercase tracking-[2.2px] text-[10px] text-[#3ddbd9] font-semibold mb-1">BLUEGRASS DIGITAL FORGE</div>
                      <h2 className="text-2xl md:text-[28px] font-semibold tracking-[-0.6px] text-white">Demo Manager</h2>
                      <p className="mt-2 text-[#9aa6ad] max-w-xl text-[15px]">
                        Overview and quick actions. Switch tabs to manage live demos or review engagement analytics.
                      </p>
                    </div>
                    <div className="sm:ml-auto flex gap-2">
                      <button
                        onClick={() => setActiveTab("Demos")}
                        className="rounded-2xl bg-[#1f2528] hover:bg-[#2a3437] border border-[#243530] px-5 py-2.5 text-sm font-medium transition"
                      >
                        Go to Demos
                      </button>
                      <button
                        onClick={() => setActiveTab("Analytics")}
                        className="rounded-2xl border border-[#243530] hover:bg-[#111518] px-5 py-2.5 text-sm font-medium transition"
                      >
                        View Analytics
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div
                    onClick={() => setActiveTab("Demos")}
                    className="group cursor-pointer rounded-2xl border border-[#1a2225] bg-[#0c1013] p-6 hover:border-[#3ddbd9]/50 transition"
                  >
                    <div className="text-[#9aa6ad] text-[11px] tracking-[1.5px]">TOTAL DEMOS</div>
                    <div className="mt-2 text-[42px] font-semibold tabular-nums leading-none text-white">{demos.length}</div>
                    <div className="mt-3 text-sm text-[#3ddbd9] group-hover:underline">Manage live demos →</div>
                  </div>
                  <div
                    onClick={() => setActiveTab("Demos")}
                    className="group cursor-pointer rounded-2xl border border-[#1a2225] bg-[#0c1013] p-6 hover:border-[#3ddbd9]/50 transition"
                  >
                    <div className="text-[#9aa6ad] text-[11px] tracking-[1.5px]">VISIBLE ON SITE</div>
                    <div className="mt-2 text-[42px] font-semibold tabular-nums leading-none text-[#3ddbd9]">{demos.filter(d => d.visible).length}</div>
                    <div className="mt-3 text-sm text-[#3ddbd9] group-hover:underline">Edit visibility &amp; order →</div>
                  </div>
                  <div
                    onClick={() => setActiveTab("Analytics")}
                    className="group cursor-pointer rounded-2xl border border-[#1a2225] bg-[#0c1013] p-6 hover:border-[#3ddbd9]/50 transition"
                  >
                    <div className="text-[#9aa6ad] text-[11px] tracking-[1.5px]">ANALYTICS</div>
                    <div className="mt-2 text-xl font-semibold text-white">Engagement insights</div>
                    <p className="mt-1 text-sm text-[#9aa6ad]">GA4 demo clicks, top performers, and referrers.</p>
                    <div className="mt-3 text-sm text-[#3ddbd9] group-hover:underline">Open full analytics →</div>
                  </div>
                </div>

                <div className="text-xs text-[#6b787e] mb-4">
                  All changes use Supabase (primary) with local backup. Use Demos tab for full CRUD and publish.
                </div>
              </>
            )}

            {activeTab === "Demos" && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-[#0c1013] border border-[#1a2225] rounded-2xl px-6 py-5 md:py-6">
                    <div className="text-[#9aa6ad] text-[11px] tracking-[1.5px]">TOTAL DEMOS</div>
                    <div className="text-3xl md:text-[32px] font-semibold tabular-nums mt-1.5 leading-none">{demos.length}</div>
                  </div>
                  <div className="bg-[#0c1013] border border-[#1a2225] rounded-2xl px-6 py-5 md:py-6">
                    <div className="text-[#9aa6ad] text-[11px] tracking-[1.5px]">VISIBLE ON SITE</div>
                    <div className="text-3xl md:text-[32px] font-semibold tabular-nums mt-1.5 leading-none text-[#3ddbd9]">{demos.filter(d => d.visible).length}</div>
                  </div>
                  <div className="bg-[#0c1013] border border-[#1a2225] rounded-2xl px-6 py-5 md:py-6">
                    <div className="text-[#9aa6ad] text-[11px] tracking-[1.5px]">FEATURED HOMEPAGE</div>
                    <div className="text-3xl md:text-[32px] font-semibold tabular-nums mt-1.5 leading-none text-[#f4a261]">
                      {featuredOnHomepage.length}
                      <span className="text-lg text-[#6b787e]">/{FEATURED_HOMEPAGE_LIMIT}</span>
                    </div>
                  </div>
                  <div className="bg-[#0c1013] border border-[#1a2225] rounded-2xl px-6 py-5 md:py-6 text-[13.5px] leading-relaxed text-[#9aa6ad]">
                    Edit Featured Work below to swap homepage demos — no code edits needed.
                  </div>
                </div>

                {/* ==================== FEATURED WORK (HOMEPAGE) — primary edit surface for the 4 cards ==================== */}
                <section className="mb-10 rounded-[28px] border border-[#3a2a1a] bg-gradient-to-b from-[#12100c] to-[#0a0c0f] p-5 sm:p-6 shadow-[0_24px_60px_-40px_rgba(193,122,90,0.35)]">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                    <div>
                      <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[2px] font-semibold text-[#f4a261] mb-1.5">
                        <Star size={13} className="fill-[#f4a261]" /> Featured Work · Homepage
                      </div>
                      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                        Here&apos;s the kind of work I build
                      </h2>
                      <p className="mt-1.5 text-[14px] text-[#9aa6ad] max-w-2xl leading-relaxed">
                        These cards appear on the homepage under <span className="text-[#c8b48a]">Featured Work</span>.
                        Edit <strong className="text-[#e8e3d9] font-medium">Title</strong>,{" "}
                        <strong className="text-[#e8e3d9] font-medium">Badge</strong>,{" "}
                        <strong className="text-[#e8e3d9] font-medium">Subtitle</strong>,{" "}
                        <strong className="text-[#e8e3d9] font-medium">Image</strong>, and{" "}
                        <strong className="text-[#e8e3d9] font-medium">Link</strong> — reorder with ↑↓.
                        Homepage shows up to {FEATURED_HOMEPAGE_LIMIT} (lowest sort order first).
                      </p>
                    </div>
                    <Link
                      href="/#featured-work"
                      className="shrink-0 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#f4a261] hover:text-[#ffd6b8] border border-[#463424] rounded-xl px-4 py-2.5 bg-[#1a140f]"
                    >
                      Preview homepage →
                    </Link>
                  </div>

                  {featuredDemos.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[#463424] bg-[#0c1013]/80 px-5 py-8 text-center text-[14px] text-[#9aa6ad]">
                      No demos marked as Featured yet. Toggle{" "}
                      <span className="text-[#f4a261] font-medium">Feature on homepage</span> on any demo below,
                      or open Edit and check the Featured box.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {featuredDemos.map((demo, index) => {
                        const onHomepage = index < FEATURED_HOMEPAGE_LIMIT;
                        return (
                          <article
                            key={demo.id}
                            className={`rounded-2xl border p-3.5 sm:p-4 transition ${
                              onHomepage
                                ? "border-[#463424] bg-[#0f1210]"
                                : "border-[#2a2220] bg-[#0a0c0f] opacity-75"
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div
                                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold tabular-nums ${
                                    onHomepage
                                      ? "bg-[#2b1f16] text-[#f4a261] border border-[#463424]"
                                      : "bg-[#1a2225] text-[#6b787e] border border-[#243530]"
                                  }`}
                                  title={onHomepage ? `Homepage slot ${index + 1}` : "Beyond homepage limit — raise order or unfeature others"}
                                >
                                  {onHomepage ? index + 1 : "—"}
                                </div>
                                <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-xl bg-[#0b1320] ring-1 ring-[#243530]">
                                  {demo.image ? (
                                    <Image
                                      src={demo.image}
                                      alt={demo.title}
                                      fill
                                      sizes="112px"
                                      className="object-cover object-top"
                                      unoptimized
                                    />
                                  ) : (
                                    <div className="flex h-full items-center justify-center text-[10px] text-[#6b787e]">No image</div>
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                                    <span className="rounded-full bg-[#1f345c] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#7dd3fc]">
                                      {demo.category || "Badge"}
                                    </span>
                                    {!demo.visible && (
                                      <span className="rounded-full border border-[#374151] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#9ca3af]">
                                        Hidden
                                      </span>
                                    )}
                                    {!onHomepage && (
                                      <span className="rounded-full border border-amber-900/50 px-2 py-0.5 text-[10px] uppercase tracking-wider text-amber-400/90">
                                        Not on homepage (slot full)
                                      </span>
                                    )}
                                  </div>
                                  <h3 className="text-[15px] sm:text-base font-semibold text-white truncate">{demo.title}</h3>
                                  <p className="text-[12.5px] text-[#8a9599] line-clamp-1 mt-0.5">
                                    {demo.description || "No subtitle yet — click Edit to add one."}
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-2 sm:justify-end shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleFeaturedReorder(demo.id, "up")}
                                  disabled={index === 0}
                                  className="inline-flex h-10 min-w-[40px] items-center justify-center rounded-xl border border-[#463424] bg-[#1a140f] px-3 text-sm font-semibold text-[#f4a261] transition hover:bg-[#2b1f16] disabled:opacity-30 disabled:cursor-not-allowed"
                                  aria-label={`Move ${demo.title} earlier on homepage`}
                                >
                                  ↑
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleFeaturedReorder(demo.id, "down")}
                                  disabled={index === featuredDemos.length - 1}
                                  className="inline-flex h-10 min-w-[40px] items-center justify-center rounded-xl border border-[#463424] bg-[#1a140f] px-3 text-sm font-semibold text-[#f4a261] transition hover:bg-[#2b1f16] disabled:opacity-30 disabled:cursor-not-allowed"
                                  aria-label={`Move ${demo.title} later on homepage`}
                                >
                                  ↓
                                </button>
                                <button
                                  type="button"
                                  onClick={() => openEditDemo(demo)}
                                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-[#24384f] bg-[#0b1230] px-3.5 text-sm font-semibold text-[#cbd5e1] transition hover:border-[#60a5fa] hover:text-white"
                                >
                                  <Edit2 size={14} /> Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleToggleFeatured(demo.id, true)}
                                  className="inline-flex h-10 items-center justify-center rounded-xl border border-[#463424] bg-[#1a140f] px-3.5 text-sm font-semibold text-[#c8b48a] transition hover:bg-[#2b1f16]"
                                >
                                  Unfeature
                                </button>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  )}

                  <p className="mt-4 text-[12px] text-[#6b787e] leading-relaxed">
                    Tip: To swap in TruckDash (or any demo), open it below → check{" "}
                    <span className="text-[#c8b48a]">Feature on homepage</span> → use ↑↓ here to place it in slots 1–4.
                    Unfeature one of the current four if you only want four stars.
                  </p>
                </section>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button onClick={openNewDemo} className="btn flex items-center gap-2 bg-[#1f2528] hover:bg-[#2a3437] border border-[#243530] text-sm px-6 py-2.5">
                      <Plus size={17} /> New Demo
                    </button>
                    <button onClick={handleExportToDemosTs} className="flex items-center gap-2 text-sm px-5 py-2.5 bg-[#0f2a1f] border border-[#1f5a42] hover:bg-[#1a3a2b] rounded-xl font-medium">
                      <Code2 size={17} /> Export to demos.ts
                    </button>
                    <button onClick={handleReset} className="text-sm px-4 py-2.5 text-[#9aa6ad] hover:text-white flex items-center gap-1.5 rounded-xl border border-[#243530] hover:border-[#33423c]">
                      <RefreshCw size={16} /> Reset Defaults
                    </button>
                    <button onClick={handleClearLocalStorage} className="text-sm px-4 py-2.5 text-amber-400/80 hover:text-amber-300 flex items-center gap-1.5 rounded-xl border border-amber-900/30 hover:border-amber-700/40">
                      <AlertTriangle size={15} /> Clear Local Backup
                    </button>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap ml-auto">
                    <button onClick={handleExport} className="flex items-center gap-2 text-sm px-4 py-2.5 border border-[#243530] hover:bg-[#111518] rounded-xl">
                      <Download size={16} /> Export JSON
                    </button>

                    <label className="flex items-center gap-2 text-sm px-4 py-2.5 border border-[#243530] hover:bg-[#111518] rounded-xl cursor-pointer">
                      <Upload size={16} /> Import
                      <input type="file" accept="application/json" onChange={handleImport} className="hidden" />
                    </label>

                    <Link href="/" className="text-[14px] text-[#3ddbd9] hover:underline px-3 py-2">Preview Site →</Link>
                  </div>
                </div>

                <div className="mb-3 flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold tracking-wide text-[#e8e3d9] uppercase">
                    All demos
                  </h3>
                  <span className="text-[12px] text-[#6b787e]">
                    Full gallery on /work · Featured subset on homepage
                  </span>
                </div>

                <div className="space-y-4">
                  {demos.length === 0 ? (
                    <div className="rounded-[28px] border border-[#182c43] bg-[#07101a] px-6 py-10 text-center text-[#9aa6ad]">
                      No demos yet. Click “New Demo” to get started.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {demos.map((demo) => (
                        <article key={demo.id} className="group rounded-[28px] border border-[#182c43] bg-[#07101a] p-4 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.7)] transition hover:-translate-y-0.5 hover:border-[#2563eb]/40 sm:p-5">
                          <div className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
                            <div className="relative h-44 overflow-hidden rounded-3xl bg-[#0b1320] ring-1 ring-[#122040]/50">
                              {demo.image ? (
                                <Image
                                  src={demo.image}
                                  alt={demo.title}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 220px"
                                  className="object-cover"
                                  unoptimized
                                />
                              ) : (
                                <div className="flex h-44 items-center justify-center text-[#7c8fa4]">
                                  <span className="text-sm">No screenshot provided</span>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col justify-between gap-4">
                              <div className="space-y-3">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="rounded-full bg-[#1f345c] px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-[#7dd3fc]">{demo.category || "Uncategorized"}</span>
                                  <span className="rounded-full border border-[#24384f] px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-[#cbd5e1]">Order {demo.sortOrder}</span>
                                  {demo.featured && (
                                    <span className="inline-flex items-center gap-1 rounded-full border border-[#463424] bg-[#2b1f16] px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-[#f4a261]">
                                      <Star size={10} className="fill-[#f4a261]" /> Featured
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">{demo.title}</h2>
                                  <p className="mt-2 text-sm leading-6 text-[#cbd5e1]">{demo.description || "Add a short description to help customers understand the demo."}</p>
                                </div>
                              </div>

                              <div className="space-y-2 rounded-3xl border border-[#16223d] bg-[#09101a] p-4">
                                <div className="text-[12px] uppercase tracking-[0.35em] text-[#9aa6ad]">Slug</div>
                                <div className="font-mono text-sm text-[#cbd5e1] break-all">{demo.slug}</div>
                                <div className="text-[12px] uppercase tracking-[0.35em] text-[#9aa6ad] mt-3">Live URL</div>
                                <a href={demo.href} target="_blank" rel="noopener noreferrer" className="block truncate text-sm font-medium text-[#7dd3fc] hover:text-[#60a5fa]">
                                  {demo.href.replace(/^https?:\/\//, "")}
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleSortOrderChange(demo.id, demo.sortOrder - 10)}
                                className="inline-flex h-11 min-w-[44px] items-center justify-center rounded-2xl border border-[#24384f] bg-[#0a1222] px-4 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:bg-[#10233e]"
                                aria-label={`Move ${demo.title} earlier`}
                              >
                                ↑
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSortOrderChange(demo.id, demo.sortOrder + 10)}
                                className="inline-flex h-11 min-w-[44px] items-center justify-center rounded-2xl border border-[#24384f] bg-[#0a1222] px-4 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:bg-[#10233e]"
                                aria-label={`Move ${demo.title} later`}
                              >
                                ↓
                              </button>
                              <button
                                type="button"
                                onClick={() => handleToggleVisible(demo.id, demo.visible)}
                                className={`inline-flex h-11 items-center justify-center rounded-2xl border px-4 text-sm font-semibold transition ${demo.visible ? "border-[#2563eb] bg-[#0c1f3b] text-[#7dd3fc]" : "border-[#374151] bg-[#111827] text-[#9ca3af]"}`}
                              >
                                {demo.visible ? "Visible" : "Hidden"}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleToggleFeatured(demo.id, !!demo.featured)}
                                className={`inline-flex h-11 items-center justify-center gap-1.5 rounded-2xl border px-4 text-sm font-semibold transition ${
                                  demo.featured
                                    ? "border-[#463424] bg-[#2b1f16] text-[#f4a261]"
                                    : "border-[#374151] bg-[#111827] text-[#9ca3af] hover:border-[#463424] hover:text-[#c8b48a]"
                                }`}
                              >
                                <Star size={14} className={demo.featured ? "fill-[#f4a261]" : ""} />
                                {demo.featured ? "Featured" : "Feature on homepage"}
                              </button>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                type="button"
                                onClick={() => openEditDemo(demo)}
                                className="inline-flex h-11 items-center justify-center rounded-2xl border border-[#24384f] bg-[#0b1230] px-4 text-sm font-semibold text-[#cbd5e1] transition hover:border-[#60a5fa] hover:text-white"
                              >
                                <Edit2 size={16} /> Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(demo.id, demo.title)}
                                className="inline-flex h-11 items-center justify-center rounded-2xl border border-red-700 bg-red-950/20 px-4 text-sm font-semibold text-red-300 transition hover:bg-red-900/30 hover:text-red-100"
                              >
                                <Trash2 size={16} /> Delete
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 text-xs text-[#6b787e] leading-relaxed space-y-1">
                  <p>• Saves go to Supabase first; local backup strips base64 to avoid quota limits.</p>
                  <p>• Use Force Sync to push all demos to Supabase or recover after clearing local backup.</p>
                  <p>• Featured Work on the homepage is controlled by the Featured toggle + sort order above — no code edits needed.</p>
                  <p>• Export JSON / demos.ts always reads current table — safe even if localStorage is full.</p>
                </div>

                <div className="mt-6 text-xs text-[#6b787e]">
                  Support &amp; inquiries: <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#3ddbd9] hover:underline">{CONTACT_EMAIL}</a>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* ==================== EDIT / NEW MODAL — compact, scrollable (max 85vh), dense but usable, dark modern admin */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-3 sm:p-5 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.985, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.985, y: 6 }}
              transition={{ type: "spring", bounce: 0.01, duration: 0.18 }}
              className="w-full max-w-[640px] max-h-[85vh] flex flex-col my-3 sm:my-4 bg-[#0c1013] border border-[#1a2225] rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Subtle Header: "Create New Demo" title + close button */}
              <div className="flex items-center justify-between flex-shrink-0 px-5 py-3.5 border-b border-[#1a2225] bg-[#0a0c0f]">
                <div>
                  <div className="uppercase tracking-[1.6px] text-[10px] text-[#3ddbd9] font-medium">LIVE DEMOS</div>
                  <div className="text-[17px] font-semibold tracking-[-0.2px] leading-tight mt-0.5 text-[#e8e3d9]">
                    {editingId ? "Edit Demo" : "Create New Demo"}
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-[#8a9599] hover:text-white p-2 -mr-1 rounded-lg hover:bg-[#1a2225] transition"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable body — clean internal scroll, all fields accessible */}
              <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4">
                <form ref={formRef} onSubmit={handleSaveDemo} className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="label mb-1 block">Title *</label>
                    <input
                      value={form.title}
                      onChange={(e) => updateForm("title", e.target.value)}
                      className="input w-full text-[15px] py-2.5"
                      placeholder="Hickory Forge Steakhouse"
                      required
                    />
                    <p className="text-[10px] text-[#6b787e] mt-0.5">Card headline on homepage &amp; /work.</p>
                  </div>

                  {/* Slug + Badge (Category) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="label mb-1 block">Slug (unique) *</label>
                      <input
                        value={form.slug}
                        onChange={(e) => updateForm("slug", e.target.value)}
                        className="input w-full font-mono text-[13.5px] py-2"
                        placeholder="hickory-forge-steakhouse"
                        required
                      />
                      <p className="text-[10px] text-[#6b787e] mt-0.5">Auto-generated. Keep unique.</p>
                    </div>
                    <div>
                      <label className="label mb-1 block">Badge (Category) *</label>
                      {/*
                        Hybrid category input: users may type freely, but a datalist
                        provides common suggestions for quick selection. This keeps the
                        field fully accessible and mobile-friendly without shadcn/ui.
                      */}
                      <input
                        list="category-suggestions"
                        value={form.category}
                        onChange={(e) => updateForm("category", e.target.value)}
                        className="input w-full py-2 text-[14.5px]"
                        placeholder="e.g., Food Truck Tool, Restaurant, Fitness"
                        required
                      />
                      <datalist id="category-suggestions">
                        {categories.map((cat) => (
                          <option key={cat} value={cat} />
                        ))}
                      </datalist>
                      <p className="text-[10px] text-[#6b787e] mt-0.5">Small pill on the card (e.g. Food Truck).</p>
                    </div>
                  </div>

                  {/* Live URL / Link */}
                  <div>
                    <label className="label mb-1 block">Link (Live URL) *</label>
                    <input
                      value={form.href}
                      onChange={(e) => updateForm("href", e.target.value)}
                      className="input w-full font-mono text-[13.5px] py-2"
                      placeholder="https://your-demo.lovable.app"
                      required
                    />
                    <p className="text-[10px] text-[#6b787e] mt-0.5">Where “Open live site” goes.</p>
                  </div>

                  {/* Subtitle / Description */}
                  <div>
                    <label className="label mb-1 block">Subtitle / Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => updateForm("description", e.target.value)}
                      className="input w-full min-h-[68px] resize-y text-[14px] py-2"
                      placeholder="Warm steakhouse website with digital menu and reservations for Lake Cumberland visitors."
                    />
                    <p className="text-[10px] text-[#6b787e] mt-0.5">Short blurb under the title on the card.</p>
                  </div>

                  {/* Preview Image */}
                  <div>
                    <label className="label mb-1 block">Image (Preview Screenshot)</label>
                    <div
                      onClick={triggerFileSelect}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`group relative border-2 border-dashed rounded-xl p-4 sm:p-5 cursor-pointer transition-all min-h-[112px] flex flex-col items-center justify-center text-center
                        ${dragActive 
                          ? "border-[#3b82f6] bg-[#0a1320]" 
                          : "border-[#243530] hover:border-[#3b82f6]/70 hover:bg-[#0a0c0f]"}`}
                    >
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInputChange} className="hidden" />

                      {form.image ? (
                        <div className="relative mx-auto w-full max-w-[280px] h-[92px] overflow-hidden rounded-lg border border-[#1a2225]">
                        <Image
                          src={form.image}
                          alt="Demo preview"
                          fill
                          sizes="280px"
                          className="object-contain"
                          unoptimized
                          onError={() => {
                            console.warn("Demo preview image failed to load.");
                          }}
                        />
                        <button type="button" onClick={removeImage} className="mt-1.5 block text-[10px] text-red-400 hover:text-red-300">Remove current</button>
                      </div>
                      ) : (
                        <>
                          <div className="text-2xl mb-1 opacity-60">📷</div>
                          <div className="font-medium text-[13.5px]">Drop image or tap to upload</div>
                          <div className="text-[10px] text-[#6b787e] mt-0.5">JPG/PNG/WebP • &lt;2.5MB</div>
                          <div className="text-[9px] mt-1.5 px-2 py-px rounded bg-[#1f2528] text-[#8a9599]">Uploads to Supabase Storage</div>
                        </>
                      )}
                    </div>
                    <input
                      type="text"
                      value={form.image || ""}
                      onChange={(e) => updateForm("image", e.target.value)}
                      className="input w-full mt-1.5 text-[11px] font-mono py-1.5"
                      placeholder="Or enter /assets/demo-xxx.jpg or external URL"
                    />
                  </div>

                  {/* Sort Order + Visibility + Featured */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="label mb-1 block">Sort Order</label>
                      <input
                        type="number"
                        value={form.sortOrder}
                        onChange={(e) => updateForm("sortOrder", parseInt(e.target.value) || 0)}
                        className="input w-full py-2 text-center text-base tabular-nums"
                      />
                      <p className="text-[10px] text-[#6b787e] mt-0.5">Lower = earlier (featured + gallery)</p>
                    </div>
                    <div>
                      <label className="label mb-1 block">Visibility</label>
                      <label className="flex items-center gap-2.5 bg-[#0a0c0f] border border-[#1a2225] rounded-xl px-4 h-[42px] cursor-pointer text-[13.5px]">
                        <input type="checkbox" checked={form.visible} onChange={(e) => updateForm("visible", e.target.checked)} className="accent-[#3ddbd9] w-3.5 h-3.5" />
                        <span>Visible on site</span>
                      </label>
                    </div>
                    <div>
                      <label className="label mb-1 block">Homepage</label>
                      <label className="flex items-center gap-2.5 bg-[#1a140f] border border-[#463424] rounded-xl px-4 h-[42px] cursor-pointer text-[13.5px]">
                        <input
                          type="checkbox"
                          checked={!!form.featured}
                          onChange={(e) => updateForm("featured", e.target.checked)}
                          className="accent-[#f4a261] w-3.5 h-3.5"
                        />
                        <span className="text-[#f4a261]">Feature on homepage</span>
                      </label>
                    </div>
                  </div>

                  {formError && (
                    <div className="text-sm text-red-400 bg-[#1a0f0f] border border-red-900/40 rounded-lg px-3 py-2">
                      {formError}
                    </div>
                  )}
                </form>
              </div>

              {/* Actions footer — always visible */}
              <div className="flex-shrink-0 px-5 sm:px-6 py-3.5 border-t border-[#1a2225] bg-[#0a0c0f] flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-secondary px-5 py-2 text-sm w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => formRef.current?.requestSubmit()}
                  disabled={isSaving}
                  className="btn bg-[#3b82f6] hover:bg-[#2563eb] disabled:bg-[#3b82f6]/60 disabled:cursor-wait text-white font-semibold px-6 w-full sm:w-auto py-2 flex items-center justify-center gap-2 transition-all text-sm"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw size={15} className="animate-spin" />
                      {editingId ? "Saving..." : "Creating..."}
                    </>
                  ) : (
                    editingId ? "Save Changes" : "Create Demo"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================== EXPORT TO demos.ts MODAL — targeted addition, copyable code block */}
      <AnimatePresence>
        {showTsExportModal && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-3 sm:p-5 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.985, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.985, y: 6 }}
              transition={{ type: "spring", bounce: 0.01, duration: 0.18 }}
              className="w-full max-w-[860px] max-h-[88vh] flex flex-col my-3 sm:my-4 bg-[#0c1013] border border-[#1a2225] rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between flex-shrink-0 px-5 py-3.5 border-b border-[#1a2225] bg-[#0a0c0f]">
                <div className="flex items-center gap-2.5">
                  <Code2 size={18} className="text-[#3ddbd9]" />
                  <div>
                    <div className="uppercase tracking-[1.6px] text-[10px] text-[#3ddbd9] font-medium">PERSIST WITHOUT QUOTA</div>
                    <div className="text-[17px] font-semibold tracking-[-0.2px] leading-tight mt-0.5 text-[#e8e3d9]">
                      Export to demos.ts
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeTsExportModal}
                  className="text-[#8a9599] hover:text-white p-2 -mr-1 rounded-lg hover:bg-[#1a2225] transition"
                  aria-label="Close export modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Instructions + Code Block */}
              <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-4 text-[14px]">
                <div className="text-[#9aa6ad] leading-relaxed">
                  This generates the exact <span className="font-mono text-[#c8b48a]">DEFAULT_DEMOS</span> array used by the public site.
                  Public pages (<code>/</code> and <code>/work</code>) read from the hardcoded array in <span className="font-mono">lib/demos.ts</span> via <span className="font-mono">getPublicDemos()</span> — no localStorage, unlimited demos.
                  (Admin now also writes to Supabase; this export is for source-controlled / no-Supabase deploys.)
                </div>

                <div className="bg-[#0a0c0f] border border-[#243530] rounded-xl p-4 text-[13px] leading-snug text-[#a8b5bb]">
                  <strong className="text-[#e8e3d9]">Steps to publish changes permanently:</strong>
                  <ol className="list-decimal ml-5 mt-2 space-y-1">
                    <li>Click <strong>Copy code</strong> below.</li>
                    <li>Open <span className="font-mono">lib/demos.ts</span> in your editor.</li>
                    <li>Replace the <span className="font-mono">const DEFAULT_DEMOS: Demo[] = [ ... ];</span> block with the copied code.</li>
                    <li>If any <span className="font-mono">image</span> fields contain long base64 strings, replace them with <span className="font-mono">{"\"/assets/demo-xxx.jpg\""}</span> (add real, locally-authentic photos to <span className="font-mono">public/assets/</span>).</li>
                    <li>Save → commit → deploy. Done. The Admin localStorage is kept for convenience but public always uses the source file.</li>
                  </ol>
                </div>

                {/* Copyable code block */}
                <div>
                  <div className="flex items-center justify-between mb-1.5 px-1">
                    <div className="text-[11px] uppercase tracking-[1.5px] text-[#6b787e]">Ready-to-paste TypeScript</div>
                    <button
                      onClick={copyTsCode}
                      className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg border transition ${copySuccess ? "bg-[#0f2a1f] border-[#1f5a42] text-[#3ddbd9]" : "border-[#243530] hover:bg-[#111518] text-[#9aa6ad] hover:text-white"}`}
                    >
                      <Copy size={13} /> {copySuccess ? "Copied!" : "Copy code"}
                    </button>
                  </div>
                  <pre className="bg-[#050708] border border-[#1a2225] rounded-xl p-4 overflow-auto text-[12.5px] leading-[1.45] font-mono text-[#c8c2b4] max-h-[46vh] whitespace-pre">
{tsExportCode || "No code generated."}
                  </pre>
                  <p className="mt-2 text-[11px] text-[#6b787e] px-1">
                    The output matches the exact object shape, key order, and style in lib/demos.ts. Keep your existing commented example templates below the array if desired.
                  </p>
                </div>
              </div>

              {/* Footer actions */}
              <div className="flex-shrink-0 px-5 sm:px-6 py-3.5 border-t border-[#1a2225] bg-[#0a0c0f] flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={closeTsExportModal}
                  className="btn btn-secondary px-5 py-2 text-sm w-full sm:w-auto"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={copyTsCode}
                  className="btn bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold px-6 w-full sm:w-auto py-2 flex items-center justify-center gap-2 text-sm"
                >
                  <Copy size={15} /> {copySuccess ? "Copied to clipboard" : "Copy code to clipboard"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
