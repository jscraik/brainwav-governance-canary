import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ChatPanel } from "./ChatPanel";

const meta: Meta<typeof ChatPanel> = {
  title: "Chat/ChatPanel",
  component: ChatPanel,
};

export default meta;

type Story = StoryObj<typeof ChatPanel>;

export const Default: Story = {
  render: () => {
    const [modelId, setModelId] = useState("gpt-5.2-codex-medium");
    return <ChatPanel selectedCount={6} modelId={modelId} onModelChange={setModelId} />;
  },
};
