/**
 * BLUEGRASS DIGITAL FORGE — Admin authentication helpers
 *
 * Uses Supabase Auth (signInWithPassword) plus a fixed allow-listed email
 * and admin token. Session is persisted by the browser Supabase client.
 */

import { supabase } from './supabase';

/** Only this Supabase Auth user may access /admin. */
export const ALLOWED_ADMIN_EMAIL = 'contact@bluegrassdigitalforge.com';

/** Second factor required at login (not stored in Supabase). */
export const ADMIN_TOKEN = 'ScotchGlitch398!1!1!1!1!1';

export type AdminLoginResult =
  | { ok: true }
  | { ok: false; error: string };

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Sign in with Supabase Auth after validating allow-listed email + admin token.
 * On success, session is persisted (persistSession / autoRefreshToken on client).
 */
export async function loginAdmin(
  email: string,
  password: string,
  adminToken: string
): Promise<AdminLoginResult> {
  if (!supabase) {
    return {
      ok: false,
      error:
        'Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
    };
  }

  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return { ok: false, error: 'Email is required.' };
  }

  if (normalizedEmail !== ALLOWED_ADMIN_EMAIL) {
    return { ok: false, error: 'Invalid credentials.' };
  }

  if (adminToken !== ADMIN_TOKEN) {
    return { ok: false, error: 'Invalid credentials.' };
  }

  if (!password) {
    return { ok: false, error: 'Password is required.' };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (error) {
      return {
        ok: false,
        error: error.message || 'Sign-in failed. Check your password and try again.',
      };
    }

    const sessionEmail = data.session?.user?.email
      ? normalizeEmail(data.session.user.email)
      : '';

    if (!data.session || sessionEmail !== ALLOWED_ADMIN_EMAIL) {
      await supabase.auth.signOut();
      return { ok: false, error: 'Invalid credentials.' };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected sign-in error.';
    return { ok: false, error: message };
  }
}

/** Sign out of Supabase Auth and clear the local session. */
export async function logoutAdmin(): Promise<void> {
  if (!supabase) return;

  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.error('[adminAuth] signOut failed:', err);
  }
}

/**
 * True when there is an active Supabase session for the allow-listed admin email.
 * Used on mount / refresh to restore admin access without re-entering the token.
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  if (!supabase) return false;

  try {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session?.user?.email) return false;

    return normalizeEmail(data.session.user.email) === ALLOWED_ADMIN_EMAIL;
  } catch (err) {
    console.error('[adminAuth] getSession failed:', err);
    return false;
  }
}
