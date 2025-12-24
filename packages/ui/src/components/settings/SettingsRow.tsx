export function SettingsRow({
  left,
  right,
  onClick,
  divider = true,
}: {
  left: React.ReactNode;
  right?: React.ReactNode;
  onClick?: () => void;
  divider?: boolean;
}) {
  const clickable = Boolean(onClick);

  return (
    <div
      className={[
        "flex items-center justify-between gap-3 px-4 py-3",
        clickable ? "cursor-pointer hover:bg-white/5" : "",
        divider ? "border-b border-white/10 last:border-b-0" : "",
      ].join(" ")}
      onClick={onClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (!clickable) return;
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
    >
      <div className="flex items-center gap-3">{left}</div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}
