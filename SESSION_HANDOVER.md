# Session Handover: Portfolio Project ("Pill")

**Branch:** `theme-apple-glass`  
**Last Updated:** October 8, 2026  
**Active Environment:** Next.js (App Router, Turbopack) on `http://localhost:3000`

---

## 1. Key Accomplishment in This Session: Pure Glass Transparency

### Context & User Requirement
- **Requirement:** Match the pure glass transparency of **Screen 1** (`Screenshot 2026-10-08 at 17.08.13.png`), and avoid the blurred/foggy look of **Screen 2** (`Screenshot 2026-10-08 at 17.08.26.png`).
- **Root Cause Identified:** The hero capsule had `backdrop-blur-2xl` (`backdrop-filter: blur(40px)`) applied. This heavy Gaussian blur completely washed out the sharp triangular facets and dynamic lighting of the underlying 3D Vanta Waves mesh, turning the center of the capsule into an opaque, milky blue fog.
- **Resolution:**
  - Removed `backdrop-blur-2xl` from the main hero capsule section (`card1Ref`) in `app/page.tsx`.
  - Tuned the fill to pure translucent Apple glass (`bg-white/[0.12]`), retaining the crisp perimeter edge (`border border-white/30`), inner reflection highlight (`inset_0_1px_2px_rgba(255,255,255,0.45)`), and depth shadow (`shadow-[0_25px_65px_rgba(0,10,30,0.45)]`).
  - Symmetrically aligned the mobile stacked hero capsules (Capsules 1, 2, 3) to `bg-white/[0.12]` without `backdrop-blur-2xl`, ensuring the moving 3D geometric waves remain crisp and fully visible through the glass on all devices.

### Mobile Architecture Update (Frame 11 Parity)
- **Zero Overlap & 0 Padding:**
  - Removed negative margins (`-mt-16 sm:-mt-20`) that caused hero capsules to overlap and clip text.
  - Set container to `flex flex-col gap-0` so all pills stack directly one below the other with 0 padding between them, matching Figma Frame 11.
- **Pure White Borders:**
  - Replaced semi-transparent / dark borders with crisp, bright white borders (`border-2 border-white` on hero capsules, `border-[16px] sm:border-[18px] border-white` on toggle chassis, `border-white` on active knobs). Removed dark perimeter drop shadows that darkened capsule borders.
- **Removed Header Badges & Subtitles:**
  - Eliminated all small badge pills and helper subtitles (`Selected Work`, `Tap any pill to toggle cover and case study`, `About`, `Kind Words`, `Contact`), yielding a clean, continuous flow of interactive pills.

---

## 2. Technical Stack & Architecture

- **Framework:** Next.js 16 (React 19, Turbopack, App Router)
- **Styling:** Tailwind CSS v4, custom CSS variables in `app/globals.css`
- **Animations & Physics:**
  - **GSAP + ScrollTrigger:** Pinned container scrub transitions for the 7 stacked cards on desktop.
  - **Lenis Smooth Scroll:** Synchronized 1:1 with GSAP ScrollTrigger ticker.
  - **CSS Bouncy Bubble Physics:** `@keyframes giant-grow-in` / `bounce-in` for squishy toggle switch interactions.
- **3D Backgrounds:**
  - `components/VantaWaves.tsx`: Full-bleed background 3D geometric mesh running continuous Three.js topology shaders.
  - `components/VantaKnobWaves.tsx`: Isolated Three.js wave canvas running inside portfolio card knob toggles.

---

## 3. Section Overview (7 Portfolio Cards)

1. **Card 1 — Intro / Hero:**
   - Full glass capsule displaying intro statement: *"Hi, I'm Herald :) I design digital products that help and simplify people's lives"*.
   - Crystal-clear transparency showing 3D Vanta waves underneath.
   - Internal top navigation pill (`Home`, `Work & Archive`, `About`, `Contact`).
2. **Card 2 — Case Study 01: Ungdomskort:**
   - Giant physical switch chassis with authentic thick white border.
   - OFF state: Overview and interactive knob. ON state: Deep dive into the transit case study.
3. **Card 3 — Case Study 02: X-Bit:**
   - Hardware/crypto physical switch card.
4. **Card 4 — Case Study 03: I Pupi Siciliani:**
   - Authentic Sicilian puppets culture platform with custom white script typography.
5. **Card 5 — About Me:**
   - Herald's personal story, background, and passions switch card.
6. **Card 6 — Recommendations:**
   - Interactive testimonials and endorsements switch card.
7. **Card 7 — Contact:**
   - Apple iMessage frosted glass pill with quick copy email, form, and contact channels.

---

## 4. Verification & Testing

- Verified via headless browser screenshot capturing WebGL output:
  - Inside-pill gradient sharpness jump: `0.103` (Screen 2 blurry) $\rightarrow$ `2.126` (Screen 1 crystal-clear).
  - Background 3D low-poly triangles and lighting are completely crisp through the glass capsule.
  - UI navbar, logo, scroll track, and text typography remain sharp and properly contrasted.

---

## 5. Next Steps for Upcoming Sessions

1. **User Feedback Alignment:** Confirm with Herald that the transparency on live `http://localhost:3000` is 100% satisfactory.
2. **Interaction Polish:** Continue testing physical toggle feedback, hover states, and touch gestures on mobile devices.
3. **Asset Verification:** Ensure all project mockups (`/ungheromockup.svg`, `/xbitheromockup.svg`, etc.) load seamlessly without layout shifts.
