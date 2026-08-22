# tos-homepage Deployment Incident Postmortem: Three Root Causes and Preventive Measures

After shipping the "Agent Protocol-Compatible Ecosystem" section on 2026-08-08,
production briefly rendered broken ("崩了"). Investigation found three
independent root causes, all fixed in commit `850bd74`. None of them can be
fully prevented by code alone, so the preventive measures are codified here
and must be followed on future changes/deploys to this project.

## Root cause 1: CSS was edited without bumping the cache-busting version

`index.html` references its stylesheet like this:

```html
<link rel="stylesheet" href="css/investor-home.css?v=20260808a">
```

`?v=` is a manually maintained cache-busting token. If `css/*.css` content is
changed without updating the `?v=` value on the `<link>` tag that references
it, browsers/CDN edge nodes may keep serving the old CSS (until their cache
expires) against the new HTML — the mismatch produces unpredictable rendering,
not just "styles didn't update."

**Preventive measure**: any change to `css/*.css` content in this project must
bump the corresponding `?v=` parameter on `index.html` (and any other HTML
that references it) in the same commit — suggested format is today's date
plus a letter suffix (e.g. `20260808a` → `20260808b`). A diff that changes CSS
without a matching version bump is considered incomplete; check for this
before committing.

## Root cause 2: a new image had no explicit width/height, so it broke the layout when CSS didn't apply

The newly added `img/openfox-icon.png` initially relied purely on CSS
(`.agent-icon img { width:100%; height:100% }`) for sizing — the `<img>` tag
itself had no `width`/`height` attributes. Whenever CSS failed to apply (as in
root cause 1), the browser rendered the image at its native pixel size
instead. That native size is 464×348, and dropping that into a 128px-wide
card in the icon grid blew out the entire section — visually, that's what
"broken" looked like.

**Preventive measure**: any newly added `<img>` tag must have explicit
`width`/`height` attributes (using the intended display size, not the native
pixel size) as a fallback for when CSS fails to load. The same applies to
inline `<svg>` icons — the `viewBox` preserves internal proportions, but the
outer `<svg>` element falls back to the browser default size (300×150) if it
has no width/height and its container has no non-CSS size constraint, so give
it one explicitly or make sure the container does.

## Root cause 3: Cloudflare Pages custom domains lag behind new deployments

Right after `wrangler pages deploy` finishes, both
`https://<hash>.tos-homepage.pages.dev` (this deployment's direct URL) and
`https://tos-homepage.pages.dev` (the production alias) serve the latest
content almost immediately. But the custom domains
`https://tos.network` / `https://www.tos.network` — even though their
response headers show `cf-cache-status: DYNAMIC` (not edge-cached) — were
observed lagging roughly 10-70 seconds behind before reflecting the new
deployment. This isn't a traditional stale-cache problem; it's propagation
delay in Cloudflare Pages' custom-domain routing layer itself.

**Preventive measure**: after `wrangler pages deploy` completes, verify in
this order:
1. Check the command's own `https://<hash>.tos-homepage.pages.dev` output URL
   first to confirm the new content actually deployed correctly — this URL is
   unaffected by the propagation delay and is the most reliable baseline.
2. Then check `tos.network`. If it hasn't caught up yet, wait 10-30 seconds
   and retry — don't conclude the deploy failed or production is broken
   during this window.
3. Only treat it as a real problem if `tos.network` still hasn't synced after
   60 seconds — that's when it's worth digging into DNS/Cloudflare routing
   config.

## Root cause 4 (2026-08-09 addendum): the same cache-busting bug, but for JS

Root cause 1 above only calls out `css/*.css`, but the underlying mechanism
applies to every asset referenced with a manually maintained `?v=` token —
`js/*.js` included. On 2026-08-09, `js/i18n.js` was edited across several
commits (new section translations, tightened copy, a rewritten grid) without
bumping the `<script src="js/i18n.js?v=...">` tag in `index.html`. Production
serves `js/*.js` with `cache-control: public, max-age=14400`, so browsers and
CDN edge nodes kept serving the stale dictionary for up to 4 hours after each
deploy — visitors who switched to a non-English language saw the newly added
sections fall back to untranslated English text, because the cached JS had no
entries for the new `data-i18n` keys. This was not a full outage like the
2026-08-08 incident above, but the same class of bug: HTML shipped ahead of
an unversioned dependency that browsers had already cached.

**Preventive measure**: any change to `js/*.js` content in this project must
bump the corresponding `?v=` parameter on the `<script>` tag that references
it, in the same commit — same format as CSS (today's date plus a letter
suffix). This applies per file: bumping `investor-home.js`'s version does not
cover an edit to `i18n.js`, and vice versa. Before committing, check every
`css/*.css` and `js/*.js` file touched in the diff against its own `?v=` tag.

## Root cause 5 (2026-08-23 addendum): deploying to the wrong Pages branch is a silent no-op

`wrangler pages deploy` requires a `--branch` value, and this project's
Cloudflare Pages production branch is **`master`**, not `main`. Running
`wrangler pages deploy . --project-name=tos-homepage --branch=main` succeeds,
prints a working `https://<hash>.tos-homepage.pages.dev` URL, and uploads every
file — but it registers as a *Preview* deployment. The custom domains
(`tos.network`, `www.tos.network`) and the production alias
(`tos-homepage.pages.dev`) keep serving the previous production build, with no
error anywhere in the deploy output.

This is easy to misread as root cause 3's custom-domain propagation delay: the
hash URL shows the new content, `tos.network` does not, and waiting looks like
the fix. It is not — waiting never resolves it, because production was never
updated.

**Preventive measure**: always deploy with `--branch=master`:

```bash
npx wrangler pages deploy . --project-name=tos-homepage --branch=master --commit-dirty=true
```

To tell the two failure modes apart, check the production alias
`https://tos-homepage.pages.dev` (not the hash URL, and not `tos.network`).
It updates immediately on a real production deploy and is not subject to the
custom-domain propagation delay. If the alias shows the old build, the deploy
went to a preview branch — redeploy against `master` instead of waiting.
`wrangler pages deployment list --project-name=tos-homepage` shows each
deployment's Environment (Production / Preview) and branch if confirmation is
needed.

## Checklist (before deploying any CSS/JS change or new static asset)

- [ ] Changed `css/*.css`? Did you bump the `?v=` version on the `<link>` that references it?
- [ ] Changed `js/*.js`? Did you bump the `?v=` version on the `<script>` tag that references it?
- [ ] Added a new `<img>`? Does it have explicit `width`/`height`?
- [ ] Deploying? Did you pass `--branch=master` (production), not `--branch=main` (preview)?
- [ ] After `wrangler pages deploy`, did you verify against the returned hash URL first, instead of jumping straight to `tos.network`?
- [ ] Did `tos-homepage.pages.dev` pick up the change before you blamed custom-domain propagation delay?
