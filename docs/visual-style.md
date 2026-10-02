# Website visual style — 2026-10-03

Reference review: https://www.bitfinex.com/ and TOS homepage revision `26c48d5` (the earlier Bitfinex-inspired design).

The current reference uses Inter body typography, condensed display headings, a #0D1D29 content background, dark hero/header surfaces, #03CA9B accents, and solid #01A781 primary actions. The earlier TOS implementation used Inter with Montserrat headings and the same dark-blue/green palette.

## Current TOS choices

- Inter for body text, navigation, feature labels, and card titles.
- DIN Condensed when locally available, otherwise open-source Barlow Condensed for Latin display headings. The site does not redistribute the reference site's font files.
- Uppercase English H1/H2; Chinese, Japanese, and Korean use system fallback fonts and normal tracking, with their own responsive H1 size.
- Content background #0D1D29; hero/header/footer #07020F; inset surfaces #102330 and #172D3E.
- Green accents #03CA9B; solid primary buttons #01A781 with dark text for readable contrast. Buttons and dropdowns use 4px corners. Content cards and panels use 20px corners, 1px rgba(3, 202, 155, 0.2) outlines, and 30px interior spacing (24px on mobile), following the reference homepage’s performance cards. Gradient action buttons and button glow are removed.
- The four supplied feature artworks use transparent PNG fallbacks and optimized transparent WebP sources to fit the new background. Text labels remain in HTML for all languages.
- The restored Digital Dawn player and the blockchain narrative remain available.

## Verification

Reviewed desktop and mobile screenshots. Checked nine top-level pages at a 390px viewport for clipping and overflow; checked four homepage languages at 320px and additional widths 375, 430, 844 landscape, and 1440 desktop. No page overflow or clipped primary copy was observed.

Sampled contrast ratios: secondary text on content background 8.02:1; body text on tinted surfaces 11.59:1; button label on solid green 6.68:1; green accent on content background 8.10:1. This is a design review with representative contrast checks, not an exhaustive accessibility certification.

Content panel follow-up: replaced line-only feature cards and mixed panel treatments with #0B1923 cards. Focused architecture and transfer panels use #13454C; roadmap items now use the same content card surface. Controls and status badges retain the separate 4px radius.
