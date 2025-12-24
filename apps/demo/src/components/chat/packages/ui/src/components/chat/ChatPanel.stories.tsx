import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ChatPanel } from "./ChatPanel";

const meta: Meta<typeof ChatPanel> = {
  title: "Chat/ChatPanel",
  component: ChatPanel,
};
export default meta;

export const Default: StoryObj<typeof ChatPanel> = {
  render: () => {
    const [modelId, setModelId] = useState("gpt-5.2-high");
    return (
      <ChatPanel selectedCount={3} modelId={modelId} onModelChange={setModelId} />
    );
  },
};