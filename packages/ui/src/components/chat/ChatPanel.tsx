import * as Popover from "@radix-ui/react-popover";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useEffect, useRef, useState } from "react";
import { Plus, Send, Trash2, RotateCcw, Check, ChevronDown } from "lucide-react";

type Message = { id: string; role: "user" | "assistant"; text: string; ts: number };

type Overlay = "files" | "prompts" | "controls" | "model" | null;

const CHAT_MODEL_GROUPS = [
  {
    title: "Codex CLI",
    items: [
      { id: "gpt-5.1-codex-mini", label: "GPT-5.1 Codex Mini" },
      { id: "gpt-5.2-codex-low", label: "GPT-5.2 Codex Low" },
      { id: "gpt-5.2-codex-medium", label: "GPT-5.2 Codex Medium" },
      { id: "gpt-5.2-codex-high", label: "GPT-5.2 Codex High" },
      { id: "gpt-5.2-high", label: "GPT-5.2 High" },
      { id: "gpt-5.2-medium", label: "GPT-5.2 Medium" },
      { id: "gpt-5.2-low", label: "GPT-5.2 Low" },
      { id: "gpt-5.2-xhigh", label: "GPT-5.2 XHigh" },
    ],
  },
  {
    title: "Gemini CLI",
    items: [
      { id: "gemini-flash-2.5", label: "Gemini Flash 2.5" },
      { id: "gemini-pro-2.5", label: "Gemini Pro 2.5" },
    ],
  },
];

export function ChatPanel({
  selectedCount,
  modelId,
  onModelChange,
}: {
  selectedCount: number;
  modelId: string;
  onModelChange: (id: string) => void;
}) {
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  const modelLabel =
    CHAT_MODEL_GROUPS.flatMap((g) => g.items).find((i) => i.id === modelId)?.label ?? modelId;

  function newChat() {
    setOverlay(null);
    setMessages([]);
    setDraft("");
  }

  function send() {
    const text = draft.trim();
    if (!text) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", text, ts: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setDraft("");

    const reply: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      text: "Mock response (Stage 1). Stage 2 will call the Worker.",
      ts: Date.now() + 1,
    };
    setTimeout(() => setMessages((prev) => [...prev, reply]), 250);
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      {/* Top bar */}
      <div className="border-b border-white/10 bg-white/5 px-3 py-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={newChat}
            className="inline-flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/15 px-3 py-2 text-sm hover:bg-green-500/20"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </button>

          <PillPopover
            id="files"
            overlay={overlay}
            setOverlay={setOverlay}
            label={`Files (${selectedCount})`}
          >
            <div className="text-sm font-semibold">Prompt Files</div>
            <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm opacity-70">
              {selectedCount === 0 ? "No files selected" : `${selectedCount} selected (from Compose)`}
            </div>
          </PillPopover>

          <PillPopover id="prompts" overlay={overlay} setOverlay={setOverlay} label="Prompts (0)">
            <div className="text-sm font-semibold">Prompts</div>
            <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm opacity-70">
              Stub (Stage 1)
            </div>
          </PillPopover>

          <PillPopover id="controls" overlay={overlay} setOverlay={setOverlay} label="Controls">
            <div className="text-sm font-semibold">Controls</div>
            <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm opacity-70">
              Stub (Stage 1)
            </div>
          </PillPopover>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu.Root
            open={overlay === "model"}
            onOpenChange={(next) => setOverlay(next ? "model" : null)}
          >
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
              >
                {modelLabel} <ChevronDown className="h-4 w-4 opacity-70" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content className="min-w-[320px] max-h-[520px] overflow-auto rounded-2xl border border-white/10 bg-[#161a1d] p-2 text-sm shadow-xl outline-none">
                {CHAT_MODEL_GROUPS.map((group) => (
                  <div key={group.title} className="py-1">
                    <div className="px-2 py-1 text-xs font-semibold opacity-60">{group.title}</div>
                    {group.items.map((item) => (
                      <DropdownMenu.Item
                        key={item.id}
                        onSelect={() => onModelChange(item.id)}
                        className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-white/10"
                      >
                        <span>{item.label}</span>
                        {item.id === modelId ? <Check className="h-4 w-4 opacity-80" /> : null}
                      </DropdownMenu.Item>
                    ))}
                  </div>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <button
            type="button"
            aria-label="History"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
            onClick={() => alert("Saved chats (Stage 1+), wire next")}
          >
            <RotateCcw className="h-4 w-4 opacity-80" />
          </button>
        </div>
      </div>

      {/* Message area */}
      <div className="h-[640px] overflow-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="h-full w-full rounded-2xl bg-black/20" />
        ) : (
          <div className="space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={[
                  "max-w-[900px] rounded-2xl border border-white/10 p-3 text-sm",
                  m.role === "user" ? "ml-auto bg-white/10" : "bg-black/20",
                ].join(" ")}
              >
                <div className="text-xs opacity-60 mb-1">{m.role}</div>
                <div className="whitespace-pre-wrap">{m.text}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="border-t border-white/10 bg-white/5 px-3 py-2 flex items-center gap-2">
        <button
          type="button"
          aria-label="Clear chat"
          onClick={newChat}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
        >
          <Trash2 className="h-4 w-4 opacity-80" />
        </button>

        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Enter your message… (⇧↩ for newline, ↩ to send)"
          className="min-h-[44px] max-h-[120px] flex-1 resize-y rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none placeholder:text-white/35 focus:border-white/20"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          aria-label="Message input"
        />

        <button
          type="button"
          aria-label="Send"
          onClick={send}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-green-500/30 bg-green-500/15 hover:bg-green-500/20"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

function PillPopover({
  id,
  overlay,
  setOverlay,
  label,
  children,
}: {
  id: Exclude<Overlay, "model" | null>;
  overlay: Overlay;
  setOverlay: (v: Overlay) => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Popover.Root
      open={overlay === id}
      onOpenChange={(next) => setOverlay(next ? id : null)}
    >
      <Popover.Trigger asChild>
        <button type="button" className="rounded-xl">
          <span
            className={[
              "inline-flex items-center rounded-xl border px-3 py-2 text-sm",
              overlay === id ? "border-green-500/30 bg-green-500/15" : "border-white/10 bg-white/5",
            ].join(" ")}
          >
            {label}
          </span>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={10}
          className="w-[420px] rounded-2xl border border-white/10 bg-[#161a1d] p-4 shadow-xl outline-none"
        >
          {children}
          <Popover.Arrow className="fill-[#161a1d]" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
