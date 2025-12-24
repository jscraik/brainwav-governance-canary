# Apps SDK UI Monorepo

This repo is split into a demo app and a reusable UI library.

## Structure

- `apps/demo` — Vite demo app that composes the UI library
- `packages/ui` — UI component library + Storybook

## Commands

From the repo root:

- `pnpm dev:demo` — run the demo app
- `pnpm build:demo` — build the demo app
- `pnpm storybook:ui` — run Storybook for the UI package
- `pnpm build:ui` — build the UI package (types output)

## Notes

- The UI library exports components and `main.css`.
- The demo app consumes `@openai/apps-sdk-ui-kit` via workspace dependency.
