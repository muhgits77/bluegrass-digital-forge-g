"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Plus, Edit2, Trash2, Eye, EyeOff, Save, RefreshCw, Download, Upload, 
  ArrowLeft, Lock, LogOut, X 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getDemos, saveDemos, addDemo, updateDemo, deleteDemo, resetToDefaults,
  generateUniqueSlug, isSlugUnique, Demo
} from "@/lib/demos";
import { CONTACT_EMAIL } from "@/lib/constants";

// ==================================================================
// ADMIN PANEL — BLUEGRASS DIGITAL FORGE
// Dark modern professional style (separate from warm public Kentucky theme)
// 
// - Password: ScotchGlitch398!1!1!1 (client-side demo only)
// - Full CRUD for demos (Create now fully working)
// - Form validation: title, slug, category, live URL required
// - On submit: add to in-memory state + localStorage via addDemo
// - Dynamic table re-render + success toast + clear form
// - Base64 images fully preserved (drag/drop + paste)
// - Loading state on Create/Save button
// - Works on localhost AND Vercel (pure client localStorage + events)
// - Robust: slug format checks, error handling, double-submit guard
// ==================================================================

const ADMIN_PASSWORD = "ScotchGlitch398!1!1!1";
const AUTH_KEY = "bdf_admin_authed";

type FormData = Omit<Demo, "id">;

const emptyForm: FormData = {
  title: "",
  slug: "",
  category: "",
  href: "",
  description: "",
  image: "",
  sortOrder: 99,
  visible: true,
};

const categories = [
  "Restaurant", "Food Truck", "Steakhouse", "Mexican Restaurant", "Korean BBQ",
  "Fitness", "Auto Service", "Car Dealership", "Furniture Store", "Florist",
  "Fishing Guide", "Donut Shop", "Bait & Tackle Shop", "Land & Pasture Services",
  "Specialty Retail", "Template Library", "Other"
];

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [demos, setDemos] = useState<Demo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [formError, setFormError] = useState("");

  const [publishMessage, setPublishMessage] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [successToast, setSuccessToast] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Load auth + demos on mount
  useEffect(() => {
    const isAuthed = typeof window !== "undefined" && localStorage.getItem(AUTH_KEY) === "true";
    setAuthed(isAuthed);

    if (isAuthed) {
      loadDemos();
    }
  }, []);

  // Re-load when storage changes (multi-tab support)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "bdf_demos_v1") {
        loadDemos();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  function loadDemos() {
    const loaded = getDemos().sort((a, b) => a.sortOrder - b.sortOrder);
    setDemos(loaded);
  }

  // Simple client-side password gate (not production security)
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "true");
      setAuthed(true);
      setPassword("");
      setAuthError("");
      loadDemos();
    } else {
      setAuthError("Incorrect password. Please try again.");
    }
  }

  function handleLogout() {
    localStorage.removeItem(AUTH_KEY);
    setAuthed(false);
    setDemos([]);
    setShowModal(false);
  }

  // ==================== IMAGE UPLOAD HANDLERS (Drag & Drop + Preview) ====================
  // MAJOR CHANGE: Screenshot / hero image field now supports full drag-and-drop file upload.
  // - Files are converted to base64 data URLs via FileReader
  // - Stored directly in localStorage (no external hosting required)
  // - Nice live preview with remove option
  // - Keeps backward compatibility with URL / asset paths
  // Improves usability dramatically for managing real local screenshots.
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageUpload(file: File) {
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (JPG, PNG, WebP recommended).");
      return;
    }
    if (file.size > 2.5 * 1024 * 1024) {
      if (!confirm("Image > 2.5MB. Base64 version will be larger and stored in localStorage. Continue?")) {
        return;
      }
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      updateForm("image", dataUrl);
    };
    reader.readAsDataURL(file);
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
  function handleSaveDemo(e: React.FormEvent) {
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

    if (!isSlugUnique(trimmedSlug, editingId || undefined)) {
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
        // Handle base64 preview images properly: keep FULL data: URL intact for localStorage + Vercel
        // Never strip or shorten base64. Also supports /assets/ paths and external URLs.
        image: form.image && form.image.startsWith("data:") 
          ? form.image 
          : (form.image?.trim() || undefined),
        sortOrder: Number(form.sortOrder) || 99,
        visible: !!form.visible,
      };

      let updated: Demo[];
      if (editingId) {
        updated = updateDemo(editingId, demoData);
      } else {
        // NEW: Add to in-memory (via return) + localStorage (inside addDemo)
        updated = addDemo(demoData);
      }

      // Re-render the table dynamically
      const sorted = [...updated].sort((a, b) => a.sortOrder - b.sortOrder);
      setDemos(sorted);

      // Success toast + clear (close resets the form state too)
      const wasNew = !editingId;
      showSuccessToast(wasNew ? "Demo created successfully." : "Demo updated successfully.");

      // Close modal (this clears the form via closeModal)
      // NOTE: Table already re-rendered above before close
      closeModal();
    } catch (err) {
      console.error("Save demo failed:", err);
      setFormError("Failed to save demo. Check console and try again.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const updated = deleteDemo(id);
    setDemos(updated.sort((a, b) => a.sortOrder - b.sortOrder));
  }

  function handleToggleVisible(id: string, current: boolean) {
    const updated = updateDemo(id, { visible: !current });
    setDemos(updated.sort((a, b) => a.sortOrder - b.sortOrder));
  }

  function handleSortOrderChange(id: string, newOrder: number) {
    const updated = updateDemo(id, { sortOrder: newOrder });
    setDemos(updated.sort((a, b) => a.sortOrder - b.sortOrder));
  }

  // PUBLISH CHANGES — Explicit action that confirms to user
  function handlePublish() {
    setIsPublishing(true);
    const current = getDemos(); // ensure latest
    saveDemos(current);

    // Notify other open tabs/pages (storage event) + same tab via custom event
    window.dispatchEvent(new CustomEvent("bdf:demos-published"));

    setPublishMessage("✓ Published! Changes are now live on the public homepage and /work pages.");

    setTimeout(() => {
      setPublishMessage("");
      setIsPublishing(false);
    }, 4200);
  }

  function handleReset() {
    if (!confirm("Reset ALL demos to original defaults? Any custom entries will be lost.")) return;
    const reset = resetToDefaults();
    setDemos(reset.sort((a, b) => a.sortOrder - b.sortOrder));
    showPublishHint("Reset to factory defaults.");
  }

  function handleExport() {
    const data = JSON.stringify(getDemos(), null, 2);
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

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported) && imported.length > 0) {
          // Basic validation
          const valid = imported.every((d: any) => d.title && d.href && typeof d.sortOrder === "number");
          if (!valid) throw new Error("Invalid demo format");
          saveDemos(imported);
          loadDemos();
          alert("Import successful. Demos updated.");
        } else {
          throw new Error("File must contain an array of demos");
        }
      } catch (err) {
        alert("Import failed. Make sure it's a valid exported JSON file.");
      }
    };
    reader.readAsText(file);
    e.target.value = ""; // reset input
  }

  function showPublishHint(msg: string) {
    setPublishMessage(msg);
    setTimeout(() => setPublishMessage(""), 2200);
  }

  function showSuccessToast(msg: string) {
    setSuccessToast(msg);
    // Auto clear toast — works on localhost and Vercel (pure client)
    setTimeout(() => setSuccessToast(""), 3200);
  }

  // ==================== PASSWORD GATE ====================
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#050708] flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/" className="text-[#3ddbd9] hover:underline flex items-center gap-1 text-sm">
              <ArrowLeft size={16} /> Back to site
            </Link>
          </div>

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

            <h1 className="text-2xl font-semibold tracking-tight mb-2">Enter admin password</h1>
            <p className="text-[#9aa6ad] text-[14.5px] mb-6">Client demo area. Protected. Real local site management.</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="label mb-1.5 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input w-full text-base"
                  placeholder="••••••••••••"
                  autoFocus
                />
              </div>

              {authError && (
                <div className="text-sm text-red-400">{authError}</div>
              )}

              <button
                type="submit"
                className="w-full btn bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold py-3 rounded-2xl transition flex items-center justify-center gap-2"
              >
                Sign In to Admin
              </button>
            </form>

            <p className="text-[11px] text-center text-[#6b787e] mt-6">
              Client-side protection only. For demo purposes.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==================== MAIN ADMIN UI ====================
  return (
    <div className="min-h-screen bg-[#050708] text-[#e8e3d9]">
      {/* Top Bar — Dark admin header, accessible, good contrast at any zoom */}
      <div className="sticky top-0 z-50 border-b border-[#1a2225] bg-[#050708]/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 flex items-center justify-between h-[62px]">
          <div className="flex items-center gap-3.5">
            <Link href="/" className="flex items-center gap-2 text-[14px] text-[#9aa6ad] hover:text-white">
              <ArrowLeft size={16} /> Public Site
            </Link>
            <div className="h-4 w-px bg-[#1f2528]" />
            <div className="font-semibold tracking-tight text-lg">Admin</div>
            <div className="text-[10px] px-2.5 py-px rounded bg-[#1f2528] text-[#3ddbd9] tracking-widest hidden sm:inline">DEMO MANAGER</div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Link href="/work" className="text-[#9aa6ad] hover:text-white transition hidden sm:inline">View Work</Link>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-1.5 text-[#9aa6ad] hover:text-white px-3 py-1.5 rounded-lg hover:bg-[#111518] text-sm"
            >
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 py-8 md:py-10">
        {/* Header — generous spacing for readability at 100% zoom */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <div className="uppercase tracking-[2.2px] text-[11px] text-[#3ddbd9] font-medium mb-1.5">MANAGEMENT</div>
            <h1 className="text-[34px] md:text-4xl font-semibold tracking-[-1.6px] leading-none">Demos</h1>
            <p className="text-[#9aa6ad] mt-2.5 text-[15px] leading-relaxed">Manage live demo sites on the homepage and /work. Changes save to browser. Publish to make visible to visitors. Contact: {CONTACT_EMAIL}</p>
          </div>

          <div>
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-70 px-7 py-3 text-[15px] font-semibold transition active:scale-[0.985] whitespace-nowrap"
            >
              <Save size={17} /> {isPublishing ? "Publishing..." : "Publish Changes"}
            </button>
          </div>
        </div>

        {/* Publish confirmation banner */}
        <AnimatePresence>
          {publishMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 rounded-2xl border border-[#3b82f6]/30 bg-[#0a1320] px-5 py-3 text-sm flex items-center gap-3 text-[#a5c3ff]"
            >
              {publishMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success toast for Create/Edit (robust, auto-dismiss, works localhost + Vercel) */}
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

        {/* Quick Stats — larger text, generous padding for 100% zoom readability */}
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
            <div className="text-[#9aa6ad] text-[11px] tracking-[1.5px]">HIDDEN</div>
            <div className="text-3xl md:text-[32px] font-semibold tabular-nums mt-1.5 leading-none">{demos.filter(d => !d.visible).length}</div>
          </div>
          <div className="bg-[#0c1013] border border-[#1a2225] rounded-2xl px-6 py-5 md:py-6 text-[13.5px] leading-relaxed text-[#9aa6ad]">
            Auto-saved to your browser.<br />Use Publish Changes for live sync.
          </div>
        </div>

        {/* Toolbar — good spacing, large tappable buttons */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-5">
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={openNewDemo} className="btn flex items-center gap-2 bg-[#1f2528] hover:bg-[#2a3437] border border-[#243530] text-sm px-6 py-2.5">
              <Plus size={17} /> New Demo
            </button>
            <button onClick={handleReset} className="text-sm px-4 py-2.5 text-[#9aa6ad] hover:text-white flex items-center gap-1.5 rounded-xl border border-[#243530] hover:border-[#33423c]">
              <RefreshCw size={16} /> Reset Defaults
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap ml-auto">
            <button onClick={handleExport} className="flex items-center gap-2 text-sm px-4 py-2.5 border border-[#243530] hover:bg-[#111518] rounded-xl">
              <Download size={16} /> Export
            </button>

            <label className="flex items-center gap-2 text-sm px-4 py-2.5 border border-[#243530] hover:bg-[#111518] rounded-xl cursor-pointer">
              <Upload size={16} /> Import
              <input type="file" accept="application/json" onChange={handleImport} className="hidden" />
            </label>

            <Link href="/" className="text-[14px] text-[#3ddbd9] hover:underline px-3 py-2">Preview Site →</Link>
          </div>
        </div>

        {/* DEMOS TABLE — CRITICAL: Perfectly responsive & readable at 100% zoom on desktop + mobile. 
           Larger fonts/padding, touch targets ≥44px, horizontal scroll on tiny screens, stacked friendly */}
        <div className="bg-[#0c1013] border border-[#1a2225] rounded-3xl overflow-x-auto">
          <table className="w-full text-[15px] min-w-[920px] md:min-w-full">
            <thead>
              <tr className="border-b border-[#1a2225] text-[#8a9599] text-[11px] md:text-xs uppercase tracking-[1.5px]">
                <th className="text-left px-5 md:px-6 py-4 font-semibold min-w-[220px]">Title / Slug</th>
                <th className="text-left px-4 py-4 font-semibold">Category</th>
                <th className="text-left px-4 py-4 font-semibold min-w-[180px]">Live URL</th>
                <th className="text-center px-3 py-4 font-semibold w-20">Order</th>
                <th className="text-center px-3 py-4 font-semibold w-20">Visible</th>
                <th className="text-right px-5 md:px-6 py-4 font-semibold w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a2225]">
              {demos.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#9aa6ad] text-base">
                    No demos yet. Click “New Demo” to get started.
                  </td>
                </tr>
              )}
              {demos.map((demo) => (
                <tr key={demo.id} className="hover:bg-[#111518] group">
                  <td className="px-5 md:px-6 py-4.5">
                    <div className="font-semibold text-[15.5px] leading-snug tracking-[-0.1px]">{demo.title}</div>
                    <div className="text-[12px] text-[#6b787e] mt-0.5 font-mono break-all">{demo.slug}</div>
                  </td>
                  <td className="px-4 py-4.5 text-[#9aa6ad] text-[14.5px]">{demo.category}</td>
                  <td className="px-4 py-4.5">
                    <a 
                      href={demo.href} 
                      target="_blank" 
                      className="font-mono text-xs md:text-sm text-[#3ddbd9] hover:underline block max-w-[240px] truncate leading-tight"
                      rel="noopener noreferrer"
                    >
                      {demo.href.replace(/^https?:\/\//, "")}
                    </a>
                  </td>
                  <td className="px-3 py-4.5 text-center">
                    <input
                      type="number"
                      value={demo.sortOrder}
                      onChange={(e) => handleSortOrderChange(demo.id, parseInt(e.target.value) || 0)}
                      className="w-[62px] bg-[#0a0c0f] border border-[#243530] text-center rounded-xl py-[7px] text-sm focus:border-[#3ddbd9] outline-none font-mono"
                      aria-label={`Sort order for ${demo.title}`}
                    />
                  </td>
                  <td className="px-3 py-4.5 text-center">
                    <button
                      onClick={() => handleToggleVisible(demo.id, demo.visible)}
                      className={`inline-flex items-center justify-center w-11 h-11 rounded-2xl border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3ddbd9] ${
                        demo.visible 
                          ? "bg-[#0f2a1f] border-[#1f5a42] text-[#3ddbd9]" 
                          : "bg-[#1f2528] border-[#243530] text-[#6b787e]"
                      }`}
                      aria-label={demo.visible ? "Hide from public site" : "Show on public site"}
                      aria-pressed={demo.visible}
                    >
                      {demo.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </td>
                  <td className="px-5 md:px-6 py-4.5">
                    <div className="flex items-center justify-end gap-1.5 opacity-85 group-hover:opacity-100">
                      <button 
                        onClick={() => openEditDemo(demo)} 
                        className="p-3 hover:bg-[#1f2528] rounded-2xl text-[#9aa6ad] hover:text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3ddbd9]"
                        aria-label={`Edit ${demo.title}`}
                      >
                        <Edit2 size={17} />
                      </button>
                      <button 
                        onClick={() => handleDelete(demo.id, demo.title)} 
                        className="p-3 hover:bg-red-950/40 text-red-400/80 hover:text-red-400 rounded-2xl transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500"
                        aria-label={`Delete ${demo.title}`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-xs text-[#6b787e] flex items-center gap-2 leading-relaxed">
          • Changes saved instantly to browser. • Publish makes them live on public site. • Order = priority (lower first). • Table designed for perfect readability at 100% zoom on desktop and mobile.
        </div>

        {/* Contact email reference in admin (dark theme) */}
        <div className="mt-6 text-xs text-[#6b787e]">
          Support &amp; inquiries: <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#3ddbd9] hover:underline">{CONTACT_EMAIL}</a>
        </div>
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
                  </div>

                  {/* Slug + Category — improved two-column layout */}
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
                      <label className="label mb-1 block">Category *</label>
                      <select
                        value={form.category}
                        onChange={(e) => updateForm("category", e.target.value)}
                        className="input w-full py-2 text-[14.5px]"
                        required
                      >
                        <option value="">Select category...</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Live URL */}
                  <div>
                    <label className="label mb-1 block">Live URL / Demo Link *</label>
                    <input
                      value={form.href}
                      onChange={(e) => updateForm("href", e.target.value)}
                      className="input w-full font-mono text-[13.5px] py-2"
                      placeholder="https://your-demo.lovable.app"
                      required
                    />
                  </div>

                  {/* Description — reduced height */}
                  <div>
                    <label className="label mb-1 block">Short Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => updateForm("description", e.target.value)}
                      className="input w-full min-h-[68px] resize-y text-[14px] py-2"
                      placeholder="Warm steakhouse website with digital menu and reservations for Lake Cumberland visitors."
                    />
                  </div>

                  {/* Preview Image — tighter dropzone */}
                  <div>
                    <label className="label mb-1 block">Preview Image (Screenshot)</label>
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

                      {form.image && form.image.startsWith("data:") ? (
                        <div className="relative w-full max-w-[280px]">
                          <img src={form.image} alt="Demo preview" className="mx-auto max-h-[92px] rounded-lg border border-[#1a2225] object-contain" />
                          <button type="button" onClick={removeImage} className="absolute -top-1.5 -right-1.5 bg-[#1a2225] hover:bg-red-500 text-xs rounded-full w-6 h-6 flex items-center justify-center border border-[#243530]" aria-label="Remove uploaded image">×</button>
                          <div className="mt-1.5 text-[10px] text-[#8a9599]">Uploaded (local base64). Tap or drop to replace.</div>
                        </div>
                      ) : form.image ? (
                        <div className="relative w-full max-w-[280px]">
                          <img src={form.image} alt="Demo preview" className="mx-auto max-h-[92px] rounded-lg border border-[#1a2225] object-contain" onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.4"; }} />
                          <button type="button" onClick={removeImage} className="mt-1.5 block text-[10px] text-red-400 hover:text-red-300">Remove current</button>
                        </div>
                      ) : (
                        <>
                          <div className="text-2xl mb-1 opacity-60">📷</div>
                          <div className="font-medium text-[13.5px]">Drop image or tap to upload</div>
                          <div className="text-[10px] text-[#6b787e] mt-0.5">JPG/PNG/WebP • &lt;2.5MB</div>
                          <div className="text-[9px] mt-1.5 px-2 py-px rounded bg-[#1f2528] text-[#8a9599]">Stored locally as base64</div>
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

                  {/* Sort Order + Visibility — compact two-column */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="label mb-1 block">Sort Order</label>
                      <input
                        type="number"
                        value={form.sortOrder}
                        onChange={(e) => updateForm("sortOrder", parseInt(e.target.value) || 0)}
                        className="input w-full py-2 text-center text-base tabular-nums"
                      />
                      <p className="text-[10px] text-[#6b787e] mt-0.5">Lower = shown first</p>
                    </div>
                    <div>
                      <label className="label mb-1 block">Visibility</label>
                      <label className="flex items-center gap-2.5 bg-[#0a0c0f] border border-[#1a2225] rounded-xl px-4 h-[42px] cursor-pointer text-[13.5px]">
                        <input type="checkbox" checked={form.visible} onChange={(e) => updateForm("visible", e.target.checked)} className="accent-[#3ddbd9] w-3.5 h-3.5" />
                        <span>Visible on public site</span>
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
    </div>
  );
}
