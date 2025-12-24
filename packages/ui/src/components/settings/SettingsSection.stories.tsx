import type { Meta, StoryObj } from "@storybook/react";
import { SettingsSection } from "./SettingsSection";
import { SettingsRow } from "./SettingsRow";

const meta: Meta<typeof SettingsSection> = {
  title: "Settings/SettingsSection",
  component: SettingsSection,
};

export default meta;

type Story = StoryObj<typeof SettingsSection>;

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <SettingsSection title="Account">
        <SettingsRow left={<div className="text-sm">Email</div>} right={<div className="text-sm opacity-70">you@example.com</div>} />
        <SettingsRow left={<div className="text-sm">Plan</div>} right={<div className="text-sm opacity-70">Pro</div>} divider={false} />
      </SettingsSection>
    </div>
  ),
};
