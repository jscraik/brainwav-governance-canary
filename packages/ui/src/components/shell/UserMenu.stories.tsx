import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { UserMenu } from "./UserMenu";

const meta: Meta<typeof UserMenu> = {
  title: "Shell/UserMenu",
  component: UserMenu,
};

export default meta;

type Story = StoryObj<typeof UserMenu>;

export const Default: Story = {
  render: () => {
    const [accountId, setAccountId] = useState("acc-1");
    const [workspaceId, setWorkspaceId] = useState("ws-1");

    return (
      <div className="w-[320px] p-6">
        <UserMenu
          currentAccountId={accountId}
          accounts={[
            { id: "acc-1", label: "Jamie" },
            { id: "acc-2", label: "Work", subtitle: "team@company.com" },
          ]}
          onSelectAccount={setAccountId}
          currentWorkspaceId={workspaceId}
          workspaces={[
            { id: "ws-1", label: "repo-prompt" },
            { id: "ws-2", label: "cortex-os" },
          ]}
          onSelectWorkspace={setWorkspaceId}
          onManageWorkspaces={() => {}}
          onSaveWorkspace={() => {}}
          onSaveAndExitWorkspace={() => {}}
          onOpenSettings={() => {}}
          onLogout={() => {}}
        />
      </div>
    );
  },
};
