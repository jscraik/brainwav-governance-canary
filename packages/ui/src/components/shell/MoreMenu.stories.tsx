import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MoreMenu, type SidebarSort } from "./MoreMenu";
import type { SidebarFilters } from "../../lib/fileTreeFilters";

const meta: Meta<typeof MoreMenu> = {
  title: "Shell/MoreMenu",
  component: MoreMenu,
};

export default meta;

type Story = StoryObj<typeof MoreMenu>;

export const Default: Story = {
  render: () => {
    const [sort, setSort] = useState<SidebarSort>("name-asc");
    const [filters, setFilters] = useState<SidebarFilters>({
      showSelectedOnly: false,
      hideDotFolders: false,
      hideStorybook: false,
    });

    return (
      <div className="p-6">
        <MoreMenu
          sort={sort}
          onSortChange={setSort}
          filters={filters}
          onToggleFilter={(k) => setFilters((f) => ({ ...f, [k]: !f[k] }))}
          onResetFilters={() =>
            setFilters({
              showSelectedOnly: false,
              hideDotFolders: false,
              hideStorybook: false,
            })
          }
          onPastePaths={() => {}}
          onRefresh={() => {}}
        />
        <div className="mt-3 text-xs opacity-70">Sort: {sort}</div>
      </div>
    );
  },
};
