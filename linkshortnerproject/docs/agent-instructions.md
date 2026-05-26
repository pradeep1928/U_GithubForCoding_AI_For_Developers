# Agent Instructions for linkshortnerproject

These instructions are for AI agents working on the `linkshortnerproject` repository. Follow the project conventions closely and keep changes aligned with the existing Next.js + TypeScript + Tailwind + Drizzle stack.

For detail guidlines on specific topics, refer to the modular documentatin in the `/docs` directory. ALWAYS refer to the relevant .md file BEFORE generating any code.

## 1. Project Overview

- This is a Next.js app using the **App Router** (`app/` directory).
- The project uses **TypeScript** with `strict` enabled.
- Styling is built with **Tailwind CSS v4** and shadcn-inspired utility classes.
- Database access is handled through **Drizzle ORM** and **Neon HTTP**.
- UI primitives follow the existing `components/ui/` pattern.
- Path alias `@/` is configured to map to the repository root.

## 2. General Coding Standards

- Use **TypeScript everywhere**. Do not introduce new `.js` files.
- Preserve `strict` typing. Avoid `any`, `@ts-ignore`, and type escapes unless absolutely necessary.
- Do not add dependencies unless they are essential and consistent with the existing stack.
- Keep changes minimal and focused: prefer incremental updates over broad rewrites.
- Use semantic HTML and accessible markup.
- Keep logic separated: UI components in `components/`, shared utilities in `lib/`, database setup in `db/`, pages and routes in `app/`.
- Follow Next.js conventions for route handlers, layouts, and server components.

## 3. Next.js / React Rules

- Prefer **server components** by default in `app/`.
- Only use `use client` in files that require client-side behavior, browser APIs, or state hooks.
- Do not import `next/image` or browser-only modules into server-only code unless the file is explicitly client-side.
- Use `app/layout.tsx` for root layout structure, metadata, fonts, and global providers.
- Keep pages in `app/page.tsx` or nested route folders. If you add API logic, use **App Router route handlers** under `app/api/.../route.ts`.
- Use `next/link` for internal navigation and `target="_blank" rel="noreferrer"` for external links.

## 4. Styling and UI

- Use Tailwind CSS utility classes for styling.
- Keep styling consistent with existing component patterns and theme tokens.
- Use the `cn` utility from `lib/utils.ts` to compose class names safely.
- Prefer reusable UI components in `components/ui/` instead of duplicating button or card markup.
- Follow the existing `Button` component API if creating or updating buttons.
- Refer to `docs/shadcn-ui-instructions.md` for the project rule that all UI elements must use shadcn UI components.

## 5. Database and Data Access

- Use `db/index.ts` for database setup and exports.
- Keep database calls in server-side code or route handlers.
- Do not leak sensitive environment values into client bundles.
- Use `process.env.DATABASE_URL` only on the server.
- Keep data access logic isolated from presentation code.

## 6. File Structure Expectations

- `app/` — pages, layout, root routes, and API route handlers.
- `components/` — reusable React components and UI primitives.
- `components/ui/` — shared presentational components such as buttons.
- `lib/` — shared utilities and helper functions.
- `db/` — database initialization and ORM configuration.
- `public/` — static assets.

## 7. Behavior for Agents

- Respect the existing architecture and do not refactor unrelated files unless required.
- When adding new features, keep them within the current design patterns.
- Review the repository before making changes: match existing abstractions and naming.
- Use consistent formatting and simple, readable code.
- Prefer small, safe changes and validate they fit the existing app structure.

## 8. Documentation and Comments

- Add short comments only when code clarity requires it.
- Keep documentation concise and directly relevant to the feature or change.
- Do not add large explanatory blocks unless they are necessary for maintainability.

## 9. Quality Gate

- Ensure new or updated code compiles under TypeScript.
- Keep the app structure aligned with the current Next.js App Router conventions.
- Confirm no new runtime-only browser APIs leak into server modules.
- Preserve the existing project dependency profile and avoid adding unrelated tooling.

---

These instructions are the guiding rules for AI-assisted development on this repository. Follow them carefully for any agent-driven changes.
