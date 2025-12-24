import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DiscoveryPanel, type DiscoveryStatus } from "./DiscoveryPanel";
import { DEFAULT_PROVIDER, DEFAULT_MODEL_BY_PROVIDER, DEFAULT_PLAN_PROVIDER, DEFAULT_PLAN_MODEL_BY_PROVIDER, type ProviderId } from "../../data/models";

const meta: Meta<typeof DiscoveryPanel> = {
  title: "Panels/DiscoveryPanel",
  component: DiscoveryPanel,
};

export default meta;

type Story = StoryObj<typeof DiscoveryPanel>;

export const Default: Story = {
  render: () => {
    const [providerId, setProviderId] = useState<ProviderId>(DEFAULT_PROVIDER);
    const [modelId, setModelId] = useState(DEFAULT_MODEL_BY_PROVIDER[providerId] ?? "default");
    const [planProviderId, setPlanProviderId] = useState<ProviderId>(DEFAULT_PLAN_PROVIDER);
    const [planModelId, setPlanModelId] = useState(DEFAULT_PLAN_MODEL_BY_PROVIDER[planProviderId] ?? "default");
    const [taskDescription, setTaskDescription] = useState("Refactor Sidebar into reusable components.");
    const [autoPlan, setAutoPlan] = useState(true);
    const [status, setStatus] = useState<DiscoveryStatus>("idle");

    return (
      <div className="p-6">
        <DiscoveryPanel
          providerId={providerId}
          modelId={modelId}
          onModelChange={(next) => {
            setProviderId(next.providerId);
            setModelId(next.modelId);
          }}
          planProviderId={planProviderId}
          planModelId={planModelId}
          onPlanModelChange={(next) => {
            setPlanProviderId(next.providerId);
            setPlanModelId(next.modelId);
          }}
          taskDescription={taskDescription}
          onTaskDescriptionChange={setTaskDescription}
          autoPlan={autoPlan}
          onAutoPlanChange={setAutoPlan}
          status={status}
          onRunDiscovery={() => setStatus("running")}
          onRewrite={() => setStatus("done")}
          onGeneratePlan={() => setStatus("done")}
        />
      </div>
    );
  },
};
