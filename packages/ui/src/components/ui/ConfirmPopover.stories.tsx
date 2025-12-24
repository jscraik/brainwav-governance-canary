import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ConfirmPopover } from "./ConfirmPopover";

const meta: Meta<typeof ConfirmPopover> = {
  title: "UI/ConfirmPopover",
  component: ConfirmPopover,
};

export default meta;

type Story = StoryObj<typeof ConfirmPopover>;

export const Default: Story = {
  render: () => {
    const [count, setCount] = useState(0);

    return (
      <div className="space-y-3 p-6">
        <ConfirmPopover
          title="Clear selection?"
          body="This will remove all selected files."
          confirmText="Clear"
          onConfirm={() => setCount((c) => c + 1)}
        >
          <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm">
            Clear selected
          </button>
        </ConfirmPopover>
        <div className="text-xs opacity-70">Confirmed: {count}</div>
      </div>
    );
  },
};
