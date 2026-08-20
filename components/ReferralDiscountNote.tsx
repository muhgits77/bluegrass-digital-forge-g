/**
 * Subtle disclosure for the $300 referral discount.
 * Premium dark + Kentucky warmth — visible but not loud.
 */
export default function ReferralDiscountNote({
  className = "",
  align = "left",
}: {
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <p
      className={`text-[12.5px] leading-relaxed text-[#8a9599] ${
        align === "center" ? "text-center" : "text-left"
      } ${className}`}
      role="note"
    >
      <span className="font-medium text-[#c9b9a8]">Note:</span> The{" "}
      <span className="text-[#d4a373]">$300 referral credit</span> applies only
      to standard custom website projects. It does not apply to templates or
      Web Apps like TruckDash.
    </p>
  );
}
