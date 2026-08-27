# SC-500 Animation Studio

This folder uses [Motion Canvas](https://github.com/motion-canvas/motion-canvas) to create short, code-driven security explainers.

Why Motion Canvas was selected:
- MIT licensed.
- TypeScript-based, which matches the web project better than a Python-only animation stack.
- Designed specifically for informative vector animations and voice-over synchronization.
- Can produce repeatable scenes from code, so SC-500 concepts can share the same visual language.

The first scene demonstrates **why Conditional Access exists**.

## Local use

```bash
cd animation-studio
npm install
npm start
```

Open the Motion Canvas editor, preview the scene, and export a video or image sequence from the editor.

The generated media can then be placed in the main site's assets and embedded in the corresponding lesson.

## Content pattern

Each explainer should answer:
1. What existed before?
2. What problem or attack pattern appeared?
3. Why was the control created?
4. Where does it sit in the architecture?
5. What changes after the control is enabled?
6. What should a security engineer verify?

Motion Canvas source is used as a dependency; its project is MIT licensed.

## Included scenes

- Conditional Access — why identity context is needed beyond a password.
- Private Endpoint — why PaaS services need private reachability.
- Managed Identity — why workloads should avoid stored credentials.
- Azure Key Vault — why secrets and cryptographic material need centralized protection.
- Microsoft Defender for Cloud — why cloud posture must be assessed continuously.
- Microsoft Sentinel — why security telemetry needs centralized detection and automated response.

These scenes are intentionally short and reusable. The next step is to export them as WebM/MP4 assets and embed the matching clip into each lesson.
