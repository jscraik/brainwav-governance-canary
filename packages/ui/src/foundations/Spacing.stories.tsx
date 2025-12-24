import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Spacing",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj;

type ScaleItem = { name: string; value: string; cssVar: string };

type Section = {
  title: string;
  items: ScaleItem[];
};

const sections: Section[] = [
  {
    title: "Heading / 1",
    items: [
      { name: "space-128", value: "128px", cssVar: "--cg-space-128" },
      { name: "space-64", value: "64px", cssVar: "--cg-space-64" },
      { name: "space-32", value: "32px", cssVar: "--cg-space-32" },
      { name: "space-24", value: "24px", cssVar: "--cg-space-24" },
      { name: "space-20", value: "20px", cssVar: "--cg-space-20" },
      { name: "space-16", value: "16px", cssVar: "--cg-space-16" },
    ],
  },
  {
    title: "Marketing & Comms",
    items: [
      { name: "space-12", value: "12px", cssVar: "--cg-space-12" },
      { name: "space-8", value: "8px", cssVar: "--cg-space-8" },
      { name: "space-6", value: "6px", cssVar: "--cg-space-6" },
      { name: "space-4", value: "4px", cssVar: "--cg-space-4" },
    ],
  },
  {
    title: "Comms",
    items: [
      { name: "space-2", value: "2px", cssVar: "--cg-space-2" },
      { name: "space-1", value: "1px", cssVar: "--cg-space-1" },
      { name: "space-0", value: "0", cssVar: "--cg-space-0" },
    ],
  },
];

export const Overview: Story = {
  render: () => (
    <div className="min-h-dvh bg-black text-white" style={{ fontFamily: "var(--cg-font-family-web)" }}>
      <div className="mx-auto max-w-[1200px] px-8 py-10">
        <div className="text-2xl font-semibold">ChatGPT Foundations — Spacing</div>
        <div className="mt-2 max-w-[720px] text-sm opacity-70">
          Spacing units are fundamental to creating a cohesive and harmonious visual experience.
          Standardizing spacing values ensures consistency across components and improves usability
          and accessibility.
        </div>

        <div className="mt-8 grid gap-8">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="text-sm font-semibold">{section.title}</div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {section.items.map((item) => (
                  <div key={item.name} className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <div className="flex items-center justify-between text-xs opacity-80">
                      <span>{item.name}</span>
                      <span>{item.value}</span>
                    </div>
                    <div className="mt-2 text-[10px] opacity-50">{item.cssVar}</div>
                    <div className="mt-3 rounded-lg border border-white/10 bg-white/5 p-2">
                      <div className="text-[10px] uppercase tracking-wide opacity-60">Sample</div>
                      <div className="mt-2 rounded-md border border-white/10 bg-black/30">
                        <div
                          className="h-2"
                          style={{ width: item.value, background: "rgba(255,255,255,0.35)" }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  ),
};
