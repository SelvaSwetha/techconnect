# Solutions section — reference mapping (Drive PDFs vs Figma `66:` frames)

Source of PDFs: Drive folder `1iETq50QoANc0shP9AXUbaCNfGxcMS7LG` (public, downloaded to a scratch folder outside the project).
Figma `66:` data: metadata only (frame size + layer names; text content and visuals could not be read — MCP call limit).

| Figma frame | Frame size | Matching Drive PDF | PDF size | Status |
|---|---|---|---|---|
| 66:3 Solutions Overview | 1440×3220 | `Solutions Card Hover – Permanent Recruitment (2).pdf` and `Solutions Card Hover – IT & Technical Recruitment.pdf` (same page, different card hovered) | 1440×2450 | DIFFERENT. PDF has no "service approach" section and a one-row footer; 66:3 has an approach section (66:82–92) and a 3-column footer. PDF looks newer. |
| 66:116 Permanent Recruitment | 1440×3200 | `Service Detail – Permanent Recruitment (1).pdf` | 1440×4167 | DIFFERENT layout/height (adds photo + 6-step flow, "01" industries block, 3-card engagement model). |
| 66:233 IT & Technical | 1440×3200 | `Solution-3 (1).pdf` (has 3 hero tags) AND `Solution-5 (1).pdf` (no tags) | 1440×5203 / 1440×4922 | TWO competing PDF versions; neither matches 66:233 size. |
| 66:356 Contract Staffing | 1440×3200 | none | — | NO PDF. Cannot verify. |
| 66:473 RPO | 1440×3200 | none | — | NO PDF. Cannot verify. |
| 66:590 Executive Search | 1440×3200 | `Solution-6 (1).pdf` | 1516×4113 | DIFFERENT (width 1516, not 1440). |
| 66:707 HR Consulting | 1440×3200 | `Solution-4 (2).pdf` | 1540×4863 | DIFFERENT (width 1540, not 1440). |
| (Employer enquiry 234:222) | — | `Employer enquiry – Permanent Recruitment (1)/(2).pdf` (identical) | 1440×1712 | Target of "Discuss Hiring" CTAs. |

Conclusion: the `66:` frames are NOT the same designs as the Drive PDFs. The PDFs are richer and appear to be later iterations.
Not Solutions-related in the folder: Abouts, For Employee, Group 35, How to work (x2), Jobs, Resources, Homepage, Industries.

Oddities inside the PDFs (to confirm, not to "fix" silently)
- Overview CTA band has stray text `/services/` at the bottom right; footer is a single link row.
- Overview HR card text overlaps its "Explore service" link (4-line summary).
- Permanent page "01" block reads "Step 1 of 6 · TechzConnect Executive Search Framework" (copied from the Executive page).
- Permanent page engagement-model sub-copy: "Add an approved client story and verified result before publishing. No unverified client names or metrics are assumed." (placeholder text).
- Executive and HR PDFs are wider than 1440.
- Detail-page photos/icons are not in `assets-review` (only the Overview's 6 service images + hero, and 11 HR images, are exported).

---

## Decisions (user, confirmed)

1. **Primary references = Drive PDFs.** `66:` frames are secondary only; versions are not mixed without verification.
2. **IT & Technical = `Solution-3 (1).pdf`** (with its three hero tags). Nothing is combined from `Solution-5 (1).pdf` unless confirmed to belong to Solution-3.
3. **Missing photos/icons may be extracted from the Drive PDFs** at the highest available resolution, stored under `assets-review/provisional/` with original PDF filename + source page, flagged PROVISIONAL, never overwriting verified assets, and replaced by Figma exports when available.

### Content corrections
1. Remove the stray `/services/` text from the Overview CTA.
2. Fix the overlapping HR Consulting card summary / "Explore service" link on the Overview.
3. Permanent Recruitment "TechzConnect Executive Search Framework" label must not stay wrong — intended heading verified from other references before changing (see below).
4. Placeholder "Add an approved client story and verified result before publishing…" is NOT published. No invented client stories or results.

### Implementation order
1 Overview → 2 Permanent → 3 HR Consulting → 4 Executive Search → 5 IT & Technical → 6 Contract Staffing (WAIT for reference) → 7 RPO (WAIT for reference).

### Provisional asset policy
- Folder: `assets-review/provisional/<page>/`; manifest: `assets-review/provisional/provisional-manifest.md` (file, source PDF, page, crop box, status = PROVISIONAL).
- Copies used by the app live in `src/pages/Solutions/assets/provisional/` with the same filenames so they can be swapped 1:1 for Figma exports.

---

## Implementation status and verification (Phase 3, after decisions)

Comparison method: full-page Chromium screenshot at 1440px vs the Drive PDF rendered 1:1 (PNG), per-pixel mean absolute difference (0 = identical, /255).
Side-by-side images: `comparison/solutions/<page>_browser_vs_pdf.png`; screenshots at 1440/1024/820/390: `comparison/solutions/<page>_<width>.png`.

| Page | Route | Reference used | 1440px mean diff | Status |
|---|---|---|---|---|
| Solutions Overview | `/solutions` | `Solutions Card Hover – Permanent Recruitment (2).pdf` (+ IT hover variant, same page) | 10.6 (6.3 before the HR-card overlap fix; page is 24px taller than the PDF because the HR card now has room for its 4-line summary) | DONE |
| Permanent Recruitment | `/solutions/permanent-recruitment` | `Service Detail – Permanent Recruitment (1).pdf` | 3.5 | DONE |
| HR Consulting | `/solutions/hr-consulting` | `Solution-4 (2).pdf` (frame cropped from 1540-wide export) | 6.1 | DONE |
| Executive Search | `/solutions/executive-search` | `Solution-6 (1).pdf` (frame cropped from 1516-wide export) | ~7 (9.8 raw; the PDF's bottom margin/shadow counts as difference) | DONE |
| IT & Technical Recruitment | `/solutions/it-technical-recruitment` | `Solution-3 (1).pdf` (selected by user) | 7.3 | DONE |
| Contract Staffing | — | none | — | BLOCKED: no design reference. Card is not a link, no route, no page. |
| RPO / Recruitment Outsourcing | — | none | — | BLOCKED: no design reference. Card is not a link, no route, no page. |

### Content corrections applied
1. `/services/` stray text removed from the Overview CTA band (and from the Permanent page's CTA band).
2. HR Consulting card on the Overview: summary no longer overlaps "Explore service" (card grows to fit).
3. Permanent Recruitment "01" block caption: `TechzConnect Executive Search Framework` -> `TechzConnect Permanent Recruitment Framework`. NOTE: this is an inference — no other reference contains the intended caption; the only evidence is the page's own breadcrumb (`TECHZCONNECT / SERVICES / PERMANENT RECRUITMENT`) and the "TechzConnect <service> Framework" pattern. Needs confirmation.
4. Placeholder text ("Add an approved client story and verified result before publishing…", "…names or metrics are assumed.") is not rendered. The Executive Search PDF has a similar "Case study / proof" block with the same placeholder wording — see the report.

### Known differences from the PDFs (not recoverable from the PDF)
- Inline images in the PDFs carry soft masks that cannot be extracted. Where a photo had such an overlay/clip, the region was baked from a 2x render of the PDF (marked "baked composite" in `provisional/provisional-manifest.md`) or masked with a mask derived from the render.
- Soft shadow layers on the small step-icon circles and the radial red glow behind the dark "Industry context" section are not reproduced; photo fade-outs (Executive Search roles photo, industry card gradient) are approximated or missing.
- Exec/IT/HR/Permanent pages are exact-position canvases at >= 1024px (scaled between 1024 and 1380px). Below 1024px an automatic single-column reflow is used (not in Figma).

---

## Decisions after the five-page review (user)

1. **Permanent Recruitment caption — APPROVED:** "TechzConnect Permanent Recruitment Framework" stays.
   **NOTE (retain): this wording is INFERRED, not verified against the original Figma design.** The PDF said "TechzConnect Executive Search Framework" (copied from the Executive Search page); no other reference contains the intended text. Verify against the Figma frame when access allows.
2. **Contract Staffing and RPO — PENDING:** not implemented until the actual PDF/PNG references are provided. Their Overview cards stay non-clickable (no link, no route); their footer labels stay plain text.
3. **Images — original Figma exports preferred.** Existing provisional assets stay in `assets-review/provisional/` and `src/pages/Solutions/assets/provisional/`, documented in `provisional/provisional-manifest.md`. Verified assets are not replaced. Exports to be supplied by the user:
   - Hero and CTA photos (IT & Technical hero/CTA, other detail-page heroes)
   - Industry-card photos (Executive Search, IT & Technical)
   - Permanent Recruitment approach photo
   When the exports arrive, swap them 1:1 for the matching provisional files (same filename or update the import in the page's Desktop.tsx/Mobile.tsx).
4. **Overview HR card — KEEP the extra ~24px height.** Description is not truncated; spacing stays corrected; no text overlap. The Overview is therefore 24px taller than the PDF (2474 vs 2450px) by design.

### Freeze
The five completed Solutions pages and the Homepage (including the hiring form) are unchanged pending approval. No unrelated sections will be started.

### Outstanding
| Item | Needed from user |
|---|---|
| Contract Staffing page | PDF/PNG design reference |
| RPO page | PDF/PNG design reference |
| Hero + CTA photos | Figma exports |
| Industry-card photos | Figma exports |
| Permanent approach photo | Figma exports |
| Permanent caption | (optional) check against Figma |

---

## Figma re-check (inspection only, no code/UI changed)

**Method / limits.** Source: Figma file `9Vpu0I3YGkZMEPGd9Z5gjg`, page "Homepage" (canvas `0:1`, node metadata retrieved in full) and page "Solutions" (canvas `66:2`). The Figma MCP call limit was hit again when trying to list the file's other pages (`0:0`), so **any further pages beyond these two could not be enumerated**. All Figma frames below are identified from **metadata only (layer names, sizes, IDs) — none was visually inspected this round**. Visual verification exists only where a Drive PDF was rendered and compared.
Drive folder re-listed: unchanged (same 18 PDFs; sub-folder "TechConnect" is empty/not listable).

### Solutions-related frames in canvas `0:1` (Homepage page)
| Frame | ID | Size | Notes |
|---|---|---|---|
| TechzConnect — Solutions Overview | `78:898` | 1440x2450 | = Drive "Solutions Card Hover …" PDFs (implemented) |
| Solutions Card Hover — Permanent / IT & Technical / Contract Staffing / RPO / Executive Search / HR Consulting | `80:2` / `80:88` / `80:174` / `80:260` / `80:346` / `80:432` | 1440x2450 each | one hover-state variant per service card (Overview). Only the Permanent and IT variants exist as PDFs |
| Service Detail — Permanent Recruitment (older) | `79:83` | 1440x3900 | superseded by `215:2` |
| Service Detail — Permanent Recruitment (newer) | `215:2` | 1440x4167 | = Drive PDF (implemented) |
| Service Detail — IT & Technical (older) | `79:220` | 1440x3900 | |
| Service Detail — IT & Technical (newer, unlabelled as such) | `233:1222` | 1440x3900 | **no PDF; not compared** |
| Solution-3 (IT & Technical, with hero tags) | `243:4413` | 1440x5203 | = Drive "Solution-3 (1)" — implemented (user's choice) |
| Solution-5 (IT variant, no tags) | `240:2491` | 1280x4922 | = Drive "Solution-5 (1)"; not used |
| Group 35 (IT variant, hero "Add Flexible Talent When You Need It") | `246:5702` | 1440x3815 | = Drive "Group 35.pdf" (never reviewed before; third IT version; not used) |
| Service Detail — **Contract Staffing** | `79:358` | 1440x3900 | **EXISTS** (older generation). Hero image layer `79:381` (570x420) |
| Service Detail — **RPO / Recruitment Outsourcing** | `79:492` | 1440x3900 | **EXISTS** (older generation). Hero image layer `79:515` (570x420) |
| Service Detail — Executive Search (older) | `79:626` | 1440x3900 | |
| Solution-6 (Executive Search) | `245:4867` | 1440x4037 | = Drive "Solution-6 (1)" — implemented |
| Service Detail — HR Consulting (older) | `79:762` | 1440x3900 | |
| Solution-4 (HR Consulting) | `246:5249` | 1440x4763 | = Drive "Solution-4 (2)" — implemented |
| Html → Body (unlabelled full service page, 12 sections incl. EngagementModel) | `240:2923` | 1440x4599 | **service unknown; no PDF** — same section set as the newer-generation pages; could be Contract Staffing or RPO |
| Html → Body (unlabelled, same section set) | `238:1374` | 1419x4616 | **service unknown; no PDF** |
| Employer enquiry — Permanent Recruitment | `234:222` | 1440x1712 | = Drive "Employer enquiry …" PDFs; target of "Discuss …" CTAs; **not implemented yet** |

### Solutions canvas `66:2` (oldest generation, text-only wireframes, no photos)
`66:3` Overview 1440x3220; `66:116` Permanent; `66:233` IT; `66:356` Contract Staffing; `66:473` RPO; `66:590` Executive Search; `66:707` HR Consulting (all detail frames 1440x3200). Contract and RPO exist here too.

### Seven-service mapping
| Service | Overview card/hover frame | Detail frame(s) in Figma | Matching Drive PDF | Version / status | Visual verification | Implemented? | Assets still needed |
|---|---|---|---|---|---|---|---|
| Solutions Overview | `78:898` | — | Solutions Card Hover (2 PDFs) | newest known | PDF compared (diff 10.6, +24px HR card by decision) | yes | hero/CTA photos exports |
| Permanent Recruitment | `80:2` | `215:2` (newer), `79:83`, `66:116` | Service Detail — Permanent (1) | `215:2` final | PDF compared (3.5) | yes | approach photo, hero export |
| IT & Technical | `80:88` | `243:4413` (chosen), `240:2491`, `246:5702`, `233:1222`, `79:220`, `66:233`, + unlabelled `240:2923`/`238:1374` | Solution-3, Solution-5, Group 35 | **4+ competing versions**; Solution-3 chosen by user | Solution-3 PDF compared (7.3); others not | yes (Solution-3) | hero/CTA/industry photos |
| Contract Staffing | `80:174` | `79:358` (older gen.), `66:356` | **none** | design EXISTS; newer-generation page unknown (candidates `240:2923`, `238:1374`) | **not visually inspected** (metadata only) | **no** | hero `79:381` + card image `79:44` (already exported) + page photos/icons |
| RPO / Recruitment Outsourcing | `80:260` | `79:492` (older gen.), `66:473` | **none** | design EXISTS; newer-generation page unknown (candidates `240:2923`, `238:1374`) | **not visually inspected** (metadata only) | **no** | hero `79:515` + card image `79:51` (already exported) + page photos/icons |
| Executive Search | `80:346` | `245:4867` (final), `79:626`, `66:590` | Solution-6 (1) | final | PDF compared (~7) | yes | hero/industry-card photos |
| HR Consulting | `80:432` | `246:5249` (final), `79:762`, `66:707` | Solution-4 (2) | final | PDF compared (6.1) | yes | hero export |

### Do the five implemented pages match the latest designs?
- Permanent (`215:2`), HR (`246:5249`), Executive (`245:4867`): yes, the implemented PDFs correspond to the newest frames found.
- IT: implemented from `243:4413` as instructed, but **three other IT versions** (`240:2491`, `246:5702`, `233:1222`) and two unlabelled pages exist; not compared.
- Overview: matches the PDF; four of six hover variants (Contract, RPO, Executive, HR) exist in Figma only and were never viewed. Card content/labels for Contract and RPO are taken from the Overview PDF.

### Still needed (exports; none of these frames could be viewed)
PNG/PDF exports of: `79:358` (Contract) and `79:492` (RPO) — plus `240:2923` and `238:1374` to identify what they are; `233:1222` and `246:5702` if they are meant to supersede `243:4413`; hover frames `80:174`, `80:260`, `80:346`, `80:432` if hover content differs; `234:222` (enquiry) is already available as PDF but unimplemented.
Image exports (Figma): hero images `79:381`, `79:515`, `215:36`, `233:1254`, `79:649`, `79:785`, CTA photos, industry-card photos, Permanent approach photo.

---

## Six-service audit attempt (content-based identification)

**Blocked:** Figma MCP call limit reached again (one attempt on `240:2923`; no retries). No new frame content could be read, so `240:2923`, `238:1374`, `233:1222`, `79:220`, `79:358`, `79:492`, `79:626`, `79:762`, `79:83` remain **uninspected (metadata only)** — their services are NOT confirmed.

**Identified from content (Drive PDFs rendered and read):**
| Frame | Service per its own heading/breadcrumb | Evidence |
|---|---|---|
| `215:2` | Permanent Recruitment | breadcrumb "TECHZCONNECT / SERVICES / PERMANENT RECRUITMENT", "Find the Right People for Long-Term Roles" |
| `243:4413` (Solution-3) | IT & Technical | breadcrumb ".../SOLUTIONS/IT & TECHNICAL RECRUITMENT", "Connect With Talent for Your Technical Roles." |
| `240:2491` (Solution-5) | IT & Technical (duplicate of Solution-3 copy, no hero tags) | same breadcrumb and headline |
| `246:5702` (Group 35) | **IT breadcrumb but hero "Add Flexible Talent When You Need It"** — copy reads like Contract Staffing under an IT breadcrumb: UNRESOLVED (possible mislabelled Contract Staffing page) | Drive "Group 35.pdf" |
| `245:4867` (Solution-6) | Executive Search | breadcrumb ".../SOLUTIONS/EXECUTIVE SEARCH", "Find Leadership for the Next Stage" |
| `246:5249` (Solution-4) | HR Consulting | breadcrumb ".../SOLUTIONS/HR CONSULTING", "Build Stronger People Practices" |
Contract Staffing and RPO: only frames named for them are `79:358` / `79:492` (older generation) and `66:356` / `66:473`; `240:2923`, `238:1374`, `246:5702` are candidates for a newer version. No content seen.

**Project mismatch:** the request cites a "CareZhen" app at `D:\karezhan\carezhenv2`. That folder is an unrelated Lovable/shadcn project with no Solutions pages. The Tech Connect implementation (`D:\New folder\connect\tech-connect`) is what was compared in the sections above. No change was made to either project.

---

## Industries and How We Work (built after the Solutions hold)

Source: Drive PDFs (Figma was blocked again, so no frame was read live): `TechzConnect — Industries overview (3).pdf` (= frame `225:25`, 1440x7074) and `How to work (2).pdf` (two identical copies, md5 equal; 1440x4401 = the `Group 46/48/49` size).
Built with the same PDF-to-React generator as the Solutions pages (text = real text, shapes = SVG, photos = `<img>`; below 1024px an automatic single-column reflow).

| Page | Route | Frame | Reference | 1440px mean diff | Notes |
|---|---|---|---|---|---|
| Industries | `/industries` | `225:25` | Drive PDF | 6.8 | 25 photos matched verified Figma exports; enquiry form is live (reusable form components) |
| How We Work | `/how-we-work` | UNCONFIRMED among `257:11014` / `258:12955` / `258:11678` | Drive PDF `How to work (2)` | 8.7 | **The PDF looks like the flawed variant** (see below) |

**How We Work — version question (needs a decision).** The Phase 1.5 side-by-side (`comparison/hw_1.png`) showed two different variants of this page: a flawed one (breadcrumb "Home / How We Work" overlapping the "ENGINEERED RECRUITMENT PROTOCOL" pill, pill background missing, empty timeline bar, larger step circles) and a clean one (pill, filled timeline bar, tidy breadcrumb). The Drive PDF matches the flawed variant (its text layer is also doubled, i.e. two frames stacked). The page was built from the PDF, so those flaws are reproduced. The clean variant is probably the intended final; it needs a PNG/PDF export of the correct frame (most likely `258:12955`, not confirmed) to rebuild from.

**Not implementable from the references (no content in the design):**
- How We Work: the four phase tabs (Discovery / Sourcing & Vetting / Shortlist Delivery / Offer & Retention) show only Phase 1 content; the other three phases are not designed. The tabs and engagement-model plan cards are static as drawn.
- How We Work form: the "Primary requirement" select shows only "Software Engineering & Architecture"; other options are not in the design, so none were invented.
- Industries: the 12 industry cards have no destination in the design; FAQ rows are static (first one shown open).
- Design text defect reproduced as drawn: Industries CTA text contains literal "\n" characters ("A conversation about your requirement.\nA relevant recruitment approach.\nA clear next step.").

**Navigation changes made (links only):** Homepage header, Solutions header (shared + the four generated pages' nav) now point Industries to `/industries` and How We Work to `/how-we-work` (previously Homepage anchors).
Assets: `src/pages/Industries/assets`, `src/pages/HowWeWork/assets`; provisional extractions in `provisional/ind` and `provisional/hw`, listed in `provisional/provisional-manifest.md`.

---

## How We Work correction attempt (Figma blocked)

- Figma MCP limit reached again: `258:12955` could not be read or exported (one `get_screenshot` attempt, no retries). **Nothing from `258:12955`, `257:11014` or `258:11678` was visually re-inspected this round.**
- Evidence available locally for which variant is clean: only the Phase 1.5 side-by-side sheets `comparison/hw_1.png`, `hw_2.png`, `hw_3.png` (about 0.6x scale, two frames per sheet; the frame IDs of the two halves are not recorded). They show the clean variant (tidy breadcrumb, red-dot pill, filled timeline bar, correctly placed outcome icon) next to the flawed one that matches the Drive PDF. The clean variant is probably `258:12955`, but that is **UNCONFIRMED** and the 0.6x images are too small to rebuild from.
- Status: `/how-we-work` is unchanged (still built from the flawed Drive PDF). **Needed:** PNG or PDF export of frame `258:12955` at 1x (1440 wide), saved to `assets-review/comparison/`; plus `257:11014` / `258:11678` if a three-way comparison is wanted.
- Phase tabs: unchanged. Only Phase 1 has designed content; tabs render as static text (no handlers, no duplicated content). No designs for Phases 2-4 were found in the metadata (the `Group 46/48/49` frames are the three How We Work variants).
- Industries: the CTA text `A conversation about your requirement.\nA relevant recruitment approach.\nA clear next step.` contained literal `\n` in the design; it now renders as three lines (desktop and mobile). Nothing else on the Industries page changed.

---

## How We Work rebuild — reference check (stopped)

Checked `assets-review/comparison/` (and its sub-folders), `~/Downloads`, the whole local disk for `258:12955` / `257:11014` / `258:11678` names, and the Drive folder listing. **No export of any of the three frames exists.** `comparison/` still holds only `hw_1.png`, `hw_2.png`, `hw_3.png` (Phase 1.5 sheets, ~0.6x, unlabeled frame IDs, 1738px wide) plus the other pages' screenshots. The Drive "How to work (2)" PDFs (and the copies in Downloads) are the same flawed file (same md5).
Result: no frame selected, `/how-we-work` unchanged. Needed: 1x PNG/PDF (1440 wide) of `258:12955`, ideally also `257:11014` and `258:11678`, saved to `assets-review/comparison/` (e.g. `hw_258-12955.png`).

## Completion audit — Industries and How We Work (2026-11-14)

Gate status:
- Industries: INCOMPLETE (built from the Drive PDF; Figma image exports and a Figma-vs-build pixel comparison are not available, so not marked COMPLETE).
- How We Work: BLOCKED (clean Figma export of 258:12955 / 257:11014 / 258:11678 still not in assets-review/comparison/; old hw_1-3.png and the Drive PDF are not acceptable sources). /how-we-work left unchanged.

Verification run (no code changed in this pass):
- tsc -b clean, oxlint clean, production build OK.
- Hiring form 46/46, Solutions nav 30/30 (one flake when run concurrently with other suites; 30/30 on two clean reruns), Industries + How We Work 38/38.
- /industries and /how-we-work at 1440/1024/820/390: no horizontal overflow, 0 broken images, no console errors, no HTTP >= 400.

Open items:
- Industries: card/hero/CTA photos are provisional (Figma exports missing); needs Figma 1x export of frame 225:25 for a pixel diff.
- How We Work: needs 1x PNG/PDF (1440 wide) of 258:12955; Phase 2-4 tab designs unavailable (tabs stay visual only); Phase 1 kept.
- Next page not started (gate requires both COMPLETE).

## UI / navigation / FAQ / animation pass (2026-11-14)

User decisions: keep "For Employers" label (Figma) · build the Employer Enquiry page · accordion only where real answer text exists.
- NEW `/employer-enquiry` = Drive PDF "Employer enquiry – Permanent Recruitment (1)" (Figma 234:222), generated with gen2.py (`enq`), form overlay `EmployerEnquiryForm` (shared form components; file attach PDF/DOCX <=10 MB; consent). PROVISIONAL (not in design): "Number of hires" and "Hiring timeline" option lists, and the four service options of "Service of interest". 1440 form-vs-PDF side-by-side: `comparison/employer-enquiry/form_pdf_vs_build_1440.png`; screenshots at 1440/1024/820/390 in the same folder.
- Hire Talent / Discuss Hiring (all headers, mobile menus, Solutions CTAs via ENQUIRY_HREF) -> `/employer-enquiry`. Homepage hero "Hire Talent" CTA still scrolls to the Homepage form (unchanged).
- Shared SelectField chevron fixed (the Tailwind arbitrary class was invalid -> no chevron on any select); now inline background-image.
- Solutions mobile menu gained "Resources" (order now Home, Solutions, Industries, How We Work, For Employers, Jobs, Resources, About). NOT changed: Solutions DESKTOP headers (Figma PDFs have no Resources item).
- FAQ: reusable `components/Accordion.tsx` (button, aria-expanded/controls, region, inert when closed, grid-rows transition). Applied to the Homepage FAQ (desktop canvas + mobile), open by default as in Figma; cards 86px open, 16px gap. How We Work / IT FAQs have no answer text -> unchanged.
- Scroll reveal: `hooks/useReveal.ts`, `components/ScrollReveal.tsx` (+StaggerContainer), CSS in index.css, built into SectionCanvas (desktop) and `MobileReveal` (mobile sections). Opacity + 16px translateY, once, 600ms; visible without JS / reduced motion / above the fold.
- How We Work: still BLOCKED (clean Figma export missing) — alignment mismatches cannot be verified; no changes.
- Tests: hiring 46, nav 30, nav2 38 (expectations updated for /employer-enquiry), new ux suite 175 (FAQ x4 widths, Hire Talent desktop/mobile, mobile menu order, enquiry form, reveal). tsc/oxlint/build clean.

## Jobs page (2026-11-14) — `/jobs`
- Frame: Figma `246:6710` (Group 36 > 247:6711 > 251:8347 > `246:5837` "Jobs & Talent - Curated Career Opportunities & Search", 1440 x 3753.55). Figma get_metadata worked once (structure, section order and size); get_screenshot/design_context were blocked by the Starter-plan limit, so visuals come from Drive `07_Jobs.pdf`, whose page size is exactly 1440 x 3753.55 and whose section names match the Figma tree. No outdated/duplicate frame found in the inspected tree (nested groups wrap one identical frame).
- Sections: header, hero (breadcrumb, badge, H1, stats, photo + placement card), search console, 6-step candidate architecture, curated job openings (6 cards), Join Talent Network form, employer CTA, footer.
- Built: generator (`gen2.py jobs`, static sections) + working components JobsSearchConsole / JobsList / TalentNetworkForm (shared form components + useFormState), mobile layout hand-written. Icons extracted as small SVGs from the PDF vectors (assets/icons).
- Pixel diff vs PDF render at 1440 (pixels differing >40/255): whole page 3.6%, hero 3.5%, console 3.4%, steps 2.0%, list 3.3%, form ~5.9%, CTA+footer 3.4% (text anti-aliasing / letter-spacing). Side-by-sides in `comparison/jobs/`; screenshots 1440/1024/820/390.
- Interactions: search filters the 6 openings; domain chips filter by keyword inference (NOT defined in design); Reset; "Apply Now" and "Fast-track via Talent Pool" -> `#join` form (inference: only application form on the page); "Post a Job / Hire Talent" -> /employer-enquiry; "Review Enterprise Solutions" -> /solutions; header Jobs link -> /jobs on all pages (desktop + mobile menus).
- NOT in design / unresolved: job "Details" button + quick-apply drawer (no design) -> button has no action; "Min Package ₹0 LPA" and "Sort By" are static (no options defined); PROVISIONAL option lists for Total experience and Notice period; hero photo is a 512x286 PDF-embedded image (low-res, provisional until Figma export); footer links have no destinations (same as other pages); unfilled Figma screenshot comparison (blocked).
- Tests: tsc, oxlint, build clean; hiring 46, nav 30, nav2 38, ux 175, new jobs suite 117 (4 widths x search/filters/apply/form validation, CTAs, nav from 9 pages, mobile menu) all pass.

## Jobs — final status (2026-11-14, after approval)
**Status: implementation COMPLETE against the Drive PDF `07_Jobs.pdf` (temporary visual reference). Exact Figma screenshot verification PENDING** (Figma MCP limit; frame `246:6710` / `246:5837`).

Approved decisions applied:
- Apply Now and "Fast-track via Talent Pool" scroll to the talent application form (`#join`).
- Domain chips stay functional. Keyword mapping (INFERRED, not in design; `jobs/jobsState.ts`): IT & Cloud = cloud|devops|aws|kubernetes|terraform|ci/cd; AI & Machine Learning = ai|langchain|vector|machine learning; FinTech & Backend = fintech|backend|node.js|golang|kafka|postgres; Engineering Leadership = manager|leadership|architecture; All Positions = no filter. Matching runs on the visible card text only.
- Details opens an accessible dialog (portal, Esc/overlay/Close, focus returns) showing only data already on the card: title, badge, company, location, experience, package, work mode, posted, deadline, skills, plus Apply Now. No description/responsibilities/etc. exist in the design, none were added. Screenshots: `comparison/jobs/details_dialog_1440.png`, `_390.png`.
- Sort By ("Most Recent") and Min Package ("₹0 LPA") stay static.
- PROVISIONAL option lists (not in design): Total experience = 0-2, 3-5, 6-8, 9-12, 12+ Yrs; Notice period = Immediate, 15, 30, 60, 90 Days. Also provisional: Employer Enquiry "Number of hires" / "Hiring timeline" lists.
- Hero photo (`jobs-x60.png`, 512x286 from the PDF) stays PROVISIONAL until a verified high-resolution asset exists.
- Tests: Jobs suite now 137 checks (adds Details dialog, Esc, focus return, dialog Apply) all pass; hiring 46, nav 30, nav2 38, ux 175 unchanged and passing; tsc/oxlint/build clean.

Blocked / not started: Resources `263:14245` needs a clean Figma export (Drive PDF is 1568px wide with duplicated text); About `255:9067` must first be confirmed and exported. Neither page was started.

## How We Work — SLA section fix (2026-11-14)
- Cause: the generated canvas laid the SLA section out as separate absolutely-positioned text with mis-fitted letter-spacing (`94%` = -9.4px, `90 Days` = -18px, `72/94/4:1/90` as one stacked heading), so values overlapped; the pink band, divider lines and the four ring icons were loose vector paths.
- Fix: new `HowWeWork/SlaCommitments.tsx` (one flex row per metric: ring icon, number+unit, divider, copy share one vertical centre; right-hand "Measurable outcomes. Stronger hiring." column). Desktop = 1440px band (pink #fff5f5, rows 94px pitch, geometry from the PDF); `fluid` = stacked for < 1024px. Old generated text/paths of that band removed from Desktop.tsx; mobile dump lines replaced in Mobile.tsx. Ring SVGs extracted from the PDF (`assets/sla/*.svg`, de-duplicated).
- Text unchanged. Reference: Drive PDF `05_How_to_work_(2).pdf` (temporary; clean Figma export `258:12955` still missing). Remaining known mismatches there: ring stroke slightly heavier and partial arc not reproduced; unit "%" / "Days" positions approximated; hero breadcrumb overlap, empty badge pill and timeline bar (pre-existing, need clean export). Screenshots: `comparison/how-we-work-sla/`.
- Discuss Hiring band / shared footer: the How We Work design has its own CTA ("NEXT STEP — Schedule Strategy Call" form) and dark footer; there is no shared Discuss-Hiring or footer component in the project (each page carries its own generated footer). Not added/replaced without Figma confirmation.
- Tests: hiring 46, nav 30, nav2 38, ux 175, jobs 137 pass; tsc/oxlint/build clean; SLA rows have no overlapping children and no horizontal overflow at 1440/1024/820/390.

## Global navigation + lazy loading (2026-11-14)
- Audit (1440/1024/820/390, 10 routes): Home appeared once everywhere; Resources was MISSING from the Solutions overview, the 4 Solutions detail pages and the Employer Enquiry headers (desktop) and from nothing else. Mobile menus were three separate copies (ResponsiveSitePage, SolutionsMobileChrome, ResponsiveHome) with different ids/ARIA/active logic; Home's used in-page hashes.
- Shared: `src/navigation.ts` (NAV_ITEMS, ENQUIRY_ROUTE, activeNavLabel) + `components/MobileHeader.tsx` (one mobile header: aria-expanded/controls, Esc closes + returns focus, closes on navigation, route-based active state). The three old copies were removed. Desktop headers remain fixed 1440px Figma layouts (not merged into one component: positions are page-specific); Resources added and the 7 + 1 items re-spaced evenly (gap 32px, measured Poppins widths) in SolutionsHeader.tsx, Permanent/IT/HR/Executive Desktop.tsx and EmployerEnquiry/Desktop.tsx.
- Labels/destinations: Home / Solutions / Industries / How We Work / For Employers (`/#contact`, approved label) / Jobs (`/jobs`) / Resources (not implemented, inert `#`) / About (not implemented, inert `#`) / CTA -> `/employer-enquiry`. CTA label stays "Discuss Hiring" on Solutions pages and Employer Enquiry (Figma) and "Hire Talent" elsewhere. Active: detail pages -> Solutions; Employer Enquiry -> Solutions (as in its Figma header).
- Lazy loading: App.tsx lazy-loads Solutions overview + 4 details, Industries, How We Work, Employer Enquiry, Jobs (Homepage stays in the entry chunk); Suspense with a slim top progress bar (`RouteFallback`), `RouteErrorBoundary` (retry/reload on failed chunk). Below-fold `<img>` in generated pages got `loading="lazy" decoding="async"` (Home untouched). MobileReveal waits for the lazy page.
- Limitation: headers live inside each page (fixed Figma canvases), so they re-mount on route change (no persistent shared header layer).
- Tests: navfinal suite 298 checks (order, single Home, Resources, active state, no overlap, mobile menu incl. Esc/focus/close, refresh, back/forward, chunk loaded on demand, failed-chunk UI) + hiring 46, nav 30, nav2 38, ux 175, jobs 137 pass; tsc/oxlint/build clean.
- Missing routes: Resources, About (pages not implemented; blocked on Figma exports).
