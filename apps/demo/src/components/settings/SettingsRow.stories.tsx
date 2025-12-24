import type { Meta, StoryObj } from "@storybook/react";
import { SettingsRow } from "./SettingsRow";
import { Mail, Chevron } from "lucide-react";

const meta: Meta<typeof SettingsRow> = {
  title: "Settings/SettingsRow",
  component: SettingsRow,
};

export default meta;

export const ValueOnly: StoryObj<typeof SettingsRow> = {
  render: () => (
    <div className="w-[400px] bg-[#161a1d] p-4">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <SettingsRow
          left={<RowLeft icon={<Mail className="h-4 w-4 opacity-80" />} label="Email" />}
          right={<ValueText value="you@example.com" />}
        />
      </div>
    </div>
  ),
};

export const WithChevron: StoryObj<typeof SettingsRow> = {
  render: () => (
    <div className="w-[400px] bg-[#161a1d] p-4">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <SettingsRow
          left={<RowLeft icon={<Mail className="h-4 w-4 opacity-80" />} label="Orders" />}
          right={<Chevron />}
          onClick={() => console.log("clicked")}
        />
      </div>
    </div>
  ),
};

export const MultipleRows: StoryObj<typeof SettingsRow> = {
  render: () => (
    <div className="w-[400px] bg-[#161a1d] p-4">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <SettingsRow
          left={<RowLeft icon={<Mail className="h-4 w-4 opacity-80" />} label="Email" />}
          right={<ValueText value="you@example.com" />}
        />
        <SettingsRow
          left={<RowLeft icon={<Mail className="h-4 w-4 opacity-80" />} label="Phone" />}
          right={<ValueText value="+44…" />}
        />
        <SettingsRow
          left={<RowLeft icon={<Mail className="h-4 w-4 opacity-80" />} label="Orders" />}
          right={<Chevron />}
          onClick={() => console.log("clicked")}
          divider={false}
        />
      </div>
    </div>
  ),
};

export const NoRightContent: StoryObj<typeof SettingsRow> = {
  render: () => (
    <div className="w-[400px] bg-[#161a1d] p-4">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <SettingsRow
          left={<RowLeft icon={<Mail className="h-4 w-4 opacity-80" />} label="Email" />}
        />
      </div>
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

function Chevron() {
  return <div className="text-sm opacity-50">›</div>;
}
