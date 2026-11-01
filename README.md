# efficiovirtual

A 3D storytelling website for **efficiovirtual**, a digital marketing agency (Google Ads, marketing automation, 3D websites, landing pages, creative design).

Built with Next.js 14 (App Router), Tailwind CSS and Three.js.

## Pages

| Route | What's there |
| --- | --- |
| `/` | The scroll story: Opening → Challenge → Approach → Services → Outcome → Let's talk (contact form) |
| `/services` | All five services |
| `/services/[slug]` | One page per service: what's included, how we work, who it suits |
| `/contact` | Contact form (`?service=<slug>` preselects a service) |

Copy lives in `lib/services.ts` (services) and `app/page.tsx` (homepage chapters). Brand name, nav and contact settings are in `lib/site.ts`.

## The 3D world

- `components/scene/world.ts`: plain Three.js. One scene of glass panels, luminous threads, glowing nodes and particles. Each chapter is a different arrangement of the same objects (`OPEN`, `SCATTER`, `ALIGN`, `APPROACH`, `SERVICES`, `OUTCOME`, `CLOSE`), and the "story" value blends between them.
- `components/scene/StoryScene.tsx`: maps scroll position to the story value. Each `[data-chapter]` section holds its arrangement while it fills the screen, and transitions happen around section boundaries. It also handles mouse parallax (fine pointers only), a gentle scroll-based sway on touch screens, and service focus events from the cards.
- Three.js is loaded with a dynamic import after the page renders, so the HTML is usable straight away.
- **Reduced motion:** no scroll-tied camera moves, idle float or parallax. The scene jumps to each chapter's resting composition and only re-renders when something changes.
- **No WebGL** (or context lost): a static CSS composition in the same palette is shown instead. All content is plain HTML, so nothing depends on the 3D layer.

## Contact form

- By default the form opens the visitor's email app, addressed to `NEXT_PUBLIC_CONTACT_EMAIL` (default `hello@efficiovirtual.com`).
- To receive submissions directly, set `NEXT_PUBLIC_FORM_ENDPOINT` to any endpoint that accepts a JSON POST (Formspree, Basin, a webhook). Fields sent: `name`, `email`, `company`, `service`, `message`.
- `NEXT_PUBLIC_SITE_URL` sets the canonical URL (default `https://efficiovirtual.com`).

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```
