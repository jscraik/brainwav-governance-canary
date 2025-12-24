import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SettingsDialog } from "./SettingsDialog";

const meta: Meta<typeof SettingsDialog> = {
  title: "Settings/SettingsDialog",
  component: SettingsDialog,
};

export default meta;

export const Closed: StoryObj<typeof SettingsDialog> = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex min-h-dvh items-center justify-center bg-black/50">
        <button
          onClick={() => setOpen(true)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white hover:bg-white/10"
        >
          Open Settings
        </button>
        <SettingsDialog open={open} onOpenChange={setOpen} />
      </div>
    );
  },
};

export const Open: StoryObj<typeof SettingsDialog> = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="flex min-h-dvh items-center justify-center bg-black/50">
        <button
          onClick={() => setOpen(true)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white hover:bg-white/10"
        >
          Open Settings
        </button>
        <SettingsDialog open={open} onOpenChange={setOpen} />
      </div>
    );
  },
};
