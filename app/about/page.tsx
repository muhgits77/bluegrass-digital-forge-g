import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <div className="label tracking-[1.5px]">ABOUT</div>
      <h1 className="section-title tracking-tight mt-1">Local Web Designer</h1>

      <div className="prose prose-invert mt-6 max-w-none text-[#c8cfd3] text-[15.5px] leading-relaxed">
        <p>I live and work right here on Lake Cumberland — not a 1-800 number or a chat window halfway across the country. When you hire Bluegrass Digital Forge, you get a real neighbor who knows the difference between a Wayne County food truck and a Somerset storefront.</p>
        <p>Web designer serving Monticello, Albany, Somerset, Jamestown, Burnside, and all of Wayne County, KY — plus the small towns up and down Lake Cumberland.</p>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-x-9 gap-y-8">
        {[
          ["I know your customers", "Your customers are folks at the marina, families heading to the lake, neighbors in town. I build sites that speak to them — not a generic template aimed at nobody."],
          ["Same-day phone calls", "Text me, call me, or stop me at Whitley City Diner. No support ticket queues, no overseas account manager, no waiting four days for a reply."],
          ["Built for Wayne County search", "I tune every site for the searches that actually matter here — 'food truck Monticello,' 'BBQ near Lake Cumberland,' 'barber Somerset KY.' Real local SEO, not buzzwords."],
          ["Money stays local", "Hiring a Monticello web designer means your investment stays in the community instead of funding a Silicon Valley SaaS subscription. Good for your business — good for the lake."],
        ].map(([title, body], i) => (
          <div key={i} className="border-l-2 border-[#3ddbd9] pl-4">
            <div className="font-semibold tracking-tight text-lg">{title}</div>
            <p className="mt-2 text-[14.5px] text-[#9aa6ad]">{body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-[#0a0c0f] border border-[#1a2225] p-8">
        <p className="text-[#8a9599]">Curious what a local build looks like?</p>
        <div className="flex flex-wrap gap-3 mt-4">
          <Link href="/work" className="btn btn-secondary">Browse my work</Link>
          <Link href="/quote" className="btn btn-primary">Start a project</Link>
        </div>
      </div>

      <p className="text-center text-[12.5px] mt-10 text-[#9aa6ad]">Forged in Monticello, Kentucky. Independently owned. No agency middlemen.</p>
    </div>
  );
}
