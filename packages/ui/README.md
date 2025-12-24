# Apps SDK UI Kit

This package provides the shared UI components and **ChatGPT Foundations** tokens used across apps.

## Foundations (required)

Every app **must** import the UI kit CSS once so foundations are applied globally.

In your app entry CSS (e.g. `apps/<app>/src/main.css`):

```css
@import "@openai/apps-sdk-ui-kit/main.css";

/* Tailwind v4 scan sources */
@source "../node_modules/@openai/apps-sdk-ui";
@source "../../packages/ui/src";
@source "./";
```

This ensures:
- All foundation tokens (colors, typography, spacing) are available.
- Apps SDK UI base styles are loaded.
- Tailwind picks up classes in the UI kit and the app.

## Storybook

Run the UI kit storybook:

```bash
pnpm -C packages/ui storybook
```

Foundations live under:
- **Foundations/Colors**
- **Foundations/Typography**
- **Foundations/Spacing**
- **Foundations/Iconography**
