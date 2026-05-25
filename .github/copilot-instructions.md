# Copilot/Agent Instructions for Bucks2Bar

Purpose

- Provide concise, project-specific guidance for AI assistants working on this repo.

Scope

- Applies to frontend files in this repository: `index.html`, `script.js` and any new static assets.
- Technology stack: plain HTML/CSS/JS, Bootstrap 5 (CDN or local), Chart.js, no build tool required.

Rules and Preferences

- UI and visuals
    - Use Bootstrap 5 for layout and components by default; prefer a local fallback CSS file when browser privacy blocking is possible.
    - Keep styles minimal and put small overrides in `index.html` inside a `<style>` block unless the user requests a separate stylesheet.

- JavaScript and data handling
    - Use vanilla JavaScript (ES6+) only. Do not introduce frameworks (React/Vue/etc.) without explicit request.
    - Keep data in simple in-memory arrays/objects and wire inputs to charts directly.
    - Use `data-` attributes on input elements for month/type mapping (e.g., `data-month="Jan" data-type="income"`).
    - Format currency using `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })`.
    - All button must be a green color.

- Charts
    - Use Chart.js for visualization; prefer CDN for quick prototypes but include guidance for local copies if browser blocks CDN resources.
    - Create a grouped bar chart with two datasets: Income and Expense for months Jan–Dec.

- Files and edits
    - Make minimal, focused changes. Follow existing naming and layout conventions.
    - When creating or editing files, prefer small, single-purpose commits (or file edits) and avoid sweeping refactors.

- UX and testing
    - Test locally using a simple HTTP server (e.g., `python -m http.server` or VS Code Live Server) to avoid `file://` origin issues.
    - Ensure inputs update the chart live and totals update immediately.

- Style and communication
    - Keep generated code concise and free of extraneous comments unless explaining non-obvious decisions.
    - When referring to files in messages, wrap filenames in backticks.

Examples of good prompts to the assistant

- "Add CSV export for monthly data into a `download.csv` file and add a button to `index.html`."
- "Switch Bootstrap CDN references to local files and include fallback instructions in `copilot-instructions.md`."
- "Add a net-savings summary card above the table showing (Income - Expense) with rupee formatting."

Clarifying questions for the user (if needed)

- Should these instructions apply to all future frontend work, or only this small project?
- Do you prefer CDN dependencies or local copies by default?

Next steps

- Update or approve this file. I can then enforce these rules in future edits and create related helpers (e.g., a README or a `README-dev.md` with run instructions).
