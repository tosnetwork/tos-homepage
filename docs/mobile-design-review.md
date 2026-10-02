# Mobile design review — 2026-10-03

Reviewed the blockchain website against Apple's published interface guidance: screen fit, readable type, contrast, alignment, proportional graphics, and 44-point touch controls. This is a web design review, not Apple certification or a claim of complete native HIG compliance.

Reference: https://developer.apple.com/design/tips/

## Findings and changes

- Several standalone text links and footer links measured 19–37 CSS pixels high. Mobile standalone links, footer links, navigation, and language options now have at least 44 CSS pixels of height. Inline prose links in legal text are a separate case.
- Chinese, Japanese, and Korean headings inherited Latin negative tracking and tight leading. Their tracking is now normal and line height is 1.2.
- Retained Archivo display and IBM Plex body branding, with explicit Apple/system multilingual fallback fonts. Shared blockchain type sizes now use rem units to respect browser preferred font size.
- Raised mobile feature captions to 14px and footer notes to 13px at the default root size. Native audio controls inherit the existing dark color scheme; playback remains user initiated.

## Verification

- Checked all nine top-level pages at a 390 × 844 browser viewport for horizontal overflow, clipped headings/body text, and standalone link hit areas.
- Checked homepage layouts at 320, 375, 390, and 430 CSS pixels wide, 844 × 390 landscape, and 1440 × 900 desktop. No horizontal page overflow was observed.
- Checked all four homepage languages at 320px, plus mobile menu and language selector dimensions. Language options and menu links measured 44px high.
- Visually inspected mobile hero and song area. Existing SVG artwork retains its aspect ratio; the native audio control fits the page.
- Sampled static text contrast: secondary text on main background 7.75:1; secondary text on footer background 8.03:1; body text on tinted sections 12.32:1; accent text on main background 12.43:1. These are representative samples, not a complete accessibility audit.
- Static route, fragment, asset, translation coverage, and cache version validation passed.

## Remaining verification limits

Tests used a Chrome browser with resized viewports. Physical iPhone Safari, VoiceOver, system Dynamic Type, browser text enlargement, device safe areas, and every possible media-player presentation have not been exhaustively tested. CSS pixels are the web implementation target; this review does not equate viewport testing with native point measurements on every device.
