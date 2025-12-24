import { Search, FolderPlus, X, LogOut } from "lucide-react";
import type { TreeNode } from "../../lib/fileTree";
import { collectLeafPaths, getCheckState } from "../../lib/fileTree";
import { IndeterminateCheckbox } from "../ui/IndeterminateCheckbox";
import type { SidebarFilters } from "../../lib/fileTreeFilters";
import { MoreMenu, type SidebarSort } from "./MoreMenu";

export function Sidebar({
  workspaceName,
  tree,
  selected,
  expanded,
  onToggleExpand,
  onToggleFile,
  onToggleFolder,
  searchText,
  onSearchTextChange,
  sort,
  onSortChange,
  filters,
  onFiltersChange,
  onClear,
  onExit,
}: {
  workspaceName: string;
  tree: TreeNode;
  selected: Set<string>;
  expanded: Set<string>;
  onToggleExpand: (folderPath: string) => void;
  onToggleFile: (filePath: string) => void;
  onToggleFolder: (folderPath: string, nextChecked: boolean) => void;

  searchText: string;
  onSearchTextChange: (v: string) => void;

  sort: SidebarSort;
  onSortChange: (s: SidebarSort) => void;

  filters: SidebarFilters;
  onFiltersChange: (v: SidebarFilters) => void;

  onClear: () => void;
  onExit: () => void;
}) {
  return (
    <aside className="h-full w-[320px] border-r border-white/10 bg-white/5 flex flex-col">
      <div className="p-3 space-y-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex-1 h-10 rounded-xl border border-white/10 bg-white/5 px-3 text-left text-sm hover:bg-white/10"
          >
            {workspaceName}
          </button>

          <button
            type="button"
            onClick={onClear}
            className="h-10 px-3 rounded-xl border border-white/10 bg-white/5 text-sm hover:bg-white/10"
            aria-label="Clear"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={onExit}
            className="h-10 px-3 rounded-xl border border-white/10 bg-white/5 text-sm hover:bg-white/10"
            aria-label="Exit"
          >
            Exit
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
            <input
              value={searchText}
              onChange={(e) => onSearchTextChange(e.target.value)}
              className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 text-sm outline-none placeholder:text-white/40 focus:border-white/20"
              placeholder="Search files"
              aria-label="Search files"
            />
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
            aria-label="Folders"
            onClick={() => alert("Add/Remove folders (Stage 2)")}
          >
            <FolderPlus className="h-4 w-4 opacity-80" />
          </button>

          <MoreMenu
            sort={sort}
            onSortChange={onSortChange}
            filters={filters}
            onToggleFilter={(k) => onFiltersChange({ ...filters, [k]: !filters[k] })}
            onResetFilters={() =>
              onFiltersChange({ showSelectedOnly: false, hideDotFolders: false, hideStorybook: false })
            }
            onPastePaths={() => alert("Paste Paths (Stage 2)")}
            onRefresh={() => alert("Refresh (Stage 2)")}
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto px-2 pb-2">
        <TreeView
          node={tree}
          depth={0}
          selected={selected}
          expanded={expanded}
          onToggleExpand={onToggleExpand}
          onToggleFile={onToggleFile}
          onToggleFolder={onToggleFolder}
        />
      </div>

      <div className="border-t border-white/10 p-3">
        <div className="text-xs opacity-60">Workspace tools</div>
        <div className="mt-2 flex items-center gap-2">
          <button className="h-9 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 text-sm hover:bg-white/10">
            <X className="inline h-4 w-4 mr-2 opacity-80" />
            Close
          </button>
          <button className="h-9 w-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10" aria-label="Log out">
            <LogOut className="mx-auto h-4 w-4 opacity-80" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function TreeView({
  node,
  depth,
  selected,
  expanded,
  onToggleExpand,
  onToggleFile,
  onToggleFolder,
}: {
  node: TreeNode;
  depth: number;
  selected: Set<string>;
  expanded: Set<string>;
  onToggleExpand: (folderPath: string) => void;
  onToggleFile: (filePath: string) => void;
  onToggleFolder: (folderPath: string, nextChecked: boolean) => void;
}) {
  if (node.type === "file") return null;

  return (
    <div>
      {node.children.map((child) => (
        <TreeRow
          key={child.path}
          node={child}
          depth={depth}
          selected={selected}
          expanded={expanded}
          onToggleExpand={onToggleExpand}
          onToggleFile={onToggleFile}
          onToggleFolder={onToggleFolder}
        />
      ))}
    </div>
  );
}

function TreeRow(props: {
  node: TreeNode;
  depth: number;
  selected: Set<string>;
  expanded: Set<string>;
  onToggleExpand: (folderPath: string) => void;
  onToggleFile: (filePath: string) => void;
  onToggleFolder: (folderPath: string, nextChecked: boolean) => void;
}) {
  const { node, depth, selected, expanded, onToggleExpand, onToggleFile, onToggleFolder } = props;
  const pad = 10 + depth * 14;

  if (node.type === "folder") {
    const state = getCheckState(node as any, selected);
    const isOpen = expanded.has(node.path);

    return (
      <div>
        <div className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-white/5" style={{ paddingLeft: pad }}>
          <button
            type="button"
            className="h-6 w-6 rounded-md hover:bg-white/10"
            aria-label={isOpen ? `Collapse ${node.name}` : `Expand ${node.name}`}
            onClick={() => onToggleExpand(node.path)}
          >
            <span className="text-xs opacity-70">{isOpen ? "▾" : "▸"}</span>
          </button>

          <IndeterminateCheckbox
            checked={state === "checked"}
            indeterminate={state === "indeterminate"}
            onChange={(nextChecked) => onToggleFolder(node.path, nextChecked)}
            ariaLabel={`Select folder ${node.path}`}
          />

          <span className="text-sm truncate">{node.name}</span>

          <span className="ml-auto text-xs opacity-50">
            {collectLeafPaths(node).filter((p) => selected.has(p)).length}/{collectLeafPaths(node).length}
          </span>
        </div>

        {isOpen ? (
          <div>
            {node.children.map((c) => (
              <TreeRow key={c.path} {...props} node={c} depth={depth + 1} />
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  const checked = selected.has(node.path);
  return (
    <div className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-white/5" style={{ paddingLeft: pad + 24 }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggleFile(node.path)}
        aria-label={`Select file ${node.path}`}
        className="h-4 w-4 accent-white"
      />
      <span className="text-sm truncate">{node.name}</span>
    </div>
  );
}
