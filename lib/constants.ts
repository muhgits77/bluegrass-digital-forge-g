/**
 * BLUEGRASS DIGITAL FORGE — Shared Constants
 * 
 * Centralized values for consistency across public site (warm Kentucky style)
 * and admin panel (dark professional).
 * 
 * Email: All "Get Quote" flows, contact forms, and email links point here.
 * Follows Master Project Settings for clear, local, honest communication.
 */

export const CONTACT_EMAIL = "contact@bluegrassdigitalforge.com";

/**
 * Public phone for schema (LocalBusiness telephone) and footer.
 * Leave unset until a real local number is published — do not invent one.
 */
export const CONTACT_PHONE: string | undefined = undefined;

export const SITE_NAME = "Bluegrass Digital Forge";
export const SITE_TAGLINE = "Powerful. Simple. Yours.";
export const LOCATION = "Monticello, Kentucky • Lake Cumberland Region";

/** Preferred production origin — always .com (never .live or staging hosts). */
export const SITE_URL = "https://bluegrassdigitalforge.com";

/** DIY template store — ready-to-remix sites, one-time purchase from $99. */
export const TEMPLATE_STORE_URL = "https://bluegrasstemplates.com";

/**
 * Absolute self-referencing canonical URL for a path.
 * Homepage is exactly https://bluegrassdigitalforge.com/ (trailing slash).
 * Other paths: https://bluegrassdigitalforge.com/services (no trailing slash).
 */
export function canonicalUrl(path: string = "/"): string {
  if (!path || path === "/") return `${SITE_URL}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized.replace(/\/+$/, "")}`;
}
