# Web Design Skills Setup

This project uses a small set of external agent-skill repositories as a design-quality layer for future UI work.

## Install

From the repository root:

### macOS / Linux

```bash
bash scripts/install-design-skills.sh
```

### Windows PowerShell

```powershell
powershell -ExecutionPolicy Bypass -File scripts/install-design-skills.ps1
```

The installer uses the `skills` CLI and attempts to add:

- `emilkowalski/skills`
- `ConardLi/garden-skills`
- `elayadesign/ai-design-skills`
- `MengTo/Skills`
- `jakubkrehel/skills`
- `codeswithroh/tastemaker`
- `Owl-Listener/designer-skills`

If an agent does not support the generic skills installer, install that repository using the method documented by the upstream project.

For Claude Code, the Owl Listener pack also supports:

```text
/plugin marketplace add Owl-Listener/designer-skills
```

## How to use them for SC-500 Prep

For any meaningful visual change, treat the current product as an existing design system rather than generating a random new UI.

Use the skills in this order:

1. **Visual critique first** — identify hierarchy, density, spacing, typography, interaction, and consistency problems before changing code.
2. **Design direction** — choose one coherent direction for the whole screen instead of mixing unrelated card styles.
3. **Landing-page judgment** — keep the public page personal, minimal, illustration-led, and concise.
4. **UI/system design** — establish spacing, radius, type, color, icon, and component rules before implementation.
5. **Motion** — add motion only where it improves orientation, feedback, or understanding. Avoid decorative animation everywhere.
6. **Responsive pass** — verify desktop, tablet, and mobile layouts rather than only shrinking desktop.
7. **Final critique** — compare the implementation against the approved screenshot or preview and fix visible mismatches before deployment.

## Skill focus

### Emil Kowalski
Use for animation decisions, easing, interaction polish, transitions, and identifying places where motion genuinely helps.

### garden-skills
Use `web-design-engineer` for complete web UI design, redesign modes, responsive behavior, design-system declarations, and implementation quality.

### elayadesign / ai-design-skills
Use for landing-page composition, visual hierarchy, hero structure, conversion clarity, and page-level presentation.

### Meng To
Use for modern interaction patterns, polished product UI ideas, motion, layouts, and prototyping patterns.

### Jakub Krehel
Use for fine UI craft: typography, spacing, hierarchy, responsiveness, accessibility, and subtle interface polish.

### tastemaker
Use for overall art direction, palette discipline, visual taste, layout composition, and avoiding generic AI-looking interfaces.

### Owl Listener designer-skills
Use for formal visual critique, UI design, interaction design, design systems, responsive audits, and handoff checks.

## Project-specific design rules

- Product name: **SC-500 Prep**.
- Landing page should feel personal, not corporate.
- Landing page should stay intentionally sparse.
- Main CTA: **Try it out**, leading to sign in.
- App navigation should remain simple: **Overview** and **Prep Tracks**.
- Use topic-specific Azure-style icons instead of track numbers.
- Do not reintroduce the old S5 logo or heavy branding.
- Preserve authentication, invitation, session, D1 progress, and Cloudflare security behavior during visual redesigns.
- Do not expose secrets, auth tokens, or sensitive API data in browser-visible code.
- Do not remove existing learning features merely to make a screenshot cleaner; move advanced content into the study workspace when necessary.
- When an approved design preview exists, implementation should be compared against that preview before merge.

## Before merging a UI PR

Confirm:

- visual hierarchy matches the approved direction;
- spacing and sizing are deliberate, not inherited accidentally from old styles;
- no old dark-theme CSS is unexpectedly overriding the new visual system;
- desktop and mobile both work;
- lesson, quiz, flashcard, auth, admin, progress sync, and logout behavior still work;
- the page does not reveal server-only security details;
- animations respect `prefers-reduced-motion`.
