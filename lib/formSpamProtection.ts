/**
 * Lightweight spam protection shared by contact + quote forms.
 * - Honeypot: bots fill a CSS-hidden field humans never see
 * - Human check: simple math answer validated server-side
 */

export const HONEYPOT_FIELD = "company_url" as const;
export const HUMAN_CHECK_FIELD = "humanCheck" as const;

/** Expected answer to “What is 4 + 5?” */
export const HUMAN_CHECK_ANSWER = "9";

/** Calm, non-CAPTCHA tone for wrong challenge answers */
export const HUMAN_CHECK_ERROR =
  "That answer doesn’t look quite right. Please check the quick math question (4 + 5) and try again.";

export function isHoneypotTripped(value: unknown): boolean {
  if (value == null) return false;
  return String(value).trim().length > 0;
}

export function isHumanCheckValid(value: unknown): boolean {
  if (value == null) return false;
  return String(value).trim() === HUMAN_CHECK_ANSWER;
}
