import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";
import { SelectedFilesPanel } from "./SelectedFilesPanel";
import type { ContextTabId } from "./ContextTabStrip";
import { groupSelectedFiles, sumBytes, type SortMode, type FileMeta } from "../../lib/files";

const meta: Meta<typeof SelectedFilesPanel> = {
  title: "Panels/SelectedFilesPanel",
  component: SelectedFilesPanel,
};

export default meta;

type Story = StoryObj<typeof SelectedFilesPanel>;

const FILES: FileMeta[] = [
  { path: "src/App.tsx", bytes: 1200, lines: 120, mtime: 1734900000000 },
  { path: "src/components/Sidebar.tsx", bytes: 950, lines: 95, mtime: 1734910000000 },
  { path: "src/components/ChatPanel.tsx", bytes: 1500, lines: 160, mtime: 1734920000000 },
];

export const Default: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState<ContextTabId>("selectedFiles");
    const [selected, setSelected] = useState<Set<string>>(new Set(["src/App.tsx", "src/components/Sidebar.tsx"]));
    const [presets, setPresets] = useState([{ name: "Preset 1", files: ["src/App.tsx"] }]);
    const [activePreset, setActivePreset] = useState<number | null>(0);
    const [sortMode, setSortMode] = useState<SortMode>("name-asc");
    const [viewMode, setViewMode] = useState<"full" | "api">("full");

    const groups = useMemo(() => groupSelectedFiles(FILES, selected, sortMode), [selected, sortMode]);
    const totalBytes = useMemo(() => sumBytes(FILES, selected), [selected]);

    return (
      <div className="p-6">
        <SelectedFilesPanel
          activeTab={activeTab}
          onTabChange={setActiveTab}
          selectedCount={selected.size}
          groups={groups}
          totalBytes={totalBytes}
          onToggleFile={(path) =>
            setSelected((prev) => {
              const next = new Set(prev);
              if (next.has(path)) next.delete(path);
              else next.add(path);
              return next;
            })
          }
          presets={presets}
          activePreset={activePreset}
          onSwitchPreset={setActivePreset}
          onSaveCurrentPreset={() => setPresets([{ name: "Saved", files: Array.from(selected) }])}
          onCreateNewPreset={() => setPresets((p) => [...p, { name: "New", files: [] }])}
          sortMode={sortMode}
          onSortModeChange={setSortMode}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onCollapseAllFolders={() => {}}
          onClearSelectedCodemaps={() => {}}
          onClearFileSelection={() => setSelected(new Set())}
        />
      </div>
    );
  },
};
