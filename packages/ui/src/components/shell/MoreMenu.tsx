import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, MoreHorizontal, ArrowUpDown, Filter, ClipboardPaste, RotateCw } from "lucide-react";
import type { SidebarFilters } from "../../lib/fileTreeFilters";

export type SidebarSort =
  | "name-asc"
  | "name-desc"
  | "ext-asc"
  | "ext-desc"
  | "date-newest"
  | "date-oldest";

export function MoreMenu({
  sort,
  onSortChange,
  filters,
  onToggleFilter,
  onResetFilters,
  onPastePaths,
  onRefresh,
}: {
  sort: SidebarSort;
  onSortChange: (s: SidebarSort) => void;

  filters: SidebarFilters;
  onToggleFilter: (k: keyof SidebarFilters) => void;
  onResetFilters: () => void;

  onPastePaths: () => void;
  onRefresh: () => void;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
          aria-label="More"
        >
          <MoreHorizontal className="h-4 w-4 opacity-80" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          className="min-w-[300px] rounded-2xl border border-white/10 bg-[#161a1d] p-2 text-sm shadow-xl outline-none"
        >
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-white/10">
              <span className="inline-flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 opacity-80" />
                Sort
              </span>
              <span className="opacity-70">›</span>
            </DropdownMenu.SubTrigger>

            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                sideOffset={10}
                className="min-w-[260px] rounded-2xl border border-white/10 bg-[#161a1d] p-2 text-sm shadow-xl outline-none"
              >
                {[
                  { id: "name-asc", label: "Name (A–Z)" },
                  { id: "name-desc", label: "Name (Z–A)" },
                  { id: "ext-asc", label: "Extension (A–Z)" },
                  { id: "ext-desc", label: "Extension (Z–A)" },
                  { id: "date-newest", label: "Date (Newest)" },
                  { id: "date-oldest", label: "Date (Oldest)" },
                ].map((o) => (
                  <DropdownMenu.Item
                    key={o.id}
                    onSelect={() => onSortChange(o.id as SidebarSort)}
                    className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-white/10"
                  >
                    <span>{o.label}</span>
                    {sort === o.id ? <Check className="h-4 w-4 opacity-80" /> : null}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <div className="my-2 h-px bg-white/10" />

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-white/10">
              <span className="inline-flex items-center gap-2">
                <Filter className="h-4 w-4 opacity-80" />
                Filters
              </span>
              <span className="opacity-70">›</span>
            </DropdownMenu.SubTrigger>

            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                sideOffset={10}
                className="min-w-[260px] rounded-2xl border border-white/10 bg-[#161a1d] p-2 text-sm shadow-xl outline-none"
              >
                <ItemToggle
                  label="Show selected only"
                  checked={filters.showSelectedOnly}
                  onSelect={() => onToggleFilter("showSelectedOnly")}
                />
                <ItemToggle
                  label="Hide dot-folders"
                  checked={filters.hideDotFolders}
                  onSelect={() => onToggleFilter("hideDotFolders")}
                />
                <ItemToggle
                  label="Hide .storybook"
                  checked={filters.hideStorybook}
                  onSelect={() => onToggleFilter("hideStorybook")}
                />

                <div className="my-2 h-px bg-white/10" />

                <DropdownMenu.Item
                  onSelect={onResetFilters}
                  className="rounded-xl px-3 py-2 hover:bg-white/10"
                >
                  Reset filters
                </DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <div className="my-2 h-px bg-white/10" />

          <DropdownMenu.Item
            onSelect={onPastePaths}
            className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-white/10"
          >
            <ClipboardPaste className="h-4 w-4 opacity-80" />
            Paste Paths…
          </DropdownMenu.Item>

          <div className="my-2 h-px bg-white/10" />

          <DropdownMenu.Item
            onSelect={onRefresh}
            className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-white/10"
          >
            <RotateCw className="h-4 w-4 opacity-80" />
            Refresh
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function ItemToggle({
  label,
  checked,
  onSelect,
}: {
  label: string;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <DropdownMenu.Item
      onSelect={onSelect}
      className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-white/10"
    >
      <span>{label}</span>
      {checked ? <Check className="h-4 w-4 opacity-80" /> : null}
    </DropdownMenu.Item>
  );
}
