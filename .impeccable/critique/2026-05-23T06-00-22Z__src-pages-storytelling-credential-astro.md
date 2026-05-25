---
target: credential storytelling page and scenes
total_score: 27
p0_count: 1
p1_count: 2
timestamp: 2026-05-23T06-00-22Z
slug: src-pages-storytelling-credential-astro
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Progress dots map 11 scenes to 10 buckets |
| 2 | Match System / Real World | 2 | Georgia serif contradicts instrument-panel brand |
| 3 | User Control and Freedom | 4 | Hash routing, keyboard nav, scene jumping — excellent |
| 4 | Consistency and Standards | 1 | 4 distinct background strategies; zero design-system tokens |
| 5 | Error Prevention | 3 | useEffect missing from StoryFooter imports — LaserPointer crashes |
| 6 | Recognition Rather Than Recall | 3 | ChapterNav labels all scenes; no reading-time estimate |
| 7 | Flexibility and Efficiency | 3 | No theme toggle for different presentation contexts |
| 8 | Aesthetic and Minimalist Design | 2 | Tailwind grayscale only; Scene010 overloads one viewport |
| 9 | Error Recovery | 4 | Navigation always reversible |
| 10 | Help and Documentation | 2 | ControlsHint auto-dismisses in 4s and does not return |
| Total | | 27/40 | Needs Work |

## Anti-Patterns Verdict
Borderline slop. No gradient text, no side-stripe borders. Issues: Georgia/serif in all 11 scene headings, zero design-system token usage (palette is entirely Tailwind grayscale), Scene010 invents blue/amber/violet category colors outside brand system.

## Priority Issues
P0: useEffect not imported in StoryFooter — LaserPointer crashes on toggle
P1: Zero design-system token usage — CSS custom properties required before theming is possible
P1: Georgia serif in 11/11 scenes — brand coherence failure vs. Geist Variable mandate
P2: Scene010 cognitive overload — 17 items across 4 category systems on one viewport
P3: Scene010 accent colors (blue-400, amber-400, violet-400) outside design system
