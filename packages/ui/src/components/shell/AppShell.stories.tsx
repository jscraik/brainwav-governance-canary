import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AppShell } from "./AppShell";

const meta: Meta<typeof AppShell> = {
  title: "Shell/AppShell",
  component: AppShell,
};

export default meta;

type Story = StoryObj<typeof AppShell>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <AppShell
        sidebarOpen={open}
        onToggleSidebar={() => setOpen((v) => !v)}
        sidebar={<div className="h-full border-r border-white/10 bg-white/5 p-4">Sidebar</div>}
      >
        <div className="p-6">
          <button
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
            onClick={() => setOpen((v) => !v)}
          >
            Toggle sidebar
          </button>
        </div>
      </AppShell>
    );
  },
};
