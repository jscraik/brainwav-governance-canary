import { FolderTree, Sparkles, Code2 } from "lucide-react";
import { SegmentedControl } from "../ui/SegmentedControl";

export type ContextTabId = "selectedFiles" | "contextBuilder" | "applyXml";

type Props = {
  active: ContextTabId;
  onChange: (id: ContextTabId) => void;
  selectedCount?: number;
};

export function ContextTabStrip({ active, onChange, selectedCount = 0 }: Props) {
  const tabs: Array<{
    id: ContextTabId;
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }> = [
    {
      id: "selectedFiles",
      label: "Selected Files",
      Icon: FolderTree,
      badge: String(selectedCount),
    },
    { id: "contextBuilder", label: "Context Builder", Icon: Sparkles },
    { id: "applyXml", label: "Apply XML", Icon: Code2 },
  ];

  return (
    <SegmentedControl
      items={tabs.map(({ id, label, Icon, badge }) => ({
        id,
        label,
        icon: Icon,
        badge,
      }))}
      value={active}
      onChange={onChange}
    />
  );
}