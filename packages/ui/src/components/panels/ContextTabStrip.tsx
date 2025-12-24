import { FolderTree, Sparkles, Code2 } from "lucide-react";

export type ContextTabId = "selectedFiles" | "contextBuilder" | "applyXml";

export function ContextTabStrip({
  active,
  onChange,
  selectedCount = 0,
}: {
  active: ContextTabId;
  onChange: (id: ContextTabId) => void;
  selectedCount?: number;
}) {
  const tabs: Array<{
    id: ContextTabId;
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }> = [
    { id: "selectedFiles", label: "Selected Files", Icon: FolderTree, badge: String(selectedCount) },
    { id: "contextBuilder", label: "Context Builder", Icon: Sparkles },
    { id: "applyXml", label: "Apply XML", Icon: Code2 },
  ];

  return (
    <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-1">
      {tabs.map(({ id, label, Icon, badge }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={[
              "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs",
              isActive ? "bg-white/10" : "opacity-70 hover:opacity-100",
            ].join(" ")}
            aria-current={isActive ? "page" : undefined}
          >
            {badge ? (
              <span className="inline-flex min-w-5 items-center justify-center rounded-full border border-white/10 bg-white/10 px-1.5 py-0.5 text-[10px]">
                {badge}
              </span>
            ) : null}
            <Icon className="h-4 w-4 opacity-80" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
