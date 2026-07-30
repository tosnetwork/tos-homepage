# TOS Network Homepage — Independent Final Review

**Review date:** 2026-07-30
**Repository:** `https://github.com/tosnetwork/tos-homepage`
**Target:** `63f268ebeda3c6c0bbc5fab4fd2c4f007c494c3f` — `Refine investor homepage and mobile experience`
**Verdict:** **Not ready**

## Executive conclusion

The target is visually coherent, substantially more candid than a typical
crypto landing page, and internally consistent with the latest TOS technical
direction. Its main layout survived every requested viewport in Linux
Playwright WebKit 26.5 and Chromium 151 without document-level horizontal
scroll, section overlap, or footer/player collision. The initial page does not
request the 6.3 MiB MP3, the production origin supports byte ranges, automated
Axe found no definite violations in the initial state, and the core/product
maturity distinction agrees with the latest TOS repository and whitepaper.

It is not ready for final deployment because two deterministic failure paths
remain:

1. failure of the 3 KiB main controller script leaves every one of the 41
   `.reveal` elements invisible, including the full hero and investment thesis;
2. an MP3 404/unsupported-source failure produces an unhandled promise
   rejection while the UI and accessible name falsely say that playback is
   active.

There are also material, reproducible deficiencies in the player's keyboard,
screen-reader, contrast, reduced-motion, and battery behavior; the FAQ's
visual/accessibility state; mobile-menu state after rotation; and the
institutional due-diligence path.

### Finding count

| Severity | Count |
|---|---:|
| Blocker | 0 |
| High | 2 |
| Medium | 4 |
| Low | 4 |

## Scope, method, and limitations

Before testing, the requested commands were run successfully:

```text
git checkout master
git pull --ff-only origin master
```

`HEAD`, `origin/master`, and the requested target all resolved to
`63f268ebeda3c6c0bbc5fab4fd2c4f007c494c3f`.

The homepage was served unchanged with Python's static HTTP server. Testing
used:

- Linux Playwright WebKit 26.5 (real WebKit engine, not Chromium with a Safari
  user agent);
- Playwright Chromium 151 as a comparison engine and for Chrome-only lab
  performance instrumentation;
- Axe Core 4.10.2;
- Lighthouse 13 mobile simulated throttling;
- HTML Validate 10.11.0;
- direct HTTP header, byte-range, hash, file-format, and link checks;
- manual code review and accessibility-tree inspection;
- a read-only cross-check against TOS `main` at
  `f0c1e857f8275ae0eedff3c9553e99361154502d`, including the repository README,
  the implementation plan, physical-AI, storage, local-GPU, local-model,
  inference-domain, AI Edge Terminal, and TOS Sites material;
- the 19-page `pdf/tos.pdf` in the target, whose SHA-256 is
  `cdcf977202d53131bb5461748c80997baa3acc9fad1d2b8d21c665c7e38abdba`.

### Apple-platform limitation

No macOS host, real iPhone/iPad, Safari application, Safari Responsive Design
Mode, or VoiceOver was available. Therefore:

- results labelled **WebKit executed** are Linux Playwright WebKit 26.5 with
  viewport/touch emulation;
- they are not presented as real iOS Safari, macOS Safari, or VoiceOver
  validation;
- Safari's real collapsing address bar, home indicator, notch/rounded-corner
  safe areas, Dynamic Type/text-size accessibility settings, browser zoom UI,
  hardware audio routing, and rotation lifecycle remain unverified on Apple
  hardware;
- viewport-height changes were simulated by resizing the WebKit viewport, not
  by driving Safari's browser chrome;
- a 720×450 reflow test was used as a 200%-zoom layout proxy, but it is not a
  real Safari 200% zoom test.

This limitation does not affect the two High findings: both were reproduced in
WebKit and are deterministic from the source.

## Findings

## Blocker

None.

## High

### H1 — Failure of `investor-home.js` makes all primary content invisible

**Files and lines**

- `index.html:25` adds `.js` synchronously in the document head.
- `css/investor-home.css:1647-1660` changes every `.js .reveal` element to
  `opacity: 0` until `.is-visible` is applied.
- `js/investor-home.js:58-78` is the only code that initializes the observer
  and makes reveal elements visible.
- `index.html:633` loads that controller as a separate, non-module script.

**Reproduction**

- Linux Playwright WebKit 26.5, 390×844.
- Abort only `js/investor-home.js`; allow HTML, CSS, fonts, images, and
  `tos-music.js` to load normally.

**Observable evidence**

- `<html>` retained class `js`.
- `.hero-copy` computed opacity was `0`.
- `.hero-thesis` computed opacity was `0`.
- visible reveal elements: **0 of 41**.
- The music button still appeared, proving that this was a partial asset
  failure rather than JavaScript being globally disabled.

With JavaScript fully disabled, the inline class mutation does not run and the
base `.reveal` rule remains visible. The catastrophic state occurs specifically
when JavaScript is enabled but the main controller is missing, blocked, cached
incompatibly, or throws before reveal initialization.

**User/business impact**

The homepage can render as a mostly empty shell despite valid HTML and CSS. A
transient CDN error, stale deployment, CSP mistake, or partial object-storage
upload can remove the value proposition and all diligence content from an
investor's first visit.

**Recommended fix**

Keep content visible by default. Add an enhancement class only after
`investor-home.js` has successfully installed its observer—for example
`reveal-ready`—and scope the hidden starting state to
`.reveal-ready .reveal`. A timeout/error fallback may remove that class, but
the safest baseline is never to make content visibility depend on a secondary
asset.

**Regression in `63f268e`?** No. The failure architecture predates this commit.

### H2 — Audio failure is unhandled and leaves a false “playing” state

**Files and lines**

- `js/tos-music.js:202-212` sets `playing = true`, resumes the `AudioContext`,
  calls `audio.play()` without awaiting or catching it, shows the bar, starts
  animation, and returns before playback success is known.
- `js/tos-music.js:226-233` reports the optimistic boolean to the caller.
- `js/tos-music.js:588-599` immediately changes the button to “Pause” and
  `is-playing`.
- `index.html:634` activates this player on the production homepage.

**Reproduction**

- Linux Playwright WebKit 26.5 and Chromium 151, 390×844.
- Fulfil `song/DigitalDawn.mp3` with HTTP 404 and click the music button once.

**Observable evidence**

- WebKit emitted an unhandled
  `NotSupportedError: The operation is not supported.`
- Chromium emitted an unhandled
  `NotSupportedError: Failed to load because no supported source was found.`
- In both engines the button's accessible label became
  `Pause Digital Dawn - TOS Network Theme Song`.
- In both engines the button retained `is-playing`, the lyrics bar retained
  `is-playing`, and `body` retained `music-player-open`.

The same control flow applies to decode failure, browser policy rejection, and
other rejected `HTMLMediaElement.play()` promises.

**User/business impact**

The interface lies about playback, screen-reader users hear the wrong state,
the page retains player padding/UI, and the console receives an unhandled
rejection. On iOS, where media and `AudioContext` policy is stricter, this is a
particularly risky state path even though real iOS Safari was not available.

**Recommended fix**

Make `play()` asynchronous and update `playing`, the accessible label, CSS
classes, lyrics bar, and animation only after both required resume/play
operations succeed. Catch failures, cancel animation, restore the Play state,
remove unnecessary body/player classes, and expose a concise status message.
Also listen for `error`, `abort`, and `stalled` as appropriate. Wrap
`createMediaElementSource()` because it can throw synchronously.

**Regression in `63f268e`?** Yes in deployed behavior. The unsafe player code
predated the target, but `index.html:634` first activates it on this homepage
in this commit, and the target adds the persistent UI/body state.

## Medium

### M1 — Player controls are not an accessible or reduced-motion-safe interaction

**Files and lines**

- `js/tos-music.js:110-138` creates the custom slider and global pointer/touch
  listeners.
- `js/tos-music.js:149-160` makes 48 lyric `<span>` elements clickable without
  keyboard semantics.
- `js/tos-music.js:257-274` creates the analyser and resize listener.
- `js/tos-music.js:509-562` runs lyric synchronization and canvas rendering on
  every animation frame.
- `css/investor-home.css:1516-1524` gives the slider a four-pixel physical
  height.
- `css/investor-home.css:1603-1631` uses very low-opacity text for inactive and
  past lyrics.
- `css/investor-home.css:2211-2228` reduces CSS animation but does not stop the
  JavaScript analyser/animation loop.

**Reproduction**

- Linux Playwright WebKit 26.5, 390×844, open the player and inspect its
  accessibility tree and geometry.
- Chromium 151, 390×844, run the player for two seconds under both
  `prefers-reduced-motion: no-preference` and `reduce`.

**Observable evidence**

- Slider geometry was **390×4 CSS px**, far below a usable touch height.
- All **48** clickable lyric spans had no role, no accessible name beyond raw
  text, and `tabIndex = -1`.
- The WebKit accessibility snapshot exposed the complete song as one long
  text run inside the player region, rather than a concise current-lyric
  status.
- Computed contrast for inactive lyrics was **1.79:1** and for past lyrics
  **1.23:1** against the player background, below 4.5:1 for normal text.
- The player scheduled **124** animation frames in two seconds normally and
  **123** with reduced motion enabled; after Pause, the count increased by
  zero. Thus cancellation works, but reduced-motion users still receive the
  continuous canvas/lyric loop while playing.
- Axe reported no definite player violation but left color contrast
  incomplete because of the layered/gradient background. The numeric contrast
  above was calculated from the actual CSS compositing values.

**User/business impact**

Touch seeking is unnecessarily difficult; keyboard users cannot activate the
lyric-specific seek actions; VoiceOver is likely to encounter a large,
low-signal block of lyrics; and reduced-motion users still receive a
continuous ~60 fps visualizer/track update. On a looping song, that work can
continue indefinitely and consume mobile battery.

**Recommended fix**

- Keep the visual line four pixels if desired, but give the slider a
  transparent hit box at least 44 CSS px high.
- Either make lyric seeking real buttons with keyboard behavior and visible
  focus, or remove click semantics and expose only the current lyric through a
  concise, non-chatty status mechanism. Hide non-current visual lyrics from
  the accessibility tree if they are decorative.
- Use compliant contrast for every meaningful/clickable lyric state.
- Under `prefers-reduced-motion: reduce`, disable the analyser/canvas and track
  animation; update the slider/current lyric from media events or a
  low-frequency timer. Pause animation when the document is hidden.

**Regression in `63f268e`?** Yes in production exposure. The underlying player
predated the target, but the target loads it and adds the new player styles and
ARIA surface.

### M2 — FAQ visual state and accessibility state disagree; no-JS users cannot reveal answers

**Files and lines**

- `index.html:533-577` provides five accordion buttons and answer containers
  without answer IDs or `aria-controls`.
- `css/investor-home.css:1293-1312` hides answers only through grid sizing and
  opacity.
- `js/investor-home.js:41-56` toggles only classes and `aria-expanded`.

**Reproduction**

- Linux Playwright WebKit 26.5, 390×844.
- Capture the first FAQ item's accessibility snapshot while collapsed and
  expanded.
- Reload with JavaScript disabled.

**Observable evidence**

- The collapsed accessibility snapshot already contained the full answer
  paragraph.
- The expanded snapshot contained the same paragraph; only the button gained
  `[expanded]`.
- With JavaScript disabled in WebKit, the first answer's visual height was
  **0 px** and no control could expand it.

**User/business impact**

Screen-reader users receive answers even when the control reports collapsed,
making the state misleading and navigation noisy. Users with disabled/failed
JavaScript cannot access any FAQ answer visually, including the statements on
current maturity and investment-return claims.

**Recommended fix**

Give every answer an ID; add `aria-controls`; and synchronize a real `hidden`
state (or an equivalent `inert`/visibility strategy) after the close
transition. For progressive enhancement, make answers visible in the base
CSS and apply the accordion's collapsed style only after its controller is
successfully initialized.

**Regression in `63f268e`?** No.

### M3 — Mobile menu state survives the 820 px rotation breakpoint and Escape does not restore focus

**Files and lines**

- `js/investor-home.js:13-39` toggles menu/body state and handles Escape but
  has no `resize`, `orientationchange`, or breakpoint synchronization.
- `css/investor-home.css:1740-1819` switches between desktop/mobile navigation
  and applies the body lock only below 820 px.

**Reproduction**

- Linux Playwright WebKit 26.5.
- Open the menu at 390×844, resize to 844×390, then return to 390×844.
- Separately, open the menu, Tab from the toggle to “Thesis”, and press Escape.

**Observable evidence**

- After returning to portrait, `aria-expanded` remained `true`,
  `.site-nav.is-open` remained present, `body.nav-open` remained present, the
  menu reappeared as a grid, and computed body overflow became `hidden`.
- At the 844 px desktop breakpoint, the toggle was hidden but still reported
  expanded internally.
- After Escape from the first menu link, focus fell to the document body
  rather than returning to the now-visible menu toggle.
- Escape did correctly close the menu, and the first Tab from an open toggle
  correctly reached “Thesis”.

**User/business impact**

An iPhone-class 844 px landscape transition can leave a hidden stale state and
unexpectedly reopen/lock the page when returning to portrait. Keyboard and
switch users lose their location after Escape.

**Recommended fix**

Use `matchMedia('(max-width: 820px)')` to close/reset the menu whenever the
navigation mode changes. On Escape, remember whether the menu was open and
focus the toggle after closing. Consider a small menu focus-management
contract so focus cannot be stranded in content that becomes `display:none`.

**Regression in `63f268e`?** Partly. The stale `is-open`/expanded state
predated the target; this commit adds `nav-open` and its scroll-lock effect.

### M4 — The “due diligence” path omits core institutional underwriting categories

**Files and lines**

- `index.html:495-523` offers only the whitepaper, implementation plan, and
  source repository as diligence links.
- `index.html:526-577` answers product-category, Physical AI, maturity,
  network-effect, and return-claim questions.
- `index.html:627-630` provides a legal disclaimer but no legal/entity or
  contact route.

**Reproduction**

- Read the page as an institutional investor and enumerate the evidence links
  available under the page's own “Underwrite the work” heading.
- Cross-check the linked README/plan, which explicitly says the service
  protocol and terminal products are planned and not commercially deployed.

**Observable evidence**

The page provides no diligence path for:

- operating/legal entity and jurisdiction;
- leadership/team accountability;
- current network environments and deployment status;
- security audits or an explicit “not yet audited” status;
- governance and monetary/token policy;
- financing/runway;
- customers, pilots, adoption, or an explicit “no figures disclosed” status;
- investor/contact process.

This is an absence, not a claim that any undisclosed fact is negative. The
three supplied technical links cannot answer organization, capitalization,
commercial validation, governance, or legal questions.

**User/business impact**

The technical narrative is credible enough to trigger diligence, but the
visitor reaches a dead end precisely where institutional underwriting begins.
That weakens the page's stated Wall Street/investor purpose despite the
quality of its product boundary disclosures.

**Recommended fix**

Add a concise diligence index with links or explicit status statements for
these categories. Do not invent team, customer, revenue, audit, or funding
data; “not disclosed on this site,” “not yet audited,” or “no commercial
metrics published” is preferable to ambiguity. Provide a controlled contact
route for qualified follow-up.

**Regression in `63f268e`?** No; this is a remaining content gap.

## Low

### L1 — Lab LCP is just outside the good threshold, primarily due to Google Fonts

**Files and lines**

- `index.html:28-30` loads third-party Google Fonts as a render-blocking
  stylesheet.
- `index.html:633-634` loads both scripts on every visit, including the
  optional 24,087-byte music player.

**Reproduction**

- Lighthouse 13, Chromium 151, mobile simulated throttling, cold cache, local
  unchanged target.

**Observable evidence**

- Performance score: **91**
- FCP/LCP: **2.8 s**
- CLS: **0.003**
- Total Blocking Time: **0 ms**
- Initial transfer: **199 KiB**
- Google Fonts transfer: **74,503 bytes**
- Lighthouse estimated the Google stylesheet as **811 ms** of render-blocking
  delay; the local CSS contributed **453 ms**.
- A short interaction lab trace observed a maximum interaction event duration
  of **40 ms**. This is a lab proxy, not field INP; Lighthouse did not emit an
  INP value for the navigation run.
- Blocking the Google stylesheet did not blank the hero or create horizontal
  overflow; fallback fonts rendered.

**User/business impact**

The result is close to good but exceeds the 2.5 s LCP target under this lab
profile. Fonts also disclose the visitor's connection to Google.

**Recommended fix**

Self-host and subset the required WOFF2 files, preload only the critical
weights, and retain `font-display: swap`. Consider deferring the optional
player script until idle or first interaction. Confirm with production-origin
lab and field data after deployment.

**Regression in `63f268e`?** Partly. Google Fonts predate the target; the target
adds the always-loaded player script.

### L2 — The 3:2 Vision image is a weak `summary_large_image` social asset

**Files and lines**

- `index.html:11-21` uses
  `https://tos.network/img/tos-network-vision.webp` for Open Graph and Twitter.
- `img/tos-network-vision.webp` is 1536×1024 (3:2) and contains extensive fine
  technical text.

**Reproduction**

- Center-crop the source to the common 1.91:1 large-card aspect and preview at
  600×314.

**Observable evidence**

- The crop removed the full top headline,
  “The Open Coordination and Settlement Network for AI Services and Physical
  Edge Intelligence.”
- Most secondary labels became too small for a typical feed card.
- The central “TOS NETWORK” mark remained visible.
- The absolute image URL currently returns 200 and its production hash matches
  the target, so reachability is not the problem.

**User/business impact**

Shares remain recognizable but lose the thesis headline and much of the
intended information hierarchy.

**Recommended fix**

Create a dedicated 1200×630 card with a short headline, logo, and safe margins.
Add `og:image:width`, `og:image:height`, `og:image:alt`, and
`twitter:image:alt`.

**Regression in `63f268e`?** No. This commit correctly improves the URL from
relative to absolute; the asset/aspect choice remains.

### L3 — Production headers lack CSP, HSTS, and framing policy

**Files and lines**

- `index.html:25` contains an inline script that a strict CSP must hash/nonce.
- `index.html:28-30` requires Google font origins unless fonts are self-hosted.
- `index.html:633-634` identifies the same-origin script requirements.
- Deployment-layer response headers have no repository line.

**Reproduction**

- Fetch `https://tos.network/` response headers on 2026-07-30 07:17 UTC.

**Observable evidence**

- Present: `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`.
- Absent: `Content-Security-Policy`, `Strict-Transport-Security`,
  `X-Frame-Options`/CSP `frame-ancestors`, and `Permissions-Policy`.

**User/business impact**

This is defense-in-depth rather than an observed exploit, but the public
investor site has weaker injection/framing/TLS-downgrade protection than it
could.

**Recommended fix**

Configure headers at Cloudflare/origin/static-host level. Prefer CSP with
`default-src 'self'`, narrowly scoped font/style origins (or self-host fonts),
`object-src 'none'`, `base-uri 'self'`, and `frame-ancestors 'none'`; hash the
inline class script instead of broadly allowing inline scripts. Add HSTS after
confirming every required subdomain is HTTPS-ready. Keep the two headers
already present.

**Regression in `63f268e`?** No; deployment configuration.

### L4 — Three generic `<div>` elements carry ignored/prohibited `aria-label`s

**Files and lines**

- `index.html:106` — product maturity.
- `index.html:196` — service transaction flow.
- `index.html:339` — network flywheel.

**Reproduction**

- Run HTML Validate 10.11.0 and inspect the accessibility tree.

**Observable evidence**

- HTML Validate emitted three `aria-label-misuse` errors at exactly those
  lines.
- The generic containers have no role that permits the supplied name, so the
  labels do not create the intended named group in the accessibility tree.
- Their descendant text remains readable, limiting severity.

**User/business impact**

Screen-reader users lose the intended group labels and receive a flatter,
less comprehensible sequence for two important explanatory diagrams.

**Recommended fix**

Use semantic structures: an ordered list for the five-step transaction flow,
and an appropriately named list/figure/group only where a role genuinely adds
meaning. Do not add a role solely to silence a validator; preserve readable
descendant semantics.

**Regression in `63f268e`?** No.

## Institutional narrative and claim audit

### What works

- The first screen answers “what,” “for whom,” and “why now” within the hero:
  lines 83-95 define the transaction layer, autonomous demand,
  owner-operated services, physical edge intelligence, and the
  discover/authorize/evidence/pay problem.
- The one-minute thesis at lines 113-136 supports the headline with autonomous
  demand, edge supply, and a missing coordination layer.
- The maturity line at lines 106-110 and the implemented/planned panels at
  lines 383-418 distinguish TOS Core, designed architecture, and future
  products.
- Claims avoid revenue, adoption, market-share, performance, or return
  numbers. The FAQ and footer explicitly separate transaction volume, fees,
  protocol revenue, token value, and investment return.
- The page avoids mining rewards, bare-GPU rent, “guaranteed yield,”
  “revolutionary,” and similar crypto-marketing patterns.
- The narrative order is coherent: market transition → transaction model →
  Physical AI wedge → flywheel → implemented/planned boundary → roadmap →
  diligence → FAQ.

### Cross-check result

The following material claims agree with TOS `main` at `f0c1e85` and the
target's 19-page whitepaper:

- TOS Core is the implemented blockchain/networking substrate.
- The base service protocol, `.tos` registration product, Edge Core,
  discovery, relays, managed inference terminal, and Physical AI terminal are
  still proposed/planned work.
- Application execution remains off-chain and outside validators.
- Bare GPU rental, arbitrary consumer containers/programs, public shell,
  direct actuator control, and consensus in a hard real-time loop are
  explicitly excluded.
- Local safety/real-time work outranks network work on physical terminals.
- Storage, commerce, and human services are later independent profiles, not
  claims of current deployment.
- The current documents describe design objectives, not commercial scale.

No homepage statement was found that can reasonably be read as a current
revenue, adoption, market share, performance, customer, or deployment claim.

## Safari/WebKit test matrix

| Target | Linux Playwright WebKit 26.5 | Chromium 151 comparison | Result |
|---|---|---|---|
| iPhone SE 320×568 | Executed | Executed | No document horizontal scroll; no section overlap; H1 contained |
| iPhone 13 mini 375×812 | Executed | Executed | Same |
| iPhone 14/15 390×844 | Executed | Executed | Same |
| iPhone 14/15 Pro Max 430×932 | Executed | Executed | Same |
| iPhone landscape 568×320 | Executed | Executed | Same; headline extends below first viewport but remains contained |
| iPhone landscape 667×375 | Executed | Executed | Same |
| iPhone landscape 844×390 | Executed | Executed | Same; rotation-state defect reproduced separately |
| iPad 768×1024 | Executed | Executed | No document horizontal scroll or section overlap |
| Desktop 1440×900 | Executed | Executed | No document horizontal scroll or section overlap |
| Menu viewport height 844→744→932 | Executed resize simulation | Executed resize simulation | `100dvh` max-height updated 760→660→848 px |
| 115%/135% iOS text setting | Not real-device executable | Not claimed | WebKit `text-size-adjust` injection did not reproduce Apple accessibility sizing |
| 200% page zoom | Not real Safari executable | 720×450 reflow proxy only | No proxy overflow; not a Safari zoom pass |
| Dynamic Safari address bar | Not executable | Not claimed | Requires real Safari |
| Notch/home indicator/safe area | Not executable | Not claimed | Engine supports `env()`, but non-zero Apple insets were not emulated |
| VoiceOver | Not executable | Not claimed | Accessibility tree and Axe used as evidence only |

WebKit reported support for `100dvh`, `backdrop-filter`,
`-webkit-mask-image`/`mask-image`, and safe-area `env()` syntax. Support alone
is not equivalent to a real Safari UI-chrome/safe-area test.

## Verified passes

### Layout and interaction

- `documentElement.scrollWidth === clientWidth` at all nine requested sizes in
  both engines.
- No adjacent main sections geometrically overlapped.
- Flywheel, mobile architecture stack, Roadmap, FAQ, and footer remained
  separated.
- The Vision diagram's 700 px mobile width is intentionally contained in its
  own horizontal scroller; it did not create page-level overflow.
- The header, `100vh` fallback, `100dvh` menu height, backdrop blur, and masks
  rendered in WebKit.
- Menu Open, link Tab entry, link activation close, and Escape close worked;
  the remaining state/focus defect is M3.
- Reduced motion made normal reveal/orbit CSS static.
- With `tos-music.js` blocked, the core page remained usable.
- With fonts blocked, fallback rendering remained visible and contained.
- With the Vision image blocked, descriptive alt text remained present.
- The player and legal disclaimer did not overlap at page bottom in WebKit at
  320×568, 568×320, 667×375, 844×390, 768×1024, or 1440×900.

### Player

- Initial load requested **zero MP3 bytes** in all 18 viewport runs.
- Audio construction and loading occurred only after clicking the music
  button.
- Normal Play/Pause worked in WebKit and Chromium; Pause cancelled the
  animation loop.
- The player is configured to loop.
- Arrow/Home/End slider keys are implemented; End set the accessible value to
  `4:41 of 4:41`.
- With media metadata delayed by 2.5 seconds, immediate End still set 281
  seconds without a page exception.
- Against a server that ignored Range, Chromium sent `Range: bytes=0-` and
  accepted a 200/6,597,128-byte response; WebKit also played the 200 response.
- The production origin supports Range: a 0-1023 request returned **206**,
  `Content-Length: 1024`, and
  `Content-Range: bytes 0-1023/6597128`.
- The MP3, image, and whitepaper production hashes match the target files.
- Player construction occurs once, analyser construction is guarded, and
  normal repeated Play/Pause did not duplicate animation loops.

### Accessibility and semantics

- Axe reported zero definite initial-state violations in both engines.
- One H1 and a consistent H1→H2/H3 hierarchy are present.
- Header, named primary navigation, main, and footer landmarks are present.
- The skip link becomes visible on focus.
- Buttons and links have visible global `:focus-visible` outlines.
- The music button has a 44×44 mobile target and changes its accessible
  Play/Pause label on the normal path.
- Primary text palette contrast is strong: `--muted` 8.83:1,
  `--muted-strong` 13.57:1, gold 10.49:1, cyan 11.42:1, and footer text 5.26:1
  against the base dark background.

### SEO, links, files, and static hosting

- Canonical, title, description, Open Graph, Twitter card, favicon, and
  Organization JSON-LD are present.
- The canonical and OG image are absolute production URLs.
- JSON-LD content agrees with visible organization identity and social links.
- The OG image, whitepaper, Vision image, favicon, scripts, styles, and MP3
  exist with correct case.
- All 20 `_blank` links include `rel="noopener"`.
- GitHub, documentation, X, Telegram, Discord redirect, and issue links
  returned successful final responses during the review.
- Relative asset paths contain no leading `/`, so they work at a static
  subdirectory base as well as a domain root, provided the full directory tree
  is deployed together.
- Production serves WebP, PDF, SVG, JavaScript, CSS, and MP3 with usable MIME
  types.
- The source scripts pass `node --check`.
- Normal browser runs produced no console errors or uncaught page exceptions.

## Deployment observation

At review time, `https://tos.network/` did **not** yet serve the target
HTML/CSS/JavaScript hashes, while the production Vision image, PDF, and MP3 did
match the target. This is consistent with a target awaiting deployment and is
not counted as a source finding. It does mean that post-deployment verification
must compare all four primary bundle hashes together; a partial upload can
trigger H1.

## Minimum fix list

### Must fix before deployment

1. Make reveal animation progressive enhancement so failure of
   `investor-home.js` cannot hide content.
2. Await/catch audio startup and restore truthful UI/accessibility state for
   MP3, decode, policy, and `AudioContext` failures.
3. Make the player slider/lyrics accessible and stop its continuous visual
   loop under reduced motion.
4. Synchronize FAQ visual and accessibility state and expose FAQ answers when
   JavaScript is unavailable.
5. Reset mobile menu state across the 820 px breakpoint and restore focus on
   Escape.
6. Add an honest institutional diligence index/contact route covering the
   currently omitted underwriting categories.

### Can follow after deployment

1. Self-host/subset fonts and remeasure production LCP and field Core Web
   Vitals.
2. Produce a dedicated 1200×630 social card and add image dimensions/alt
   metadata.
3. Configure CSP, HSTS, and framing policy at the deployment layer.
4. Replace ignored generic-div `aria-label`s with appropriate semantic
   structures.
5. Complete real-device sign-off on iPhone/iPad/macOS Safari, including
   collapsing browser chrome, safe areas, 115%/135% text settings, 200% zoom,
   VoiceOver, real audio policy, and repeated physical rotation.
