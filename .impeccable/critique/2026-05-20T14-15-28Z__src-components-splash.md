---
target: src/components/splash
total_score: 23
p0_count: 1
p1_count: 2
timestamp: 2026-05-20T14-15-28Z
slug: src-components-splash
---

### Design Health Score

| #     | Heuristic                         | Score | Key Issue                                                                                |
| ----- | --------------------------------- | ----- | ---------------------------------------------------------------------------------------- |
| 1     | Visibility of System Status       | 3     | No hydration loading state for client:only 3D variant; minor layout-shift risk           |
| 2     | Match System / Real World         | 3     | "Hide for today" slightly awkward; otherwise clear                                       |
| 3     | User Control and Freedom          | 2     | No Escape key handler in Astro variant; no keyboard dismiss in 3D variant; no focus trap |
| 4     | Consistency and Standards         | 1     | rounded-2xl, bg-white buttons, shadow-2xl — complete departure from design system tokens |
| 5     | Error Prevention                  | 2     | localStorage failures unhandled; IIFE has no null guard on DOM elements                  |
| 6     | Recognition Rather Than Recall    | 3     | Two clearly labeled actions; intent is obvious                                           |
| 7     | Flexibility and Efficiency of Use | 1     | No Escape, no keyboard nav; power users have no fast exit path                           |
| 8     | Aesthetic and Minimalist Design   | 2     | Functionally adequate but design-system-disconnected; 3D effect is spectacle             |
| 9     | Error Recovery                    | 3     | "Hide for today" prevents accidental permanent dismissal                                 |
| 10    | Help and Documentation            | 3     | Simple enough; no documentation needed                                                   |
| Total |                                   | 23/40 | Acceptable — significant improvements needed                                             |

### Anti-Patterns Verdict

LLM assessment: AI-assembled appearance. rounded-2xl, bg-white close button, shadow-2xl are all template defaults. The design system character (sharp 4px corners, Command Violet, flat surfaces, OKLCH) is absent at every layer. The 3D card is a recognizable Aceternity showcase pattern.

Deterministic scan: CLI detector unavailable (bundled engine missing). Manual scan found: rounded-2xl on modal body, bg-white on Close button, shadow-2xl, hex fallback #0d0f1c in CSS variable, bg-black/60 backdrop approaching forbidden #000, rounded-lg (8px) on all buttons. Absolute ban triggered: modal fires before any user interaction.

### Overall Impression

Technically functional but completely bypasses the design system. For an enterprise trust-building site, a full-screen interstitial before the user has seen a single sentence is exactly the wrong first impression. The biggest opportunity is reconsidering the pattern: a dismissible announcement strip would achieve the same goal without blocking the page.

### What's Working

1. Dismissal persistence logic is solid — per-entry localStorage key with midnight-expiry for "hide for today" is thoughtful.
2. Layout variant system is well-structured — five named variants with explicit fallback logic is a clean content-agnostic API.
3. 3D card variant is gated correctly — requires explicit opt-in via content collection flag.

### Priority Issues

[P0] The modal itself violates the absolute ban on "modal as first thought." Enterprise evaluators hit a full-screen blocker before seeing any content. Fix: replace with a dismissible announcement strip.

[P1] Complete design system disconnect. rounded-2xl, bg-white button, shadow-2xl — none match system tokens. Fix: 4px radius, Command Violet primary button, no shadow, tinted OKLCH backdrop.

[P1] Accessibility failures. No role="dialog", no aria-modal, no aria-labelledby, no focus trap, no Escape handler. WCAG AA requirement stated in PRODUCT.md. Fix: add dialog semantics, focus trap, Escape key handler.

[P2] 3D card variant is spectacle, not function. Parallax tilt on an announcement modal reads as "look what we can do" at the moment users are evaluating trustworthiness. Fix: remove 3D card variant; use ambient glow for depth if needed.

[P2] Side layout variants not responsive. flex-row with fixed w-2/5 image column has no mobile collapse breakpoint. Fix: flex-col sm:flex-row with full-width stacked image on small screens.

### Persona Red Flags

Marcus (Enterprise Evaluator): Hits full-screen modal before seeing homepage content. Modal doesn't match site aesthetic — looks like a pop-up ad. Wrong first impression for trust-building.

Sam (Accessibility-Dependent): No role="dialog" means NVDA doesn't announce the modal. Focus stays in page content behind overlay. No Escape key. Cannot use the modal keyboard-only.

Alex (Power User): Escape does nothing (Astro variant). 3D variant has no keyboard dismiss at all. 3-second friction at entry point.

### Minor Observations

- alt="" on all modal images is only correct if decorative; content collection schema should require alt alongside src.
- Dead code: imgEl is constructed but unused in image-left/image-right branch of SplashModal3DCard.tsx.
- client:only="react" means 3D variant content is invisible to SSR and crawlers.
- prose prose-invert prose-sm doesn't inherit design system body token; heading styles inside MDX content will use Tailwind prose defaults, not system scale.

### Questions to Consider

- "Is there content so time-sensitive it must interrupt a user before they've seen the homepage — or is an announcement strip doing the same job without the trust cost?"
- "If the 3D card variant was removed and the energy redirected into an on-brand base modal, would the component be simpler, more consistent, and more trustworthy?"
- "What does a returning enterprise client think when they hit this modal for the third time in a week?"
