import * as Tooltip from "@radix-ui/react-tooltip";

export function UITooltip({
  content,
  children,
}: {
  content: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            align="start"
            sideOffset={10}
            className="max-w-[360px] rounded-2xl border border-white/10 bg-[#161a1d] p-4 text-sm shadow-xl outline-none"
          >
            <div className="text-white/90">{content}</div>
            <Tooltip.Arrow className="fill-[#161a1d]" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
