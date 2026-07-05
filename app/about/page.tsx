import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About the Monticello KY & Charleston SC Website Designer | Bluegrass Digital Forge",
  description: "Meet Brian, the Monticello KY website designer now also serving Charleston SC, Summerville and the South Carolina Lowcountry. Authentic, handcrafted websites for Lake Cumberland and Lowcountry businesses. Flat pricing, full ownership.",
  keywords: ["Monticello KY website designer", "Lake Cumberland business websites", "Web Design Charleston SC", "Lowcountry Web Design"],
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <div className="label tracking-[1.6px]">ABOUT — MONTICELLO KY WEBSITE DESIGNER</div>
      <h1 className="section-title tracking-tight mt-1">Monticello KY Website Designer for Lake Cumberland &amp; Wayne County Business Websites</h1>

      <div className="prose prose-invert mt-5 max-w-none text-[#c8cfd3] text-[15.5px] leading-relaxed">
        <p>I live and work right here on Lake Cumberland — not a 1-800 number or a chat window halfway across the country. When you hire Bluegrass Digital Forge, the Monticello KY website designer, you get a real neighbor who knows the difference between a Wayne County food truck at the marina and a Somerset storefront. I pick up the phone. I answer texts on weekends before a busy Saturday.</p>
        <p className="mt-3">For food truck owners, that means a site where you can post your real-time location and today’s hours from your phone between services — whether you’re in Monticello or serving the Charleston waterfront.</p>
        <p>Monticello KY web design serving every major Lake Cumberland boat ramp town: Monticello (Conley Bottom, Beaver Creek), Albany, Jamestown &amp; Russell Springs (State Dock, Lake Cumberland Marina), Burnside (Burnside Marina), Nancy (Lee’s Ford), Somerset, Ferguson, Creelsboro, and all of Wayne, Russell &amp; Pulaski Counties. Authentic Lake Cumberland business websites for marinas, guides, restaurants and shops.</p>
      </div>

      <div className="mt-9 grid md:grid-cols-2 gap-4">
        {[
          ["I know your customers", "Folks at the marina, families heading to the lake on Friday, contractors grabbing lunch in town. I build sites that speak directly to them — not generic templates."],
          ["Same-day replies", "Text or call me. Stop me at the diner. No ticket queues, no overseas managers, no waiting days for a reply."],
          ["Built for real local search", "I tune every site for the searches that matter here: 'BBQ near Lake Cumberland', 'food truck Monticello', 'barber Somerset KY'. Real local SEO that actually shows up."],
          ["Money stays in the community", "Your investment stays local instead of funding a Silicon Valley SaaS. Good for your business — good for the lake."],
        ].map(([title, body], i) => (
          <div key={i} className="rounded-2xl border border-[#1f282b] bg-[#0c1013] p-6">
            <div className="font-semibold tracking-tight text-lg mb-2">{title}</div>
            <p className="text-[14.5px] text-[#9aa6ad] leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-[#0a0c0f] border border-[#1a2225] p-8 text-center">
        <p className="text-[#8a9599]">Curious what a local, honest build looks like? See the <Link href="/work" className="underline hover:text-[#f4a261]">live Lake Cumberland business websites demos</Link> or <Link href="/food-truck-websites" className="underline hover:text-[#f4a261]">food truck website Kentucky examples</Link>. We bring the same approach to Charleston SC web design and Lowcountry projects — <Link href="/south-carolina" className="underline hover:text-[#f4a261]">learn more</Link>.</p>
        <div className="flex flex-wrap gap-3 mt-5 justify-center">
          <Link href="/work" className="btn btn-secondary">Browse the live demos</Link>
          <Link href="/services" className="btn btn-secondary">See Monticello KY Website Designer Pricing</Link>
          <Link href="/quote" className="btn btn-primary">Start a conversation</Link>
        </div>
      </div>

      <p className="text-center text-[12.5px] mt-9 text-[#9aa6ad]">Forged in Monticello, Kentucky. Independently owned. No agency middlemen. You own everything.</p>
    </div>
  );
}
