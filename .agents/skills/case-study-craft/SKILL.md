---
name: case-study-craft
description: >-
  Product design portfolio and case study architecture guide synthesized from Figma, Stripe, and Linear design leadership. Activate this skill whenever creating, redesigning, writing, or refactoring case study pages (`/work/[slug]`), `data/caseStudiesData.ts`, or portfolio showcase components.
---

# Case Study & Portfolio Craft Skill

Use these principles and structural rules when building or recreating project case study pages in [page.tsx](file:///Users/heraldago/Desktop/pill/app/work/[slug]/page.tsx) and [caseStudiesData.ts](file:///Users/heraldago/Desktop/pill/data/caseStudiesData.ts).

For full quotes and deep-dive notes from Figma, Stripe, and Linear, read [figma-stripe-linear-principles.md](./references/figma-stripe-linear-principles.md).

## 1. Core Principles (Figma / Stripe / Linear)

1. **Articulate the "Why" and Trade-offs (Tammy Taabassum, Figma)**:
   - Never just list deliverables or show final UI. For every major design decision, explicitly show:
     - **Options considered** (Option A vs Option B)
     - **Constraints & trade-offs** (technical, legal, timeline, user friction)
     - **Why the chosen direction won**
2. **Show Visual Iteration & Unshipped Explorations (Julia Han & Noah Levin, Figma)**:
   - Include discarded concepts, early wireframes, or future vision explorations alongside shipped screens.
   - Show the evolution from messy problem to refined solution rather than jumping straight to polished hero mockups.
3. **Bring Work to Life with Scannable Motion (Kelly Hu & Cai Charniga, Figma)**:
   - Hiring managers scan in 30-60 seconds before reading deep.
   - Use short loop videos/GIFs or interactive micro-demos of key flows (e.g., onboarding, audio player, sommelier quiz) rather than static-only SVGs.
   - Pair every visual with a crisp caption explaining what decision is shown.
4. **Craft as Input, Quality/Beauty as Output (Karri Saarinen, Linear & Katie Dill, Stripe)**:
   - **Aesthetic-Usability Effect**: Visual hierarchy, copy clarity, and micro-details directly drive comprehension and conversion.
   - **60fps & Micro-Details (Yuhki Yamashita & Chia Amisola, Figma)**: Meticulous typography, consistent spacing, proper punctuation, working links, zero layout shift, and responsive polish across viewports stand out more than risky flourishes.
   - **Rave Reviews + Hard Metrics**: Combine quantitative KPIs with authentic qualitative signals (user quotes, support ticket drops, stakeholder champions).
5. **Own Mistakes & Pivots (Design Hiring 101, Figma)**:
   - Highlight a specific hypothesis that failed during testing, why it failed, and how the design pivoted based on user evidence.

## 2. Required Case Study Page Architecture

When recreating or updating project pages (`/work/[slug]`), structure each case study for **dual-speed reading** (30-second executive scan + 5-minute deep dive):

1. **Hero & Executive Summary**:
   - Clear 1-sentence value proposition, role, team, timeline, live link, and scannable impact pills.
   - Interactive or high-res hero showcase.
2. **Problem & Friction Audit ("Walking the Store")**:
   - Concrete user/business pain points backed by baseline metrics or observed friction logs (before state).
3. **Key Design Decisions & Trade-offs (2-3 Deep Dives)**:
   - Structured as **Context -> Explorations / Trade-offs -> Final Decision & UI/Video**.
   - Visual before/after or iteration comparison.
4. **System & Craft Details**:
   - Highlight specific UI craft, micro-interactions, accessibility (WCAG), or component architecture decisions.
5. **Impact: Quantitative Metrics + Qualitative "Rave Reviews"**:
   - Hard KPIs paired with real stakeholder/user testimonials.
6. **Failures, Pivots & Retrospective**:
   - Honest breakdown of what broke or failed in testing and what was learned.

## 3. Quality & Typography Checklist

- Language consistency: Ensure UI labels, navigation, and case study copy use a single consistent language (English across the portfolio, or localized cleanly without mixing English home cards and Italian project pages).
- Punctuation & symbols: Use clean typography; avoid inline bullet dots (`•`, `·`) as separators and avoid em/en dashes per workspace rules.
- Verify all links, responsive breakpoints, and image aspect ratios before completing changes.
