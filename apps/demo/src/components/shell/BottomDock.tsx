import { Copy, ChevronDown } from "lucide-react";

export function BottomDock() {
  return (
    <footer className="h-16 border-t border-white/10 bg-white/5">
      <div className="h-full px-4 flex items-center justify-between gap-3">
        <div className="text-xs opacity-80">Tokens: ~0</div>

        <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-1">
          {["File Tree", "Code Map", "Git", "Prompts"].map((t, idx) => (
            <button
              key={t}
              type="button"
              className={[
                "rounded-xl px-3 py-2 text-xs",
                idx === 0 ? "bg-white/10" : "opacity-70 hover:opacity-100",
              ].join(" ")}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
            type="button"
          >
            <Copy className="h-4 w-4" />
            Copy Prompt
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
            type="button"
            aria-label="Mode menu"
          >
            Manual <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
