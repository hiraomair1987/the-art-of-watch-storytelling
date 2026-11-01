/* eslint-disable @next/next/no-img-element */
import { LOGO_PATH, LOGO_VIEWBOX } from "@/lib/logo";
import { site } from "@/lib/site";

/**
 * The ev mark. By default it's a vector traced from your logo and takes its
 * colour from the surrounding text. If you set `site.logoFile`, your own file
 * is shown instead, scaled to fit without changing its proportions.
 */
export default function LogoMark({ className = "" }: { className?: string }) {
  if (site.logoFile) {
    return <img src={site.logoFile} alt="" className={`object-contain ${className}`} />;
  }
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} aria-hidden="true">
      <path d={LOGO_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
