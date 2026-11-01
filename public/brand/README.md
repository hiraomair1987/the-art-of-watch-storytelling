# Your brand files go here

Anything in this folder is served at `/brand/<file name>` on the website.

| File | What it's for | How to switch it on |
| --- | --- | --- |
| `logo-original.webp` | The logo you sent (kept for reference) | Not used directly — the site uses a sharp vector copy of it |
| `logo.svg` or `logo.png` (add it) | Your own logo file, if you'd rather use it than the built-in vector | In `lib/site.ts` set `logoFile: "/brand/logo.svg"` |

Tips
- An SVG logo stays sharp at every size. A PNG should be at least 512 px tall with a transparent background.
- The logo keeps its proportions automatically; you only need to supply the file.
- The site has a dark background, so a light or white version of the logo reads best.
