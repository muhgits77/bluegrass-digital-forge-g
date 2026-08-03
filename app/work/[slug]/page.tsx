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

export function generateStaticParams() {
  return getAllDemoLandingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
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
  const { slug } = await params;
  const content = getDemoLanding(slug);
  const demo = getPublicDemoBySlug(slug);

  if (!content || !demo) {
    notFound();
  }

  const related = resolveRelatedCards(content.relatedSlugs, HUB_DEMO_BLURBS);

  return (
    <DemoLanding demo={demo} content={content} related={related} />
  );
}
