import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TopHeader } from "./TopHeader";

const meta: Meta<typeof TopHeader> = {
  title: "Shell/TopHeader",
  component: TopHeader,
};

export default meta;

type Story = StoryObj<typeof TopHeader>;

export const Default: Story = {
  render: () => {
    const [mode, setMode] = useState<"compose" | "chat">("compose");

    return (
      <TopHeader
        onToggleSidebar={() => setMode((m) => (m === "compose" ? "chat" : "compose"))}
        mode={mode}
        onModeChange={setMode}
      />
    );
  },
};
