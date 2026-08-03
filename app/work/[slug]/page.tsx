import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DemoLanding, { resolveRelatedCards } from "@/components/DemoLanding";
import { getPublicDemoBySlug } from "@/lib/demos";
import {
  getAllDemoLandingSlugs,
  getDemoLanding,
  HUB_DEMO_BLURBS,
} from "@/lib/demoLandings";
import { canonicalUrl } from "@/lib/constants";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Normalize dynamic segment: decode, trim, strip trailing slash-ish noise. */
function normalizeSlug(raw: string | undefined): string {
  if (!raw) return "";
  let s = raw;
  try {
    s = decodeURIComponent(s);
  } catch {
    // keep raw if decode fails
  }
  return s.trim().replace(/^\/+|\/+$/g, "").toLowerCase();
}

export function generateStaticParams() {
  return getAllDemoLandingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug: raw } = await params;
  const slug = normalizeSlug(raw);
  const content = getDemoLanding(slug);
  const demo = getPublicDemoBySlug(slug);

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
  const slug = normalizeSlug(raw);
  const content = getDemoLanding(slug);
  const demo = getPublicDemoBySlug(slug);

  // Both pieces required: first-party landing copy + demo record in lib/demos.ts
  if (!content || !demo) {
    notFound();
  }

  const related = resolveRelatedCards(content.relatedSlugs, HUB_DEMO_BLURBS);

  return (
    <DemoLanding demo={demo} content={content} related={related} />
  );
}
