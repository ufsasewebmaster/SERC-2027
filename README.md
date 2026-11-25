# SERC 2027 website

The SASE Southeast Regional Conference 2027 site ("Unbox Your Potential"), built with Next.js, Tailwind CSS and Motion.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages are static)
```

## Editing content

**Almost everything lives in [`src/content/site.ts`](src/content/site.ts).** Team members live in [`src/content/team.ts`](src/content/team.ts), and partners live in [`src/content/partners.ts`](src/content/partners.ts). Search for `TODO` to find placeholders:

| What | Where |
| --- | --- |
| Planning team (name, position, major, photo, LinkedIn) | `src/content/team.ts` — photos go in `public/images/team/` |
| FAQs | `faqs` |
| Partners (name, logo, website) | `src/content/partners.ts` — logos go in `public/images/partners/` |
| Registration Google Form | `registration.formUrl` (public Google Form responder link) |
| Early-price deadline | `registration.lateDeadline` |
| Symposium application link | `symposium.applyUrl` (use the public `/viewform` link) |
| Symposium mascot button art | `symposium.mascotImage` |
| Contact email | `event.contactEmail` |

## Pages

- `/` — scrolling homepage: hero, About, What's in the box?, partner logos, team blind boxes, countdown, FAQs
- `/schedule` — conference timeline; edit times and activities in `src/content/schedule.ts`
- `/partners` — partner logo grid
- `/symposium` — research symposium + apply button

The registration ticket (`src/components/RegistrationTicket.tsx`) is mounted in the root layout, so it appears on every page. Any button can open it by calling `openTicket()` from `src/components/ticket-events.ts`.
