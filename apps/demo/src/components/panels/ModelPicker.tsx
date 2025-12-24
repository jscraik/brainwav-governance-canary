import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown, Cpu } from "lucide-react";
import type { ProviderId, ProviderOption } from "../../data/models";

export function ModelPicker({
  providers,
  providerId,
  modelId,
  onChange,
  disabled,
}: {
  providers: ProviderOption[];
  providerId: ProviderId;
  modelId: string;
  onChange: (next: { providerId: ProviderId; modelId: string }) => void;
  disabled?: boolean;
}) {
  const activeProvider = providers.find((p) => p.id === providerId) ?? providers[0];
  const activeModel =
    activeProvider?.models.find((m) => m.id === modelId) ?? activeProvider?.models[0];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          disabled={disabled}
          aria-disabled={disabled}
          title="Select agent and model"
          className={[
            "inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-xs hover:bg-white/10",
            disabled ? "opacity-50" : "",
          ].join(" ")}
        >
          <Cpu className="h-4 w-4 opacity-80" />
          <span className="opacity-90">
            {activeProvider?.label ?? "Provider"} · {activeModel?.label ?? "Default"}
          </span>
          <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          className="min-w-[260px] rounded-2xl border border-white/10 bg-[#161a1d] p-1 text-xs shadow-xl outline-none"
        >
          {providers.map((p) => (
            <DropdownMenu.Sub key={p.id}>
              <DropdownMenu.SubTrigger
                className={[
                  "flex cursor-default select-none items-center justify-between rounded-xl px-3 py-2 outline-none",
                  p.id === providerId ? "bg-green-500/30" : "hover:bg-white/10",
                ].join(" ")}
              >
                <span>{p.label}</span>
                <span className="opacity-70">›</span>
              </DropdownMenu.SubTrigger>

              <DropdownMenu.Portal>
                <DropdownMenu.SubContent
                  sideOffset={10}
                  className="min-w-[280px] rounded-2xl border border-white/10 bg-[#161a1d] p-1 text-xs shadow-xl outline-none"
                >
                  {p.models.map((m) => {
                    const selected = p.id === providerId && m.id === modelId;
                    return (
                      <DropdownMenu.Item
                        key={m.id}
                        onSelect={() => onChange({ providerId: p.id, modelId: m.id })}
                        className="flex cursor-default select-none items-center justify-between rounded-xl px-3 py-2 outline-none hover:bg-white/10"
                      >
                        <span>{m.label}</span>
                        {selected ? <Check className="h-4 w-4 opacity-80" /> : null}
                      </DropdownMenu.Item>
                    );
                  })}
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
