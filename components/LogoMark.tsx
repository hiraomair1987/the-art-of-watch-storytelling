import { LOGO_PATH, LOGO_VIEWBOX } from "@/lib/logo";

/** The ev mark. Inherits colour from `currentColor`. */
export default function LogoMark({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <path d={LOGO_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
