import type { Meta, StoryObj } from "@storybook/react";
import { SettingsSection } from "./SettingsSection";
import { SettingsRow } from "./SettingsRow";
import { Mail } from "lucide-react";

const meta: Meta<typeof SettingsSection> = {
  title: "Settings/SettingsSection",
  component: SettingsSection,
};

export default meta;

export const WithoutTitle: StoryObj<typeof SettingsSection> = {
  render: () => (
    <div className="w-[400px] bg-[#161a1d] p-4">
      <SettingsSection>
        <SettingsRow
          left={<RowLeft icon={<Mail className="h-4 w-4 opacity-80" />} label="Email" />}
          right={<ValueText value="you@example.com" />}
        />
        <SettingsRow
          left={<RowLeft icon={<Mail className="h-4 w-4 opacity-80" />} label="Phone" />}
          right={<ValueText value="+44…" />}
          divider={false}
        />
      </SettingsSection>
    </div>
  ),
};

export const WithTitle: StoryObj<typeof SettingsSection> = {
  render: () => (
    <div className="w-[400px] bg-[#161a1d] p-4">
      <SettingsSection title="Account">
        <SettingsRow
          left={<RowLeft icon={<Mail className="h-4 w-4 opacity-80" />} label="Email" />}
          right={<ValueText value="you@example.com" />}
        />
        <SettingsRow
          left={<RowLeft icon={<Mail className="h-4 w-4 opacity-80" />} label="Phone" />}
          right={<ValueText value="+44…" />}
          divider={false}
        />
      </SettingsSection>
    </div>
  ),
};

function RowLeft({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <>
      <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5">
        {icon}
      </div>
      <div className="text-sm">{label}</div>
    </>
  );
}

function ValueText({ value }: { value: string }) {
  return <div className="text-sm opacity-70">{value}</div>;
}
