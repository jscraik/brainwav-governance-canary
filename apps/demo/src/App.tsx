// REPOMARK:SCOPE: 1 - Replace local component/lib/model imports with UI kit imports
import { useEffect, useMemo, useState } from "react";
import {
  AppShell,
  Sidebar,
  InstructionsPanel,
  SelectedFilesPanel,
  ApplyXmlPanel,
  ChatPanel,
  ContextBuilderPanel,
  TopHeader,
  BottomDock,
  UserMenu,
  SettingsDialog,
  buildFileTree,
  collectLeafPaths,
  filterTreeByQuery,
  sortTreeFilesOnly,
  applySidebarFilters,
  groupSelectedFiles,
  sumBytes,
  loadString,
  saveString,
  loadJson,
  saveJson,
  DISCOVERY_PROVIDERS,
  DEFAULT_PROVIDER,
  DEFAULT_MODEL_BY_PROVIDER,
  PLAN_PROVIDERS,
  DEFAULT_PLAN_PROVIDER,
  DEFAULT_PLAN_MODEL_BY_PROVIDER,
  coerceModelId,
  type ProviderId,
  type ContextTabId,
  type DiscoveryStatus,
  type SidebarSort,
  type SidebarFilters,
} from "@openai/apps-sdk-ui-kit";
import { MOCK_FILES } from "./data/fileIndex.mock";

const KEY_INSTRUCTIONS = "repoPrompt.instructions.v1";
const KEY_AI_RESPONSE = "repoPrompt.applyXml.aiResponse.v1";
const KEY_PROVIDER = "repoPrompt.discovery.provider.v1";
const KEY_MODEL_MAP = "repoPrompt.discovery.modelByProvider.v1";
const KEY_PLAN_PROVIDER = "repoPrompt.plan.provider.v1";
const KEY_PLAN_MODEL_MAP = "repoPrompt.plan.modelByProvider.v1";
const KEY_PRESETS = "repoPrompt.selectedFiles.presets.v1";
const KEY_ACTIVE_PRESET = "repoPrompt.selectedFiles.activePreset.v1";
const KEY_SIDEBAR_OPEN = "repoPrompt.ui.sidebarOpen.v1";
const KEY_CHAT_MODEL = "repoPrompt.chat.modelId.v1";

type ModelByProvider = Partial<Record<ProviderId, string>>;


export default function App() {
  const [instructions, setInstructions] = useState(() =>
    loadString(KEY_INSTRUCTIONS, "")
  );
  const [aiResponse, setAiResponse] = useState(() =>
    loadString(KEY_AI_RESPONSE, "")
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mode, setMode] = useState<"compose" | "chat">("compose");
  const [sidebarOpen, setSidebarOpen] = useState(() =>
    loadJson(KEY_SIDEBAR_OPEN, true)
  );
  const [contextTab, setContextTab] = useState<ContextTabId>("selectedFiles");
  const [chatModelId, setChatModelId] = useState(() =>
    loadString(KEY_CHAT_MODEL, "gpt-5.2-high")
  );
  const baseTree = useMemo(() => buildFileTree(MOCK_FILES), []);
  type SortMode = "name-asc" | "name-desc" | "tokens-asc" | "tokens-desc";
  type ViewMode = "full" | "api";
  type Preset = { name: string; files: string[] };
  type FileTreeNode = ReturnType<typeof buildFileTree>;

  function indexTree(root: FileTreeNode): Map<string, FileTreeNode> {
    const map = new Map<string, FileTreeNode>();
    const stack: FileTreeNode[] = [root];

    while (stack.length) {
      const node = stack.pop();
      if (!node) continue;
      map.set(node.path, node);
      if (node.type === "folder") {
        for (const child of node.children) {
          stack.push(child as FileTreeNode);
        }
      }
    }

    return map;
  }

  const treeIndex = useMemo(() => indexTree(baseTree), [baseTree]);

  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(
    () => new Set(["src/components/panels/ApplyXmlPanel.stories.tsx"])
  );
  const [sortMode, setSortMode] = useState<SortMode>("name-asc");
  const [viewMode, setViewMode] = useState<ViewMode>("full");
  const [presets, setPresets] = useState<Preset[]>(() =>
    loadJson<Preset[]>(KEY_PRESETS, [])
  );
  const [activePreset, setActivePreset] = useState<number | null>(() =>
    loadJson<number | null>(KEY_ACTIVE_PRESET, null)
  );
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    () => new Set(["src", "src/components", "src/components/panels"])
  );
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [sidebarSort, setSidebarSort] = useState<SidebarSort>("name-asc");
  const [sidebarFilters, setSidebarFilters] = useState<SidebarFilters>({
    showSelectedOnly: false,
    hideDotFolders: false,
    hideStorybook: false,
  });
  const [providerId, setProviderId] = useState<ProviderId>(() =>
    loadString(KEY_PROVIDER, DEFAULT_PROVIDER) as ProviderId
  );
  const [modelByProvider, setModelByProvider] = useState<ModelByProvider>(() =>
    loadJson<ModelByProvider>(KEY_MODEL_MAP, DEFAULT_MODEL_BY_PROVIDER)
  );
  const [planProviderId, setPlanProviderId] = useState<ProviderId>(() =>
    loadString(KEY_PLAN_PROVIDER, DEFAULT_PLAN_PROVIDER) as ProviderId
  );
  const [planModelByProvider, setPlanModelByProvider] = useState<ModelByProvider>(
    () => loadJson<ModelByProvider>(KEY_PLAN_MODEL_MAP, DEFAULT_PLAN_MODEL_BY_PROVIDER)
  );
  const [taskDescription, setTaskDescription] = useState("");
  const [autoPlan, setAutoPlan] = useState(true);
  const [discoveryStatus, setDiscoveryStatus] =
    useState<DiscoveryStatus>("idle");

  useEffect(() => {
    saveString(KEY_INSTRUCTIONS, instructions);
  }, [instructions]);

  useEffect(() => {
    saveString(KEY_AI_RESPONSE, aiResponse);
  }, [aiResponse]);

  useEffect(() => {
    saveString(KEY_PROVIDER, providerId);
  }, [providerId]);

  useEffect(() => {
    saveJson(KEY_MODEL_MAP, modelByProvider);
  }, [modelByProvider]);

  useEffect(() => {
    saveJson(KEY_PRESETS, presets);
  }, [presets]);

  useEffect(() => {
    saveJson(KEY_ACTIVE_PRESET, activePreset);
  }, [activePreset]);

  useEffect(() => {
    saveJson(KEY_SIDEBAR_OPEN, sidebarOpen);
  }, [sidebarOpen]);

  useEffect(() => {
    saveString(KEY_CHAT_MODEL, chatModelId);
  }, [chatModelId]);

  useEffect(() => {
    if (activePreset === null) return;
    if (activePreset < 0 || activePreset >= presets.length) {
      setActivePreset(null);
    }
  }, [activePreset, presets.length]);

  useEffect(() => {
    saveString(KEY_PLAN_PROVIDER, planProviderId);
  }, [planProviderId]);

  useEffect(() => {
    saveJson(KEY_PLAN_MODEL_MAP, planModelByProvider);
  }, [planModelByProvider]);

  const coerced = coerceModelId(
    DISCOVERY_PROVIDERS,
    providerId,
    modelByProvider[providerId] ?? "default"
  );
  const modelId = coerced.modelId;

  const planCoerced = coerceModelId(
    PLAN_PROVIDERS,
    planProviderId,
    planModelByProvider[planProviderId] ?? "default"
  );
  const planModelId = planCoerced.modelId;

  const selectedCount = selectedFiles.size;
  const grouped = useMemo(
    () => groupSelectedFiles(MOCK_FILES, selectedFiles, sortMode),
    [selectedFiles, sortMode]
  );
  const totalSelectedBytes = useMemo(
    () => sumBytes(MOCK_FILES, selectedFiles),
    [selectedFiles]
  );

  function toggleExpand(folderPath: string) {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folderPath)) next.delete(folderPath);
      else next.add(folderPath);
      return next;
    });
  }

  function toggleFile(filePath: string) {
    setSelectedFiles((prev) => {
      const next = new Set(prev);
      if (next.has(filePath)) next.delete(filePath);
      else next.add(filePath);
      return next;
    });
  }

  function toggleFolder(folderPath: string, nextChecked: boolean) {
    const folderNode = treeIndex.get(folderPath);
    if (!folderNode || folderNode.type !== "folder") return;

    const leafPaths = collectLeafPaths(folderNode);

    setSelectedFiles((prev) => {
      const next = new Set(prev);
      for (const p of leafPaths) {
        if (nextChecked) next.add(p);
        else next.delete(p);
      }
      return next;
    });

    setExpandedFolders((prev) => new Set(prev).add(folderPath));
  }

  function clearFileSelection() {
    setSelectedFiles(new Set());
  }

  function clearSidebarUiAndSelection() {
    setSidebarSearch("");
    setSidebarSort("name-asc");
    setSidebarFilters({
      showSelectedOnly: false,
      hideDotFolders: false,
      hideStorybook: false,
    });
    setSelectedFiles(new Set());
    setExpandedFolders(new Set());
  }

  function collapseAllFolders() {
    setExpandedFolders(new Set());
  }

  function clearSelectedCodemaps() {
    console.log("Clear selected codemaps (TODO Stage 2)");
  }

  function saveCurrentPreset() {
    const name = window.prompt("Preset name?");
    if (!name) return;

    const files = Array.from(selectedFiles);
    setPresets((prev) => {
      const next = [...prev, { name, files }];
      setActivePreset(next.length - 1);
      return next;
    });
  }

  function createNewPreset() {
    const name = window.prompt("New preset name?");
    if (!name) return;

    setPresets((prev) => {
      const next = [...prev, { name, files: [] }];
      setActivePreset(next.length - 1);
      return next;
    });
    setSelectedFiles(new Set());
  }

  function switchPreset(index: number) {
    const p = presets[index];
    if (!p) return;
    setActivePreset(index);
    setSelectedFiles(new Set(p.files));
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;

      if (mod && e.key >= "1" && e.key <= "9") {
        const idx = Number(e.key) - 1;
        if (idx < presets.length) {
          e.preventDefault();
          switchPreset(idx);
        }
        return;
      }

      if (mod && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        saveCurrentPreset();
        return;
      }

      if (mod && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        createNewPreset();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [presets, selectedFiles]);

  const queryTree = useMemo(
    () => filterTreeByQuery(baseTree, sidebarSearch),
    [baseTree, sidebarSearch]
  );
  const filteredTree = useMemo(
    () => applySidebarFilters(queryTree, selectedFiles, sidebarFilters),
    [queryTree, selectedFiles, sidebarFilters]
  );
  const sortedTree = useMemo(
    () => sortTreeFilesOnly(filteredTree, sidebarSort),
    [filteredTree, sidebarSort]
  );

  return (
    <AppShell
      sidebar={
        <Sidebar
          workspaceName="repo-prompt-ui"
          tree={sortedTree}
          selected={selectedFiles}
          expanded={expandedFolders}
          onToggleExpand={toggleExpand}
          onToggleFile={toggleFile}
          onToggleFolder={toggleFolder}
          searchText={sidebarSearch}
          onSearchTextChange={setSidebarSearch}
          sort={sidebarSort}
          onSortChange={setSidebarSort}
          filters={sidebarFilters}
          onFiltersChange={setSidebarFilters}
          onClear={clearSidebarUiAndSelection}
          onExit={() => alert("Exit Workspace (Stage 2)")}
        />
      }
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => setSidebarOpen((v) => !v)}
    >
      <TopHeader
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        mode={mode}
        onModeChange={setMode}
      />

      <div className="flex-1 overflow-auto px-4 py-3">
        {mode === "compose" ? (
          <div className="space-y-3">
            <InstructionsPanel
              value={instructions}
              onChange={setInstructions}
              onSend={async () => console.log("Send to Chat:", instructions)}
            />

            {contextTab === "selectedFiles" && (
              <SelectedFilesPanel
                activeTab={contextTab}
                onTabChange={setContextTab}
                selectedCount={selectedCount}
                groups={grouped}
                totalBytes={totalSelectedBytes}
                onToggleFile={(path) => {
                  setSelectedFiles((prev) => {
                    const next = new Set(prev);
                    if (next.has(path)) next.delete(path);
                    else next.add(path);
                    return next;
                  });
                }}
                presets={presets}
                activePreset={activePreset}
                onSwitchPreset={switchPreset}
                onSaveCurrentPreset={saveCurrentPreset}
                onCreateNewPreset={createNewPreset}
                sortMode={sortMode}
                onSortModeChange={setSortMode}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onCollapseAllFolders={collapseAllFolders}
                onClearSelectedCodemaps={clearSelectedCodemaps}
                onClearFileSelection={clearFileSelection}
              />
            )}

            {contextTab === "contextBuilder" && (
              <ContextBuilderPanel
                activeTab={contextTab}
                onTabChange={setContextTab}
                selectedCount={0}
                providerId={providerId}
                modelId={modelId}
                onModelChange={({ providerId: nextProviderId, modelId: nextModelId }) => {
                  setProviderId(nextProviderId);
                  setModelByProvider((prev) => ({
                    ...prev,
                    [nextProviderId]: nextModelId,
                  }));
                }}
                planProviderId={planProviderId}
                planModelId={planModelId}
                onPlanModelChange={(next) => {
                  setPlanProviderId(next.providerId);
                  setPlanModelByProvider((prev) => ({
                    ...prev,
                    [next.providerId]: next.modelId,
                  }));
                }}
                taskDescription={taskDescription}
                onTaskDescriptionChange={setTaskDescription}
                autoPlan={autoPlan}
                onAutoPlanChange={setAutoPlan}
                status={discoveryStatus}
                onRunDiscovery={async () => {
                  setDiscoveryStatus("running");
                  await new Promise((r) => setTimeout(r, 600));
                  setDiscoveryStatus("done");
                }}
                onRewrite={async () => {
                  setTaskDescription((t) => (t ? `Rewrite:\n${t}` : t));
                }}
                onGeneratePlan={async () => {
                  console.log("Generate plan for:", taskDescription);
                }}
              />
            )}

            {contextTab === "applyXml" && (
              <ApplyXmlPanel
                activeTab={contextTab}
                onTabChange={setContextTab}
                selectedCount={0}
                aiResponse={aiResponse}
                onAiResponseChange={setAiResponse}
              />
            )}
          </div>
        ) : (
          <ChatPanel
            selectedCount={selectedCount}
            modelId={chatModelId}
            onModelChange={setChatModelId}
          />
        )}
      </div>

      <BottomDock />

      {/* UserMenu in sidebar footer */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-black/80 p-3 md:static md:border-t-0 md:bg-transparent md:p-0">
        <div className="md:absolute md:bottom-3 md:left-3 md:right-3">
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
            onSelectWorkspace={(id) => {
              console.log("switch workspace", id);
              // For now: keep selections per-workspace (save/restore state)
              // Stage 2: implement proper workspace persistence
            }}
            onManageWorkspaces={() => alert("Manage Workspaces (Stage 2)")}
            onSaveWorkspace={() => alert("Save Workspace (Stage 2)")}
            onSaveAndExitWorkspace={() => alert("Save & Exit Workspace (Stage 2)")}
            onOpenSettings={() => setSettingsOpen(true)}
            onLogout={() => alert("Logout (Stage 2)")}
          />
        </div>
      </div>

      {/* Settings Dialog */}
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </AppShell>
  );
}