import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown, Settings, ArrowUpDown, Eye, FolderMinus, FunctionSquare, XCircle } from "lucide-react";
import { ContextTabStrip, type ContextTabId } from "./ContextTabStrip";
import type { GroupedSelection, SortMode } from "../../lib/files";
import { bytesToKb, basename } from "../../lib/files";

type ViewMode = "full" | "api";
type Preset = { name: string; files: string[] };

export function SelectedFilesPanel({
  activeTab,
  onTabChange,
  selectedCount,
  groups,
  totalBytes,
  onToggleFile,

  presets,
  activePreset,
  onSwitchPreset,
  onSaveCurrentPreset,
  onCreateNewPreset,

  sortMode,
  onSortModeChange,

  viewMode,
  onViewModeChange,

  onCollapseAllFolders,
  onClearSelectedCodemaps,
  onClearFileSelection,
}: {
  activeTab: ContextTabId;
  onTabChange: (t: ContextTabId) => void;
  selectedCount: number;

  groups: GroupedSelection[];
  totalBytes: number;
  onToggleFile: (path: string) => void;

  presets: Preset[];
  activePreset: number | null;
  onSwitchPreset: (index: number) => void;
  onSaveCurrentPreset: () => void;
  onCreateNewPreset: () => void;

  sortMode: SortMode;
  onSortModeChange: (m: SortMode) => void;

  viewMode: ViewMode;
  onViewModeChange: (m: ViewMode) => void;

  onCollapseAllFolders: () => void;
  onClearSelectedCodemaps: () => void;
  onClearFileSelection: () => void;
}) {
  const totalKb = bytesToKb(totalBytes);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5">
      <div className="px-3 pt-3 flex items-center justify-between gap-3">
        <ContextTabStrip active={activeTab} onChange={onTabChange} selectedCount={selectedCount} />

        <div className="flex items-center gap-2 text-xs">
          <Chip label="Full" value={`${selectedCount} • ~${totalKb}k`} tone="success" />
          <Chip label="API" value={`${Math.max(0, Math.floor(selectedCount / 2))} • ~${(Number(totalKb) * 0.2).toFixed(2)}k`} tone="neutral" />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-3 py-2">
        <div className="flex items-center gap-2">
          <PresetsMenu
            presets={presets}
            activePreset={activePreset}
            onSwitchPreset={onSwitchPreset}
            onSaveCurrentPreset={onSaveCurrentPreset}
            onCreateNewPreset={onCreateNewPreset}
          />
          <SortMenu sortMode={sortMode} onSortModeChange={onSortModeChange} />
          <SettingsMenu
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
            onCollapseAllFolders={onCollapseAllFolders}
            onClearSelectedCodemaps={onClearSelectedCodemaps}
            onClearFileSelection={onClearFileSelection}
          />
        </div>
      </div>

      <div className="border-t border-white/10 p-3">
        {groups.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-center">
            <div className="text-sm opacity-80">
              No files selected. Use the side bar to find files to include in your prompt.
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {groups.map((g) => (
              <div key={g.dir} className="rounded-2xl border border-white/10 bg-black/20">
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="text-sm font-medium">{g.dir}</div>
                  <div className="text-xs opacity-70">~{bytesToKb(g.totalBytes)}k (100%)</div>
                </div>

                <div className="border-t border-white/10">
                  {g.files.map((f) => (
                    <button
                      key={f.path}
                      type="button"
                      onClick={() => onToggleFile(f.path)}
                      className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left hover:bg-white/5"
                    >
                      <div className="flex items-center gap-2">
                        <div className="text-sm">{basename(f.path)}</div>
                        <div className="text-xs opacity-60">~{bytesToKb(f.bytes)}k</div>
                      </div>
                      <div className="text-xs opacity-70">{f.lines} lines</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Chip({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "success" | "neutral";
}) {
  const base = "inline-flex items-center gap-2 rounded-xl border px-3 py-2";
  const style =
    tone === "success" ? "border-white/10 bg-green-500/20" : "border-white/10 bg-white/5";

  return (
    <div className={[base, style].join(" ")}>
      <span className="text-[11px] font-medium">{label}</span>
      <span className="text-[11px] opacity-80">{value}</span>
    </div>
  );
}

function PresetsMenu({
  presets,
  activePreset,
  onSwitchPreset,
  onSaveCurrentPreset,
  onCreateNewPreset,
}: {
  presets: Preset[];
  activePreset: number | null;
  onSwitchPreset: (index: number) => void;
  onSaveCurrentPreset: () => void;
  onCreateNewPreset: () => void;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-xs hover:bg-white/10">
          Presets <ChevronDown className="h-4 w-4 opacity-70" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="min-w-[320px] rounded-2xl border border-white/10 bg-[#161a1d] p-2 text-sm shadow-xl outline-none">
          <div className="px-2 py-2 text-xs opacity-70">
            Quickly switch between sets of files.<br />Use ⌘1–9 to switch.
          </div>

          <div className="my-2 h-px bg-white/10" />

          {presets.length === 0 ? (
            <div className="px-2 py-2 text-sm opacity-50">(No Presets)</div>
          ) : (
            presets.slice(0, 9).map((p, idx) => (
              <DropdownMenu.Item
                key={p.name + idx}
                onSelect={() => onSwitchPreset(idx)}
                className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-white/10"
              >
                <span>{p.name}</span>
                <span className="text-xs opacity-60">⌘{idx + 1}</span>
              </DropdownMenu.Item>
            ))
          )}

          <div className="my-2 h-px bg-white/10" />

          <DropdownMenu.Item onSelect={onSaveCurrentPreset} className="rounded-xl px-3 py-2 hover:bg-white/10">
            Save Current Preset (⌘S)
          </DropdownMenu.Item>

          <DropdownMenu.Item onSelect={onCreateNewPreset} className="rounded-xl px-3 py-2 hover:bg-white/10">
            Create New Preset (⌘P)
          </DropdownMenu.Item>

          <div className="my-2 h-px bg-white/10" />

          <DropdownMenu.Item onSelect={() => alert("Manage Presets (Stage 2)")} className="rounded-xl px-3 py-2 hover:bg-white/10">
            Manage Presets…
          </DropdownMenu.Item>

          {activePreset !== null ? (
            <div className="mt-2 px-2 text-xs opacity-60">Active preset: #{activePreset + 1}</div>
          ) : null}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function SortMenu({
  sortMode,
  onSortModeChange,
}: {
  sortMode: SortMode;
  onSortModeChange: (m: SortMode) => void;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-xs hover:bg-white/10">
          <ArrowUpDown className="h-4 w-4 opacity-80" />
          Sort <ChevronDown className="h-4 w-4 opacity-70" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="min-w-[260px] rounded-2xl border border-white/10 bg-[#161a1d] p-2 text-sm shadow-xl outline-none">
          {[
            { id: "name-asc", label: "Name (A–Z)" },
            { id: "name-desc", label: "Name (Z–A)" },
            { id: "tokens-asc", label: "Tokens (Low–High)" },
            { id: "tokens-desc", label: "Tokens (High–Low)" },
          ].map((o) => (
            <DropdownMenu.Item
              key={o.id}
              onSelect={() => onSortModeChange(o.id as SortMode)}
              className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-white/10"
            >
              <span>{o.label}</span>
              {sortMode === o.id ? <Check className="h-4 w-4 opacity-80" /> : null}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function SettingsMenu({
  viewMode,
  onViewModeChange,
  onCollapseAllFolders,
  onClearSelectedCodemaps,
  onClearFileSelection,
}: {
  viewMode: ViewMode;
  onViewModeChange: (m: ViewMode) => void;
  onCollapseAllFolders: () => void;
  onClearSelectedCodemaps: () => void;
  onClearFileSelection: () => void;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="Selected files settings"
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
        >
          <Settings className="h-4 w-4" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="min-w-[300px] rounded-2xl border border-white/10 bg-[#161a1d] p-2 text-sm shadow-xl outline-none">
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-white/10">
              <span className="inline-flex items-center gap-2">
                <Eye className="h-4 w-4 opacity-80" />
                View Mode
              </span>
              <span className="opacity-70">›</span>
            </DropdownMenu.SubTrigger>

            <DropdownMenu.Portal>
              <DropdownMenu.SubContent className="min-w-[220px] rounded-2xl border border-white/10 bg-[#161a1d] p-2 text-sm shadow-xl outline-none">
                {[
                  { id: "full", label: "Full" },
                  { id: "api", label: "API" },
                ].map((o) => (
                  <DropdownMenu.Item
                    key={o.id}
                    onSelect={() => onViewModeChange(o.id as ViewMode)}
                    className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-white/10"
                  >
                    <span>{o.label}</span>
                    {viewMode === o.id ? <Check className="h-4 w-4 opacity-80" /> : null}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <div className="my-2 h-px bg-white/10" />

          <DropdownMenu.Item onSelect={onCollapseAllFolders} className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-white/10">
            <FolderMinus className="h-4 w-4 opacity-80" />
            Collapse All Folders
          </DropdownMenu.Item>

          <DropdownMenu.Item onSelect={onClearSelectedCodemaps} className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-white/10">
            <FunctionSquare className="h-4 w-4 opacity-80" />
            Clear Selected Codemaps
          </DropdownMenu.Item>

          <DropdownMenu.Item onSelect={onClearFileSelection} className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-white/10">
            <XCircle className="h-4 w-4 opacity-80" />
            Clear File Selection
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
