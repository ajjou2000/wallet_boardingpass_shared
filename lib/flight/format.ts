import type { FlightInfo, FlightStatus } from "./types";

const KO_TIME = new Intl.DateTimeFormat("ko-KR", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const KO_DATE_TIME = new Intl.DateTimeFormat("ko-KR", {
  month: "short",
  day: "numeric",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function formatLocalTime(iso: string, timeZone: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  }).format(d);
}

export function formatLocalDateTime(iso: string, timeZone: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("ko-KR", {
    month: "short",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  }).format(d);
}

export function formatRelative(iso: string, now: Date = new Date()): string {
  const diffMs = now.getTime() - new Date(iso).getTime();
  const diffMin = Math.round(diffMs / 60_000);

  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;

  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}시간 전`;

  const diffDay = Math.round(diffHr / 24);
  return `${diffDay}일 전`;
}

export interface StatusBadge {
  label: string;
  tone: "ontime" | "delayed" | "arrived" | "cancelled" | "neutral";
}

export function statusBadge(status: FlightStatus): StatusBadge {
  switch (status) {
    case "on-time":
      return { label: "정시 운항", tone: "ontime" };
    case "delayed":
      return { label: "지연", tone: "delayed" };
    case "arrived":
      return { label: "도착 완료", tone: "arrived" };
    case "cancelled":
      return { label: "결항", tone: "cancelled" };
    case "diverted":
      return { label: "회항", tone: "delayed" };
    case "boarding":
      return { label: "탑승 중", tone: "neutral" };
    case "departed":
      return { label: "이륙", tone: "neutral" };
    case "scheduled":
    default:
      return { label: "운항 예정", tone: "neutral" };
  }
}

/**
 * The single time the pickup person actually cares about: when to be at the
 * airport. Falls back gracefully if estimated isn't present.
 */
export function arrivalDisplayTime(flight: FlightInfo): {
  primary: string;
  scheduled?: string;
  isDelayed: boolean;
} {
  const tz = flight.destination.timeZone;
  const primaryIso =
    flight.actualArrival ?? flight.estimatedArrival ?? flight.scheduledArrival;
  const primary = formatLocalTime(primaryIso, tz);

  const scheduledLocal = formatLocalTime(flight.scheduledArrival, tz);
  const isDelayed =
    new Date(primaryIso).getTime() - new Date(flight.scheduledArrival).getTime() >
    5 * 60_000;

  return {
    primary,
    scheduled: isDelayed ? scheduledLocal : undefined,
    isDelayed,
  };
}

export { KO_TIME, KO_DATE_TIME };
