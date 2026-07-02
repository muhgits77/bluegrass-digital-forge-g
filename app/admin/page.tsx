"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Plus, Edit2, Trash2, Eye, EyeOff, Save, RefreshCw, Download, Upload, 
  ArrowLeft, Lock, LogOut 
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
// - Full CRUD for demos
// - LocalStorage persistence (auto-syncs to public / and /work)
// - "Publish Changes" explicitly saves + confirms
// - Blue/amber accents, clean cards, excellent spacing
// - Export/Import JSON support
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
    setForm({
      ...emptyForm,
      sortOrder: Math.max(0, ...demos.map(d => d.sortOrder)) + 10,
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

  // Validate and save form
  function handleSaveDemo(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title.trim() || !form.href.trim() || !form.category.trim() || !form.description.trim()) {
      setFormError("Title, Category, Live URL, and Description are required.");
      return;
    }

    const trimmedSlug = form.slug.trim() || generateUniqueSlug(form.title);

    if (!isSlugUnique(trimmedSlug, editingId || undefined)) {
      setFormError("Slug must be unique. Change the slug or title.");
      return;
    }

    const demoData: Omit<Demo, "id"> = {
      title: form.title.trim(),
      slug: trimmedSlug,
      category: form.category.trim(),
      href: form.href.trim(),
      description: form.description.trim(),
      // MAJOR: Preserve full base64 data URLs without aggressive trimming
      image: form.image && form.image.startsWith("data:") 
        ? form.image 
        : (form.image?.trim() || undefined),
      sortOrder: Number(form.sortOrder) || 99,
      visible: !!form.visible,
    };

    if (editingId) {
      const updated = updateDemo(editingId, demoData);
      setDemos(updated.sort((a, b) => a.sortOrder - b.sortOrder));
    } else {
      const updated = addDemo(demoData);
      setDemos(updated.sort((a, b) => a.sortOrder - b.sortOrder));
    }

    closeModal();
    showPublishHint("Draft saved locally.");
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

          <div className="bg-[#0c1013] border border-[#1a2225] rounded-3xl p-9">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#1f2528] flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#3ddbd9]" />
              </div>
              <div>
                <div className="font-semibold tracking-tight text-xl">Bluegrass Digital Forge</div>
                <div className="text-[#8a9599] text-sm">Admin Panel</div>
              </div>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight mb-2">Enter admin password</h1>
            <p className="text-[#9aa6ad] text-[14.5px] mb-6">This area is protected. Authorized team only.</p>

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
      {/* Top Bar — Dark admin header */}
      <div className="sticky top-0 z-50 border-b border-[#1a2225] bg-[#050708]/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-sm text-[#9aa6ad] hover:text-white">
              <ArrowLeft size={16} /> Public Site
            </Link>
            <div className="h-4 w-px bg-[#1f2528]" />
            <div className="font-semibold tracking-tight text-lg">Admin</div>
            <div className="text-[10px] px-2.5 py-px rounded bg-[#1f2528] text-[#3ddbd9] tracking-widest">DEMO MANAGER</div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Link href="/work" className="text-[#9aa6ad] hover:text-white transition">View Work Page</Link>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-1.5 text-[#9aa6ad] hover:text-white px-3 py-1.5 rounded-lg hover:bg-[#111518]"
            >
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="uppercase tracking-[2px] text-xs text-[#3ddbd9] font-medium mb-1">MANAGEMENT</div>
            <h1 className="text-4xl font-semibold tracking-[-1.5px]">Demos</h1>
            <p className="text-[#9aa6ad] mt-1">Manage live demo sites shown on the public homepage and work gallery. All contact / Get Quote flows on the site use {CONTACT_EMAIL}.</p>
          </div>

          <div className="flex gap-3 items-center">
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-70 px-5 py-2.5 text-sm font-semibold transition active:scale-[0.985]"
            >
              <Save size={16} /> {isPublishing ? "Publishing..." : "Publish Changes"}
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

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0c1013] border border-[#1a2225] rounded-2xl px-6 py-4">
            <div className="text-[#9aa6ad] text-xs tracking-widest">TOTAL DEMOS</div>
            <div className="text-3xl font-semibold tabular-nums mt-1">{demos.length}</div>
          </div>
          <div className="bg-[#0c1013] border border-[#1a2225] rounded-2xl px-6 py-4">
            <div className="text-[#9aa6ad] text-xs tracking-widest">VISIBLE ON SITE</div>
            <div className="text-3xl font-semibold tabular-nums mt-1 text-[#3ddbd9]">{demos.filter(d => d.visible).length}</div>
          </div>
          <div className="bg-[#0c1013] border border-[#1a2225] rounded-2xl px-6 py-4">
            <div className="text-[#9aa6ad] text-xs tracking-widest">HIDDEN</div>
            <div className="text-3xl font-semibold tabular-nums mt-1">{demos.filter(d => !d.visible).length}</div>
          </div>
          <div className="bg-[#0c1013] border border-[#1a2225] rounded-2xl px-6 py-4 flex items-center gap-3 text-sm">
            Changes save automatically to localStorage. <br />Use Publish to confirm to team.
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <button onClick={openNewDemo} className="btn flex items-center gap-2 bg-[#1f2528] hover:bg-[#2a3437] border border-[#243530] text-sm px-5">
              <Plus size={16} /> New Demo
            </button>
            <button onClick={handleReset} className="text-sm px-4 py-2 text-[#9aa6ad] hover:text-white flex items-center gap-1.5">
              <RefreshCw size={15} /> Reset to Defaults
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={handleExport} className="flex items-center gap-2 text-sm px-4 py-2 border border-[#243530] hover:bg-[#111518] rounded-xl">
              <Download size={15} /> Export JSON
            </button>

            <label className="flex items-center gap-2 text-sm px-4 py-2 border border-[#243530] hover:bg-[#111518] rounded-xl cursor-pointer">
              <Upload size={15} /> Import JSON
              <input type="file" accept="application/json" onChange={handleImport} className="hidden" />
            </label>

            <Link href="/" className="text-sm text-[#3ddbd9] hover:underline px-3">Preview Public Site →</Link>
          </div>
        </div>

        {/* DEMOS TABLE — Clean dark admin table */}
        <div className="bg-[#0c1013] border border-[#1a2225] rounded-3xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1a2225] text-[#8a9599] text-xs uppercase tracking-widest">
                <th className="text-left px-6 py-4 font-medium">Title</th>
                <th className="text-left px-4 py-4 font-medium">Category</th>
                <th className="text-left px-4 py-4 font-medium">Live URL</th>
                <th className="text-center px-4 py-4 font-medium w-20">Order</th>
                <th className="text-center px-4 py-4 font-medium">Visible</th>
                <th className="text-right px-6 py-4 font-medium w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a2225]">
              {demos.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#9aa6ad]">
                    No demos. Click “New Demo” to get started.
                  </td>
                </tr>
              )}
              {demos.map((demo) => (
                <tr key={demo.id} className="hover:bg-[#111518] group">
                  <td className="px-6 py-4">
                    <div className="font-medium text-[15px]">{demo.title}</div>
                    <div className="text-xs text-[#6b787e] mt-0.5 font-mono">{demo.slug}</div>
                  </td>
                  <td className="px-4 py-4 text-[#9aa6ad]">{demo.category}</td>
                  <td className="px-4 py-4">
                    <a 
                      href={demo.href} 
                      target="_blank" 
                      className="font-mono text-xs text-[#3ddbd9] hover:underline truncate block max-w-[220px]"
                    >
                      {demo.href.replace(/^https?:\/\//, "")}
                    </a>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <input
                      type="number"
                      value={demo.sortOrder}
                      onChange={(e) => handleSortOrderChange(demo.id, parseInt(e.target.value) || 0)}
                      className="w-16 bg-[#0a0c0f] border border-[#243530] text-center rounded-lg py-1 text-sm focus:border-[#3ddbd9] outline-none"
                    />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => handleToggleVisible(demo.id, demo.visible)}
                      className={`inline-flex items-center justify-center w-9 h-9 rounded-xl border transition ${
                        demo.visible 
                          ? "bg-[#0f2a1f] border-[#1f5a42] text-[#3ddbd9]" 
                          : "bg-[#1f2528] border-[#243530] text-[#6b787e]"
                      }`}
                      title={demo.visible ? "Hide from public site" : "Show on public site"}
                    >
                      {demo.visible ? <Eye size={17} /> : <EyeOff size={17} />}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100">
                      <button 
                        onClick={() => openEditDemo(demo)} 
                        className="p-2 hover:bg-[#1f2528] rounded-xl text-[#9aa6ad] hover:text-white"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(demo.id, demo.title)} 
                        className="p-2 hover:bg-red-950/40 text-red-400/80 hover:text-red-400 rounded-xl"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-xs text-[#6b787e] flex items-center gap-2">
          • Changes are saved instantly to your browser. • Use “Publish Changes” to signal to your team that the gallery is ready. • Order numbers control display priority (lower = higher).
        </div>

        {/* Contact email reference in admin (dark theme) */}
        <div className="mt-6 text-xs text-[#6b787e]">
          Support &amp; inquiries: <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#3ddbd9] hover:underline">{CONTACT_EMAIL}</a>
        </div>
      </div>

      {/* ==================== EDIT / NEW MODAL ==================== */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: "spring", bounce: 0.02, duration: 0.22 }}
              className="w-full max-w-2xl bg-[#0c1013] border border-[#1a2225] rounded-3xl overflow-hidden"
            >
              <div className="px-8 pt-7 pb-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-xs tracking-[1.5px] text-[#3ddbd9]">{editingId ? "EDIT DEMO" : "NEW DEMO"}</div>
                    <div className="text-2xl font-semibold tracking-tight mt-1">
                      {editingId ? "Update Demo Details" : "Add New Live Demo"}
                    </div>
                  </div>
                  <button onClick={closeModal} className="text-[#9aa6ad] hover:text-white p-2">✕</button>
                </div>

                <form onSubmit={handleSaveDemo} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="label mb-1.5">Title *</label>
                      <input
                        value={form.title}
                        onChange={(e) => updateForm("title", e.target.value)}
                        className="input w-full"
                        placeholder="Hickory Forge Steakhouse"
                        required
                      />
                    </div>

                    <div>
                      <label className="label mb-1.5">Slug (unique) *</label>
                      <input
                        value={form.slug}
                        onChange={(e) => updateForm("slug", e.target.value)}
                        className="input w-full font-mono text-sm"
                        placeholder="hickory-forge-steakhouse"
                      />
                      <p className="text-[11px] text-[#6b787e] mt-1">Used in URLs and internal identification</p>
                    </div>

                    <div>
                      <label className="label mb-1.5">Category *</label>
                      <select
                        value={form.category}
                        onChange={(e) => updateForm("category", e.target.value)}
                        className="input w-full"
                        required
                      >
                        <option value="">Select category...</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="label mb-1.5">Live URL *</label>
                      <input
                        value={form.href}
                        onChange={(e) => updateForm("href", e.target.value)}
                        className="input w-full font-mono text-sm"
                        placeholder="https://your-demo.lovable.app"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="label mb-1.5">Description *</label>
                      <textarea
                        value={form.description}
                        onChange={(e) => updateForm("description", e.target.value)}
                        className="input w-full min-h-[82px] resize-y"
                        placeholder="Short compelling description shown on cards..."
                        required
                      />
                    </div>

                    {/* MAJOR CHANGE: Drag-and-drop image upload + live preview */}
                    {/* Images are converted to base64 data URLs and stored in localStorage */}
                    {/* Supports both uploaded images and legacy /assets/ paths for full flexibility */}
                    <div className="md:col-span-2">
                      <label className="label mb-1.5">Screenshot / Preview Image</label>

                      {/* Drop zone */}
                      <div
                        onClick={triggerFileSelect}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`group relative border-2 border-dashed rounded-2xl p-5 cursor-pointer transition-all min-h-[148px] flex flex-col items-center justify-center text-center
                          ${dragActive 
                            ? "border-[#3b82f6] bg-[#0a1320] scale-[1.01]" 
                            : "border-[#243530] hover:border-[#3b82f6]/70 hover:bg-[#0a0c0f]"}`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileInputChange}
                          className="hidden"
                        />

                        {form.image && form.image.startsWith("data:") ? (
                          // Nice preview for uploaded base64 images
                          <div className="relative w-full max-w-[320px]">
                            <img
                              src={form.image}
                              alt="Demo preview"
                              className="mx-auto max-h-[128px] rounded-xl border border-[#1a2225] object-contain shadow-sm"
                            />
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute -top-2 -right-2 bg-[#1a2225] hover:bg-red-500/90 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center border border-[#243530]"
                              title="Remove image"
                            >
                              ×
                            </button>
                            <div className="mt-2 text-[11px] text-[#8a9599]">Base64 image stored locally • Click zone or drag new file to replace</div>
                          </div>
                        ) : form.image ? (
                          // Legacy URL / path preview (works for /assets/...)
                          <div className="relative w-full max-w-[320px]">
                            <img
                              src={form.image}
                              alt="Demo preview"
                              className="mx-auto max-h-[128px] rounded-xl border border-[#1a2225] object-contain"
                              onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.4"; }}
                            />
                            <div className="mt-2 text-[11px] text-[#8a9599]">Current image path • Drag new image here to upload as base64</div>
                            <button type="button" onClick={removeImage} className="mt-1 text-xs text-red-400 hover:text-red-500">Remove</button>
                          </div>
                        ) : (
                          // Empty state / drop prompt
                          <>
                            <div className="text-3xl mb-2 opacity-70">📷</div>
                            <div className="font-medium">Drop image here or click to upload</div>
                            <div className="text-xs text-[#6b787e] mt-1">JPG • PNG • WebP • Max recommended ~2MB</div>
                            <div className="text-[10px] mt-3 px-3 py-px rounded bg-[#1f2528] text-[#8a9599] inline-block">Images stored as base64 in your browser</div>
                          </>
                        )}
                      </div>

                      {/* Manual URL fallback (for paths or external links) */}
                      <div className="mt-2">
                        <input
                          type="text"
                          value={form.image || ""}
                          onChange={(e) => updateForm("image", e.target.value)}
                          className="input w-full text-sm font-mono"
                          placeholder="Or paste /assets/demo-xxx.jpg or external https:// URL"
                        />
                        <p className="text-[10px] text-[#6b787e] mt-1">Upload above stores as self-contained base64. Paste a path/URL for hosted images.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label mb-1.5">Sort Order</label>
                        <input
                          type="number"
                          value={form.sortOrder}
                          onChange={(e) => updateForm("sortOrder", parseInt(e.target.value))}
                          className="input w-full"
                        />
                      </div>
                      <div>
                        <label className="label mb-1.5">Visibility</label>
                        <label className="flex items-center gap-3 bg-[#0a0c0f] border border-[#1a2225] rounded-2xl px-4 h-[46px] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.visible}
                            onChange={(e) => updateForm("visible", e.target.checked)}
                            className="accent-[#3ddbd9] w-4 h-4"
                          />
                          <span className="text-sm">Visible on public site</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {formError && <div className="text-sm text-red-400 -mt-1">{formError}</div>}

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1a2225]">
                    <button type="button" onClick={closeModal} className="btn btn-secondary px-6">Cancel</button>
                    <button type="submit" className="btn bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold px-7">
                      {editingId ? "Save Changes" : "Create Demo"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
