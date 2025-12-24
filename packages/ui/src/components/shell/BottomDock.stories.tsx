import type { Meta, StoryObj } from "@storybook/react";
import { BottomDock } from "./BottomDock";

const meta: Meta<typeof BottomDock> = {
  title: "Shell/BottomDock",
  component: BottomDock,
};

export default meta;

type Story = StoryObj<typeof BottomDock>;

export const Default: Story = {
  render: () => (
    <div className="bg-black text-white">
      <BottomDock />
    </div>
  ),
};
