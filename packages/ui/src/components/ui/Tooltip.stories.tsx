import type { Meta, StoryObj } from "@storybook/react";
import { UITooltip } from "./Tooltip";

const meta: Meta<typeof UITooltip> = {
  title: "UI/Tooltip",
  component: UITooltip,
};

export default meta;

type Story = StoryObj<typeof UITooltip>;

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <UITooltip content="This is a tooltip with helpful context.">
        <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm">
          Hover me
        </button>
      </UITooltip>
    </div>
  ),
};
