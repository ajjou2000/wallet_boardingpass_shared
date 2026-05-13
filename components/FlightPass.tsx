import { StatusBadge } from "./StatusBadge";
import { RouteRow } from "./RouteRow";
import { InfoGrid, type InfoItem } from "./InfoGrid";
import type { FlightInfo } from "@/lib/flight/types";
import {
  arrivalDisplayTime,
  formatLocalTime,
  formatRelative,
  statusBadge,
} from "@/lib/flight/format";

export function FlightPass({ flight }: { flight: FlightInfo }) {
  const badge = statusBadge(flight.status);
  const arrival = arrivalDisplayTime(flight);
  const departureLocal = formatLocalTime(
    flight.estimatedDeparture ?? flight.scheduledDeparture,
    flight.origin.timeZone,
  );

  const items: InfoItem[] = [
    {
      label: "도착 예정",
      value: arrival.primary,
      hint: arrival.scheduled ? `정시 ${arrival.scheduled}` : "현지 시각 기준",
      emphasize: true,
    },
    {
      label: "출발 시각",
      value: departureLocal,
      hint: `${flight.origin.city} 현지 시각`,
      emphasize: true,
    },
    {
      label: "도착 터미널",
      value: flight.destination.terminal ?? "안내 예정",
    },
    {
      label: "수하물 수취",
      value: flight.destination.baggageClaim ?? "도착 후 확인",
    },
  ];

  return (
    <article className="overflow-hidden rounded-[28px] bg-wallet-card shadow-pass ring-1 ring-white/5">
      <header
        className="px-6 pb-5 pt-6 text-white"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #00256C 0%, #003D9E 55%, #5BA4D8 100%)",
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">
              {flight.airline.name}
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              {flight.flightNumber}
            </h1>
          </div>
          <StatusBadge badge={badge} />
        </div>

        <div className="mt-6">
          <RouteRow
            originCode={flight.origin.iata}
            originCity={flight.origin.city}
            destinationCode={flight.destination.iata}
            destinationCity={flight.destination.city}
          />
        </div>
      </header>

      <Perforation />

      <section className="px-6 py-6">
        <InfoGrid items={items} />
      </section>

      <footer className="border-t border-wallet-divider px-6 py-3">
        <p className="text-[11px] text-wallet-mute">
          마지막 업데이트 ·{" "}
          <span className="text-white/80">
            {formatRelative(flight.lastUpdated)}
          </span>
        </p>
      </footer>
    </article>
  );
}

function Perforation() {
  return (
    <div className="relative h-6 bg-wallet-card">
      <span className="absolute left-[-12px] top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-wallet-bg" />
      <span className="absolute right-[-12px] top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-wallet-bg" />
      <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 border-t border-dashed border-white/15" />
    </div>
  );
}
