import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Typography",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj;

type Row = {
  name: string;
  size: string;
  weight: string;
  lineHeight: string;
  letterSpacing: string;
};

type Platform = {
  title: string;
  font: string;
  rows: Row[];
};

const web: Platform = {
  title: "Typography / Web",
  font: "SF Pro",
  rows: [
    { name: "heading1", size: "36px", weight: "600", lineHeight: "40px", letterSpacing: "-0.1px" },
    { name: "heading2", size: "24px", weight: "600", lineHeight: "28px", letterSpacing: "-0.25px" },
    { name: "heading3", size: "18px", weight: "600", lineHeight: "26px", letterSpacing: "-0.45px" },
    { name: "body / regular / emphasized", size: "16px", weight: "400 / 600", lineHeight: "26px", letterSpacing: "-0.4px" },
    { name: "body-small / regular / emphasized", size: "14px", weight: "400 / 600", lineHeight: "18px", letterSpacing: "-0.3px" },
    { name: "caption / regular / emphasized", size: "12px", weight: "400 / 600", lineHeight: "16px", letterSpacing: "-0.1px" },
  ],
};

const ios: Platform = {
  title: "Typography / iOS",
  font: "SF Pro",
  rows: [
    { name: "heading1", size: "32px", weight: "600", lineHeight: "40px", letterSpacing: "-0.1px" },
    { name: "heading2", size: "24px", weight: "600", lineHeight: "28px", letterSpacing: "-0.25px" },
    { name: "heading3", size: "18px", weight: "600", lineHeight: "26px", letterSpacing: "-0.45px" },
    { name: "body / regular / emphasized", size: "16px", weight: "400 / 600", lineHeight: "26px", letterSpacing: "-0.4px" },
    { name: "body-small / regular / emphasized", size: "14px", weight: "400 / 600", lineHeight: "18px", letterSpacing: "-0.3px" },
    { name: "caption / regular / emphasized", size: "12px", weight: "400 / 600", lineHeight: "16px", letterSpacing: "-0.1px" },
  ],
};

const android: Platform = {
  title: "Typography / Android",
  font: "SF Pro",
  rows: [
    { name: "heading1", size: "32px", weight: "600", lineHeight: "40px", letterSpacing: "-0.1px" },
    { name: "heading2", size: "24px", weight: "600", lineHeight: "28px", letterSpacing: "-0.25px" },
    { name: "heading3", size: "16px", weight: "600", lineHeight: "26px", letterSpacing: "0px" },
    { name: "body / regular / emphasized", size: "16px", weight: "400 / 600", lineHeight: "26px", letterSpacing: "0px" },
    { name: "body-small / regular / emphasized", size: "14px", weight: "400 / 600", lineHeight: "18px", letterSpacing: "0px" },
    { name: "caption / regular / emphasized", size: "12px", weight: "400 / 600", lineHeight: "16px", letterSpacing: "0px" },
  ],
};

const platforms: Platform[] = [web, ios, android];

export const Overview: Story = {
  render: () => (
    <div className="min-h-dvh bg-black text-white" style={{ fontFamily: "var(--cg-font-family-web)" }}>
      <div className="mx-auto max-w-[1200px] px-8 py-10">
        <div className="text-2xl font-semibold">ChatGPT Foundations — Typography</div>
        <div className="mt-2 text-sm opacity-70">Web / iOS / Android type definitions</div>

        <div className="mt-8 grid gap-8">
          {platforms.map((platform) => (
            <section
              key={platform.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">{platform.title}</div>
                <div className="text-xs opacity-60">Font: {platform.font}</div>
              </div>

              <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                <div className="grid grid-cols-5 gap-0 bg-white/5 text-[11px] uppercase tracking-wide text-white/60">
                  <div className="px-3 py-2">Definition</div>
                  <div className="px-3 py-2">Size</div>
                  <div className="px-3 py-2">Weight</div>
                  <div className="px-3 py-2">Line height</div>
                  <div className="px-3 py-2">Letter spacing</div>
                </div>
                {platform.rows.map((row) => (
                  <div key={row.name} className="grid grid-cols-5 gap-0 border-t border-white/10">
                    <div className="px-3 py-2 text-sm">{row.name}</div>
                    <div className="px-3 py-2 text-sm opacity-80">{row.size}</div>
                    <div className="px-3 py-2 text-sm opacity-80">{row.weight}</div>
                    <div className="px-3 py-2 text-sm opacity-80">{row.lineHeight}</div>
                    <div className="px-3 py-2 text-sm opacity-80">{row.letterSpacing}</div>
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
