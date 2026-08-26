# SC-500 Security Lab v0.2

A static, minimal, modern study app for Microsoft SC-500.

## What's new in v0.2
- redesigned minimal modern interface
- all 12 SC-500 learning tracks included
- Beginner / SC-500 Exam / Security Engineer learning modes
- visual flow diagram for every track
- exam trap comparisons for every track
- per-track scenario quiz
- per-track flashcards
- local browser progress tracking
- static deployment ready for Cloudflare Workers

## Included learning tracks
1. Microsoft Entra security
2. Azure Key Vault
3. Governance, RBAC and compliance
4. Azure Storage security
5. Azure SQL and database security
6. Azure network security
7. AI security
8. Servers and virtual machines
9. Apps, APIs, containers and AKS
10. Microsoft Defender for Cloud
11. Microsoft Sentinel
12. Microsoft Security Copilot

## Local testing
Use a simple HTTP server from the project directory:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deployment
This repository is configured for Cloudflare Workers static asset deployment with `wrangler.jsonc`.

When you push these files to GitHub, Cloudflare should auto-deploy using your existing connected project.

## Notes
- Content is original and summarized from the official SC-500 objective areas.
- No backend, database or API keys are required.
- Progress is stored locally in the browser.
