import * as Popover from "@radix-ui/react-popover";

export function ConfirmPopover({
  title,
  body,
  confirmText = "Clear",
  cancelText = "Cancel",
  onConfirm,
  children,
}: {
  title: string;
  body: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  children: React.ReactNode;
}) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="top"
          align="start"
          sideOffset={10}
          className="w-[320px] rounded-2xl border border-white/10 bg-[#161a1d] p-4 shadow-xl outline-none"
        >
          <div className="text-sm font-semibold">{title}</div>
          <div className="mt-1 text-xs opacity-70">{body}</div>

          <div className="mt-4 flex items-center gap-2">
            <Popover.Close asChild>
              <button
                type="button"
                className="rounded-xl border border-green-500/30 bg-green-500/15 px-3 py-2 text-sm hover:bg-green-500/20"
              >
                {cancelText}
              </button>
            </Popover.Close>

            <Popover.Close asChild>
              <button
                type="button"
                onClick={onConfirm}
                className="rounded-xl border border-red-500/30 bg-red-500/15 px-3 py-2 text-sm hover:bg-red-500/20"
              >
                {confirmText}
              </button>
            </Popover.Close>
          </div>

          <Popover.Arrow className="fill-[#161a1d]" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
