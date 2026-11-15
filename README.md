# DetailFlow — Refined landing page (v2)

A responsive, accessible frontend **prototype** for a potential automation service for auto detailing businesses. Built with **HTML, CSS, and vanilla JavaScript**. No package manager, external font, image host, SDK, or dependency is required.

## Files

```text
detailflow-refined/
├── index.html     Complete semantic page and fictional sample content
├── styles.css     Layout, design tokens, accessible states, responsive rules
├── script.js      Navigation, local sample filters, prototype-only validation
├── README.md      Setup, customization, and manual test checklist
└── REVIEW.md      Detailed code review, changes, and demo-vs-real inventory
```

## Start locally

**Quick preview:** Download/extract the project and open `index.html` in a modern browser. Keep all three website files in the same directory.

**Recommended:** Start a local static server in this directory:

```bash
python -m http.server 8000
```

On some Windows installations, use `py -m http.server 8000`. Then open <http://localhost:8000>. Stop the server with `Ctrl+C`.

**Hosting:** Upload `index.html`, `styles.css`, and `script.js` to any static host. A static host does **not** turn the form, CRM, or automation features into live services.

## What works now

- Responsive navbar; mobile menu opens/closes, supports Escape, and dismisses when selecting a link, clicking outside, moving keyboard focus outside, or switching to desktop width.
- Anchor navigation, skip-to-content link, and native keyboard-operable FAQ accordions.
- Fictional sample CRM with four hard-coded inquiry rows; selecting a filter changes visible rows and updates the sample count. No persistence.
- Form's native submit interaction (button click or Enter) triggers **local-only** validation; required and email rules show inline field errors and accessible error descriptions. Clearing the form removes values and messages. The submit button is disabled unless JavaScript initializes.
- No custom network requests, cookies, localStorage, sessionStorage, SDKs, or real backend.

## Not a functional business integration

- **CRM:** illustration with local filters, not a connected database, lead management product, or real customer activity.
- **Hero dashboard:** fictional numbers and static UI; sample counts are aligned with the four fictional table rows.
- **Demo form:** validates locally but never sends, saves, emails, or books a request. No customer data is accepted by DetailFlow. Browser autofill behavior is controlled by the user's browser, not this prototype.
- **Follow-ups:** explanatory content only; no automatic emails, SMS, or reminders.
- **Pricing:** fictional examples; neither available service plans nor binding quotes.
- **Nav/pricing CTAs:** link to sections of this same demo; they do not schedule a meeting.
- **FAQ:** native expandable text, not a support system.
- **Analytics, authentication, payments, calendar, and integrations:** absent.

## Before collecting real leads

1. Decide on the real offer, service boundaries, and approved prices.
2. Add a secure submission endpoint or properly configured form provider. Validate again server-side.
3. Add HTTPS, rate limiting/spam prevention, meaningful loading/success/failure states, and duplicate-submission handling.
4. Publish a real privacy notice and set access, retention, and consent rules for customer information.
5. Connect a genuine CRM and scheduling system only after permissions and contracts are approved; confirm the connection and test failures before asserting it works.
6. Test with real devices, accessibility tools, and deployment security settings before production use.

## Customize safely

- Edit copy and heading text in `index.html`.
- Change color variables in the `:root` section of `styles.css`. The v2 refinement styles near the end of the stylesheet intentionally override some legacy styles for accessibility and mobile polish; update both if modifying a matching property.
- Change sample inquiry table rows in `index.html`. Keep `data-stage` values (`new`, `follow-up`, `requested`) consistent with filter buttons. If you change the record counts, update the static hero dashboard figures too.
- If connecting the form to a real backend, **remove the prototype-only success statement and replace the local submit handler** with appropriate async handling, server validation, consent, privacy disclosures, and error states. Never display success before a confirmed server response.
- Do not use fictional demo prices or statuses in external advertising as verified claims.

## Manual QA checklist

### Layout and responsiveness

- [ ] Open at 320, 360, 390, 430, 680, 768, 900, 1024, 1280, and 1440 CSS pixels.
- [ ] Confirm there is no page-level horizontal overflow; the CRM table scrolls within its own panel on narrow screens.
- [ ] Confirm headings, pricing cards, input labels, and buttons are readable at 200% zoom or equivalent narrow viewport.
- [ ] Check landscape orientation and system text scaling.

### Navigation and keyboard

- [ ] Use Tab and Shift+Tab; all buttons, links, filter chips, and fields should have clear visible focus.
- [ ] Press Tab on page load to find the skip-to-content link.
- [ ] Open mobile nav with Enter/Space; close with Escape and confirm focus returns to the menu button.
- [ ] Close mobile nav by choosing a link and by clicking outside it.
- [ ] Use the CRM table's focusable scroll region with keyboard scrolling, when needed.
- [ ] Expand/collapse FAQs using keyboard Enter/Space.
- [ ] Verify reduced-motion preference turns off smooth scrolling and transitions.

### Fictional CRM

- [ ] **All inquiries:** 4 visible rows.
- [ ] **New:** 1 visible row.
- [ ] **Needs follow-up:** 2 visible rows.
- [ ] **Time requested:** 1 visible row.
- [ ] Selected filter reports `aria-pressed="true"`; count changes appropriately.
- [ ] Refreshing the browser resets to static sample records; no data was stored.

### Prototype form

- [ ] Submit empty fields: first invalid field receives focus; inline messages appear.
- [ ] Enter malformed email and submit: the email-specific error is displayed.
- [ ] Correct invalid values: inline error clears after the correction.
- [ ] Fill required fields and press Enter: local-only validation confirmation appears.
- [ ] Edit after validation: stale confirmation clears.
- [ ] Choose **Clear form**: fields, errors, and status reset.
- [ ] Disable JavaScript: the validate button is disabled and a `noscript` note is visible.
- [ ] Check Network panel: submitting a valid or invalid form must not create requests.
- [ ] Confirm the prototype warning appears before and after any form interaction.

### Cross-browser + production

- [ ] Verify on Safari/iOS, Firefox, Chrome, and Edge on actual devices.
- [ ] Run accessibility audit (e.g., axe/WAVE) and manual screen-reader tests (VoiceOver/NVDA).
- [ ] Run Lighthouse against the **deployed URL** and evaluate any remaining issues.
- [ ] Do not advertise the prototype as an operational CRM/booking system.

## Verification performed during this revision

Automated Chromium tests at 10 viewport widths (320–1440px) found no page-level horizontal overflow or uncaught JavaScript errors. Checked mobile menu open/Escape close, CRM filter counts, invalid form/field error handling, valid submission via Enter, clear/reset, FAQ toggling, disabled submit state with JavaScript off, reduced-motion behavior, and absence of requests in the in-browser prototype test. These tests do **not** replace cross-browser, screen-reader, device, or Lighthouse audits.

See `REVIEW.md` for a change-by-change engineering review.
