import { useMemo } from "react";
import { Play, Wand2, Sparkles, Info, X } from "lucide-react";
import type { ProviderId } from "../../data/models";
import { DISCOVERY_PROVIDERS, PLAN_PROVIDERS } from "../../data/models";
import { ModelPicker } from "./ModelPicker";
import { UITooltip } from "../ui/Tooltip";

export type DiscoveryStatus = "idle" | "running" | "done" | "error";

export function DiscoveryPanel({
  providerId,
  modelId,
  onModelChange,

  planProviderId,
  planModelId,
  onPlanModelChange,

  taskDescription,
  onTaskDescriptionChange,

  autoPlan,
  onAutoPlanChange,

  status,

  onRunDiscovery,
  onRewrite,
  onGeneratePlan,
}: {
  providerId: ProviderId;
  modelId: string;
  onModelChange: (next: { providerId: ProviderId; modelId: string }) => void;

  planProviderId: ProviderId;
  planModelId: string;
  onPlanModelChange: (next: { providerId: ProviderId; modelId: string }) => void;

  taskDescription: string;
  onTaskDescriptionChange: (v: string) => void;

  autoPlan: boolean;
  onAutoPlanChange: (v: boolean) => void;

  status: DiscoveryStatus;

  onRunDiscovery: () => Promise<void> | void;
  onRewrite: () => Promise<void> | void;
  onGeneratePlan: () => Promise<void> | void;
}) {
  const hasTask = taskDescription.trim().length > 0;
  const busy = status === "running";
  const canRun = hasTask && !busy;

  const statusText = useMemo(() => {
    if (status === "running") return "Running discovery…";
    if (status === "done") return "Discovery complete.";
    if (status === "error") return "Discovery failed.";
    return "Ready.";
  }, [status]);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">What are you working on?</div>
          <div className="mt-1 text-xs opacity-70">{statusText}</div>
        </div>

        <div className="flex flex-col gap-2">
          <ActionButton label="Run Discovery" icon={<Play className="h-4 w-4" />} disabled={!canRun} onClick={onRunDiscovery} />
          <ActionButton label="Rewrite" icon={<Wand2 className="h-4 w-4" />} disabled={!canRun} onClick={onRewrite} />
          <ActionButton label="Generate Plan" icon={<Sparkles className="h-4 w-4" />} disabled={!canRun} onClick={onGeneratePlan} />
        </div>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-[320px_1fr]">
        <div>
          <div className="text-xs opacity-70">Model</div>
          <div className="mt-1">
            <ModelPicker
              providers={DISCOVERY_PROVIDERS}
              providerId={providerId}
              modelId={modelId}
              onChange={onModelChange}
              disabled={busy}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <div className="text-xs opacity-70">Task Description</div>

            <UITooltip
              content={
                <div className="space-y-3">
                  <div className="text-base font-medium">Describe your task here.</div>
                  <div>
                    <div className="opacity-80">The agent will:</div>
                    <ul className="mt-1 list-disc space-y-1 pl-5 opacity-80">
                      <li>Analyze your codebase</li>
                      <li>Select relevant files</li>
                      <li>Write detailed instructions above</li>
                    </ul>
                  </div>
                  <div className="opacity-80">This is your primary input in Rewrite mode.</div>
                </div>
              }
            >
              <button
                type="button"
                className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
                aria-label="Task Description help"
              >
                <Info className="h-3.5 w-3.5 opacity-80" />
              </button>
            </UITooltip>

            <button
              type="button"
              className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40"
              aria-label="Clear task description"
              onClick={() => onTaskDescriptionChange("")}
              disabled={busy}
            >
              <X className="h-3.5 w-3.5 opacity-80" />
            </button>
          </div>

          <textarea
            value={taskDescription}
            onChange={(e) => onTaskDescriptionChange(e.target.value)}
            placeholder="Describe what you want to do…"
            className="mt-1 min-h-[140px] w-full resize-y rounded-2xl border border-white/10 bg-black/30 p-3 text-sm outline-none placeholder:text-white/35 focus:border-white/20"
            disabled={busy}
          />
          <div className="mt-2 flex items-center justify-between text-xs opacity-70">
            <div>{hasTask ? "Ready" : "Add a task description to enable actions"}</div>
            <div>{taskDescription.length.toLocaleString()} chars</div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
        <div className="text-xs opacity-80">
          Auto Plan <span className="ml-2 opacity-60">Generate a plan automatically after discovery</span>
        </div>

        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 text-xs">
            <span className="opacity-70">{autoPlan ? "On" : "Off"}</span>
            <input
              type="checkbox"
              checked={autoPlan}
              onChange={(e) => onAutoPlanChange(e.target.checked)}
              className="h-4 w-4 accent-white"
              aria-label="Auto Plan"
              disabled={busy}
            />
          </label>

          <div className="flex items-center gap-2">
            <div className="text-[11px] opacity-60">Plan model</div>
            <ModelPicker
              providers={PLAN_PROVIDERS}
              providerId={planProviderId}
              modelId={planModelId}
              onChange={onPlanModelChange}
              disabled={!autoPlan || busy}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ActionButton({
  label,
  icon,
  disabled,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  disabled: boolean;
  onClick: () => Promise<void> | void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-disabled={disabled}
      onClick={() => void onClick()}
      className={[
        "inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-3 text-xs",
        disabled ? "border-white/10 bg-white/5 opacity-50" : "border-white/10 bg-white/10 hover:bg-white/15",
      ].join(" ")}
    >
      {icon}
      {label}
    </button>
  );
}
