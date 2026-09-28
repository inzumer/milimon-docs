# CLAUDE.md

Guidance for Claude Code (and any other AI coding agent) working in this repository.

## Project

`milimon-docs`: the documentation site of Milimon (Starlight on Astro 7), in Spanish. Pages live in
`src/content/docs/`; **Plan** and **Sugerencias** are generated from `milimon/docs` by
`scripts/sync-docs.mjs` (gitignored output) — edit them in the `milimon` repo, never here.

Commands: `pnpm dev`, `pnpm build` (fails on broken internal links), `pnpm format:check`,
`node --test "scripts/*.test.mjs"`.

## Conventions

- Write for the Milimon team: plain Spanish (vos), short sentences, one flow per page with its
  Mermaid diagram. Diagrams must match the code: check the source before documenting a flow.
- In Mermaid, avoid `;` inside labels and notes (it ends the statement).
- Internal links are absolute with the base: `/milimon-docs/...`.
- Conventional Commits for commits and PR titles; `main` deploys to GitHub Pages, so work on
  `feature/*` or `docs/*` branches and open PRs. Never commit or push unless asked.
