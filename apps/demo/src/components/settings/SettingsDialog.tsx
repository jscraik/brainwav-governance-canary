import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { SettingsPage } from "./SettingsPage";

export function SettingsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />

        <Dialog.Content
          className={[
            "fixed left-1/2 top-1/2 z-50 w-[920px] max-w-[92vw]",
            "-translate-x-1/2 -translate-y-1/2",
            "rounded-3xl border border-white/10 bg-[#161a1d] shadow-2xl outline-none",
          ].join(" ")}
          aria-label="Settings"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <Dialog.Title className="text-sm font-semibold">Settings</Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
                aria-label="Close Settings"
              >
                <X className="h-4 w-4 opacity-80" />
              </button>
            </Dialog.Close>
          </div>

          <div className="max-h-[78vh] overflow-auto px-1 py-1">
            <SettingsPage />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
