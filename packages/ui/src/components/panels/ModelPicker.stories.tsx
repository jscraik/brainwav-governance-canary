import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ModelPicker } from "./ModelPicker";
import { DISCOVERY_PROVIDERS, type ProviderId } from "../../data/models";

const meta: Meta<typeof ModelPicker> = {
  title: "Panels/ModelPicker",
  component: ModelPicker,
};

export default meta;

type Story = StoryObj<typeof ModelPicker>;

export const Default: Story = {
  render: () => {
    const [providerId, setProviderId] = useState<ProviderId>("codex");
    const [modelId, setModelId] = useState("gpt-5.2-codex-medium");

    return (
      <div className="p-6">
        <ModelPicker
          providers={DISCOVERY_PROVIDERS}
          providerId={providerId}
          modelId={modelId}
          onChange={(next) => {
            setProviderId(next.providerId);
            setModelId(next.modelId);
          }}
        />
      </div>
    );
  },
};
