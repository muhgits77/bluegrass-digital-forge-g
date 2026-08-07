"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Plus, Edit2, Trash2, Save, RefreshCw, Download, Upload, 
  Lock, X, Copy, Code2, Cloud, CloudOff, AlertTriangle, Star,
  GripVertical, ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdminAnalytics from "@/components/AdminAnalytics";
import {
  getDemos, getDemosWithMeta, addDemo, updateDemo, deleteDemo, resetToDefaults,
  generateUniqueSlug, generateDemosTsCode, Demo, DemoDataSource,
  uploadDemoImage, dispatchDemosPublished, forceSyncToSupabase,
  getSupabaseStatus, getLocalStorageStatus, FEATURED_HOMEPAGE_LIMIT,
  normalizeDemos,
  loadHomepageFeaturedSlugs,
  saveHomepageFeaturedOrder,
  normalizeFeaturedSlugs,
  applyFeaturedSlugsToDemos,
} from "@/lib/demos";
import type { SupabaseConnectionStatus } from "@/lib/supabase";
import { supabase, publicSupabaseUrl } from "@/lib/supabase";
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
// - Homepage Featured Work order lives in forge_settings (drag-and-drop, max 6)
// - SEO-focused edit modal: title counter, large description, image alt
// - Graceful fallback to localStorage/IndexedDB on Supabase failure
// - "Export to demos.ts" still works for baking into DEFAULT_DEMOS
// - Public pages hydrate from Supabase so featured + SEO + href edits go live instantly
// - Every "View live demo" link on the public site uses forge_demos.href (admin is source of truth)
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
  imageAlt: "",
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
  const [diagCopied, setDiagCopied] = useState(false);

  const authBusy = isLoggingIn || isSendingMagicLink || isSendingReset;
  const diagSupabaseUrl = publicSupabaseUrl || "NOT CONFIGURED";
  const diagClientReady = supabase != null;

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

  // Homepage Featured Work — ordered slugs are the live source of truth (max 6)
  const [featuredSlugs, setFeaturedSlugs] = useState<string[]>([]);
  const [savedFeaturedSlugs, setSavedFeaturedSlugs] = useState<string[]>([]);
  const [isSavingFeatured, setIsSavingFeatured] = useState(false);
  const [dragFeaturedIndex, setDragFeaturedIndex] = useState<number | null>(null);
  const [dragOverFeaturedIndex, setDragOverFeaturedIndex] = useState<number | null>(null);
  // When adding a 7th featured item, pick which slot to replace
  const [replacePickerForSlug, setReplacePickerForSlug] = useState<string | null>(null);
  // Track original slug while editing (warn if changed — breaks landings / links)
  const [editingOriginalSlug, setEditingOriginalSlug] = useState("");

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
    const sorted = [...result.demos].sort((a, b) => a.sortOrder - b.sortOrder);
    setDemos(sorted);
    setDataSource(result.source);

    // Load ordered featured slugs (Supabase settings → derive → DEFAULT_FEATURED_SLUGS)
    try {
      const slugs = await loadHomepageFeaturedSlugs(sorted);
      setFeaturedSlugs(slugs);
      setSavedFeaturedSlugs(slugs);
      // Keep featured flags in UI in sync with the ordered list
      setDemos(applyFeaturedSlugsToDemos(sorted, slugs));
    } catch {
      /* ignore — derive from flags already on demos */
    }

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
    setEditingOriginalSlug("");
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

  // Open edit modal (SEO-focused fields)
  function openEditDemo(demo: Demo) {
    setEditingId(demo.id);
    setEditingOriginalSlug(demo.slug);
    setForm({
      title: demo.title,
      slug: demo.slug,
      category: demo.category,
      href: demo.href,
      description: demo.description,
      image: demo.image || "",
      imageAlt: demo.imageAlt || "",
      sortOrder: demo.sortOrder,
      visible: demo.visible,
      featured: featuredSlugs.includes(demo.slug.toLowerCase()),
    });
    setFormError("");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingId(null);
    setEditingOriginalSlug("");
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
      // Keep featured flags aligned with ordered slug list (source of truth)
      const willBeFeatured = featuredSlugs.includes(trimmedSlug.toLowerCase())
        || (!!form.featured && featuredSlugs.length < FEATURED_HOMEPAGE_LIMIT);

      const demoData: Omit<Demo, "id"> = {
        title: form.title.trim(),
        slug: trimmedSlug,
        category: form.category.trim(),
        href: form.href.trim().replace(/\/$/, ""), // trim trailing slash for cleanliness
        description: (form.description || "").trim(),
        // Image can be: Supabase Storage public URL (preferred), /assets/ path, or base64 (fallback only)
        // We pass through exactly what handleImageUpload or the URL field provided.
        image: form.image?.trim() || undefined,
        imageAlt: (form.imageAlt || "").trim() || undefined,
        sortOrder: Number(form.sortOrder) || 99,
        visible: !!form.visible,
        featured: willBeFeatured || featuredSlugs.includes(trimmedSlug.toLowerCase()),
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

      // If slug changed while featured, keep ordered list in sync
      if (editingId && editingOriginalSlug) {
        const oldSlug = editingOriginalSlug.toLowerCase();
        const newSlug = trimmedSlug.toLowerCase();
        if (oldSlug !== newSlug && featuredSlugs.includes(oldSlug)) {
          setFeaturedSlugs((prev) =>
            normalizeFeaturedSlugs(prev.map((s) => (s === oldSlug ? newSlug : s)))
          );
          setSavedFeaturedSlugs((prev) =>
            normalizeFeaturedSlugs(prev.map((s) => (s === oldSlug ? newSlug : s)))
          );
        }
      }

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

  const featuredDirty =
    featuredSlugs.join("|") !== savedFeaturedSlugs.join("|");

  /** Resolve demos for the current featured slug order (visual Featured Work grid). */
  function demosForFeaturedSlugs(slugs: string[]): Demo[] {
    const bySlug = new Map(demos.map((d) => [d.slug.toLowerCase(), d]));
    return slugs
      .map((s) => bySlug.get(s.toLowerCase()))
      .filter((d): d is Demo => Boolean(d));
  }

  /** Featured rank badge: 1–6 or null if not featured. */
  function featuredRankForSlug(slug: string): number | null {
    const idx = featuredSlugs.findIndex((s) => s === slug.toLowerCase());
    return idx >= 0 ? idx + 1 : null;
  }

  /**
   * Add / remove a demo from the featured order draft.
   * At 6/6, opens the replace picker instead of silently overflowing.
   */
  function requestToggleFeatured(demo: Demo) {
    const slug = demo.slug.toLowerCase();
    const isFeatured = featuredSlugs.includes(slug);

    if (isFeatured) {
      const next = featuredSlugs.filter((s) => s !== slug);
      setFeaturedSlugs(next);
      setDemos((prev) => applyFeaturedSlugsToDemos(prev, next));
      return;
    }

    if (featuredSlugs.length >= FEATURED_HOMEPAGE_LIMIT) {
      setReplacePickerForSlug(slug);
      return;
    }

    const next = normalizeFeaturedSlugs([...featuredSlugs, slug]);
    setFeaturedSlugs(next);
    setDemos((prev) => applyFeaturedSlugsToDemos(prev, next));
  }

  /** Replace a specific featured slot with a new demo slug (from the full-slots picker). */
  function replaceFeaturedSlot(outgoingSlug: string, incomingSlug: string) {
    const next = featuredSlugs.map((s) =>
      s === outgoingSlug.toLowerCase() ? incomingSlug.toLowerCase() : s
    );
    const cleaned = normalizeFeaturedSlugs(next);
    setFeaturedSlugs(cleaned);
    setDemos((prev) => applyFeaturedSlugsToDemos(prev, cleaned));
    setReplacePickerForSlug(null);
    showSuccessToast(
      `Replaced slot with new demo — click “Save Featured Order” to publish.`
    );
  }

  /** One-click publish of homepage Featured Work order to Supabase. */
  async function handleSaveFeaturedOrder() {
    if (isSavingFeatured) return;
    setIsSavingFeatured(true);
    try {
      const result = await saveHomepageFeaturedOrder(featuredSlugs, demos);
      setDemos(result.demos.sort((a, b) => a.sortOrder - b.sortOrder));
      setFeaturedSlugs(result.orderedSlugs);
      setSavedFeaturedSlugs(result.orderedSlugs);
      void refreshStatus();

      if (result.supabaseOk) {
        showSuccessToast(
          `Homepage Featured Work saved (${result.orderedSlugs.length}/${FEATURED_HOMEPAGE_LIMIT}). Live on public site.`
        );
      } else {
        showErrorToast(result.error ?? "Could not save featured order.");
        if (result.warning) showWarningToast(result.warning);
      }
    } catch (err) {
      showErrorToast(err instanceof Error ? err.message : "Save featured order failed.");
    } finally {
      setIsSavingFeatured(false);
    }
  }

  async function handleSortOrderChange(id: string, newOrder: number) {
    const result = await updateDemo(id, { sortOrder: newOrder });
    applyOperationResult(result, "Sort order updated.");
  }

  // ---- Featured Work drag-and-drop (HTML5, no extra dependency) ----
  function onFeaturedDragStart(index: number) {
    setDragFeaturedIndex(index);
  }

  function onFeaturedDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    setDragOverFeaturedIndex(index);
  }

  function onFeaturedDrop(index: number) {
    if (dragFeaturedIndex == null || dragFeaturedIndex === index) {
      setDragFeaturedIndex(null);
      setDragOverFeaturedIndex(null);
      return;
    }
    const next = [...featuredSlugs];
    const [moved] = next.splice(dragFeaturedIndex, 1);
    next.splice(index, 0, moved);
    setFeaturedSlugs(normalizeFeaturedSlugs(next));
    setDragFeaturedIndex(null);
    setDragOverFeaturedIndex(null);
  }

  function onFeaturedDragEnd() {
    setDragFeaturedIndex(null);
    setDragOverFeaturedIndex(null);
  }

  function moveFeaturedByArrow(index: number, direction: "up" | "down") {
    const swapIdx = direction === "up" ? index - 1 : index + 1;
    if (swapIdx < 0 || swapIdx >= featuredSlugs.length) return;
    const next = [...featuredSlugs];
    [next[index], next[swapIdx]] = [next[swapIdx], next[index]];
    setFeaturedSlugs(next);
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

  /** Homepage Featured Work queue — ordered by featuredSlugs (source of truth). */
  const featuredDemos = demosForFeaturedSlugs(featuredSlugs);
  const featuredOnHomepage = featuredDemos.slice(0, FEATURED_HOMEPAGE_LIMIT);
  const titleCharCount = (form.title || "").length;
  const descCharCount = (form.description || "").length;
  const altCharCount = (form.imageAlt || "").length;
  const slugChanged =
    Boolean(editingId) &&
    Boolean(editingOriginalSlug) &&
    form.slug.trim().toLowerCase() !== editingOriginalSlug.toLowerCase();

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

              {/* TEMP diagnostic: which Supabase project this build is wired to */}
              <div className="mt-5 pt-4 border-t border-[#1a2225]/80 text-[11px] text-[#6b787e] space-y-1.5">
                <div className="flex flex-wrap items-start gap-x-2 gap-y-1">
                  <span className="shrink-0 text-[#6b787e]">Supabase URL:</span>
                  <span className="break-all text-[#8a9599] font-mono">
                    {diagSupabaseUrl}
                  </span>
                  {publicSupabaseUrl ? (
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(publicSupabaseUrl);
                          setDiagCopied(true);
                          setTimeout(() => setDiagCopied(false), 2000);
                        } catch {
                          /* ignore clipboard failures */
                        }
                      }}
                      className="shrink-0 text-[#6b787e] hover:text-[#9aa6ad] underline-offset-2 hover:underline transition"
                    >
                      {diagCopied ? "Copied" : "Copy URL"}
                    </button>
                  ) : null}
                </div>
                <div>
                  <span className="text-[#6b787e]">Client ready: </span>
                  <span className={diagClientReady ? "text-[#8a9599]" : "text-red-400/80"}>
                    {diagClientReady ? "Yes" : "No"}
                  </span>
                </div>
              </div>
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

                {/* ==================== FEATURED WORK (HOMEPAGE) — drag-and-drop order, exactly 6 ==================== */}
                <section className="mb-10 rounded-[28px] border border-[#3a2a1a] bg-gradient-to-b from-[#12100c] to-[#0a0c0f] p-5 sm:p-6 shadow-[0_24px_60px_-40px_rgba(193,122,90,0.35)]">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-5">
                    <div>
                      <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[2px] font-semibold text-[#f4a261] mb-1.5">
                        <Star size={13} className="fill-[#f4a261]" /> Featured Work · Homepage
                      </div>
                      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                        Homepage Featured Work
                      </h2>
                      <p className="mt-1.5 text-[14px] text-[#9aa6ad] max-w-2xl leading-relaxed">
                        Exactly <strong className="text-[#e8e3d9] font-medium">{FEATURED_HOMEPAGE_LIMIT}</strong> cards on the
                        public homepage. Drag to reorder — this list is the live source of truth (saved to Supabase).
                        Click <strong className="text-[#e8e3d9] font-medium">Save Featured Order</strong> to publish.
                      </p>
                      <p className="mt-1.5 text-[12.5px] text-[#6b787e]">
                        Slots filled:{" "}
                        <span className={featuredOnHomepage.length === FEATURED_HOMEPAGE_LIMIT ? "text-[#34d399]" : "text-amber-400"}>
                          {featuredOnHomepage.length}/{FEATURED_HOMEPAGE_LIMIT}
                        </span>
                        {featuredDirty && (
                          <span className="ml-2 text-amber-400">· Unsaved changes</span>
                        )}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <a
                        href="/#featured-work"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#f4a261] hover:text-[#ffd6b8] border border-[#463424] rounded-xl px-4 py-2.5 bg-[#1a140f] transition"
                      >
                        <ExternalLink size={14} /> Preview Homepage
                      </a>
                      <button
                        type="button"
                        onClick={handleSaveFeaturedOrder}
                        disabled={isSavingFeatured || !featuredDirty}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#f4a261] hover:bg-[#e8944f] disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2.5 text-[13.5px] font-semibold text-[#1a1008] transition"
                      >
                        <Save size={15} className={isSavingFeatured ? "animate-pulse" : ""} />
                        {isSavingFeatured ? "Saving…" : "Save Featured Order"}
                      </button>
                    </div>
                  </div>

                  {featuredDemos.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[#463424] bg-[#0c1013]/80 px-5 py-8 text-center text-[14px] text-[#9aa6ad]">
                      No featured demos yet. Use{" "}
                      <span className="text-[#f4a261] font-medium">Add to Featured</span> on any demo below
                      (max {FEATURED_HOMEPAGE_LIMIT}), then save.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {featuredDemos.map((demo, index) => (
                        <article
                          key={demo.id}
                          draggable
                          onDragStart={() => onFeaturedDragStart(index)}
                          onDragOver={(e) => onFeaturedDragOver(e, index)}
                          onDrop={() => onFeaturedDrop(index)}
                          onDragEnd={onFeaturedDragEnd}
                          className={`rounded-2xl border p-3 sm:p-3.5 transition cursor-grab active:cursor-grabbing ${
                            dragOverFeaturedIndex === index
                              ? "border-[#f4a261] bg-[#1a140f] ring-1 ring-[#f4a261]/40"
                              : dragFeaturedIndex === index
                              ? "border-[#463424] bg-[#0a0c0f] opacity-60"
                              : "border-[#463424] bg-[#0f1210] hover:border-[#6b4a2e]"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                            <div className="flex items-center gap-2.5 min-w-0 flex-1">
                              <div
                                className="flex h-9 w-7 shrink-0 items-center justify-center text-[#6b787e]"
                                title="Drag to reorder"
                                aria-hidden
                              >
                                <GripVertical size={18} />
                              </div>
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold tabular-nums bg-[#2b1f16] text-[#f4a261] border border-[#463424]">
                                {index + 1}
                              </div>
                              <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-xl bg-[#0b1320] ring-1 ring-[#243530]">
                                {demo.image ? (
                                  <Image
                                    src={demo.image}
                                    alt={demo.imageAlt || demo.title}
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
                                  <span className="rounded-full border border-[#463424] bg-[#2b1f16] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#f4a261]">
                                    Featured #{index + 1}
                                  </span>
                                  <span className="rounded-full bg-[#1f345c] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#7dd3fc]">
                                    {demo.category || "Badge"}
                                  </span>
                                </div>
                                <h3 className="text-[15px] sm:text-base font-semibold text-white truncate">{demo.title}</h3>
                                <p className="text-[12.5px] text-[#8a9599] line-clamp-1 mt-0.5">
                                  {demo.description || "No description — Edit for SEO."}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 sm:justify-end shrink-0 pl-9 sm:pl-0">
                              <button
                                type="button"
                                onClick={() => moveFeaturedByArrow(index, "up")}
                                disabled={index === 0}
                                className="inline-flex h-10 min-w-[40px] items-center justify-center rounded-xl border border-[#463424] bg-[#1a140f] px-3 text-sm font-semibold text-[#f4a261] transition hover:bg-[#2b1f16] disabled:opacity-30 disabled:cursor-not-allowed"
                                aria-label={`Move ${demo.title} earlier on homepage`}
                              >
                                ↑
                              </button>
                              <button
                                type="button"
                                onClick={() => moveFeaturedByArrow(index, "down")}
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
                                <Edit2 size={14} /> SEO Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => requestToggleFeatured(demo)}
                                className="inline-flex h-10 items-center justify-center rounded-xl border border-[#463424] bg-[#1a140f] px-3.5 text-sm font-semibold text-[#c8b48a] transition hover:bg-[#2b1f16]"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}

                  {/* Visual preview grid (thumbnails) */}
                  {featuredDemos.length > 0 && (
                    <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                      {Array.from({ length: FEATURED_HOMEPAGE_LIMIT }).map((_, i) => {
                        const demo = featuredDemos[i];
                        return (
                          <div
                            key={i}
                            className={`rounded-xl border overflow-hidden aspect-[4/3] relative ${
                              demo ? "border-[#463424] bg-[#0a0c0f]" : "border-dashed border-[#2a2220] bg-[#080a0c]"
                            }`}
                          >
                            {demo?.image ? (
                              <Image
                                src={demo.image}
                                alt={demo.imageAlt || demo.title}
                                fill
                                sizes="120px"
                                className="object-cover object-top"
                                unoptimized
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-[10px] text-[#4b5563]">
                                {demo ? demo.title.slice(0, 18) : `Empty #${i + 1}`}
                              </div>
                            )}
                            <div className="absolute top-1 left-1 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-bold text-[#f4a261]">
                              #{i + 1}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <p className="mt-4 text-[12px] text-[#6b787e] leading-relaxed">
                    Tip: Use <span className="text-[#c8b48a]">Add to Featured</span> on any demo below. At 6/6 you&apos;ll
                    choose which card to replace. Drag to set homepage order, then{" "}
                    <span className="text-[#f4a261]">Save Featured Order</span>.
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
                                  {(() => {
                                    const rank = featuredRankForSlug(demo.slug);
                                    return rank != null ? (
                                      <span className="inline-flex items-center gap-1 rounded-full border border-[#463424] bg-[#2b1f16] px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-[#f4a261]">
                                        <Star size={10} className="fill-[#f4a261]" /> Featured #{rank}
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 rounded-full border border-[#2a3035] bg-[#0f1214] px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-[#6b787e]">
                                        Not featured
                                      </span>
                                    );
                                  })()}
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
                                onClick={() => requestToggleFeatured(demo)}
                                className={`inline-flex h-11 items-center justify-center gap-1.5 rounded-2xl border px-4 text-sm font-semibold transition ${
                                  featuredRankForSlug(demo.slug) != null
                                    ? "border-[#463424] bg-[#2b1f16] text-[#f4a261]"
                                    : "border-[#374151] bg-[#111827] text-[#9ca3af] hover:border-[#463424] hover:text-[#c8b48a]"
                                }`}
                              >
                                <Star size={14} className={featuredRankForSlug(demo.slug) != null ? "fill-[#f4a261]" : ""} />
                                {featuredRankForSlug(demo.slug) != null
                                  ? `Featured #${featuredRankForSlug(demo.slug)}`
                                  : "Add to Featured"}
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
                  <p>• Homepage Featured Work order is drag-and-drop above → Save Featured Order (Supabase forge_settings).</p>
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
              {/* SEO-focused header */}
              <div className="flex items-center justify-between flex-shrink-0 px-5 py-3.5 border-b border-[#1a2225] bg-[#0a0c0f]">
                <div>
                  <div className="uppercase tracking-[1.6px] text-[10px] text-[#3ddbd9] font-medium">
                    {editingId ? "SEO + CARD FIELDS" : "NEW DEMO"}
                  </div>
                  <div className="text-[17px] font-semibold tracking-[-0.2px] leading-tight mt-0.5 text-[#e8e3d9]">
                    {editingId ? "Edit Demo — SEO Ready" : "Create New Demo"}
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

              {/* Scrollable body — optimized for pasting Grok SEO Expert drafts */}
              <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4">
                <form ref={formRef} onSubmit={handleSaveDemo} className="space-y-4">
                  <p className="text-[12px] text-[#6b787e] leading-relaxed rounded-xl border border-[#1a2225] bg-[#080a0c] px-3 py-2">
                    Paste improved title, description, and image alt from your SEO Expert. Local keywords
                    (Lake Cumberland, Monticello, Wayne County) help rankings.
                  </p>

                  {/* Title + character guidance */}
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <label className="label block" htmlFor="demo-title">Title *</label>
                      <span
                        className={`text-[11px] tabular-nums ${
                          titleCharCount > 70
                            ? "text-amber-400"
                            : titleCharCount >= 20
                            ? "text-[#6b787e]"
                            : "text-[#4b5563]"
                        }`}
                      >
                        {titleCharCount} chars · aim ~40–60
                      </span>
                    </div>
                    <input
                      id="demo-title"
                      value={form.title}
                      onChange={(e) => updateForm("title", e.target.value)}
                      className="input w-full text-[15px] py-2.5"
                      placeholder="Hickory Forge Steakhouse"
                      required
                    />
                    <p className="text-[10px] text-[#6b787e] mt-0.5">Card headline on homepage &amp; /work. Keep scannable and local.</p>
                  </div>

                  {/* Description — large for SEO paste */}
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <label className="label block" htmlFor="demo-description">
                        Description (card text) *
                      </label>
                      <span
                        className={`text-[11px] tabular-nums ${
                          descCharCount > 220
                            ? "text-amber-400"
                            : descCharCount >= 80
                            ? "text-[#6b787e]"
                            : "text-[#4b5563]"
                        }`}
                      >
                        {descCharCount} chars · aim ~100–180
                      </span>
                    </div>
                    <textarea
                      id="demo-description"
                      value={form.description}
                      onChange={(e) => updateForm("description", e.target.value)}
                      rows={7}
                      className="input w-full min-h-[160px] resize-y text-[14.5px] leading-relaxed py-3"
                      placeholder="Warm steakhouse website for Lake Cumberland restaurants — digital menu, reservations, and a bourbon-country feel. Portfolio example built in Monticello KY."
                    />
                    <p className="text-[10px] text-[#6b787e] mt-0.5">
                      Full text on public cards (no clamp). Great place for local SEO phrases.
                    </p>
                  </div>

                  {/* Image Alt — critical for image SEO */}
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <label className="label block" htmlFor="demo-image-alt">
                        Image Alt Text (SEO) *
                      </label>
                      <span
                        className={`text-[11px] tabular-nums ${
                          altCharCount > 125
                            ? "text-amber-400"
                            : altCharCount >= 40
                            ? "text-[#6b787e]"
                            : "text-[#4b5563]"
                        }`}
                      >
                        {altCharCount} chars · aim ~60–120
                      </span>
                    </div>
                    <textarea
                      id="demo-image-alt"
                      value={form.imageAlt || ""}
                      onChange={(e) => updateForm("imageAlt", e.target.value)}
                      rows={3}
                      className="input w-full min-h-[72px] resize-y text-[14px] leading-relaxed py-2.5"
                      placeholder="Steakhouse website demo for Lake Cumberland restaurants with digital menu and reservations"
                    />
                    <p className="text-[10px] text-[#6b787e] mt-0.5">
                      Pattern: [Business type] website demo for [location] — [key feature]. Critical for image SEO.
                    </p>
                  </div>

                  {/* Slug + Badge */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="label mb-1 block" htmlFor="demo-slug">Slug (unique) *</label>
                      <input
                        id="demo-slug"
                        value={form.slug}
                        onChange={(e) => updateForm("slug", e.target.value)}
                        className="input w-full font-mono text-[13.5px] py-2"
                        placeholder="hickory-forge-steakhouse"
                        required
                      />
                      {slugChanged ? (
                        <p className="text-[11px] text-amber-400 mt-1 leading-snug">
                          Changing the slug may break portfolio landings (/work/{editingOriginalSlug}) and featured order. Update carefully.
                        </p>
                      ) : (
                        <p className="text-[10px] text-[#6b787e] mt-0.5">URL key · keep stable once live.</p>
                      )}
                    </div>
                    <div>
                      <label className="label mb-1 block" htmlFor="demo-category">Badge (Category) *</label>
                      <input
                        id="demo-category"
                        list="category-suggestions"
                        value={form.category}
                        onChange={(e) => updateForm("category", e.target.value)}
                        className="input w-full py-2 text-[14.5px]"
                        placeholder="e.g., Food Truck, Restaurant, Fitness"
                        required
                      />
                      <datalist id="category-suggestions">
                        {categories.map((cat) => (
                          <option key={cat} value={cat} />
                        ))}
                      </datalist>
                      <p className="text-[10px] text-[#6b787e] mt-0.5">Small pill on the card.</p>
                    </div>
                  </div>

                  {/* Live URL */}
                  <div>
                    <label className="label mb-1 block" htmlFor="demo-href">Live URL *</label>
                    <input
                      id="demo-href"
                      value={form.href}
                      onChange={(e) => updateForm("href", e.target.value)}
                      className="input w-full font-mono text-[13.5px] py-2"
                      placeholder="https://your-demo.lovable.app"
                      required
                    />
                    <p className="text-[10px] text-[#6b787e] mt-0.5">Where “Open live site” goes.</p>
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
                          alt={form.imageAlt || "Demo preview"}
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
                          <div className="text-[10px] text-[#6b787e] mt-0.5">JPG/PNG/WebP • &lt;2.5MB · authentic KY imagery only</div>
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

                  {/* Sort Order + Visibility */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="label mb-1 block">Gallery Sort Order</label>
                      <input
                        type="number"
                        value={form.sortOrder}
                        onChange={(e) => updateForm("sortOrder", parseInt(e.target.value) || 0)}
                        className="input w-full py-2 text-center text-base tabular-nums"
                      />
                      <p className="text-[10px] text-[#6b787e] mt-0.5">/work gallery order (not homepage featured).</p>
                    </div>
                    <div>
                      <label className="label mb-1 block">Visibility</label>
                      <label className="flex items-center gap-2.5 bg-[#0a0c0f] border border-[#1a2225] rounded-xl px-4 h-[42px] cursor-pointer text-[13.5px]">
                        <input type="checkbox" checked={form.visible} onChange={(e) => updateForm("visible", e.target.checked)} className="accent-[#3ddbd9] w-3.5 h-3.5" />
                        <span>Visible on site</span>
                      </label>
                      <p className="text-[10px] text-[#6b787e] mt-0.5">
                        Homepage featuring is managed in Featured Work above.
                      </p>
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

      {/* ==================== REPLACE FEATURED SLOT (when already 6/6) ==================== */}
      <AnimatePresence>
        {replacePickerForSlug && (
          <div className="fixed inset-0 z-[75] flex items-center justify-center bg-black/80 p-3 sm:p-5 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.985, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.985 }}
              className="w-full max-w-md bg-[#0c1013] border border-[#463424] rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="px-5 py-4 border-b border-[#1a2225]">
                <div className="uppercase tracking-[1.6px] text-[10px] text-[#f4a261] font-medium">
                  Featured slots full · {FEATURED_HOMEPAGE_LIMIT}/{FEATURED_HOMEPAGE_LIMIT}
                </div>
                <h3 className="text-lg font-semibold text-white mt-1">
                  Choose which card to replace
                </h3>
                <p className="text-[13px] text-[#9aa6ad] mt-1.5 leading-relaxed">
                  Adding{" "}
                  <span className="text-[#e8e3d9] font-medium">
                    {demos.find((d) => d.slug.toLowerCase() === replacePickerForSlug)?.title ||
                      replacePickerForSlug}
                  </span>
                  . Pick the homepage slot to swap out, then save featured order.
                </p>
              </div>
              <div className="px-3 py-3 space-y-1.5 max-h-[50vh] overflow-y-auto">
                {featuredDemos.map((demo, index) => (
                  <button
                    key={demo.id}
                    type="button"
                    onClick={() => replaceFeaturedSlot(demo.slug, replacePickerForSlug)}
                    className="w-full flex items-center gap-3 rounded-xl border border-[#1a2225] hover:border-[#f4a261]/50 bg-[#0a0c0f] hover:bg-[#1a140f] px-3 py-2.5 text-left transition"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#2b1f16] text-[#f4a261] text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14px] font-medium text-white truncate">
                        {demo.title}
                      </span>
                      <span className="block text-[11px] text-[#6b787e] truncate">
                        {demo.category}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-[#1a2225] flex justify-end">
                <button
                  type="button"
                  onClick={() => setReplacePickerForSlug(null)}
                  className="btn btn-secondary px-5 py-2 text-sm"
                >
                  Cancel
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
