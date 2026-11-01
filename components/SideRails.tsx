import Link from "next/link";
import SocialLinks from "./SocialLinks";
import { site } from "@/lib/site";

/** Floating social links (left) and quick contact (right), shown on large screens. */
export default function SideRails() {
  return (
    <>
      <div className="side-rail side-rail-left" aria-label="Social links">
        <SocialLinks className="flex-col" />
      </div>
      <div className="side-rail side-rail-right">
        <a href={`mailto:${site.contactEmail}`} className="social-link h-10 w-10" aria-label={`Email ${site.contactEmail}`}>
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        </a>
        <Link href="/contact" className="quote-tab">
          Get a quote
        </Link>
      </div>
    </>
  );
}
