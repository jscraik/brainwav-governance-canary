export type SortMode = "name-asc" | "name-desc" | "tokens-asc" | "tokens-desc";

export type FileMeta = {
  path: string;
  bytes: number;
  lines: number;
  mtime: number; // ms since epoch (used for sidebar date sort)
};

export function bytesToKb(bytes: number) {
  return (bytes / 1024).toFixed(2);
}

export function dirname(path: string) {
  const i = path.lastIndexOf("/");
  return i === -1 ? "" : path.slice(0, i);
}

export function basename(path: string) {
  const i = path.lastIndexOf("/");
  return i === -1 ? path : path.slice(i + 1);
}

export type GroupedSelection = {
  dir: string;
  totalBytes: number;
  files: FileMeta[];
};

function tokensForBytes(bytes: number) {
  // Stage 1 approximation: treat bytes as token-weight
  return bytes;
}

export function groupSelectedFiles(
  all: FileMeta[],
  selected: Set<string>,
  sortMode: SortMode = "name-asc",
): GroupedSelection[] {
  const map = new Map<string, FileMeta[]>();

  for (const f of all) {
    if (!selected.has(f.path)) continue;
    const dir = dirname(f.path);
    map.set(dir, [...(map.get(dir) ?? []), f]);
  }

  const groups: GroupedSelection[] = [];
  for (const [dir, files] of map.entries()) {
    const totalBytes = files.reduce((a, b) => a + b.bytes, 0);

    files.sort((a, b) => {
      const byName = a.path.localeCompare(b.path);
      const byTokens = tokensForBytes(a.bytes) - tokensForBytes(b.bytes);

      switch (sortMode) {
        case "name-asc":
          return byName;
        case "name-desc":
          return -byName;
        case "tokens-asc":
          return byTokens || byName;
        case "tokens-desc":
          return -byTokens || byName;
      }
    });

    groups.push({ dir, totalBytes, files });
  }

  groups.sort((a, b) => a.dir.localeCompare(b.dir));
  return groups;
}

export function sumBytes(all: FileMeta[], selected: Set<string>) {
  return all.reduce((acc, f) => acc + (selected.has(f.path) ? f.bytes : 0), 0);
}
