# shadcn UI Instructions for linkshortnerproject

This app uses shadcn UI for all user interface elements. Follow these rules for UI work in the repository.

- Always use shadcn UI components from `components/ui/*` for buttons, cards, forms, layout primitives, and other reusable UI elements.
- Do not create new custom components in `components/` or elsewhere for UI. Prefer existing shadcn components and composition.
- If a needed UI pattern is not already available as a shared shadcn component, compose it from existing shadcn UI primitives and Tailwind CSS utilities.
- Use the `cn` utility from `lib/utils.ts` to compose class names for shadcn components.
- Keep UI markup semantic, accessible, and consistent with the existing shadcn-inspired styling in the app.
