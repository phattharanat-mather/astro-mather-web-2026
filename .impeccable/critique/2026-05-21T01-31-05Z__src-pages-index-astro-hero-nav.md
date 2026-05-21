---
target: hero section and nav
total_score: 25
p0_count: 0
p1_count: 2
timestamp: 2026-05-21T01-31-05Z
slug: src-pages-index-astro-hero-nav
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Entrance animations give good load feedback; no scroll-progress or active-nav state |
| 2 | Match System / Real World | 3 | Copy clear; "4M" unexplained in-context |
| 3 | User Control and Freedom | 2 | Mobile drawer has no Escape close; three competing CTAs above fold |
| 4 | Consistency and Standards | 2 | font-mono on buttons violates design system; nav Contact button missing btn-glow |
| 5 | Error Prevention | 3 | Mostly static; low risk surface |
| 6 | Recognition Rather Than Recall | 3 | Nav labels clear; ThemeSwitcher icon-only with no tooltip |
| 7 | Flexibility and Efficiency | 2 | No keyboard shortcut to close mobile drawer; no scroll-spy |
| 8 | Aesthetic and Minimalist Design | 2 | Three CTAs above fold; gradient accent uses banned --grad token |
| 9 | Error Recovery | 3 | n/a |
| 10 | Help and Documentation | 2 | "4M" jargon unexplained; ThemeSwitcher no accessible label |
| **Total** | | **25/40** | **Functional with notable gaps** |

## Priority Issues

P1: font-mono on buttons (Hero.astro:68,88; Nav.astro:71) — violates Label Reserve Rule
P1: Three CTAs above fold — remove hero ghost "Contact Us" link
P2: Mobile drawer instant toggle, no animation, no Escape close
P2: Nav Contact button missing btn-glow class (Nav.astro:67)
P3: No scroll-spy active state on nav links
