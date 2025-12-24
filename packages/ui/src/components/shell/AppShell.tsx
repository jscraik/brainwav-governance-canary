export function AppShell({
  children,
  sidebar,
  sidebarOpen,
  onToggleSidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}) {
  void onToggleSidebar;
  return (
    <div className="min-h-dvh bg-black text-white">
      <div className="flex min-h-dvh">
        <div
          className={[
            "shrink-0 transition-all duration-200 ease-out",
            sidebarOpen ? "w-[320px]" : "w-0",
          ].join(" ")}
        >
          <div className={sidebarOpen ? "block h-full" : "hidden"}>{sidebar}</div>
        </div>

        <main className="flex min-w-0 flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}
