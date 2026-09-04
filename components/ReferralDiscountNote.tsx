"use client";

/**
 * Subtle disclosure for the $300 referral discount.
 * Live through October 13, 2026 (end of day, Eastern).
 * Hidden automatically after that — no second deploy required.
 */
const REFERRAL_EXPIRES_AT = Date.parse("2026-10-14T04:00:00.000Z"); // midnight EDT Oct 14

export default function ReferralDiscountNote({
  className = "",
  align = "left",
}: {
  className?: string;
  align?: "left" | "center";
}) {
  if (Date.now() >= REFERRAL_EXPIRES_AT) return null;

  return (
    <p
      className={`text-[12.5px] leading-relaxed text-[#8a9599] ${
        align === "center" ? "text-center" : "text-left"
      } ${className}`}
      role="note"
    >
      <span className="font-medium text-[#c9b9a8]">Note:</span> The{" "}
      <span className="text-[#d4a373]">$300 referral credit</span> applies only
      to standard custom website projects through October 13, 2026. It does not
      apply to templates or Web Apps like TruckDash.
    </p>
  );
}
