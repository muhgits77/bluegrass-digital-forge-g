import Link from "next/link";

export default function FoodTruckWebsites() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <div className="label">SPECIALTY</div>
      <h1 className="section-title tracking-tight">Food Truck Websites</h1>
      <p className="mt-3 text-lg text-[#8a9599]">Bold, fast-loading sites built specifically for trucks, trailers, and pop-ups around Lake Cumberland.</p>

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
