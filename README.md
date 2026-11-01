# efficiovirtual

A 3D scroll-driven storytelling site for efficiovirtual.com, a digital marketing agency. Built with Next.js 14 (App Router), Tailwind CSS and three.js.

## Pages

| Route | What's there |
| --- | --- |
| `/` | Six-chapter story: opening → the challenge → our approach → our services → the outcome → let's talk (contact form) |
| `/services/[slug]` | One page per service (Google Ads, Marketing Automation, 3D Websites, Landing Pages, Creative Design) |

Copy lives in `lib/content.ts`; nav, site URL and contact email in `lib/site.ts`.

## How the 3D works

- `components/Scene.tsx` is one fixed WebGL canvas behind every page: glass panels, a luminous thread, a glowing core, five service objects and a particle field.
- Each chapter on the home page is a `<section data-chapter data-state-start data-state-end>`. The scene measures them and maps scroll position to a story value `t`. It holds while a chapter is pinned on screen and eases to the next layout as the next chapter comes in.
- Mouse: subtle camera parallax, and service objects tilt toward the cursor while their card is hovered or focused. Touch: no cursor effects; scroll speed adds a gentle sway, and the service card in the middle of the screen lights up its object.
- `prefers-reduced-motion`: no idle motion, no parallax and no reveal slides. The scene switches between chapter layouts without in-between motion and only renders when something changes.
- No WebGL: the canvas never appears and the CSS violet-on-plum background carries the page. three.js loads after hydration, so text, navigation and the form never wait for it.

## Contact form

The form opens the visitor's email app with the message filled in, addressed to `NEXT_PUBLIC_CONTACT_EMAIL` (default `admin@efficiovirtual.com`). Service pages link to `/?service=<slug>#contact`, which preselects that service.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```
