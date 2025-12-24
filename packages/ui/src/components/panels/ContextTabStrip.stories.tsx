import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ContextTabStrip, type ContextTabId } from "./ContextTabStrip";

const meta: Meta<typeof ContextTabStrip> = {
  title: "Panels/ContextTabStrip",
  component: ContextTabStrip,
};

export default meta;

type Story = StoryObj<typeof ContextTabStrip>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState<ContextTabId>("selectedFiles");

    return (
      <div className="p-6">
        <ContextTabStrip active={active} onChange={setActive} selectedCount={12} />
      </div>
    );
  },
};
