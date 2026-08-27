# Design remediation tasks

Source: HIG-based design review of tos.network, 2026-08-28. Findings are grouped
by what they fix, not by the order they were found. Each task names the guideline
it answers so the reasoning survives after the diff is merged.

Severity follows the review: Critical breaks the page for some visitors,
High is significant friction, Medium is polish.

**Status: all tasks done except G2, which needs design source files.**
Measured after the change, on the homepage at 1440x900: motion toggle 44x44 at
12.64:1 (was 38x38 at 2.34:1), scene label 12px at 9.63:1 (was 10px at 6.18:1),
headline 20.26:1, lede 13.96:1, eyebrow 9.57:1, nav links 36.4px tall (was
22.4px), 25 focusable elements with 0 missing a focus ring, and 6 visible text
elements in `<main>` where there had been 1.

---

## A. Homepage information layer

The homepage renders a full-viewport animated canvas and nothing else. Its
headline and description are marked `visually-hidden`, so the only visible text
in `<main>` is a 10px decorative label. Screen readers get the copy; everyone
else does not.

| # | Task | Severity | Guideline |
|---|------|----------|-----------|
| A1 | Done. Restore a visible hero copy layer: eyebrow, h1, lede, two CTAs | Critical | Branding — "Ensure branding always defers to content" |
| A2 | Done. Demote the canvas to a background layer; add a scrim so copy stays legible over it | Critical | Color — "Consider how artwork and translucency affect nearby colors" |
| A3 | Done. Ensure the page still carries content when the canvas is hidden under `forced-colors: active` | Critical | Accessibility — interfaces must be perceivable |
| A4 | Done. Fade the canvas into the footer so the composition is not cut mid-shape | High | Layout — keep important visual content visible |
| A5 | Done. Give the mobile viewport a composition that fits rather than a scaled-down crop | High | Layout — adapt gracefully to context changes |

A1 reuses `portal.eyebrow`, `portal.title`, `portal.lede`, `portal.ctaOverview`
and `portal.ctaProtocol`, which already exist and are fully translated in
zh/ja/ko but are referenced by no markup. No new translation debt.

## B. Controls and accessibility

| # | Task | Severity | Guideline |
|---|------|----------|-----------|
| B1 | Done. Motion toggle: 2.34:1 contrast and 38px box → ≥4.5:1 and 44px | Critical | Accessibility — 4.5:1 minimum; 44pt default control size |
| B2 | Done. Primary nav links have a 22.4px hit height | Medium | Accessibility — desktop default control size 28×28 |
| B3 | Done. Declare `color-scheme: dark`; only `terms.html` does today | High | Dark Mode — respect the appearance the interface commits to |

## C. Color and material

| # | Task | Severity | Guideline |
|---|------|----------|-----------|
| C1 | Done. `--blue #299a99` reaches only 4.68:1 on `--navy-800` | High | Dark Mode — "strive for a contrast ratio of 7:1, especially in small text" |
| C2 | Done. `--muted` on card surfaces reaches 6.53:1 | High | Dark Mode — same 7:1 target |
| C3 | Done. Scene label glass is `blur(5px)` over `rgba(3,10,24,0.18)` — under both variants' floors | Medium | Liquid Glass — clear variant is blur 10–20px, opacity 0.3–0.5 |
| C4 | Done. Scene label uses glass in the content layer for a decorative, non-interactive element | Medium | Liquid Glass — "Don't use Liquid Glass in the content layer" |
| C5 | Done. Scene label sets 10px type at 62% alpha | High | Typography — 10pt is the desktop floor, not a working size |
| C6 | Done. The `::after` tick reads as a broken border rather than an accent | Medium | Layout — visual hierarchy |

## D. Writing consistency

The same three-button CTA row appears twice in `overview.html` with a different
third label, a different aria-label, a missing i18n key, and two different
source encodings for the same arrow glyph.

| # | Task | Severity | Guideline |
|---|------|----------|-----------|
| D1 | Done. Unify the FreeCity CTA label; add the missing `data-i18n` | Medium | Writing — "Build language patterns" |
| D2 | Done. Use a verb in every CTA label | Medium | Writing — "Be action oriented" |
| D3 | Done. Unify the two aria-labels for the same destination | Medium | Writing — consistency |
| D4 | Done. Use one source encoding for the arrow glyph | Low | — |

## E. Layout

| # | Task | Severity | Guideline |
|---|------|----------|-----------|
| E1 | Done. Footer disclaimer is centered while everything around it is left-aligned | Medium | Layout — "Align components with one another" |
| E2 | Done. Footer grid leaves a wide dead column under the brand | Medium | Layout — grouping and alignment |
| E3 | Done. Background mesh lines cross headline and body copy on the content pages | Medium | Color — artwork must not degrade nearby text |

## F. Brand consistency

| # | Task | Severity | Guideline |
|---|------|----------|-----------|
| F1 | Done. `terms.html` ships its own inline design system: Inter/Manrope and a blue accent against the site's Archivo/IBM Plex and green | High | Typography — "Minimize the number of typefaces you use" |

## G. Hygiene

| # | Task | Severity | Notes |
|---|------|----------|-------|
| G1 | Done. 10 stylesheets in `css/` were referenced by no page, including a 333KB vendor sheet | Low | Removed with the 10 images only that vendor sheet used; 612KB total. `DAG.md` still documents `components.css` alongside a `js/dag-animation.js` that no longer exists |
| G2 | Deferred. No `@2x` variants for the remaining bitmap assets | Low | Needs design source files; tracked, not done in this pass |

---

## Notes for the next change

The homepage headline is a single short line in all four languages, so it needs
no authored `<br>` and no per-language space convention. (An earlier revision
carried both; if a multi-line headline ever returns, note that dropping a `<br>`
at narrow widths runs the halves together in the space-using languages.)

`portal.eyebrow` and `portal.lede` are translated in zh/ja/ko but no longer
referenced by any markup — the homepage was cut back to a headline plus two
calls to action. They are kept rather than deleted in case the longer treatment
returns.

The homepage copy set (`portal.eyebrow`, `portal.title`, `portal.lede`,
`portal.ctaOverview`, `portal.ctaProtocol`) was already fully translated in
`js/i18n.js` and referenced by no markup. It is now in use. English lives in the
HTML, because the `en` dictionary is intentionally empty.

## Deployment checklist

Per `CLAUDE.md`, every change here must satisfy:

- [x] Changed `css/*.css` → bump that sheet's `?v=` on every HTML that links it
      (`investor-home`, `design-system`, `agentic-portal` → `20260828a`)
- [x] Changed `js/*.js` → bump that file's `?v=` on every `<script>` that loads it
      (`i18n.js` → `20260828a`, for the Korean headline change)
- [x] New `<img>` → explicit `width`/`height` (`terms.html` logo)
- [ ] Deploy with `--branch=master`, never `--branch=main`
- [ ] Verify the returned hash URL first, then `tos-homepage.pages.dev`, then `tos.network`

---

# Round 2 — aesthetic system audit (2026-08-28)

The first pass fixed defects. This pass asks whether the visual language is a
*system*, which is what separates a competent dark site from an Apple-grade one.
It is not: `design-system.css` declares a modular scale that the rest of the CSS
overwhelmingly bypasses.

Measured before this round:

| Dimension | Declared | Actually in use |
|---|---|---|
| Type scale | 7 fluid steps | **~170 hardcoded px across 30 distinct values**; `var(--step-*)` used 25 times |
| Spacing | 2 tokens | **63 distinct px values**; only ~40% land on a 4px grid |
| Tracking | — | **20 distinct letter-spacing values** |
| Icons | — | **5 techniques in one viewport**, 2 SVG stroke weights |
| Font weights | 500/600/700/800 | Archivo 700==800==900 and Plex Sans 600==700==800==900 render identically |

| # | Task | Severity | Guideline |
|---|------|----------|-----------|
| H1 | Done. Align declared font weights with the faces actually loaded | Critical | Typography — weight is a hierarchy tool only if it renders |
| H2 | Done. Add metric-override fallback for the display face; headline reflows 4.1% (30px at 62px) on swap | Critical | Loading — "The best content-loading experience finishes before people become aware of it" |
| H3 | Done. Unify the icon set: one vector technique, one stroke weight, two sizes | Medium | Icons — "consistent size, level of detail, stroke thickness, and perspective" |
| H4 | Done. Collapse 20 letter-spacing values to 4 purposeful ones | Medium | Typography — hierarchy through deliberate, repeatable choices |
| H5 | Done. Replace 30 ad-hoc font sizes with a semantic type ladder | High | Typography — "text styles form a typographic hierarchy" |
| H6 | Done. Replace 63 ad-hoc spacing values with a spacing scale | High | Layout — negative space is how grouping is expressed |

H5 and H6 touch every page. The user was told they carry regression risk on
pages not individually reviewed, and asked for them anyway. Mitigation: map each
existing value to its *nearest* rung so per-element drift stays within ~2px, and
diff every page visually before and after.


## Round 2 result

| Dimension | Before | After |
|---|---|---|
| Distinct font sizes | 30 site-wide | 11-rung ladder; 7-11 rendered per page |
| Distinct spacing values | 63 | 11-rung ladder |
| Letter-spacing values | 20 | 5 (including `0`) |
| Icon techniques on the homepage | 5 | 2 (SVG + text-glyph arrows) |
| Optical icon stroke | 1.25 / 1.41 / 1.5px | 1.41-1.42px |
| Weight declarations that do not render | 47 | 0 |
| Headline reflow on font swap | 4.1% | metric-matched fallback |

Page height drift from the migration, measured at 1440px: index +0.1%,
overview -4.8%, platform -2.9%, foundation -3.0%, token -1.0%, roadmap -1.2%,
terms +0.9%. No page has a heading hierarchy inversion; several did before.

### Two things this round changed on purpose

**Heading hierarchy was inverted before the migration and is not now.** On
`overview.html` and `platform.html` several section `h2` rules rendered larger
than the page `h1` (76px against 48px). The ladder made that visible, and eight
`h2`/`h3` rules were demoted a rung so the page title outranks its sections.

**Text-glyph arrows were kept, not converted to SVG.** `icons.md` asks that
icon weight match adjacent text; a text glyph does that by construction, and
converting 39 of them across six pages would have been a large markup change
for no gain. The two genuine offenders were fixed instead: the pause control
was drawn with `border: 3px double` (renders unevenly at fractional device
pixel ratios) and is now an SVG, and the caret's stroke is set to 1.7 so it
lands at the same *optical* weight as the globe rather than the same declared
number.

### Weight policy

The heaviest face actually loaded is Archivo 700 and IBM Plex Sans 600. CSS was
normalised down to those rather than adding the missing faces, so the rendered
result is unchanged and the declarations are now honest. **If a heavier weight
is ever wanted, add the face to the Google Fonts request first** — declaring
`700` on the body font silently renders 600.


## Homepage copy reduction (2026-08-28, later)

The eyebrow, the two-line headline and the lede were replaced with one line:
"Building for the Agentic Internet." The scrim that had been protecting that
block was doing real damage — at 0.95 it blacked out the third of the scene
where the Web2 actors live, and its bottom gradient ran 27% up the frame and
flattened the perspective floor.

Liquid Glass puts the dimming layer for content over bright media at about 35%.
The scrim now peaks at 0.58 and clears to transparent at 64% of the width, the
bottom gradient covers 16% instead of 27%, and the legibility those values no
longer provide is carried by a text-shadow on the headline and by a fill on the
secondary button. Measured over the headline's own area at 1440px: mean
contrast 18.4:1.

The principle: protect the glyphs, not the region. A dimming layer that hides
the artwork it sits on has stopped being a material and become a backdrop.
