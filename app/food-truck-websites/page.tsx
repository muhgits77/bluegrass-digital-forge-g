import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Food Truck Website Kentucky & Charleston SC | Monticello KY Website Designer — Lake Cumberland & Lowcountry",
  description: "Specialized food truck website Kentucky and Charleston Food Truck Website by the Monticello KY website designer. Schedule, menus, pre-orders for Lake Cumberland & Wayne County and South Carolina Lowcountry food trucks. Fast local builds.",
  keywords: ["food truck website Kentucky", "Monticello KY website designer", "Lake Cumberland business websites", "Wayne County web design", "Charleston Food Truck Website", "Lowcountry Web Design"],
};

export default function FoodTruckWebsites() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <div className="label tracking-[1.6px]">SPECIALTY — FOOD TRUCK WEBSITE KENTUCKY</div>
      <h1 className="section-title tracking-tight">Food Truck Website Kentucky | Lake Cumberland &amp; Wayne County by Monticello KY Website Designer</h1>
      <p className="mt-3 text-lg text-[#8a9599]">Bold, fast-loading food truck websites Kentucky built locally in Monticello for Lake Cumberland &amp; Wayne County. Perfect for BBQ, tacos, donuts and more. Custom Lake Cumberland business websites. We also build Charleston Food Truck Websites and Lowcountry food truck sites with the same attention to local detail.</p>

      <div className="mt-8 card p-7 rounded-3xl space-y-4 text-[15px]">
        <p>Typical inclusions for food truck sites:</p>
        <ul className="list-disc pl-5 space-y-1 text-[#c8cfd3]">
          <li>Current location + schedule (updated weekly or daily)</li>
          <li>Full menu with photos and dietary tags</li>
          <li>Online pre-order or catering inquiry form</li>
          <li>Instagram + Facebook feed embed or links</li>
          <li>Google Maps + tap-to-call prominently</li>
          <li>Event / private booking calendar link</li>
        </ul>
      </div>

      <div className="mt-8">
        <Link href="/quote" className="btn btn-primary">Get a food truck site quote →</Link>
        <span className="mx-3 text-[#8a9599]">or</span>
        <Link href="/work" className="underline text-[#3ddbd9]">see the Smoky Wheels live demo</Link>
      </div>
    </div>
  );
}
