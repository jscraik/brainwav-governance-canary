import type { Meta, StoryObj } from "@storybook/react";
import { SettingsPage } from "./SettingsPage";

const meta: Meta<typeof SettingsPage> = {
  title: "Settings/SettingsPage",
  component: SettingsPage,
};

export default meta;

type Story = StoryObj<typeof SettingsPage>;

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <SettingsPage />
    </div>
  ),
};
