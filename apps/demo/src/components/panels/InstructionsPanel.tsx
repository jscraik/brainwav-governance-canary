import { useEffect, useRef } from "react";
import { Copy, X, Send, FileText } from "lucide-react";

export function InstructionsPanel({
  value,
  onChange,
  onSend,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => Promise<void> | void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const enabled = value.trim().length > 0;

  async function handleSend() {
    if (!enabled) return;
    await onSend();
  }

  function handleCopy() {
    if (!value) return;
    void navigator.clipboard.writeText(value);
  }

  function handleClear() {
    onChange("");
    textareaRef.current?.focus();
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isCmdEnter = (e.metaKey || e.ctrlKey) && e.key === "Enter";
      if (!isCmdEnter) return;
      if (document.activeElement !== textareaRef.current) return;
      e.preventDefault();
      void handleSend();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled, value]);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <FileText className="h-4 w-4 opacity-80" />
          </span>
          <div>
            <div className="text-sm font-medium">Instructions</div>
            <div className="text-xs opacity-70">Cmd+Enter to send</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40"
            aria-label="Copy instructions"
            onClick={handleCopy}
            disabled={value.length === 0}
          >
            <Copy className="mx-auto h-4 w-4" />
          </button>

          <button
            type="button"
            className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40"
            aria-label="Clear instructions"
            onClick={handleClear}
            disabled={value.length === 0}
          >
            <X className="mx-auto h-4 w-4" />
          </button>

          <button
            type="button"
            className={[
              "inline-flex h-9 items-center gap-2 rounded-xl border px-3 text-xs",
              enabled ? "border-white/10 bg-white/10 hover:bg-white/15" : "border-white/10 bg-white/5 opacity-50",
            ].join(" ")}
            aria-label="Send to Chat"
            onClick={handleSend}
            disabled={!enabled}
          >
            <Send className="h-4 w-4" />
            Send to Chat
          </button>
        </div>
      </div>

      <div className="p-3">
        <label className="sr-only" htmlFor="instructions-textarea">
          Instructions
        </label>
        <textarea
          id="instructions-textarea"
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste or write your system instructions here…"
          className="min-h-[220px] w-full resize-y rounded-2xl border border-white/10 bg-black/30 p-3 text-sm outline-none placeholder:text-white/35 focus:border-white/20"
        />

        <div className="mt-2 flex items-center justify-between text-xs opacity-70">
          <div>{value.trim().length === 0 ? "Empty" : "Ready"}</div>
          <div>{value.length.toLocaleString()} chars</div>
        </div>
      </div>
    </section>
  );
}
