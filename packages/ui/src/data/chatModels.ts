export type ChatModelGroup = {
  title: string;
  items: { id: string; label: string }[];
};

export const CHAT_MODEL_GROUPS: ChatModelGroup[] = [
  {
    title: "Codex CLI",
    items: [
      { id: "gpt-5.1-codex-mini", label: "GPT-5.1 Codex Mini" },
      { id: "gpt-5.1-mini", label: "GPT-5.1 Mini" },
      { id: "gpt-5.2-codex-high", label: "GPT-5.2 Codex High" },
      { id: "gpt-5.2-codex-low", label: "GPT-5.2 Codex Low" },
      { id: "gpt-5.2-codex-medium", label: "GPT-5.2 Codex Medium" },
      { id: "gpt-5.2-codex-xhigh", label: "GPT-5.2 Codex XHigh" },
      { id: "gpt-5.2-high", label: "GPT-5.2 High" },
      { id: "gpt-5.2-low", label: "GPT-5.2 Low" },
      { id: "gpt-5.2-medium", label: "GPT-5.2 Medium" },
      { id: "gpt-5.2-xhigh", label: "GPT-5.2 XHigh" },
    ],
  },
  {
    title: "Gemini CLI",
    items: [
      { id: "gemini-flash-2.5", label: "Gemini Flash 2.5" },
      { id: "gemini-flash-3.0-preview", label: "Gemini Flash 3.0 Preview" },
      { id: "gemini-pro-2.5", label: "Gemini Pro 2.5" },
      { id: "gemini-pro-3.0-preview", label: "Gemini Pro 3.0 Preview" },
    ],
  },
  {
    title: "GitHub",
    items: [
      { id: "github-gpt-4.1", label: "GitHub/gpt-4.1" },
      { id: "github-gpt-5-med", label: "GitHub/GPT-5 Med" },
      { id: "github-gpt-5-mini", label: "GitHub/GPT-5 Mini" },
    ],
  },
  { title: "Local", items: [{ id: "local-deepseek-coder-6.7b", label: "local/deepseek-coder:6.7b" }] },
  {
    title: "OpenRouter",
    items: [
      { id: "or-claude-opus-4.5", label: "oRouter/Claude Opus 4.5" },
      { id: "or-claude-sonnet-4.5", label: "oRouter/Claude Sonnet 4.5" },
      { id: "or-deepseek-v3", label: "oRouter/Deepseek V3 (03-24)" },
      { id: "or-gemini-2.5-flash-preview", label: "oRouter/Gemini 2.5 Flash Preview" },
    ],
  },
  { title: "Z.AI", items: [{ id: "zai-glm-4.5", label: "Z.AI GLM-4.5" }] },
];
