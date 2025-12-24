import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SaveBeforeSwitchDialog } from "./SaveBeforeSwitchDialog";

const meta: Meta<typeof SaveBeforeSwitchDialog> = {
  title: "UI/SaveBeforeSwitchDialog",
  component: SaveBeforeSwitchDialog,
};

export default meta;

type Story = StoryObj<typeof SaveBeforeSwitchDialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [lastAction, setLastAction] = useState("None");

    return (
      <div className="p-6">
        <button
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
          onClick={() => setOpen(true)}
        >
          Open dialog
        </button>

        <div className="mt-3 text-xs opacity-70">Last action: {lastAction}</div>

        <SaveBeforeSwitchDialog
          open={open}
          onOpenChange={setOpen}
          onSave={() => setLastAction("Save")}
          onDiscard={() => setLastAction("Discard")}
          onCancel={() => {
            setLastAction("Cancel");
            setOpen(false);
          }}
        />
      </div>
    );
  },
};
