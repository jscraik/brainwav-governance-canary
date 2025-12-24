import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Colors",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj;

type Swatch = {
  label: string;
  value: string;
  text?: string;
  icon?: boolean;
};

type Group = {
  title: string;
  swatches: Swatch[];
};

type Column = {
  title: string;
  groups: Group[];
  dark?: boolean;
};

const lightGroups: Group[] = [
  {
    title: "Background / Light",
    swatches: [
      { label: "Primary", value: "#ffffff", text: "#FFFFFF" },
      { label: "Secondary", value: "#e8e8e8", text: "#E8E8E8" },
      { label: "Tertiary", value: "#f3f3f3", text: "#F3F3F3" },
    ],
  },
  {
    title: "Text / Light",
    swatches: [
      { label: "Text / Primary", value: "#ffffff", text: "Aa", icon: true },
      { label: "Text / Secondary", value: "#e8e8e8", text: "Aa", icon: true },
      { label: "Text / Tertiary", value: "#f3f3f3", text: "Aa", icon: true },
      { label: "Text / Inverted", value: "#212121", text: "Aa", icon: true },
    ],
  },
  {
    title: "Icon / Light",
    swatches: [
      { label: "Icon / Primary", value: "#ffffff", text: "◎", icon: true },
      { label: "Icon / Secondary", value: "#e8e8e8", text: "◎", icon: true },
      { label: "Icon / Tertiary", value: "#f3f3f3", text: "◎", icon: true },
      { label: "Icon / Inverted", value: "#212121", text: "◎", icon: true },
    ],
  },
  {
    title: "Accents",
    swatches: [
      { label: "Accent / Blue", value: "#0285FF" },
      { label: "Accent / Red", value: "#E02E2A" },
      { label: "Accent / Orange", value: "#E25507" },
      { label: "Accent / Green", value: "#008635" },
    ],
  },
];

const darkGroups: Group[] = [
  {
    title: "Background / Dark",
    swatches: [
      { label: "Primary", value: "#212121", text: "#212121" },
      { label: "Secondary", value: "#303030", text: "#303030" },
      { label: "Tertiary", value: "#414141", text: "#414141" },
    ],
  },
  {
    title: "Text / Dark",
    swatches: [
      { label: "Text / Primary", value: "#1f1f1f", text: "Aa", icon: true, },
      { label: "Text / Secondary", value: "#2b2b2b", text: "Aa", icon: true, },
      { label: "Text / Tertiary", value: "#3a3a3a", text: "Aa", icon: true, },
      { label: "Text / Inverted", value: "#ffffff", text: "Aa", icon: true, },
    ],
  },
  {
    title: "Icon / Dark",
    swatches: [
      { label: "Icon / Primary", value: "#1f1f1f", text: "◎", icon: true },
      { label: "Icon / Secondary", value: "#2b2b2b", text: "◎", icon: true },
      { label: "Icon / Tertiary", value: "#3a3a3a", text: "◎", icon: true },
      { label: "Icon / Inverted", value: "#ffffff", text: "◎", icon: true },
    ],
  },
  {
    title: "Accents",
    swatches: [
      { label: "Accent / Blue", value: "#0285FF" },
      { label: "Accent / Red", value: "#FF8583" },
      { label: "Accent / Orange", value: "#FF9E6C" },
      { label: "Accent / Green", value: "#40C977" },
    ],
  },
];

const columns: Column[] = [
  { title: "Colors / light mode", groups: lightGroups },
  { title: "Colors / dark mode", groups: darkGroups, dark: true },
];

export const Overview: Story = {
  render: () => (
    <div className="min-h-dvh bg-white text-black" style={{ fontFamily: "var(--cg-font-family-web)" }}>
      <div className="mx-auto max-w-[1200px] px-10 py-10">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
          <span>Foundations</span>
        </div>
        <div className="mt-3 h-px w-full bg-black" />

        <div className="mt-6 text-4xl font-semibold">Color</div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {columns.map((column) => (
            <section
              key={column.title}
              className={[
                "rounded-2xl border border-black/10 p-4",
                column.dark ? "bg-[#232323] text-white" : "bg-white",
              ].join(" ")}
            >
              <div className="text-sm font-semibold">{column.title}</div>

              {column.groups.map((group) => (
                <div key={group.title} className="mt-6">
                  <div className={"text-xs font-semibold"}>{group.title}</div>
                  <div
                    className={[
                      "mt-2 h-px w-full",
                      column.dark ? "bg-white/20" : "bg-black",
                    ].join(" ")}
                  />
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {group.swatches.map((swatch) => (
                      <div
                        key={swatch.label}
                        className={[
                          "rounded-xl border p-3",
                          column.dark ? "border-white/10 bg-[#1f1f1f]" : "border-black/10 bg-white",
                        ].join(" ")}
                      >
                        <div
                          className={[
                            "flex h-16 w-full items-center justify-center rounded-lg border",
                            column.dark ? "border-white/10" : "border-black/10",
                          ].join(" ")}
                          style={{ backgroundColor: swatch.value }}
                        >
                          {swatch.text ? (
                            <div
                              className={[
                                "text-sm font-semibold",
                                swatch.value.toLowerCase() === "#ffffff" ? "text-black" : "text-white",
                              ].join(" ")}
                            >
                              {swatch.text}
                            </div>
                          ) : null}
                        </div>
                        <div className="mt-2 text-[11px] font-semibold">{swatch.label}</div>
                        <div className={column.dark ? "text-[10px] text-white/50" : "text-[10px] text-black/50"}>
                          {swatch.value.toUpperCase()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  ),
};
