import { RotateCw, X, Wand2, Circle } from "lucide-react";
import { ContextTabStrip, type ContextTabId } from "./ContextTabStrip";

export function ApplyXmlPanel({
  activeTab,
  onTabChange,
  selectedCount,
  aiResponse,
  onAiResponseChange,
}: {
  activeTab: ContextTabId;
  onTabChange: (t: ContextTabId) => void;
  selectedCount: number;

  aiResponse: string;
  onAiResponseChange: (v: string) => void;
}) {
  const canReview = aiResponse.trim().length > 0;

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5">
      <div className="px-3 pt-3">
        <ContextTabStrip active={activeTab} onChange={onTabChange} selectedCount={selectedCount} />
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium opacity-90">AI Response</span>
            <Circle className="h-3.5 w-3.5 opacity-50" aria-hidden="true" />
          </div>

          <div className="flex items-center gap-2">
            <IconButton ariaLabel="Refresh">
              <RotateCw className="h-4 w-4" />
            </IconButton>

            <button
              type="button"
              disabled={!canReview}
              aria-disabled={!canReview}
              className={[
                "inline-flex h-9 items-center gap-2 rounded-xl border px-3 text-xs",
                canReview ? "border-white/10 bg-white/10 hover:bg-white/15" : "border-white/10 bg-white/5 opacity-50",
              ].join(" ")}
              onClick={() => alert("Review Changes (Stage 2)")}
            >
              <Wand2 className="h-4 w-4" />
              Review Changes
            </button>

            <IconButton ariaLabel="Close">
              <X className="h-4 w-4" />
            </IconButton>
          </div>
        </div>

        <div className="mt-2">
          <label className="sr-only" htmlFor="ai-response">
            AI Response XML
          </label>
          <textarea
            id="ai-response"
            value={aiResponse}
            onChange={(e) => onAiResponseChange(e.target.value)}
            className="min-h-[180px] w-full resize-y rounded-2xl border border-white/10 bg-black/30 p-3 text-sm outline-none placeholder:text-white/35 focus:border-white/20"
            placeholder="Paste AI response with XML-formatted changes here…"
          />
        </div>

        <div className="mt-6">
          <div className="text-sm font-semibold">How to use Apply Mode</div>

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <HowCard
              step={1}
              title="Prepare & Send to AI"
              body="Write your instructions, select the code files to update, then send the XML prompt to your assistant."
            />
            <HowCard
              step={2}
              title="Review & Apply Changes"
              body="Copy the AI’s XML response into this window, then tap ‘Review Changes’ to inspect the edits."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function IconButton({ children, ariaLabel }: { children: React.ReactNode; ariaLabel: string }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
    >
      {children}
    </button>
  );
}

function HowCard({ step, title, body }: { step: number; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-sm font-semibold">
          {step}
        </div>
        <div className="text-sm font-semibold">{title}</div>
      </div>
      <div className="mt-2 text-xs opacity-75">{body}</div>
    </div>
  );
}
