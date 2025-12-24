export function SettingsSection({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      {title ? <div className="text-xs font-semibold opacity-70">{title}</div> : null}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        {children}
      </div>
    </div>
  );
}
