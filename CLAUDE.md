# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `repo-prompt-ui` — a React-based configuration UI for building repo-context prompts. It's a frontend-only application using localStorage for persistence (no backend). The app supports two main modes: "compose" for building instructions/file selections, and "chat" for conversations.

## Commands

```bash
# Development
pnpm dev              # Start Vite dev server (port 5173)

# Build & Lint
pnpm build            # TypeScript check + Vite production build
pnpm lint             # ESLint check (includes React hooks rules)

# Testing
pnpm test             # Run Vitest tests (uses Storybook addon-vitest integration)
vitest run            # Run tests once (CI mode)
vitest watch          # Watch mode

# Storybook
pnpm storybook        # Start Storybook dev server (port 6006)
pnpm build-storybook # Build Storybook static site
```

## Tech Stack

- **Package Manager:** pnpm
- **Build:** Vite 7 + React 19
- **Styling:** Tailwind CSS 4 (via @tailwindcss/vite plugin)
- **UI Library:** Radix UI primitives (Dialog, Dropdown, Popover, Tabs, Tooltip)
- **Icons:** lucide-react
- **Testing:** Vitest + Playwright (browser tests via @vitest/browser-playwright)
- **Docs:** Storybook 10 with addon-vitest integration

## Architecture

### Component Structure

```
src/
├── components/
│   ├── chat/          # Chat mode UI (ChatPanel, mode selectors, popovers)
│   ├── panels/        # Compose mode panels (Instructions, SelectedFiles, ContextBuilder, etc.)
│   ├── shell/         # App shell (AppShell, Sidebar, FileTree, headers/docks)
│   └── ui/            # Shared UI primitives (Button, Panel, dialogs, etc.)
├── data/              # Model definitions, mock file index
├── lib/               # Utilities (file tree, localStorage, filters)
└── App.tsx            # Root state container
```

### State Management Pattern

`App.tsx` is the single source of truth for all app state. It lifts state to the root and passes props down. State persistence happens via `lib/persist.ts` (localStorage wrappers).

### File Tree Architecture

The file tree is a core abstraction. Key modules:
- `lib/fileTree.ts` — Tree construction, traversal, search, sort
- `lib/fileTreeFilters.ts` — Sidebar filtering (selected-only, hide-dotfolders, etc.)
- `data/fileIndex.mock.ts` — Mock data source (to be replaced with real FS access)

The tree is a recursive `TreeNode` type (folder with children, or file with metadata). The sidebar renders this tree with checkbox state for selection.

### Panel System

The app has three context tabs in compose mode:
1. **SelectedFiles** — View/manage selected file selections, presets
2. **ContextBuilder** — AI-assisted context discovery (placeholder implementation)
3. **ApplyXml** — Apply XML tool outputs (placeholder)

### Chat System

`ChatPanel` manages chat sessions, messages, and modes. Uses localStorage for persistence (`repoPrompt.chat.sessions.v1` keys). Supports multiple chat modes and pro-edit configuration.

### Model Selection

`data/models.ts` defines provider/model structures. Three provider contexts:
- **DISCOVERY** — Context builder AI
- **PLAN** — Planning AI
- **PRO_EDIT** — Pro edit agent

Each has provider/model selection with coercion fallbacks.

## Development Notes

- **Storybook tests:** Run automatically via Vitest's `@storybook/addon-vitest` integration
- **Browser tests:** Use Playwright via `@vitest/browser-playwright` (headless Chromium)
- **No backend:** All data is mock or localStorage-persisted
- **Presets:** Keyboard shortcuts Cmd/Ctrl+1-9 to switch, Cmd+S to save current, Cmd+P for new preset
