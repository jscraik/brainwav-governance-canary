import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ApplyXmlPanel } from "./ApplyXmlPanel";
import type { ContextTabId } from "./ContextTabStrip";

const meta: Meta<typeof ApplyXmlPanel> = {
  title: "Panels/ApplyXmlPanel",
  component: ApplyXmlPanel,
};

export default meta;

type Story = StoryObj<typeof ApplyXmlPanel>;

export const Default: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState<ContextTabId>("applyXml");
    const [aiResponse, setAiResponse] = useState("<apply></apply>");

    return (
      <div className="p-6">
        <ApplyXmlPanel
          activeTab={activeTab}
          onTabChange={setActiveTab}
          selectedCount={8}
          aiResponse={aiResponse}
          onAiResponseChange={setAiResponse}
        />
      </div>
    );
  },
};
