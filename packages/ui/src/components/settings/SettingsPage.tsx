import {
  Mail,
  Phone,
  CreditCard,
  ShoppingBag,
  SlidersHorizontal,
  Bell,
  LayoutGrid,
  Shield,
  Archive,
  Globe,
  Palette,
  SpellCheck,
  ExternalLink,
  RefreshCw,
  Keyboard,
  MapPin,
  Link2,
  Mic,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { SettingsSection } from "./SettingsSection";
import { SettingsRow } from "./SettingsRow";

export function SettingsPage() {
  return (
    <div className="px-4 py-4 text-white">
      <div className="space-y-6">
        <SettingsSection>
          <SettingsRow left={<RowLeft icon={<Mail className="h-4 w-4 opacity-80" />} label="Email" />} right={<ValueText value="you@example.com" />} />
          <SettingsRow left={<RowLeft icon={<Phone className="h-4 w-4 opacity-80" />} label="Phone number" />} right={<ValueText value="+44…" />} />
          <SettingsRow left={<RowLeft icon={<CreditCard className="h-4 w-4 opacity-80" />} label="Subscription" />} right={<ValueText value="Pro" />} />
          <SettingsRow left={<RowLeft icon={<ShoppingBag className="h-4 w-4 opacity-80" />} label="Orders" />} right={<Chevron />} onClick={() => {}} />
          <SettingsRow left={<RowLeft icon={<SlidersHorizontal className="h-4 w-4 opacity-80" />} label="Personalization" />} right={<Chevron />} onClick={() => {}} />
          <SettingsRow left={<RowLeft icon={<Bell className="h-4 w-4 opacity-80" />} label="Notifications" />} right={<Chevron />} onClick={() => {}} />
          <SettingsRow left={<RowLeft icon={<LayoutGrid className="h-4 w-4 opacity-80" />} label="Apps" />} right={<Chevron />} onClick={() => {}} />
          <SettingsRow left={<RowLeft icon={<Archive className="h-4 w-4 opacity-80" />} label="Archived chats" />} right={<Chevron />} onClick={() => {}} />
          <SettingsRow left={<RowLeft icon={<Shield className="h-4 w-4 opacity-80" />} label="Security" />} right={<Chevron />} onClick={() => {}} divider={false} />
        </SettingsSection>

        <SettingsSection title="App">
          <SettingsRow left={<RowLeft icon={<Globe className="h-4 w-4 opacity-80" />} label="App language" />} right={<RightValueWithChevron value="English" />} onClick={() => {}} />
          <SettingsRow left={<RowLeft icon={<Palette className="h-4 w-4 opacity-80" />} label="Accent color" />} right={<RightValueWithChevron value="Purple" />} onClick={() => {}} />
          <SettingsRow left={<RowLeft icon={<SpellCheck className="h-4 w-4 opacity-80" />} label="Correct spelling automatically" />} right={<ToggleStub on />} />
          <SettingsRow left={<RowLeft icon={<ExternalLink className="h-4 w-4 opacity-80" />} label="Open links in desktop app" />} right={<ToggleStub on />} />
          <SettingsRow left={<RowLeft icon={<RefreshCw className="h-4 w-4 opacity-80" />} label="Check for updates…" />} right={<Chevron />} onClick={() => {}} divider={false} />
        </SettingsSection>

        <SettingsSection title="Chat bar">
          <SettingsRow left={<RowLeft icon={<MapPin className="h-4 w-4 opacity-80" />} label="Position on screen" />} right={<RightValueWithChevron value="Remember last position" />} onClick={() => {}} />
          <SettingsRow left={<RowLeft icon={<Link2 className="h-4 w-4 opacity-80" />} label="Reset to new chat" />} right={<RightValueWithChevron value="After 10 minutes" />} onClick={() => {}} />
          <SettingsRow left={<RowLeft icon={<Keyboard className="h-4 w-4 opacity-80" />} label="Keyboard shortcut" />} right={<RightValueWithChevron value="⌥Space" />} onClick={() => {}} divider={false} />
        </SettingsSection>

        <SettingsSection title="Speech">
          <SettingsRow left={<RowLeft icon={<Mic className="h-4 w-4 opacity-80" />} label="Voice" />} right={<RightValueWithChevron value="Cove" />} onClick={() => {}} />
          <SettingsRow left={<RowLeft icon={<Globe className="h-4 w-4 opacity-80" />} label="Main language" />} right={<RightValueWithChevron value="English" />} onClick={() => {}} divider={false} />
        </SettingsSection>

        <SettingsSection title="Suggestions">
          <SettingsRow left={<RowLeft icon={<Sparkles className="h-4 w-4 opacity-80" />} label="Autocomplete" />} right={<ToggleStub on />} />
          <SettingsRow left={<RowLeft icon={<TrendingUp className="h-4 w-4 opacity-80" />} label="Trending searches" />} right={<ToggleStub on />} />
          <SettingsRow left={<RowLeft icon={<Sparkles className="h-4 w-4 opacity-80" />} label="Follow-up suggestions" />} right={<ToggleStub on />} divider={false} />
        </SettingsSection>
      </div>
    </div>
  );
}

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

function RightValueWithChevron({ value }: { value: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-sm opacity-70">{value}</div>
      <Chevron />
    </div>
  );
}

function ToggleStub({ on }: { on: boolean }) {
  return (
    <div className={["h-5 w-10 rounded-full border border-white/10", on ? "bg-green-500/30" : "bg-white/5"].join(" ")}>
      <div className={["h-4 w-4 rounded-full bg-white/80 mt-0.5", on ? "ml-5" : "ml-1"].join(" ")} />
    </div>
  );
}
