import fs from "node:fs";
import path from "node:path";
import type { CaseStudy } from "./caseStudies";

/** True if a file exists in /public (checked when the site is built). */
export function publicFileExists(src?: string) {
  if (!src) return false;
  return fs.existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
}

/**
 * Removes image paths whose files haven't been uploaded yet, so the site shows
 * the branded placeholder instead of a broken image. Upload the file with the
 * exact name used in lib/caseStudies.ts and it appears on the next deploy.
 */
export function withAvailableImages(items: CaseStudy[]): CaseStudy[] {
  return items.map((c) => ({
    ...c,
    image: publicFileExists(c.image) ? c.image : undefined,
    gallery: c.gallery?.filter((g) => publicFileExists(g)),
    fullPage: publicFileExists(c.fullPage) ? c.fullPage : undefined,
  }));
}
