import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";
import { Sidebar } from "./Sidebar";
import { buildFileTree, filterTreeByQuery, sortTreeFilesOnly } from "../../lib/fileTree";
import { applySidebarFilters, type SidebarFilters } from "../../lib/fileTreeFilters";
import type { FileMeta } from "../../lib/files";
import type { SidebarSort } from "./MoreMenu";

const meta: Meta<typeof Sidebar> = {
  title: "Shell/Sidebar",
  component: Sidebar,
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

const MOCK_FILES: FileMeta[] = [
  { path: "src/App.tsx", bytes: 1200, lines: 120, mtime: 1734900000000 },
  { path: "src/components/Widget.tsx", bytes: 850, lines: 90, mtime: 1734910000000 },
  { path: "src/lib/utils.ts", bytes: 400, lines: 40, mtime: 1734920000000 },
  { path: "src/components/panels/Panel.tsx", bytes: 760, lines: 75, mtime: 1734930000000 },
];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<string>>(new Set(["src/App.tsx"]));
    const [expanded, setExpanded] = useState<Set<string>>(new Set(["src", "src/components"]));
    const [searchText, setSearchText] = useState("");
    const [sort, setSort] = useState<SidebarSort>("name-asc");
    const [filters, setFilters] = useState<SidebarFilters>({
      showSelectedOnly: false,
      hideDotFolders: false,
      hideStorybook: false,
    });

    const baseTree = useMemo(() => buildFileTree(MOCK_FILES), []);
    const queryTree = useMemo(() => filterTreeByQuery(baseTree, searchText), [baseTree, searchText]);
    const filteredTree = useMemo(() => applySidebarFilters(queryTree, selected, filters), [queryTree, selected, filters]);
    const sortedTree = useMemo(() => sortTreeFilesOnly(filteredTree, sort), [filteredTree, sort]);

    function toggleExpand(folderPath: string) {
      setExpanded((prev) => {
        const next = new Set(prev);
        if (next.has(folderPath)) next.delete(folderPath);
        else next.add(folderPath);
        return next;
      });
    }

    function toggleFile(filePath: string) {
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(filePath)) next.delete(filePath);
        else next.add(filePath);
        return next;
      });
    }

    function toggleFolder(folderPath: string, nextChecked: boolean) {
      const leafPaths = MOCK_FILES.map((f) => f.path).filter((p) => p.startsWith(folderPath));
      setSelected((prev) => {
        const next = new Set(prev);
        for (const p of leafPaths) {
          if (nextChecked) next.add(p);
          else next.delete(p);
        }
        return next;
      });
    }

    return (
      <div className="h-[640px]">
        <Sidebar
          workspaceName="repo-prompt"
          tree={sortedTree}
          selected={selected}
          expanded={expanded}
          onToggleExpand={toggleExpand}
          onToggleFile={toggleFile}
          onToggleFolder={toggleFolder}
          searchText={searchText}
          onSearchTextChange={setSearchText}
          sort={sort}
          onSortChange={setSort}
          filters={filters}
          onFiltersChange={setFilters}
          onClear={() => setSelected(new Set())}
          onExit={() => {}}
        />
      </div>
    );
  },
};
