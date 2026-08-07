/**
 * BLUEGRASS DIGITAL FORGE — Admin authentication helpers
 *
 * Uses Supabase Auth (signInWithPassword / magic link / password reset) plus a
 * fixed allow-listed email and admin token. Session is persisted by the browser
 * Supabase client (persistSession / autoRefreshToken / detectSessionInUrl).
 *
 * SUPABASE DASHBOARD SETUP (required for magic link + password reset):
 * - Auth → URL Configuration → Redirect URLs must include:
 *     https://bluegrassdigitalforge.com/admin
 *     http://localhost:3000/admin  (and any other local ports you use)
 * - Auth → Email Templates: enable / customize Magic Link and Reset Password.
 * - The admin user must already exist in Auth (shouldCreateUser: false on OTP).
 */

import { supabase } from './supabase';

/** Only this Supabase Auth user may access /admin. */
export const ALLOWED_ADMIN_EMAIL = 'bluegrassdigitalforge@protonmail.com';

/** Second factor required at login (not stored in Supabase). */
export const ADMIN_TOKEN = 'ScotchGlitch398!1!1!1!1!1';

export type AdminLoginResult =
  | { ok: true; message?: string }
  | { ok: false; error: string };

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function adminRedirectTo(): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/admin`;
  }
  return 'https://bluegrassdigitalforge.com/admin';
}

type EmailTokenValidation =
  | { ok: true; normalizedEmail: string }
  | { ok: false; error: string };

/**
 * Shared pre-checks for email + admin token before any auth action.
 * Does not expose which field failed (generic “Invalid credentials”).
 */
function validateEmailAndToken(email: string, adminToken: string): EmailTokenValidation {
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

  if (!adminToken) {
    return { ok: false, error: 'Admin token is required.' };
  }

  if (adminToken !== ADMIN_TOKEN) {
    return { ok: false, error: 'Invalid credentials.' };
  }

  return { ok: true, normalizedEmail };
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
  const validated = validateEmailAndToken(email, adminToken);
  if (!validated.ok) return validated;

  if (!password) {
    return { ok: false, error: 'Password is required.' };
  }

  // supabase is guaranteed non-null after validateEmailAndToken succeeds
  const client = supabase!;

  try {
    const { data, error } = await client.auth.signInWithPassword({
      email: validated.normalizedEmail,
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
      await client.auth.signOut();
      return { ok: false, error: 'Invalid credentials.' };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected sign-in error.';
    return { ok: false, error: message };
  }
}

/**
 * Send a one-time magic link email (OTP) for passwordless admin sign-in.
 * Requires existing Auth user (shouldCreateUser: false). Token still required.
 */
export async function sendMagicLink(
  email: string,
  adminToken: string
): Promise<AdminLoginResult> {
  const validated = validateEmailAndToken(email, adminToken);
  if (!validated.ok) return validated;

  const client = supabase!;

  try {
    const { error } = await client.auth.signInWithOtp({
      email: validated.normalizedEmail,
      options: {
        emailRedirectTo: adminRedirectTo(),
        shouldCreateUser: false,
      },
    });

    if (error) {
      return {
        ok: false,
        error: error.message || 'Could not send magic link. Try again later.',
      };
    }

    return {
      ok: true,
      message: 'Magic link sent — check your inbox (and spam folder).',
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error sending magic link.';
    return { ok: false, error: message };
  }
}

/**
 * Send a password-reset email. After clicking the link, the user lands on /admin
 * with a recovery session; they can sign in with a new password or use magic link.
 */
export async function sendPasswordReset(
  email: string,
  adminToken: string
): Promise<AdminLoginResult> {
  const validated = validateEmailAndToken(email, adminToken);
  if (!validated.ok) return validated;

  const client = supabase!;

  try {
    const { error } = await client.auth.resetPasswordForEmail(validated.normalizedEmail, {
      redirectTo: adminRedirectTo(),
    });

    if (error) {
      return {
        ok: false,
        error: error.message || 'Could not send password reset email. Try again later.',
      };
    }

    return {
      ok: true,
      message: 'Password reset email sent — check your inbox (and spam folder).',
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Unexpected error sending password reset.';
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
 * Also covers magic-link landings (detectSessionInUrl parses the hash/query).
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
