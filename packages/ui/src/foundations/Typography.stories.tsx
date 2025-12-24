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

type Column = {
  title: string;
  font: string;
  fontDetails: string;
  rows: Row[];
};

const web: Column = {
  title: "Typography / Web",
  font: "SF Pro",
  fontDetails: "400, 600",
  rows: [
    { name: "heading1", size: "36px", weight: "600", lineHeight: "40px", letterSpacing: "-0.1px" },
    { name: "heading2", size: "24px", weight: "600", lineHeight: "28px", letterSpacing: "-0.25px" },
    { name: "heading3", size: "18px", weight: "600", lineHeight: "26px", letterSpacing: "-0.45px" },
    { name: "body / regular / emphasized", size: "16px", weight: "400 / 600", lineHeight: "26px", letterSpacing: "-0.4px" },
    { name: "body-small / regular / emphasized", size: "14px", weight: "400 / 600", lineHeight: "18px", letterSpacing: "-0.3px" },
    { name: "caption / regular / emphasized", size: "12px", weight: "400 / 600", lineHeight: "16px", letterSpacing: "-0.1px" },
  ],
};

const ios: Column = {
  title: "Typography / iOS",
  font: "SF Pro",
  fontDetails: "400, 600",
  rows: [
    { name: "heading1", size: "32px", weight: "600", lineHeight: "40px", letterSpacing: "-0.1px" },
    { name: "heading2", size: "24px", weight: "600", lineHeight: "28px", letterSpacing: "-0.25px" },
    { name: "heading3", size: "18px", weight: "600", lineHeight: "26px", letterSpacing: "-0.45px" },
    { name: "body / regular / emphasized", size: "16px", weight: "400 / 600", lineHeight: "26px", letterSpacing: "-0.4px" },
    { name: "body-small / regular / emphasized", size: "14px", weight: "400 / 600", lineHeight: "18px", letterSpacing: "-0.3px" },
    { name: "caption / regular / emphasized", size: "12px", weight: "400 / 600", lineHeight: "16px", letterSpacing: "-0.1px" },
  ],
};

const android: Column = {
  title: "Typography / Android",
  font: "SF Pro",
  fontDetails: "400, 600",
  rows: [
    { name: "heading1", size: "32px", weight: "600", lineHeight: "40px", letterSpacing: "-0.1px" },
    { name: "heading2", size: "24px", weight: "600", lineHeight: "28px", letterSpacing: "-0.25px" },
    { name: "heading3", size: "16px", weight: "600", lineHeight: "26px", letterSpacing: "0px" },
    { name: "body / regular / emphasized", size: "16px", weight: "400 / 600", lineHeight: "26px", letterSpacing: "0px" },
    { name: "body-small / regular / emphasized", size: "14px", weight: "400 / 600", lineHeight: "18px", letterSpacing: "0px" },
    { name: "caption / regular / emphasized", size: "12px", weight: "400 / 600", lineHeight: "16px", letterSpacing: "0px" },
  ],
};

const columns: Column[] = [web, ios, android];

export const Overview: Story = {
  render: () => (
    <div className="min-h-dvh bg-white text-black" style={{ fontFamily: "var(--cg-font-family-web)" }}>
      <div className="mx-auto max-w-[1400px] px-10 py-10">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
          <span>Foundations</span>
        </div>
        <div className="mt-3 h-px w-full bg-black" />

        <div className="mt-6 text-4xl font-semibold">Typography</div>
        <div className="mt-1 text-xs opacity-70">App design guidelines</div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {columns.map((column) => (
            <section key={column.title} className="rounded-2xl border border-black/10 p-5">
              <div className="text-sm font-semibold">{column.title}</div>

              <div className="mt-4">
                <div className="text-xs font-semibold">Font</div>
                <div className="mt-2 h-px w-full bg-black" />
                <div className="mt-4 flex items-end gap-3">
                  <div className="text-3xl font-semibold">Aa</div>
                  <div className="text-2xl font-semibold">Gg</div>
                  <div className="text-xs opacity-60">{column.font}</div>
                  <div className="text-xs opacity-60">{column.fontDetails}</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-xs font-semibold">Definitions</div>
                <div className="mt-2 h-px w-full bg-black" />
                <div className="mt-3 space-y-3">
                  {column.rows.map((row) => (
                    <div key={row.name} className="grid grid-cols-[1.2fr_repeat(4,0.7fr)] items-center gap-2">
                      <div className="text-xs font-semibold">{row.name}</div>
                      <Token label="Size" value={row.size} />
                      <Token label="Weight" value={row.weight} />
                      <Token label="Line height" value={row.lineHeight} />
                      <Token label="Letter spacing" value={row.letterSpacing} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  ),
};

function Token({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-black/10 px-2 py-1 text-[10px] text-black/70">
      <div className="text-[9px] uppercase tracking-wide text-black/40">{label}</div>
      <div className="text-[11px] font-semibold text-black/80">{value}</div>
    </div>
  );
}
