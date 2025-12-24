import * as Dialog from "@radix-ui/react-dialog";

export function SaveBeforeSwitchDialog({
  open,
  onOpenChange,

  title = "Save changes before switching?",
  body = "You have unsaved messages in this chat.",

  saveText = "Save",
  discardText = "Don’t Save",
  cancelText = "Cancel",

  onSave,
  onDiscard,
  onCancel,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;

  title?: string;
  body?: string;

  saveText?: string;
  discardText?: string;
  cancelText?: string;

  onSave: () => void;
  onDiscard: () => void;
  onCancel: () => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#161a1d] p-4 shadow-xl outline-none">
          <Dialog.Title className="text-sm font-semibold">{title}</Dialog.Title>
          <Dialog.Description className="mt-1 text-xs opacity-70">{body}</Dialog.Description>

          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
              onClick={onCancel}
            >
              {cancelText}
            </button>

            <button
              type="button"
              className="rounded-xl border border-red-500/30 bg-red-500/15 px-3 py-2 text-sm hover:bg-red-500/20"
              onClick={onDiscard}
            >
              {discardText}
            </button>

            <button
              type="button"
              className="rounded-xl border border-green-500/30 bg-green-500/15 px-3 py-2 text-sm hover:bg-green-500/20"
              onClick={onSave}
            >
              {saveText}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}