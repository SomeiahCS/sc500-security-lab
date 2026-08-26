# SC-500 Security Lab v0.1

Static visual study app for SC-500.

## Current scope
- 12-track SC-500 roadmap
- Microsoft Entra starter module
- Beginner / SC-500 Exam / Security Engineer modes
- visual mental models and exam traps
- flashcards and quick quiz
- browser-local progress
- strict CSP and security headers

## Local run
```bash
python3 -m http.server 8080
```
Open `http://localhost:8080`.

## GitHub → Cloudflare
1. Create a GitHub repo, e.g. `sc500-study`.
2. Push this folder to `main`.
3. Connect the repo in Cloudflare Pages/Workers static deployment.
4. No build command is required for this version.
5. Attach a custom subdomain such as `sc500.example.com`.
6. Protect that hostname with Cloudflare Access and allow only approved identities.

## Security model
- static frontend only
- no backend/database
- no API keys or secrets
- no remote requests
- progress stored locally in the browser
- authentication should be enforced by Cloudflare Access

## Content policy
The content is original study material mapped to the official Microsoft SC-500 objectives. Do not copy Microsoft Learn course text or images verbatim.
