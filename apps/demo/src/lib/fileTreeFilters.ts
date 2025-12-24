import type { TreeNode } from "./fileTree";

export type SidebarFilters = {
  showSelectedOnly: boolean;
  hideDotFolders: boolean;
  hideStorybook: boolean;
};

export function applySidebarFilters(
  root: TreeNode,
  selected: Set<string>,
  filters: SidebarFilters,
): TreeNode {
  function keep(node: TreeNode): boolean {
    if (node.type === "file") {
      if (filters.showSelectedOnly && !selected.has(node.path)) return false;
      if (filters.hideStorybook && node.path.includes(".storybook/")) return false;
      return true;
    }

    if (filters.hideDotFolders && node.name.startsWith(".")) return false;
    return true;
  }

  function walk(node: TreeNode): TreeNode | null {
    if (!keep(node)) return null;

    if (node.type === "file") return node;

    const kids = node.children.map(walk).filter(Boolean) as TreeNode[];
    if (kids.length === 0) return null;
    return { ...node, children: kids };
  }

  return (walk(root) as TreeNode) ?? { type: "folder", name: "", path: "", children: [] };
}
