import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SettingsDialog } from "./SettingsDialog";

const meta: Meta<typeof SettingsDialog> = {
  title: "Settings/SettingsDialog",
  component: SettingsDialog,
};

export default meta;

type Story = StoryObj<typeof SettingsDialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="p-6">
        <button
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
          onClick={() => setOpen(true)}
        >
          Open settings
        </button>
        <SettingsDialog open={open} onOpenChange={setOpen} />
      </div>
    );
  },
};
