---
description: Read this before implementing or modifying authentication in the project.
---

# Clerk Authentication Rules for linkshortnerproject

These instructions define how auth must work in this app.

- Use **Clerk only** for authentication and auth-related UI.
- Do not introduce other auth providers, custom session systems, JWT schemes, or alternative auth libraries.
- Keep auth logic aligned with the existing `@clerk/nextjs` setup.

## Route behavior

- `/dashboard` is a protected route and must require the user to be signed in.
- `/` is a public landing page, but signed-in users must be redirected to `/dashboard`.
- Public visitors may access the homepage when not signed in.

## Sign in / sign up behavior

- `SignInButton` and `SignUpButton` flows should launch Clerk modals.
- Do not replace modal-based Clerk auth with full-page custom forms.

## Implementation guidance

- Use Clerk middleware and the existing Clerk provider pattern in `app/layout.tsx` and `proxy.ts`.
- Prefer Clerk helpers from `@clerk/nextjs` in server-side route protection.
- Do not expose Clerk server-side environment values in client-side bundles.
- Keep auth changes minimal and consistent with the current app router structure.
