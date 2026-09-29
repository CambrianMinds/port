# AGENTS.md — Portfolio Site Architecture & Design Guide

## 1. Core Identity & Copywriting Directives

**Persona:** The user is a **Systems Architect** and **Agentic Developer**. 
*   **Do not** refer to the user as a traditional "programmer" or imply their primary skill is manually typing syntax.
*   **Methodology ("Agentic Orchestration"):** The user operates at the abstraction layer of a Senior Technical Lead. They handle conceptual heavy lifting, rigorous QA, system design, and the definition of strict behavioral constraints. They direct AI coding agents to execute the codebase.
*   **Tone:** Confident, highly leveraged, and professional. The methodology is a distinct advantage, not a shortcut. Do not use apologetic language regarding syntax generation.
*   **Action Verbs:** Architected, Engineered, Directed, Designed, Evaluated, Orchestrated.

---

## 2. Design Philosophy: "Editorial Minimalism & High-Craft Restraint"

The portfolio MUST completely reject the "2022 SaaS Slop" aesthetic. 
**Forbidden Elements:**
*   No glowing neon pills or multi-stop mesh gradients.
*   No excessive glassmorphism, frosted glass, or heavy soft-shadow systems.
*   No arbitrary particle effects or scroll-jacking that do not serve the content.

**Target Aesthetic (Direction 2: Academic / Editorial Minimalism):**
*   **Typography-First:** Use generous whitespace, strong hierarchy, and a strict, high-contrast palette (e.g., pure black/white, or a monochromatic dark mode). 
*   **Editorial Layout:** Print-inspired grids, offset layouts, and meticulous typography. Mix high-end serifs (e.g., EB Garamond, Playfair) with highly legible sans-serifs (Inter) or monospaced fonts (JetBrains Mono) for technical metadata.
*   **Restrained, Purposeful Motion:** Any motion should be micro-scale (e.g., typographic animations, hover underlines that slide, or instant, tactile color inversions). Refer to the interaction design of developers like **Rauno Freiberg** or **Stefan Vitasović**—motion should feel like a demonstration of precision engineering, not a template effect.
*   **Scannability:** The structure must prioritize clarity for technical recruiters or peers (inspired by **Brittany Chiang**'s highly scannable, hierarchy-driven approach).

---

## 3. Technical Architecture & Implementation Rules

The site itself must be treated as production software and serve as evidence of the user's engineering capability.

*   **Performance is Paramount:** The site must have flawless Lighthouse scores, near-instant load times, and semantic HTML. 
*   **Stack:** Avoid over-engineering. If building a static site, prefer lightweight tooling (e.g., Astro, Vanilla HTML/CSS/JS, or a highly optimized Next.js setup if routing/code-splitting is strictly necessary).
*   **Accessibility (a11y):** Full keyboard navigation, semantic tags, and support for `prefers-reduced-motion` must be baked into the foundation.
*   **Structure:** A project-first hierarchy. Use a "Problem → Architecture → Constraints → Outcome" flow for case studies rather than simple lists of technologies used.

---

## 4. Key Projects to Feature (Reference Material)

When generating project cards, always highlight the **system architecture, multi-agent workflows, and behavioral constraints** involved. 
*(Reference `portfolio_data.md` from the scratch directory for exact URLs and tech stacks).*

1.  **Diaclectics:** An anti-sycophancy pipeline engineered to strictly constrain AI compliance-bias. Highlight the rigorous logic required to force an LLM to adhere to constraints prior to token emission.
2.  **Indiana Expungement Assistant:** 100% client-side civic tech. Highlight zero-cloud telemetry and complex legal rule parsing (IC § 35-38-9).
3.  **Local Brain:** Embedded SLM desktop workstation. Highlight hardware-aware hybrid offloading and native C++ bindings.
4.  **Terminal User Interfaces (TUIs):** Custom wrappers (xAI TTS, gh-tui, CambrianSystems) designed for complex I/O. Emphasize zero-dependency constraints and system integration capabilities.
