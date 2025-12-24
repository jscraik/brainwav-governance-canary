export type ProviderId = "claude" | "codex" | "gemini";

export type ModelOption = { id: string; label: string };

export type ProviderOption = {
  id: ProviderId;
  label: string;
  models: ModelOption[];
};

export const DISCOVERY_PROVIDERS: ProviderOption[] = [
  {
    id: "claude",
    label: "Claude Code",
    models: [
      { id: "default", label: "Default" },
      { id: "claude-sonnet", label: "Claude Sonnet" },
      { id: "claude-opus", label: "Claude Opus" },
      { id: "claude-haiku", label: "Claude Haiku" },
    ],
  },
  {
    id: "codex",
    label: "Codex CLI",
    models: [
      { id: "default", label: "Default" },
      { id: "gpt-5.1-codex-mini", label: "GPT-5.1 Codex Mini" },
      { id: "gpt-5.2-codex-low", label: "GPT-5.2 Codex Low" },
      { id: "gpt-5.2-codex-medium", label: "GPT-5.2 Codex Medium" },
      { id: "gpt-5.2-codex-high", label: "GPT-5.2 Codex High" },
      { id: "gpt-5.2-codex-xhigh", label: "GPT-5.2 Codex XHigh" },
      { id: "gpt-5.2-low", label: "GPT-5.2 Low" },
      { id: "gpt-5.2-medium", label: "GPT-5.2 Medium" },
      { id: "gpt-5.2-high", label: "GPT-5.2 High" },
      { id: "gpt-5.2-xhigh", label: "GPT-5.2 XHigh" },
    ],
  },
  {
    id: "gemini",
    label: "Gemini",
    models: [
      { id: "default", label: "Default" },
      { id: "gemini-flash-2.5", label: "Gemini Flash 2.5" },
      { id: "gemini-flash-3.0-preview", label: "Gemini Flash 3.0 Preview" },
      { id: "gemini-pro-2.5", label: "Gemini Pro 2.5" },
      { id: "gemini-pro-3.0-preview", label: "Gemini Pro 3.0 Preview" },
    ],
  },
];

export const PLAN_PROVIDERS = DISCOVERY_PROVIDERS;

export const DEFAULT_PROVIDER: ProviderId = "codex";
export const DEFAULT_MODEL_BY_PROVIDER: Partial<Record<ProviderId, string>> = {
  claude: "default",
  codex: "gpt-5.2-codex-medium",
  gemini: "default",
};

export const DEFAULT_PLAN_PROVIDER: ProviderId = "codex";
export const DEFAULT_PLAN_MODEL_BY_PROVIDER: Partial<Record<ProviderId, string>> = {
  claude: "default",
  codex: "gpt-5.2-high",
  gemini: "default",
};

export const PRO_EDIT_PROVIDERS = DISCOVERY_PROVIDERS;
export const DEFAULT_PRO_EDIT_PROVIDER: ProviderId = "codex";
export const DEFAULT_PRO_EDIT_MODEL_BY_PROVIDER: Partial<Record<ProviderId, string>> = {
  claude: "default",
  codex: "gpt-5.2-codex-medium",
  gemini: "default",
};

export function coerceModelId(
  providers: ProviderOption[],
  providerId: ProviderId,
  modelId: string,
) {
  const p = providers.find((x) => x.id === providerId) ?? providers[0];
  if (!p) return { providerId, modelId: "default" };
  const ok = p.models.some((m) => m.id === modelId);
  return { providerId: p.id, modelId: ok ? modelId : p.models[0]?.id ?? "default" };
}