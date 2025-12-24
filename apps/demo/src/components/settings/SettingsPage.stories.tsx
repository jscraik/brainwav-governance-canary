import type { Meta, StoryObj } from "@storybook/react";
import { SettingsPage } from "./SettingsPage";

const meta: Meta<typeof SettingsPage> = {
  title: "Settings/SettingsPage",
  component: SettingsPage,
};

export default meta;

export const Default: StoryObj<typeof SettingsPage> = {
  render: () => (
    <div className="w-[920px] max-w-[92vw] bg-[#161a1d]">
      <SettingsPage />
    </div>
  ),
};

export const InModalFrame: StoryObj<typeof SettingsPage> = {
  render: () => (
    <div className="flex min-h-dvh items-center justify-center bg-black/50 p-8">
      <div className="w-[920px] max-w-[92vw] rounded-3xl border border-white/10 bg-[#161a1d] shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="text-sm font-semibold text-white">Settings</div>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Scroll body */}
        <div className="max-h-[78vh] overflow-auto">
          <SettingsPage />
        </div>
      </div>
    </div>
  ),
};
