import type { Meta, StoryObj } from "@storybook/react";
import { SettingsRow } from "./SettingsRow";

const meta: Meta<typeof SettingsRow> = {
  title: "Settings/SettingsRow",
  component: SettingsRow,
};

export default meta;

type Story = StoryObj<typeof SettingsRow>;

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <div className="rounded-2xl border border-white/10 bg-white/5">
        <SettingsRow left={<div className="text-sm">Notifications</div>} right={<div className="text-sm opacity-70">On</div>} />
      </div>
    </div>
  ),
};
