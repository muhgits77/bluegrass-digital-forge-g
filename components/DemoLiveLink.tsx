import Link from "next/link";
import type { Demo } from "@/lib/demos";
import { getExternalDemoHref } from "@/lib/demos";
import { hasDemoLanding } from "@/lib/demoLandings";

type DemoLiveLinkProps = {
  /** Demo record from loadLivePublicDemosCatalog / getLivePublicDemoBySlug */
  demo: Demo | undefined | null;
  className?: string;
  children: React.ReactNode;
  /** When true and no demo, render nothing instead of a dead link */
  hideIfMissing?: boolean;
};

/**
 * External “View live demo” / live site link driven entirely by admin demo data (href field).
 * Never hard-codes lovable/vercel URLs — pass the live-merged Demo from the data layer.
 */
export default function DemoLiveLink({
  demo,
  className,
  children,
  hideIfMissing = false,
}: DemoLiveLinkProps) {
  const href = getExternalDemoHref(demo);
  if (!href) {
    if (hideIfMissing) return null;
    return <span className={className}>{children}</span>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

type DemoPortfolioLinkProps = {
  demo: Demo | undefined | null;
  /** Fallback path when demo missing, e.g. /work */
  fallbackHref?: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Same-site portfolio landing when available, else external live demo href from admin.
 */
export function DemoPortfolioOrLiveLink({
  demo,
  fallbackHref = "/work",
  className,
  children,
}: DemoPortfolioLinkProps) {
  if (!demo) {
    return (
      <Link href={fallbackHref} className={className}>
        {children}
      </Link>
    );
  }

  const hasLanding = hasDemoLanding(demo.slug);
  if (hasLanding) {
    return (
      <Link href={`/work/${demo.slug}`} className={className}>
        {children}
      </Link>
    );
  }

  const href = getExternalDemoHref(demo) || fallbackHref;
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
