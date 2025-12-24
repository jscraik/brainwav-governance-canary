import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";

const meta: Meta<typeof IndeterminateCheckbox> = {
  title: "UI/IndeterminateCheckbox",
  component: IndeterminateCheckbox,
};

export default meta;

type Story = StoryObj<typeof IndeterminateCheckbox>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(true);

    return (
      <div className="flex items-center gap-3">
        <IndeterminateCheckbox
          checked={checked}
          indeterminate={indeterminate}
          onChange={(next) => {
            setChecked(next);
            setIndeterminate(false);
          }}
          ariaLabel="Select item"
        />
        <button
          type="button"
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs"
          onClick={() => {
            setIndeterminate((v) => !v);
          }}
        >
          Toggle indeterminate
        </button>
      </div>
    );
  },
};
