import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DemoLanding, { resolveRelatedCards } from "@/components/DemoLanding";
import {
  getLivePublicDemoBySlug,
  getPublicDemoBySlug,
  loadLivePublicDemosCatalog,
  normalizeDemoSlug,
} from "@/lib/demos";
import {
  getAllDemoLandingSlugs,
  getDemoLanding,
  HUB_DEMO_BLURBS,
} from "@/lib/demoLandings";
import { canonicalUrl } from "@/lib/constants";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllDemoLandingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug: raw } = await params;
  const slug = normalizeDemoSlug(raw);
  const content = getDemoLanding(slug);
  // Prefer live admin/Supabase demo so OG image + title track /admin
  const demo =
    (await getLivePublicDemoBySlug(slug)) ?? getPublicDemoBySlug(slug);

  if (!content || !demo) {
    return { title: "Example not found" };
  }

  const url = canonicalUrl(`/work/${slug}`);

  return {
    title: content.title,
    description: content.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: content.title,
      description: content.metaDescription,
      url,
      images: demo.image
        ? [
            {
              url: demo.image,
              alt:
                demo.imageAlt ||
                `${demo.title} website portfolio example`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.metaDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function WorkDemoPage({ params }: PageProps) {
  const { slug: raw } = await params;
  const slug = normalizeDemoSlug(raw);
  const content = getDemoLanding(slug);

  // Live catalog: admin href (and image/title) wins over DEFAULT_DEMOS
  const demo =
    (await getLivePublicDemoBySlug(slug)) ?? getPublicDemoBySlug(slug);

  if (!content || !demo) {
    notFound();
  }

  // Related cards also resolve titles/images from the live merged catalog when possible
  const { demos: liveCatalog } = await loadLivePublicDemosCatalog();
  const related = resolveRelatedCards(
    content.relatedSlugs,
    HUB_DEMO_BLURBS,
    liveCatalog
  );

  return <DemoLanding demo={demo} content={content} related={related} />;
}
