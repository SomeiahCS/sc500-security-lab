# SC-500 Security Lab v0.3

Interactive visual study app for Microsoft SC-500.

## v0.3 highlights
- redesigned learning flow focused on understanding first
- 48 interactive concept lessons generated across all 12 SC-500 tracks
- Attack view / Defense view for every lesson
- original visual memory flows built with HTML/CSS
- 30-second knowledge checks
- teach-it-back prompts with model answers
- Beginner / SC-500 Exam / Security Engineer modes
- flashcards and track quizzes
- track + lesson progress stored locally in the browser
- no backend, database, API keys, cookies or remote requests
- designed for Cloudflare Workers protected with Cloudflare Access

## Learning model

`Concept → Visual flow → Attack scenario → Defense → Teach it back → Quick check`

The goal is practical understanding and recall rather than passive reading.

## Security

The app remains static. Keep Cloudflare Access enabled in front of the deployed Worker. No application credentials or secrets are required.

## Content

Study material is original and mapped to the official Microsoft SC-500 objective areas. It does not reproduce Microsoft Learn course text or images verbatim.
