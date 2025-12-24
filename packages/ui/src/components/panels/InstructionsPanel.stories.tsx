import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InstructionsPanel } from "./InstructionsPanel";

const meta: Meta<typeof InstructionsPanel> = {
  title: "Panels/InstructionsPanel",
  component: InstructionsPanel,
};

export default meta;

type Story = StoryObj<typeof InstructionsPanel>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("You are an expert coding assistant.");

    return (
      <div className="p-6">
        <InstructionsPanel value={value} onChange={setValue} onSend={() => {}} />
      </div>
    );
  },
};
