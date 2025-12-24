import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronUp, Settings, LogOut, Folder, Users } from "lucide-react";

export type AccountItem = {
  id: string;
  label: string;     // e.g. "Jamie Scott Craik"
  subtitle?: string; // e.g. "Personal account"
};

export type WorkspaceItem = {
  id: string;
  label: string;     // e.g. "repo-prompt-ui"
};

export function UserMenu({
  currentAccountId,
  accounts,
  onSelectAccount,

  currentWorkspaceId,
  workspaces,
  onSelectWorkspace,

  onManageWorkspaces,
  onSaveWorkspace,
  onSaveAndExitWorkspace,

  onOpenSettings,
  onLogout,
}: {
  currentAccountId: string;
  accounts: AccountItem[];
  onSelectAccount: (id: string) => void;

  currentWorkspaceId: string;
  workspaces: WorkspaceItem[];
  onSelectWorkspace: (id: string) => void;

  onManageWorkspaces: () => void;
  onSaveWorkspace: () => void;
  onSaveAndExitWorkspace: () => void;

  onOpenSettings: () => void;
  onLogout?: () => void;
}) {
  const currentAccount = accounts.find((a) => a.id === currentAccountId) ?? accounts[0];
  const currentWorkspace = workspaces.find((w) => w.id === currentWorkspaceId) ?? workspaces[0];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="inline-flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-left hover:bg-white/10"
          aria-label="Open account and workspace menu"
        >
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">
              {currentAccount?.label ?? "Account"}
            </div>
            <div className="truncate text-xs opacity-60">
              {(currentWorkspace?.label ?? "Workspace") +
                (currentAccount?.subtitle ? ` • ${currentAccount.subtitle}` : "")}
            </div>
          </div>
          <ChevronUp className="h-4 w-4 opacity-70 shrink-0" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="top"
          align="start"
          sideOffset={10}
          className="min-w-[320px] rounded-2xl border border-white/10 bg-[#161a1d] p-2 text-sm shadow-xl outline-none z-50"
        >
          {/* Accounts */}
          <div className="px-2 py-1 text-xs font-semibold opacity-60 inline-flex items-center gap-2">
            <Users className="h-4 w-4 opacity-70" />
            Accounts
          </div>

          {accounts.map((a) => (
            <DropdownMenu.Item
              key={a.id}
              onSelect={() => onSelectAccount(a.id)}
              className="flex cursor-default select-none items-center justify-between rounded-xl px-3 py-2 outline-none hover:bg-white/10 data-[state=open]:bg-white/10"
            >
              <div className="min-w-0">
                <div className="truncate">{a.label}</div>
                {a.subtitle ? <div className="truncate text-xs opacity-60">{a.subtitle}</div> : null}
              </div>
              {a.id === currentAccountId ? <Check className="h-4 w-4 opacity-80 shrink-0" /> : null}
            </DropdownMenu.Item>
          ))}

          <Separator />

          {/* Workspaces */}
          <div className="px-2 py-1 text-xs font-semibold opacity-60 inline-flex items-center gap-2">
            <Folder className="h-4 w-4 opacity-70" />
            Workspaces
          </div>

          {workspaces.map((w) => (
            <DropdownMenu.Item
              key={w.id}
              onSelect={() => onSelectWorkspace(w.id)}
              className="flex cursor-default select-none items-center justify-between rounded-xl px-3 py-2 outline-none hover:bg-white/10 data-[state=open]:bg-white/10"
            >
              <span className="truncate">{w.label}</span>
              {w.id === currentWorkspaceId ? <Check className="h-4 w-4 opacity-80 shrink-0" /> : null}
            </DropdownMenu.Item>
          ))}

          <DropdownMenu.Item
            onSelect={onManageWorkspaces}
            className="rounded-xl px-3 py-2 outline-none hover:bg-white/10 data-[state=open]:bg-white/10"
          >
            Manage Workspaces…
          </DropdownMenu.Item>

          <Separator />

          {/* Workspace actions */}
          <DropdownMenu.Item
            onSelect={onSaveWorkspace}
            className="flex items-center justify-between rounded-xl px-3 py-2 outline-none hover:bg-white/10 data-[state=open]:bg-white/10"
          >
            <span>Save Workspace</span>
            <span className="text-xs opacity-60">⌘S</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onSelect={onSaveAndExitWorkspace}
            className="flex items-center justify-between rounded-xl px-3 py-2 outline-none hover:bg-white/10 data-[state=open]:bg-white/10"
          >
            <span>Save &amp; Exit Workspace</span>
            <span className="text-xs opacity-60">⇧⌘S</span>
          </DropdownMenu.Item>

          <Separator />

          {/* Settings + Logout */}
          <DropdownMenu.Item
            onSelect={onOpenSettings}
            className="flex items-center justify-between rounded-xl px-3 py-2 outline-none hover:bg-white/10 data-[state=open]:bg-white/10"
          >
            <span className="inline-flex items-center gap-2">
              <Settings className="h-4 w-4 opacity-80" />
              Settings
            </span>
            <span className="text-xs opacity-60">⌘,</span>
          </DropdownMenu.Item>

          {onLogout ? (
            <DropdownMenu.Item
              onSelect={onLogout}
              className="flex items-center gap-2 rounded-xl px-3 py-2 outline-none hover:bg-white/10 data-[state=open]:bg-white/10"
            >
              <LogOut className="h-4 w-4 opacity-80" />
              Log Out
            </DropdownMenu.Item>
          ) : null}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function Separator() {
  return <div className="my-2 h-px bg-white/10" />;
}
