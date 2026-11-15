# DetailFlow — Frontend landing page prototype

A polished, mobile-responsive landing page for a **concept** automation service aimed at auto detailing businesses. It uses only HTML, CSS, and vanilla JavaScript. No npm packages, frameworks, CDNs, cookies, or external fonts are required.

## Project structure

```text
detailflow/
├── index.html   # Page structure, accessible content, sample CRM, prototype form
├── styles.css   # Layout, colors, typography, components, responsive design
├── script.js    # Mobile navigation, sample CRM filters, local-only form check
└── README.md    # Setup instructions and testing checklist
```

## Run locally

**Option A — simplest:** Open `index.html` directly in any modern browser.

**Option B — local server (recommended for a realistic development setup):** Open a terminal in the `detailflow` folder and run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser. On Windows, you may need `py -m http.server 8000` instead. Stop the server with `Ctrl+C`.

To publish a static demo, upload `index.html`, `styles.css`, and `script.js` to any static website host. **Do not position this as a working booking or CRM service.**

## Important disclosures

- The hero dashboard and CRM contain **fictional sample records**. The table filters these static records in memory only.
- The demo form **does not send, save, or share** entered information. A button validates required fields locally and displays a clearly worded prototype status. No API requests or browser storage are used.
- Pricing tiers and figures are **illustrative fictional examples**, not an actual quote, sale offer, or commitment.
- No customer testimonials, measured business outcomes, live integrations, booking availability, or operational automation capabilities are asserted.
- The page currently has no backend, authentication, CRM, scheduling, email/SMS delivery, or analytics service.

## Before accepting real requests

1. Set up a secure backend or reputable form service and a server-side request endpoint.
2. Add server-side validation, anti-spam/rate-limiting, secure transport (HTTPS), and error handling.
3. Publish a privacy notice that explains collection, retention, and access controls. Add appropriate consent where needed.
4. Connect only approved systems, verify third-party permissions, and test failure/duplicate-request scenarios.
5. Replace the frontend-only status logic with an actual submission state (loading, success only when the server confirms, and actionable failure).
6. Clearly document any real plans, deliverables, and pricing after they are agreed and verified.

## Test checklist

### Visual / responsive
- [ ] Open at 1440px desktop: navbar, hero, feature cards, process cards, pricing, and form align cleanly.
- [ ] Check at 1024px tablet, 768px small tablet, 390px and 320px mobile.
- [ ] Verify no page-level horizontal overflow. The CRM table may scroll **inside its own container** on narrow screens.
- [ ] Check dark/light section contrast and legible small text.
- [ ] Confirm no layout depends on loaded web fonts, image CDNs, or third-party scripts.

### Navigation / accessibility
- [ ] Keyboard Tab shows a visible focus outline on links, filter buttons, menu controls, and form fields.
- [ ] `Skip to content` appears on keyboard focus.
- [ ] Mobile menu toggles and closes when a link is chosen or `Escape` is pressed.
- [ ] Mobile menu button updates its expanded state and accessible label.
- [ ] Anchor links scroll to the correct sections without being obscured by sticky navigation.
- [ ] FAQ entries expand/collapse with Enter or Space.
- [ ] Reduced-motion preference disables smooth scrolling and transitions.

### Sample CRM
- [ ] `All inquiries` shows 4 fictional records.
- [ ] `New` shows 1; `Needs follow-up` shows 2; `Time requested` shows 1.
- [ ] Each filter updates its pressed state and the visible sample-record count.
- [ ] Reloading the page restores the original sample data; there is no persistence.

### Demo form
- [ ] Empty required fields produce a local validation warning and focus an invalid field.
- [ ] A malformed email is rejected.
- [ ] Completing required fields displays **“nothing was sent or saved”** and never implies a real demo was booked.
- [ ] `Clear` resets inputs and hides the status message.
- [ ] The prototype warning is visible before interacting with the form.
- [ ] Browser Network tab shows **no form submission requests**; no cookies, localStorage, or sessionStorage are used.
- [ ] Form controls have labels and can be operated with a keyboard.

## Customization

- Adjust brand colors in `:root` at the top of `styles.css`.
- Edit headlines and section copy in `index.html`.
- Replace sample CRM rows in `index.html` while preserving `data-stage` values (`new`, `follow-up`, `requested`) if you want filter buttons to keep working.
- Replace illustrative price examples only when real scopes and prices are established.

**Production note:** This project is intended as a transparent visual/concept demo, not a ready-to-launch customer-data collection system.
