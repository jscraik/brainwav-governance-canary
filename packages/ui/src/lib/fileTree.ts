import type { FileMeta } from "./files";

export type TreeNode =
  | {
      type: "folder";
      name: string;
      path: string; // e.g. "src/components"
      children: TreeNode[];
    }
  | {
      type: "file";
      name: string;
      path: string; // full file path
      meta: FileMeta;
    };

export function buildFileTree(files: FileMeta[]): TreeNode {
  const root: TreeNode = { type: "folder", name: "", path: "", children: [] };

  for (const f of files) {
    const parts = f.path.split("/").filter(Boolean);
    let current = root as Extract<TreeNode, { type: "folder" }>;

    for (let i = 0; i < parts.length; i++) {
      const isLeaf = i === parts.length - 1;
      const part = parts[i]!;
      const currentPath = parts.slice(0, i + 1).join("/");

      if (isLeaf) {
        current.children.push({
          type: "file",
          name: part,
          path: currentPath,
          meta: f,
        });
      } else {
        let next = current.children.find(
          (c) => c.type === "folder" && c.name === part,
        ) as Extract<TreeNode, { type: "folder" }> | undefined;

        if (!next) {
          next = { type: "folder", name: part, path: currentPath, children: [] };
          current.children.push(next);
        }
        current = next;
      }
    }
  }

  sortFoldersAZFilesAZ(root);
  return root;
}

function sortFoldersAZFilesAZ(node: TreeNode) {
  if (node.type !== "folder") return;

  node.children.sort((a, b) => {
    if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  node.children.forEach(sortFoldersAZFilesAZ);
}

export type CheckState = "checked" | "unchecked" | "indeterminate";

export function collectLeafPaths(node: TreeNode): string[] {
  const out: string[] = [];
  walk(node);
  return out;

  function walk(n: TreeNode) {
    if (n.type === "file") out.push(n.path);
    else n.children.forEach(walk);
  }
}

export function getCheckState(node: TreeNode, selected: Set<string>): CheckState {
  if (node.type === "file") {
    return selected.has(node.path) ? "checked" : "unchecked";
  }

  const leaves = collectLeafPaths(node);
  if (leaves.length === 0) return "unchecked";

  let checkedCount = 0;
  for (const p of leaves) if (selected.has(p)) checkedCount++;

  if (checkedCount === 0) return "unchecked";
  if (checkedCount === leaves.length) return "checked";
  return "indeterminate";
}

export type SidebarSort =
  | "name-asc"
  | "name-desc"
  | "ext-asc"
  | "ext-desc"
  | "date-newest"
  | "date-oldest";

function extOf(name: string) {
  const i = name.lastIndexOf(".");
  return i === -1 ? "\uFFFF" : name.slice(i + 1).toLowerCase();
}

function fileComparator(sort: SidebarSort) {
  return (a: FileMeta, b: FileMeta) => {
    const nameA = a.path.split("/").pop() ?? a.path;
    const nameB = b.path.split("/").pop() ?? b.path;

    const byName = nameA.localeCompare(nameB);
    const byExt = extOf(nameA).localeCompare(extOf(nameB)) || byName;
    const byDate = (a.mtime - b.mtime) || byName;

    switch (sort) {
      case "name-asc":
        return byName;
      case "name-desc":
        return -byName;
      case "ext-asc":
        return byExt;
      case "ext-desc":
        return -byExt;
      case "date-newest":
        return -byDate;
      case "date-oldest":
        return byDate;
    }
  };
}

export function sortTreeFilesOnly(root: TreeNode, sort: SidebarSort): TreeNode {
  if (root.type === "file") return root;

  const cmp = fileComparator(sort);

  const children = root.children.map((c) => sortTreeFilesOnly(c, sort)).slice();

  const folders = children
    .filter((c) => c.type === "folder")
    .sort((a, b) => a.name.localeCompare(b.name));

  const files = children
    .filter((c) => c.type === "file")
    .sort((a, b) => cmp((a as any).meta, (b as any).meta));

  return { ...root, children: [...folders, ...files] };
}

export function filterTreeByQuery(root: TreeNode, query: string): TreeNode {
  const q = query.trim().toLowerCase();
  if (!q) return root;

  function filter(node: TreeNode): TreeNode | null {
    if (node.type === "file") {
      const hit =
        node.name.toLowerCase().includes(q) || node.path.toLowerCase().includes(q);
      return hit ? node : null;
    }

    const kids = node.children.map(filter).filter(Boolean) as TreeNode[];
    if (kids.length === 0) return null;
    return { ...node, children: kids };
  }

  return (filter(root) as TreeNode) ?? { type: "folder", name: "", path: "", children: [] };
}
