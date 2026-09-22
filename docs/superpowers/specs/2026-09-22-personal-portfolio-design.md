# Jenil Makwana Personal Portfolio Design

## Objective

Replace the current GitHub Pages portfolio with a polished recruiter-facing site that presents Jenil as a product-minded software and systems engineer. The site should make his product judgment, technical depth and record of shipping understandable within one minute while rewarding deeper review through concise case studies.

The existing public URL remains `https://j-makwana.github.io/Personal_website/`. Deployment must use GitHub Pages only.

## Audience and message

The primary audience is recruiters and hiring teams for product management, technical product, software engineering and embedded software internships. The opening message should connect those tracks rather than forcing the visitor to choose one identity.

Core positioning: Jenil turns ambiguous user and engineering problems into products that ship. Boxmate supplies the founder and product evidence; USEMCO supplies the requirements-to-manufacturing story plus AI workflow adoption; Credo and UW Space Science supply systems depth.

## Design direction

Apply Boxmate's restrained design philosophy to a distinct personal brand. Reuse the principles, not Boxmate's complete visual identity:

- Whitespace-first layout with one calm column and generous section spacing.
- Use a personal palette built around warm paper, graphite and a restrained copper accent inspired by circuit traces and industrial design. Do not copy Boxmate Blue, navy, logo treatments, campus tags or sticker language.
- Use a clean grotesk typeface with an editorial display face for one hero moment. Do not make the site look like a reskinned Boxmate landing page.
- Sentence-case headings, short copy and quiet rounded containers.
- One warm human detail per major surface, using Jenil's real portrait or real project imagery.
- Motion stays subtle: small reveal transitions, gentle image movement and button feedback. Respect `prefers-reduced-motion`.
- The relationship to Boxmate should be visible in the restraint and clarity of the layout, not in copied brand assets or colors.

## Page structure

### Navigation

A compact sticky header with `Jenil Makwana` on the left and links to Work, Experience, About and Contact. The primary action opens the current résumé PDF. On mobile, use a simple accessible menu rather than an off-canvas framework component.

### Hero

The first viewport contains:

- A small CMU/discipline eyebrow.
- A direct headline positioning Jenil as a product-minded software and systems engineer.
- Two short supporting sentences grounded in shipped work.
- Primary action: View selected work.
- Secondary action: Résumé.
- Jenil's real portrait, treated cleanly with a single blue shape or cream panel.

Avoid buzzword stacks, rotating titles and typewriter effects.

### Proof strip

Four compact proof points drawn from verified records:

- 150+ students served through Boxmate.
- 3.5x year-over-year summer revenue growth.
- AI workflow adopted by all six USEMCO engineers.
- Customer-shipped embedded product work.

Use large numerals sparingly and plain captions. Do not imply employer outcomes beyond the supported facts.

### Selected work

Three editorial case-study cards appear in priority order.

1. **Boxmate**: two-sided marketplace model, user research, pricing iterations, UI/UX direction, cross-functional team leadership and product traction.
2. **From client requirements to shop-floor release at USEMCO**: control-panel scoping, component and load decisions, EPLAN schematics, compliance and layout review, client revisions and release for assembly. The AI cutsheet workflow appears inside this case study as a product Jenil built after identifying a recurring engineering bottleneck, including two-pass verification, human review and adoption by all six engineers.
3. **Embedded and scientific systems**: Credo firmware and UW Space Science automation/hardware work, presented as one technical-depth story.

Each case study uses a consistent four-part pattern: problem, role, decisive action and measurable result. Cards should link to available public artifacts only. Private or inaccessible employer repositories must not be presented as public links.

### Experience

A concise vertical timeline lists Boxmate, USEMCO, IdeaFund Ventures, Credo Product Development and UW Space Science & Engineering Center. It should emphasize role, dates and one sentence of scope rather than reproducing the entire résumé.

### Capabilities

Use three short groups instead of progress bars or logo clouds:

- Product and business
- Software and AI products
- Embedded and hardware systems

Skills must be supported by the final résumé and verified project records.

### About and education

Include a brief personal paragraph, Carnegie Mellon University Master of Software Engineering program, UW-Madison Electrical Engineering and Computer Science background, and current Pittsburgh location. Keep coursework selective.

### Contact

End with a simple invitation and direct links to `jmakwana@cs.cmu.edu`, LinkedIn and GitHub. Remove the Google Maps embed and outdated UW email.

## Technical architecture

Use a dependency-light static site suitable for GitHub Pages:

- Semantic `index.html`.
- A focused stylesheet split only if the final file becomes difficult to maintain.
- Small progressive-enhancement JavaScript for navigation and intersection-based reveals.
- Local font files and optimized local imagery so the site does not depend on a CDN.
- Relative URLs that work under the `/Personal_website/` project path.
- No build step unless the existing assets prove that image generation or bundling materially improves maintainability.

The existing repository will be revised in place. Legacy assets may remain during implementation until the replacement is verified; unused assets can then be removed in the same change.

## Content sources

Use the final Google APM résumé, `Applications/application_profile.md`, verified project repositories and existing portfolio assets. Do not invent product metrics, responsibilities, project links or technical claims. The website résumé file must be replaced with the current PDF and retain the `jmakwana@cs.cmu.edu` contact address.

## Responsive and accessible behavior

- Mobile-first layout with comfortable reading width and touch targets.
- No forced full-screen scroll snapping.
- Semantic headings and landmarks.
- Visible keyboard focus, working skip link and keyboard-operable navigation.
- Descriptive image alt text.
- Sufficient color contrast and meaningful content without animation.
- Respect system reduced-motion preferences.

## Verification

Before publication:

1. Serve the site locally from the repository root under a path compatible with GitHub Pages.
2. Inspect desktop and mobile renders visually.
3. Verify navigation, résumé, email, LinkedIn, GitHub and every public project link.
4. Check for horizontal overflow, clipping, broken assets and console errors.
5. Confirm the local fonts load and the site remains readable if JavaScript is unavailable.
6. Run an accessibility check and correct high-impact issues.
7. Confirm GitHub Pages configuration and deployment status after pushing.

## Success criteria

- The first viewport communicates Jenil's product and technical identity without scrolling.
- A recruiter can identify at least three strong outcomes in under one minute.
- Boxmate is the lead product story while software and embedded depth remain prominent.
- The site looks calm, distinctive and intentional across desktop and mobile.
- All public facts and contact details match the verified application record.
- The production site loads successfully at the existing GitHub Pages URL.
