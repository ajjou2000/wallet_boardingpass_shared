import type { StatusBadge as Badge } from "@/lib/flight/format";

const toneStyles: Record<Badge["tone"], string> = {
  ontime: "bg-status-ontime/15 text-status-ontime ring-status-ontime/30",
  delayed: "bg-status-delayed/15 text-status-delayed ring-status-delayed/30",
  arrived: "bg-status-arrived/15 text-status-arrived ring-status-arrived/30",
  cancelled:
    "bg-status-cancelled/15 text-status-cancelled ring-status-cancelled/30",
  neutral: "bg-white/10 text-white ring-white/20",
};

const dotStyles: Record<Badge["tone"], string> = {
  ontime: "bg-status-ontime",
  delayed: "bg-status-delayed",
  arrived: "bg-status-arrived",
  cancelled: "bg-status-cancelled",
  neutral: "bg-white/70",
};

export function StatusBadge({ badge }: { badge: Badge }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide ring-1 ring-inset ${toneStyles[badge.tone]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dotStyles[badge.tone]} ${badge.tone === "ontime" ? "animate-pulse" : ""}`}
      />
      {badge.label}
    </span>
  );
}
