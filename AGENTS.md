# SC-500 Prep — Design Agent Instructions

When changing user-facing UI in this repository:

1. Read `DESIGN_SKILLS.md`.
2. If your environment supports installed agent skills, use the relevant design/critique skills before implementation.
3. Start by auditing the existing screen and any user-provided reference screenshot.
4. State the intended design direction internally before coding and keep it consistent across landing, auth, dashboard, and lesson views.
5. Prefer restrained, high-quality interfaces over adding more cards, labels, icons, or text.
6. Preserve application security and backend behavior unless the task explicitly requires backend changes.
7. Never weaken authentication, session handling, invite checks, CSP, D1 access controls, or server-side validation for visual convenience.
8. Before merge, compare the finished implementation to the approved visual target and correct obvious mismatches.

The current product direction is personal, light, illustration-led, simple, and polished — not corporate and not dashboard-heavy.
