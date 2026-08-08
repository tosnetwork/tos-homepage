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

## Checklist (before deploying any CSS change or new static asset)

- [ ] Changed `css/*.css`? Did you bump the `?v=` version on the `<link>` that references it?
- [ ] Added a new `<img>`? Does it have explicit `width`/`height`?
- [ ] After `wrangler pages deploy`, did you verify against the returned hash URL first, instead of jumping straight to `tos.network`?
