// UI Primitives
export { menuContent, menuItem, menuItemLeft, menuSeparator } from "./components/ui/menuStyles";
export { IndeterminateCheckbox } from "./components/ui/IndeterminateCheckbox";
export { UITooltip } from "./components/ui/Tooltip";
export { ConfirmPopover } from "./components/ui/ConfirmPopover";
export { SaveBeforeSwitchDialog } from "./components/ui/SaveBeforeSwitchDialog";

// Shell
export { AppShell } from "./components/shell/AppShell";
export { BottomDock } from "./components/shell/BottomDock";
export { MoreMenu } from "./components/shell/MoreMenu";
export { Sidebar } from "./components/shell/Sidebar";
export { TopHeader } from "./components/shell/TopHeader";
export { UserMenu } from "./components/shell/UserMenu";
export type { SidebarSort } from "./components/shell/MoreMenu";

// Panels
export { ApplyXmlPanel } from "./components/panels/ApplyXmlPanel";
export { ContextBuilderPanel } from "./components/panels/ContextBuilderPanel";
export { ContextTabStrip } from "./components/panels/ContextTabStrip";
export { DiscoveryPanel } from "./components/panels/DiscoveryPanel";
export { InstructionsPanel } from "./components/panels/InstructionsPanel";
export { ModelPicker } from "./components/panels/ModelPicker";
export { SelectedFilesPanel } from "./components/panels/SelectedFilesPanel";
export type { ContextTabId } from "./components/panels/ContextTabStrip";
export type { DiscoveryStatus } from "./components/panels/DiscoveryPanel";

// Chat
export { ChatPanel } from "./components/chat/ChatPanel";

// Settings
export { SettingsDialog } from "./components/settings/SettingsDialog";
export { SettingsPage } from "./components/settings/SettingsPage";
export { SettingsRow } from "./components/settings/SettingsRow";
export { SettingsSection } from "./components/settings/SettingsSection";

// Data
export * from "./data/models";
export * from "./data/chatModels";

// Lib
export * from "./lib/persist";
export * from "./lib/files";
export * from "./lib/fileTree";
export * from "./lib/fileTreeFilters";
