import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Colors",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj;

type Swatch = { name: string; value: string; cssVar?: string };

type Section = {
  title: string;
  description?: string;
  swatches: Swatch[];
};

const sections: Section[] = [
  {
    title: "Background / Light",
    swatches: [
      { name: "Primary / 50", value: "#ffffff", cssVar: "--cg-bg-primary-50" },
      { name: "Secondary / 75", value: "#e8e8e8", cssVar: "--cg-bg-secondary-75" },
      { name: "Tertiary / 100", value: "#f3f3f3", cssVar: "--cg-bg-tertiary-100" },
    ],
  },
  {
    title: "Background / Dark",
    swatches: [
      { name: "Primary / 50", value: "#212121", cssVar: "--cg-bg-primary-50-dark" },
      { name: "Secondary / 75", value: "#303030", cssVar: "--cg-bg-secondary-75-dark" },
      { name: "Tertiary / 100", value: "#414141", cssVar: "--cg-bg-tertiary-100-dark" },
    ],
  },
  {
    title: "Text / Light",
    swatches: [
      { name: "Primary", value: "#0D0D0D", cssVar: "--cg-text-primary" },
      { name: "Secondary", value: "#5D5D5D", cssVar: "--cg-text-secondary" },
      { name: "Tertiary", value: "#8F8F8F", cssVar: "--cg-text-tertiary" },
      { name: "Inverted", value: "#8F8F8F", cssVar: "--cg-text-inverted" },
    ],
  },
  {
    title: "Text / Dark",
    swatches: [
      { name: "Primary", value: "#FFFFFF", cssVar: "--cg-text-primary-dark" },
      { name: "Secondary", value: "#CDCDCD", cssVar: "--cg-text-secondary-dark" },
      { name: "Tertiary", value: "#AFAFAF", cssVar: "--cg-text-tertiary-dark" },
      { name: "Inverted", value: "#AFAFAF", cssVar: "--cg-text-inverted-dark" },
    ],
  },
  {
    title: "Icon / Light",
    swatches: [
      { name: "Primary", value: "#0D0D0D", cssVar: "--cg-icon-primary" },
      { name: "Secondary", value: "#5D5D5D", cssVar: "--cg-icon-secondary" },
      { name: "Tertiary", value: "#8F8F8F", cssVar: "--cg-icon-tertiary" },
      { name: "Inverted", value: "#8F8F8F", cssVar: "--cg-icon-inverted" },
    ],
  },
  {
    title: "Icon / Dark",
    swatches: [
      { name: "Primary", value: "#FFFFFF", cssVar: "--cg-icon-primary-dark" },
      { name: "Secondary", value: "#CDCDCD", cssVar: "--cg-icon-secondary-dark" },
      { name: "Tertiary", value: "#AFAFAF", cssVar: "--cg-icon-tertiary-dark" },
      { name: "Inverted", value: "#AFAFAF", cssVar: "--cg-icon-inverted-dark" },
    ],
  },
  {
    title: "Accents / Light",
    swatches: [
      { name: "Accent / Blue", value: "#0285FF", cssVar: "--cg-accent-blue" },
      { name: "Accent / Red", value: "#E02E2A", cssVar: "--cg-accent-red" },
      { name: "Accent / Orange", value: "#E25507", cssVar: "--cg-accent-orange" },
      { name: "Accent / Green", value: "#008635", cssVar: "--cg-accent-green" },
    ],
  },
  {
    title: "Accents / Dark",
    swatches: [
      { name: "Accent / Blue", value: "#0285FF", cssVar: "--cg-accent-blue-dark" },
      { name: "Accent / Red", value: "#FF8583", cssVar: "--cg-accent-red-dark" },
      { name: "Accent / Orange", value: "#FF9E6C", cssVar: "--cg-accent-orange-dark" },
      { name: "Accent / Green", value: "#40C977", cssVar: "--cg-accent-green-dark" },
    ],
  },
];

export const Overview: Story = {
  render: () => (
    <div className="min-h-dvh bg-black text-white">
      <div className="mx-auto max-w-[1200px] px-8 py-10">
        <div className="text-2xl font-semibold">ChatGPT Foundations — Colors</div>
        <div className="mt-2 text-sm opacity-70">
          Foundation palette shared across Apps SDK UI components.
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold">{section.title}</div>
              {section.description ? (
                <div className="mt-1 text-xs opacity-70">{section.description}</div>
              ) : null}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {section.swatches.map((swatch) => (
                  <div key={swatch.name} className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-xs opacity-80">{swatch.name}</div>
                      <div className="text-[10px] opacity-50">{swatch.value}</div>
                    </div>
                    <div
                      className="mt-3 h-10 w-full rounded-lg border border-white/10"
                      style={{ backgroundColor: swatch.value }}
                    />
                    {swatch.cssVar ? (
                      <div className="mt-2 text-[10px] opacity-50">{swatch.cssVar}</div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
