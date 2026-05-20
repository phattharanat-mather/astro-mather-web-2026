---
target: src/pages/careers
total_score: 28
p0_count: 0
p1_count: 2
timestamp: 2026-05-20T15-07-05Z
slug: src-pages-careers
---

## Design Health Score

| #         | Heuristic                       | Score     | Key Issue                                                                                         |
| --------- | ------------------------------- | --------- | ------------------------------------------------------------------------------------------------- |
| 1         | Visibility of System Status     | 3         | Hover states responsive; empty-state offers no escape                                             |
| 2         | Match System / Real World       | 4         | To/Subject/Include mirrors real email — excellent                                                 |
| 3         | User Control and Freedom        | 3         | Back link present; limited exit from empty state                                                  |
| 4         | Consistency and Standards       | 2         | Mono label 8–10× per card; tracking-wide vs tracking-widest inconsistency; inline style for --ink |
| 5         | Error Prevention                | 3         | Pre-filled mailto subjects; no form                                                               |
| 6         | Recognition Rather Than Recall  | 3         | Metadata visible inline; Include checklist reduces recall burden                                  |
| 7         | Flexibility and Efficiency      | 2         | No filtering; flat list doesn't scale beyond ~5 positions                                         |
| 8         | Aesthetic and Minimalist Design | 3         | Clean; overline+heading+paragraph template appears 4× across pages                                |
| 9         | Error Recovery                  | 2         | Empty-state is dead end; no CTA or anchor to open application                                     |
| 10        | Help and Documentation          | 3         | Application instructions clear and structured                                                     |
| **Total** |                                 | **28/40** | **Good with targeted improvement areas**                                                          |

## Anti-Patterns Verdict

No absolute bans triggered (no gradient text, side-stripe borders, or decorative glassmorphism detected). Primary risk is structural sameness — every section uses overline+heading+paragraph template, which reads as template-driven.

## Priority Issues

### [P1] Mono label register saturated per PositionCard

5 mono-label instances per card × 3 cards = 15 instances on listing page. DESIGN.md caps at 6 per page. "View role" is a nav affordance, not metadata.
Fix: Remove mono from "View role" (use text-sm font-medium). Remove from type/location metadata. Reserve mono for department label and date stamp only.

### [P1] Empty state is a dead end

When positions.length === 0, single muted line with no CTA. OpenApplication section exists below but is visually disconnected.
Fix: Add in-page anchor CTA in empty state pointing to open application section.

### [P2] No candidate inspiration moment

Header copy is accurate but describes any boutique consultancy. No vision pull for top talent.
Fix: Add one direct differentiating statement before the current descriptive copy.

### [P2] Overline+heading+paragraph template repeated 4×

Appears in: listing header, OpenApplication left column, detail header, HowToApply. DESIGN.md permits up to 3; beyond that a different composition is required.
Fix: Differentiate HowToApply — drop overline, lead with action directly.

### [P3] Focus styles missing on PositionCard

No focus-visible: class on the <a> wrapper. Browser default ring is inconsistent with design system.
Fix: Add focus-visible:outline-[var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-2.

## Persona Red Flags

**Senior specialist:** line-clamp-2 on summary is insufficient signal to decide click-through. Salary field silently absent when not set. No tech stack visible in listing.

**First-time applicant:** No response time estimate, no hiring stages. prose-ul:text-[var(--muted-foreground)] tones down requirements list at the most critical reading moment.

## Minor Observations

- Dot separator · may breathe better as spacer at small mono sizes
- Back link uses muted-foreground at rest — upgrade to foreground for primary escape affordance
- max-w-7xl → max-w-3xl transition between listing and detail is abrupt on wide viewports
- var(--ink) applied via inline style= inconsistently vs Tailwind class approach elsewhere
