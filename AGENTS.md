# Agent Guide

Working conventions for this repo. This section is hand-maintained — only the block below it is auto-managed by `next dev`.

## Package manager

This project uses **pnpm** exclusively. Do not use `npm` or `yarn` — there is no `package-lock.json` or `yarn.lock`, only `pnpm-lock.yaml`. Run `corepack enable` if `pnpm` isn't already available; the pinned version is in `package.json`'s `packageManager` field.

- `pnpm install` — install dependencies
- `pnpm dev` — start the dev server
- `pnpm build` — production build
- `pnpm lint` — run Biome checks
- `pnpm format` — apply Biome formatting

## Commits

Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, etc.). This is enforced by commitlint via a Lefthook `commit-msg` hook.

## Git hooks

Git hooks are managed by [Lefthook](https://github.com/evilmartians/lefthook) (`lefthook.yml`), installed automatically via the `prepare` script on `pnpm install`:

- `pre-commit` — runs Biome against staged files
- `commit-msg` — validates the commit message against Conventional Commits

Do not bypass hooks (`--no-verify`) unless explicitly instructed to.

## CI

`.github/workflows/lint.yml` runs Biome lint checks on every push and pull request against `main`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
