import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Spacing",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj;

type Tile = { name: string; value: number };

const tiles: Tile[] = [
  { name: "space-64", value: 128 },
  { name: "space-32", value: 64 },
  { name: "space-24", value: 48 },
  { name: "space-20", value: 40 },
  { name: "space-16", value: 32 },
  { name: "space-12", value: 24 },
  { name: "space-8", value: 16 },
  { name: "space-6", value: 12 },
  { name: "space-4", value: 8 },
  { name: "space-2", value: 4 },
  { name: "space-1", value: 2 },
  { name: "space-0", value: 0 },
];

export const Overview: Story = {
  render: () => (
    <div className="min-h-dvh bg-white text-black" style={{ fontFamily: "var(--cg-font-family-web)" }}>
      <div className="mx-auto max-w-[1200px] px-10 py-10">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
          <span>Foundations</span>
        </div>
        <div className="mt-3 h-px w-full bg-black" />

        <div className="mt-6 text-4xl font-semibold">Spacing</div>

        <div className="mt-10 text-xs font-semibold uppercase tracking-widest">Definitions</div>
        <div className="mt-3 h-px w-full bg-black" />

        <div className="mt-10 grid grid-cols-5 gap-8">
          {tiles.map((tile) => (
            <div key={tile.name} className="space-y-3">
              <div className="flex h-28 w-full items-center justify-center rounded-lg bg-[#f7f7f7]">
                <div
                  className="rounded-sm border border-[#ff6ea8] bg-[#ffd1e6]"
                  style={{ width: tile.value, height: tile.value }}
                />
              </div>
              <div className="text-xs font-semibold">{tile.value}px</div>
              <div className="text-[11px] text-[#9b9b9b]">{tile.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
