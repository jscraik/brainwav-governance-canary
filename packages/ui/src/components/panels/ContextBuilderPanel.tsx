import type { ProviderId } from "../../data/models";
import { ContextTabStrip, type ContextTabId } from "./ContextTabStrip";
import { DiscoveryPanel, type DiscoveryStatus } from "./DiscoveryPanel";

export function ContextBuilderPanel({
  activeTab,
  onTabChange,
  selectedCount,

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
  activeTab: ContextTabId;
  onTabChange: (t: ContextTabId) => void;
  selectedCount: number;

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
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5">
      <div className="px-3 pt-3">
        <ContextTabStrip active={activeTab} onChange={onTabChange} selectedCount={selectedCount} />
      </div>

      <div className="p-3">
        <DiscoveryPanel
          providerId={providerId}
          modelId={modelId}
          onModelChange={onModelChange}
          planProviderId={planProviderId}
          planModelId={planModelId}
          onPlanModelChange={onPlanModelChange}
          taskDescription={taskDescription}
          onTaskDescriptionChange={onTaskDescriptionChange}
          autoPlan={autoPlan}
          onAutoPlanChange={onAutoPlanChange}
          status={status}
          onRunDiscovery={onRunDiscovery}
          onRewrite={onRewrite}
          onGeneratePlan={onGeneratePlan}
        />
      </div>
    </section>
  );
}
