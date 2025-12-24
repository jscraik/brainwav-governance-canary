import { PanelLeft, LayoutGrid, Plus } from "lucide-react";
import { useState } from "react";

export function TopHeader({
  onToggleSidebar,
  mode,
  onModeChange,
}: {
  onToggleSidebar: () => void;
  mode: "compose" | "chat";
  onModeChange: (m: "compose" | "chat") => void;
}) {
  const [command, setCommand] = useState("");

  return (
    <header className="border-b border-white/10 bg-white/5">
      <div className="h-12 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
            aria-label="Toggle sidebar"
          >
            <PanelLeft className="h-4 w-4 opacity-80" />
          </button>
        </div>

        <div className="text-sm font-medium">Repo Prompt</div>

        <div className="flex items-center gap-2 text-xs opacity-80">
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
            MCP Server
          </span>
        </div>
      </div>

      <div className="px-4 pb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-1 text-xs">
            <button
              type="button"
              onClick={() => onModeChange("compose")}
              className={[
                "rounded-xl px-3 py-2",
                mode === "compose" ? "bg-white/10" : "opacity-70 hover:opacity-100",
              ].join(" ")}
            >
              Compose
            </button>
            <button
              type="button"
              onClick={() => onModeChange("chat")}
              className={[
                "rounded-xl px-3 py-2",
                mode === "chat" ? "bg-white/10" : "opacity-70 hover:opacity-100",
              ].join(" ")}
            >
              Chat
            </button>
          </div>

          <div className="flex-1 flex items-center gap-2">
            <input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm outline-none placeholder:text-white/40 focus:border-white/20"
              placeholder="Type a command…"
              aria-label="Command bar"
            />
            <button
              className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
              aria-label="Open panels"
              type="button"
            >
              <LayoutGrid className="mx-auto h-4 w-4" />
            </button>
            <button
              className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
              aria-label="New"
              type="button"
            >
              <Plus className="mx-auto h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
