# Build Tasks: Mobile Experience & Responsiveness

Date: 2026-10-02

## Phase 1 — Audit and issue inventory

- [ ] **Audit the current mobile experience at key breakpoints**: test at 320px, 375px, 390px, 768px, and 1024px to document layout overflow, clipping, overlaps, and unreadable text. _Reuses: existing route structure and current styles._
- [ ] **Document the highest-risk mobile UX issues**: header behavior, sticky sections, overflowed typography, overly tall case-study cards, and animation-heavy sections. _Depends on: Phase 1 audit._
- [ ] **Capture a prioritized issue list**: severity, affected pages, and simple reproduction notes for each problem. _Depends on: issue logging._
- [ ] **Set a mobile QA baseline**: note the current state of navigation, gallery cards, forms, and content density before changing code. _Reuses: current pages and components._

## Phase 2 — Responsive foundation and navigation

- [ ] **Implement a mobile-first breakpoint and spacing system**: tighten section spacing and reduce oversized hero and card spacing on small screens. _Reuses: existing Tailwind utilities and CSS theme values._
- [ ] **Refine the site shell and header behavior**: optimize logo size, menu state, and scroll-dependent hiding for mobile. _Modifies: src/components/KraftSite.tsx and src/styles.css._
- [ ] **Improve touch targets and interaction clarity**: ensure CTAs, nav items, and form controls are comfortable on mobile. _Depends on: shell and spacing cleanup._

## Phase 3 — Homepage optimization

- [ ] **Rework the hero for small screens**: shorter copy blocks, tighter spacing, and clearer CTA hierarchy. _Modifies: src/routes/index.tsx._
- [ ] **Reduce motion load on mobile**: simplify marquee/scroll animations and lower transform intensity for smaller screens. _Depends on: foundation and navigation updates._
- [ ] **Stack homepage content blocks into a readable flow**: service cards, stat bands, and process sections should collapse cleanly. _Modifies: src/routes/index.tsx and src/styles.css._

## Phase 4 — Work pages and case studies

- [ ] **Convert the work index to a mobile-friendly vertical stack**: remove desktop-only sticky/card-density assumptions. _Modifies: src/routes/work.index.tsx._
- [ ] **Optimize project detail pages for small screens**: reduce masthead scale, simplify metadata blocks, and improve gallery readability. _Modifies: src/routes/work.$slug.tsx._
- [ ] **Check image and spacing behavior on project pages**: ensure images do not overflow or feel cramped on narrow screens. _Depends on: work page refactor._

## Phase 5 — Secondary pages and form quality

- [ ] **Refine the Services page layout for small screens**: simplify side-nav behavior and content blocks. _Modifies: src/routes/services.tsx._
- [ ] **Refine the About page layout and motion**: reduce depth effects and preserve readability on mobile. _Modifies: src/routes/about.tsx._
- [ ] **Improve the Contact form for mobile use**: touch-friendly controls, spacing cleanup, and success-state clarity. _Modifies: src/routes/contact.tsx._

## Phase 6 — Performance and final polish

- [ ] **Reduce mobile performance costs**: optimize image loading, motion intensity, and scroll-driven effects. _Reuses and modifies: src/components/KraftSite.tsx and src/styles.css._
- [ ] **Run a mobile accessibility and interaction pass**: check focus states, contrast, reduced motion behavior, and form usability. _Depends on: prior phases._
- [ ] **Final QA review**: validate the site across the target breakpoints and confirm that the highest-priority UX issues are resolved. _Review step._

## Review

- [ ] **Design review**: compare the mobile experience against the site’s editorial brand goals and confirm the experience remains premium, readable, and responsive.
