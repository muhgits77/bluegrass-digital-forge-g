import type { Metadata } from "next";
import Link from "next/link";
import DemoLiveLink from "@/components/DemoLiveLink";
import { Check, CopperButton, Eyebrow, GhostButton, PageHero, StoreButton, TownsBand } from "@/components/site/ui";
import { canonicalUrl } from "@/lib/constants";
import { loadLivePublicDemosCatalog } from "@/lib/demos";

export const metadata: Metadata = {
  title: "Web Design Pricing – Monticello KY & Lake Cumberland",
  description: "Flat-price websites for Wayne, Pulaski, Russell & McCreary County businesses. Starter Sites from $1,200, Business Suites $2,500–$4,500. No monthly lock-in.",
  keywords: ["Monticello KY website designer", "Lake Cumberland business websites", "food truck website Kentucky", "Wayne County web design", "Monticello KY web design pricing", "Somerset KY web design", "Russell Springs KY web design", "McCreary County web design"],
  alternates: { canonical: canonicalUrl("/services") },
  openGraph: {
    title: "Web Design Pricing – Monticello KY & Lake Cumberland",
    description: "Flat-price websites for Wayne, Pulaski, Russell & McCreary County businesses. Starter Sites from $1,200, Business Suites $2,500–$4,500. No monthly lock-in.",
    url: canonicalUrl("/services"),
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og-default.png"] },
};

const starterFeatures = [
  "Up to 4 pages (Home, Menu/Services, About, Contact)",
  "Mobile-first design",
  "Tap-to-call / directions / contact form",
  "Domain & hosting setup",
  "Google Business Profile basics",
  "30 days of post-launch tweaks included",
];

const businessFeatures = [
  "Up to 10 pages fully custom",
  "Online menu/schedule/gallery",
  "Booking/lead forms",
  "Google Business + local SEO",
  "Review collection + analytics",
  "Photo touch-ups & branding",
  "Branded email/social graphics",
  "60 days post-launch tweaks",
];


const careBullets = [
  "Fast, secure hosting + SSL",
  "Uptime monitoring & monthly backups",
  "Small content updates anytime (text, photos, menus)",
  "Plugin & security updates",
  "Priority email response",
  "Cancel anytime — no contract",
];

const faqs = [
  { q: "How long does a site take?", a: "Most Starter Sites launch in about 2 weeks. Business Suites usually 3–5 weeks once we've got photos and content." },
  { q: "Do I have to use your hosting?", a: "Nope. The $79/mo care plan is optional. You can host wherever you want — direct hosting usually runs $10–20/month from the provider." },
  { q: "Can I update the site myself?", a: "Absolutely. I'll show you how to update content, photos, and menus on a quick screen-share. Or let me handle it on the care plan." },
  { q: "What if I just need a one-page site?", a: "If a single page is genuinely all you need, a Starter Site starting at $1,200 covers it with room to spare." },
  { q: "Do you work outside Monticello?", a: "Most clients are around Wayne County and Lake Cumberland — Jamestown, Burnside, Nancy, Russell Springs, Albany, Somerset, and the ramp towns in between. Whitley City and McCreary County too. Outside the area? Custom work is available anywhere by email, or grab a ready-made template from bluegrasstemplates.com." },
  { q: "Do I own the website when it’s done?", a: "Yes. Full ownership of the site and code after payment. Flat one-time pricing for the build — no monthly retainer required to keep what you paid for. Optional care plan if you want ongoing help; host it yourself if you don’t." },
  { q: "What if I just need a logo or business cards?", a: "Branding add-ons (logo work and business cards) can be bought on their own — no website required. Just ask when you get in touch." },
];

const niches: { label: string; title: string; body: string; href: string; cta: string; external?: boolean }[] = [
  { label: "Marinas", title: "Docks that book slips & rentals online.", body: "Burnside, Lee's Ford, State Dock, Conley Bottom & more.", href: "/marina-websites", cta: "Marina websites →" },
  { label: "Fishing guides", title: "Striper & bass sites that get bookings.", body: "Trip pages, captain bios, trophy galleries.", href: "/fishing-guide-websites", cta: "Guide websites →" },
  { label: "Food trucks", title: "“Where We Are Today” from your phone.", body: "Real-time location, menus & festivals.", href: "/food-truck-websites", cta: "Food truck websites →" },
  { label: "Lake houses", title: "Rental sites for lake houses.", body: "Calendars, galleries, house rules, and direct booking.", href: "/lake-house-rental-websites", cta: "Lake house websites →" },
  { label: "Bait & boats", title: "Bait shops and rental docks.", body: "Live bait, hours, fleet cards, fishing reports.", href: "/bait-and-tackle-websites", cta: "Bait and boat websites →" },
  { label: "Contractors", title: "Plumbers, roofers, HVAC and trades.", body: "Tap-to-call, service lists and quote forms.", href: "/contractor-websites", cta: "Contractor websites →" },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default async function Services() {
  const { demos } = await loadLivePublicDemosCatalog();
  const bySlug = new Map(demos.map((d) => [d.slug.toLowerCase(), d]));
  const fiesta = bySlug.get("fiesta-taqueria");
  const hickory = bySlug.get("hickory-forge-steakhouse");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero eyebrow="Services & pricing — Monticello KY website designer" title="Website Services & Flat Pricing">
        Flat-rate pricing. One-time. No surprises. When we&apos;re done, <strong className="text-foreground">you own the code.</strong>
      </PageHero>

      <section className="mx-auto grid max-w-5xl gap-6 px-5 pb-8 md:grid-cols-2">
        <div className="relative flex flex-col rounded-3xl border border-border bg-card p-8">
          <h2 className="font-display text-2xl font-bold">Starter Sites</h2>
          <p className="text-muted-foreground">Food trucks, barbers &amp; small shops</p>
          <p className="mt-6 font-display text-5xl font-bold">
            $1,200<span className="mt-2 block font-sans text-sm font-normal text-muted-foreground">starting at · one-time</span>
          </p>
          <ul className="mt-6 space-y-2 text-sm">{starterFeatures.map((f) => <Check key={f}>{f}</Check>)}</ul>
          <div className="mt-auto pt-8">
            <CopperButton href="/quote">Start a Starter Site →</CopperButton>
            <p className="mt-3 text-sm text-muted-foreground">
              See it live: <DemoLiveLink demo={fiesta} className="text-primary">{fiesta?.title || "Food truck"} demo</DemoLiveLink>
            </p>
          </div>
        </div>
        <div className="relative flex flex-col rounded-3xl border border-primary bg-card p-8">
          <span className="bg-copper absolute -top-3 right-6 rounded-full px-3 py-1 text-xs font-bold text-primary-foreground">MOST POPULAR</span>
          <h2 className="font-display text-2xl font-bold">Business Suites</h2>
          <p className="text-muted-foreground">Restaurants, shops &amp; co-ops</p>
          <p className="mt-6 font-display text-3xl font-bold">
            $2,500–$4,500<span className="mt-2 block font-sans text-sm font-normal text-muted-foreground">one-time · most local suites land in this range</span>
          </p>
          <ul className="mt-6 space-y-2 text-sm">{businessFeatures.map((f) => <Check key={f}>{f}</Check>)}</ul>
          <div className="mt-auto pt-8">
            <CopperButton href="/quote">Start a Business Suite →</CopperButton>
            <p className="mt-3 text-sm text-muted-foreground">
              See the example: <Link href="/work/hickory-forge-steakhouse" className="text-primary">Hickory Forge write-up</Link>
              {" · "}
              <DemoLiveLink demo={hickory} className="text-primary">live demo</DemoLiveLink>
            </p>
          </div>
        </div>
      </section>
      <p className="mx-auto max-w-3xl px-5 pb-20 text-center text-sm text-muted-foreground">
        Not sure which one? <Link href="/quote" className="text-primary">Tell me about your business</Link> — I&apos;ll recommend the right fit. Kentucky base rates for Wayne, Pulaski, Russell &amp; McCreary counties. Final quote depends on scope.
      </p>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="grid items-center gap-10 rounded-3xl border border-border bg-card p-10 md:grid-cols-2">
          <div>
            <Eyebrow>Prefer DIY? Website templates from $129</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold">Build it yourself from a ready-made template.</h2>
            <p className="mt-4 text-muted-foreground">
              Website templates from <strong className="text-foreground">$129</strong>, calculators from <strong className="text-foreground">$99</strong>. One-time purchase, free updates for bug fixes and refinements. Custom work is also available anywhere by email.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 md:items-end">
            <StoreButton>Browse templates ↗</StoreButton>
            <a href="https://bluegrasstemplates.com/calculator-templates" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary">Calculator templates ↗</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <h2 className="font-display text-3xl font-bold">Built for every kind of lake business</h2>
        <p className="mt-3 text-muted-foreground">Also see <Link href="/restaurant-websites" className="text-primary">restaurant websites</Link>.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {niches.map((n) => (
            <div key={n.label} className="rounded-2xl border border-border bg-card p-6">
              <Eyebrow>{n.label}</Eyebrow>
              <h3 className="mt-3 font-display text-xl font-bold">{n.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{n.body}</p>
              <Link href={n.href} className="mt-3 inline-block text-sm font-semibold text-primary">{n.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-20 text-center">
        <Eyebrow>Optional care plan</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold">I&apos;ll keep it running. You run your business.</h2>
        <p className="text-copper mt-6 font-display text-6xl font-bold">$79<span className="text-2xl">/month</span></p>
        <p className="mt-4 text-muted-foreground">{careBullets.join(", ")}. Totally optional.</p>
        <p className="mt-4 text-sm text-muted-foreground">Need a logo or business cards too? Branding add-ons are available — just ask when you get in touch.</p>
      </section>

      <TownsBand />

      <section className="mx-auto max-w-3xl px-5 py-20">
        <h2 className="font-display text-3xl font-bold">FAQ</h2>
        <div className="mt-6 divide-y divide-border">
          {faqs.map((f) => (
            <details key={f.q} className="py-4">
              <summary className="cursor-pointer font-semibold">{f.q}</summary>
              <p className="mt-2 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <CopperButton href="/quote">Get a free recommendation →</CopperButton>
          <GhostButton href="/work">See real demos first</GhostButton>
        </div>
      </section>
    </>
  );
}
