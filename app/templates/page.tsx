import Link from "next/link";

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <div className="label">TEMPLATES</div>
      <h1 className="section-title tracking-tight mt-1">Ready-to-launch templates</h1>
      <p className="mt-3 text-[#8a9599] max-w-prose">
        I maintain a small collection of high-quality, locally tuned templates for common Lake Cumberland businesses. Each can be customized and launched quickly.
      </p>

      <div className="mt-8 grid md:grid-cols-2 gap-4">
        {[
          { name: "Food Truck", desc: "Bold menus, schedule, online ordering, and directions that actually convert." },
          { name: "Steakhouse / Restaurant", desc: "Appetizing photo hero, digital menu, reservations, and event inquiries." },
          { name: "Barber & Salon", desc: "Services grid, booking links, gallery, and easy tap-to-call." },
          { name: "Auto / Tire Shop", desc: "Service menus, instant quote forms, reviews, and local SEO that works." },
          { name: "Marina / Guide Service", desc: "Trip packages, captain stories, calendar booking, and strong local search presence." },
          { name: "Retail & Boutique", desc: "Clean catalog, hours, story, and contact that feels like walking in the door." },
        ].map((t, i) => (
          <div key={i} className="card p-6 rounded-2xl hover:border-[#f4a261]/50 transition">
            <div className="font-semibold tracking-tight">{t.name}</div>
            <p className="text-sm text-[#8a9599] mt-1.5 leading-snug">{t.desc}</p>
            <Link href="/quote" className="btn btn-secondary mt-5 text-sm inline-flex">Start with this template →</Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link href="/work" className="text-[#3ddbd9] hover:underline">Or browse the full live demo collection →</Link>
      </div>
    </div>
  );
}
