# Personal Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-extended-cc:subagent-driven-development (recommended) or superpowers-extended-cc:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Jenil's existing GitHub Pages portfolio with a responsive recruiter-facing site that presents verified product, software, embedded and industrial-engineering work.

**Architecture:** Build a dependency-light static site with semantic HTML, focused CSS and a small progressive-enhancement JavaScript file. Keep all fonts, images and the résumé local so the project works beneath GitHub Pages' `/Personal_website/` path without a build step.

**Tech Stack:** HTML5, CSS, vanilla JavaScript, Python standard-library verification scripts, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-09-22-personal-portfolio-design.md`

## Global Constraints

- Use Boxmate's restraint and layout philosophy without copying its logo, blue palette, stickers or campus tags.
- Personal palette: warm paper, graphite, muted neutrals and one restrained copper accent.
- Use only verified facts from the final Google APM résumé, application profile and repository evidence.
- Preserve the public URL and support relative loading beneath `/Personal_website/`.
- Do not use Bootstrap, third-party CDNs, a map embed, forced scroll snapping, skill meters or logo clouds.
- Use no em dashes in website copy.

**User decisions (already made):**

- Primary audience is recruiters for product and technical roles.
- Design first, then publish through GitHub Pages only.
- Use Boxmate's design philosophy rather than its full color scheme.
- Include control-panel schematic work as a requirements-to-shop-floor story.

---

### Task 1: Build verified content and asset foundation

**Goal:** Create a self-contained content and asset foundation with current contact details, résumé, fonts and optimized project imagery.

**Files:**
- Create: `assets/fonts/aktiv-grotesk-regular.otf`
- Create: `assets/fonts/aktiv-grotesk-bold.otf`
- Create: `assets/fonts/mont-black.ttf`
- Create: `assets/images/portrait.jpg`
- Create: `assets/images/boxmate-product.webp`
- Create: `assets/images/control-panel.webp`
- Create: `assets/images/embedded-systems.webp`
- Replace: `Jenil-resume.pdf`
- Create: `scripts/verify_content.py`

**Acceptance Criteria:**
- [ ] `Jenil-resume.pdf` is the final Google APM résumé and extracts `jmakwana@cs.cmu.edu`.
- [ ] Every local image is web-sized, descriptive and traceable to an existing repository or workspace asset.
- [ ] Local fonts exist and no production page will require a font CDN.
- [ ] The verification script rejects outdated `jmakwana@wisc.edu`, `Unviersity`, em dashes and absent required metrics.

**Verify:** `python3 scripts/verify_content.py` → prints `content verification passed` and exits 0.

**Steps:**

- [ ] Copy the current résumé from `../Applications/Jenil_Makwana_Google_APM_Resume.pdf` to `Jenil-resume.pdf` and copy the approved font files from the Boxmate skill assets into `assets/fonts/`.
- [ ] Select the existing real portrait and project images, crop them without fabricating content, and export web-sized WebP/JPEG files. Keep source attribution in `assets/images/SOURCES.md`.
- [ ] Create `scripts/verify_content.py` to read `index.html`, `style.css` and extracted résumé text, fail on outdated contacts or banned copy, and assert the strings `150+`, `3.5x`, `six engineers`, `control-panel`, and `jmakwana@cs.cmu.edu` exist in the relevant artifacts.
- [ ] Run the verification script and correct every reported mismatch.
- [ ] Commit with `git commit -m "chore: prepare verified portfolio assets"`.

### Task 2: Implement the responsive editorial portfolio

**Goal:** Replace the Bootstrap page with the full semantic single-page portfolio and distinct personal visual system.

**Files:**
- Replace: `index.html`
- Replace: `style.css`

**Acceptance Criteria:**
- [ ] Hero communicates product-minded software and systems engineering in the first viewport.
- [ ] Proof strip shows four supported outcomes without overstating employer or customer impact.
- [ ] Selected work includes Boxmate, USEMCO requirements-to-shop-floor work plus the AI tool, and embedded/scientific systems.
- [ ] Experience, capabilities, education and contact sections use current verified details.
- [ ] Layout is responsive at 375px, 768px and 1440px with no horizontal overflow.
- [ ] Visual system uses warm paper, graphite and copper with restrained spacing and no Boxmate brand assets.

**Verify:** `python3 -m http.server 4173` and browser checks at `http://127.0.0.1:4173/` → all sections render, assets load and widths show no horizontal scrollbar.

**Steps:**

- [ ] Write semantic `index.html` with a skip link, sticky navigation, hero, proof strip, three case studies, experience timeline, capabilities, education and contact footer.
- [ ] Use the verified copy from the spec and final résumé. Link only public artifacts; render unavailable employer work as explanatory case-study text without broken links.
- [ ] Write `style.css` with local `@font-face` declarations, design tokens, fluid type using `clamp()`, editorial grids, quiet borders and the copper accent restricted to key labels and controls.
- [ ] Add mobile navigation layout, one-column case studies and touch-safe controls below 760px.
- [ ] Serve locally, inspect 375px, 768px and 1440px layouts, then commit with `git commit -m "feat: rebuild personal portfolio"`.

### Task 3: Add progressive interaction and accessibility

**Goal:** Add subtle navigation and reveal behavior while keeping the page fully usable without JavaScript.

**Files:**
- Create: `script.js`
- Modify: `index.html`
- Modify: `style.css`
- Create: `scripts/verify_markup.py`

**Acceptance Criteria:**
- [ ] Mobile menu is keyboard-operable, closes on selection and maintains correct `aria-expanded` state.
- [ ] Reveal effects use IntersectionObserver and become static when reduced motion is requested.
- [ ] Skip link, focus indicators, landmark structure, heading order and image alt text are present.
- [ ] The page content remains available when JavaScript is disabled.
- [ ] External links opened in new tabs use safe `rel` attributes.

**Verify:** `python3 scripts/verify_markup.py` → prints `markup verification passed`; browser console contains no errors during navigation and reduced-motion testing.

**Steps:**

- [ ] Implement the menu toggle, scroll-aware header and reveal observer in `script.js`, guarding each feature when its target element is absent.
- [ ] Add `.js` and `.reveal` enhancement states so content is visible by default and animations run only after JavaScript initialization.
- [ ] Add a `prefers-reduced-motion: reduce` block that removes smooth scrolling and transitions.
- [ ] Create `scripts/verify_markup.py` using `html.parser` to assert one `main`, one level-one heading, non-empty image alt text, skip-link target, required section IDs and safe external-link relationships.
- [ ] Run the script, test keyboard navigation, and commit with `git commit -m "feat: add accessible portfolio interactions"`.

### Task 4: Verify and publish through GitHub Pages

**Goal:** Prove the final site works locally and publish the exact verified commit through the repository's GitHub Pages deployment.

**Files:**
- Create: `.nojekyll`
- Create: `README.md`
- Modify: repository settings only if Pages is not already deploying `main` from the root

**Acceptance Criteria:**
- [ ] Local desktop and mobile screenshots show no clipping, broken images, overflow or placeholder content.
- [ ] All required links return the intended destination and the résumé opens the current PDF.
- [ ] `python3 scripts/verify_content.py` and `python3 scripts/verify_markup.py` pass from a clean checkout.
- [ ] The pushed commit is served successfully at `https://j-makwana.github.io/Personal_website/`.
- [ ] Production inspection confirms current email, responsive navigation, working assets and no console errors.

**Verify:** `python3 scripts/verify_content.py && python3 scripts/verify_markup.py` plus production browser inspection → both scripts pass and the Pages URL visibly serves the new site.

**Steps:**

- [ ] Add `.nojekyll` and document local preview, verification and GitHub Pages deployment in `README.md`.
- [ ] Run both verification scripts, serve locally, capture desktop and mobile screenshots and fix every visible issue.
- [ ] Inspect `git diff --check`, confirm no secrets or unrelated files are staged, and commit with `git commit -m "docs: add portfolio deployment guide"`.
- [ ] Push `main` to `origin` and use `gh api repos/j-makwana/Personal_website/pages` to verify or configure Pages for the `main` branch root.
- [ ] Wait for the Pages build, inspect the production URL and record the deployed commit SHA in the final report.
