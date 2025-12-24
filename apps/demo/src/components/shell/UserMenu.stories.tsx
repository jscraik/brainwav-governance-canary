import type { Meta, StoryObj } from "@storybook/react";
import { UserMenu } from "./UserMenu";

const meta: Meta<typeof UserMenu> = {
  title: "Shell/UserMenu",
  component: UserMenu,
};

export default meta;

export const Default: StoryObj<typeof UserMenu> = {
  render: () => (
    <div className="flex min-h-dvh items-center justify-center bg-[#161a1d] p-8">
      <div className="w-[320px]">
        <UserMenu
          currentAccountId="personal"
          accounts={[
            { id: "personal", label: "Jamie Scott Craik", subtitle: "Personal account" },
            { id: "work", label: "brAInwav", subtitle: "Work account" },
          ]}
          onSelectAccount={(id) => console.log("switch account", id)}
          currentWorkspaceId="repo"
          workspaces={[
            { id: "repo", label: "repo-prompt-ui" },
            { id: "peer", label: "PEER" },
            { id: "cortex", label: "Cortex-OS" },
          ]}
          onSelectWorkspace={(id) => console.log("switch workspace", id)}
          onManageWorkspaces={() => console.log("Manage Workspaces")}
          onSaveWorkspace={() => console.log("Save Workspace")}
          onSaveAndExitWorkspace={() => console.log("Save & Exit Workspace")}
          onOpenSettings={() => console.log("Open Settings")}
          onLogout={() => console.log("Logout")}
        />
      </div>
    </div>
  ),
};

export const SingleAccountSingleWorkspace: StoryObj<typeof UserMenu> = {
  render: () => (
    <div className="flex min-h-dvh items-center justify-center bg-[#161a1d] p-8">
      <div className="w-[320px]">
        <UserMenu
          currentAccountId="personal"
          accounts={[
            { id: "personal", label: "Jamie Scott Craik", subtitle: "Personal account" },
          ]}
          onSelectAccount={(id) => console.log("switch account", id)}
          currentWorkspaceId="repo"
          workspaces={[
            { id: "repo", label: "repo-prompt-ui" },
          ]}
          onSelectWorkspace={(id) => console.log("switch workspace", id)}
          onManageWorkspaces={() => console.log("Manage Workspaces")}
          onSaveWorkspace={() => console.log("Save Workspace")}
          onSaveAndExitWorkspace={() => console.log("Save & Exit Workspace")}
          onOpenSettings={() => console.log("Open Settings")}
          onLogout={() => console.log("Logout")}
        />
      </div>
    </div>
  ),
};

export const WithoutLogout: StoryObj<typeof UserMenu> = {
  render: () => (
    <div className="flex min-h-dvh items-center justify-center bg-[#161a1d] p-8">
      <div className="w-[320px]">
        <UserMenu
          currentAccountId="personal"
          accounts={[
            { id: "personal", label: "Jamie Scott Craik", subtitle: "Personal account" },
          ]}
          onSelectAccount={(id) => console.log("switch account", id)}
          currentWorkspaceId="repo"
          workspaces={[
            { id: "repo", label: "repo-prompt-ui" },
          ]}
          onSelectWorkspace={(id) => console.log("switch workspace", id)}
          onManageWorkspaces={() => console.log("Manage Workspaces")}
          onSaveWorkspace={() => console.log("Save Workspace")}
          onSaveAndExitWorkspace={() => console.log("Save & Exit Workspace")}
          onOpenSettings={() => console.log("Open Settings")}
        />
      </div>
    </div>
  ),
};
