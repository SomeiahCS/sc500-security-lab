# SC-500 Security Lab

A visual, interactive Microsoft SC-500 study app deployed on Cloudflare Workers and protected with Cloudflare Access.

## Current architecture
- Static learning UI served from Cloudflare Workers assets
- Cloudflare Access protects the app
- Cloudflare D1 stores synced progress
- Browser localStorage remains the offline/fallback cache
- GitHub main branch auto-deploys to Cloudflare

## D1 progress sync
The Worker exposes authenticated API routes under `/api/*` and reads the signed-in user from Cloudflare Access.

Stored state includes:
- track completion
- quiz score per track
- flashcard review count

The Worker lazily creates the required D1 tables on the first authenticated API request. `schema.sql` is also included for reference/manual initialization.

## Key files
- `worker/index.js` — backend API and D1 access
- `cloud-sync.js` — browser-to-D1 sync layer
- `wrangler.jsonc` — Worker, assets and D1 binding configuration
- `schema.sql` — D1 schema reference

## Deployment
Cloudflare build/deploy is connected to GitHub. Pushing to `main` triggers deployment automatically.

## Learning tracks
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

## Security notes
- No application password database
- Cloudflare Access supplies user identity
- D1 queries use prepared statements
- API responses are no-store
- restrictive CSP and browser security headers are included
