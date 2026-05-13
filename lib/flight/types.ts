/**
 * Shared flight domain types.
 *
 * Designed to be wire-format-agnostic: a real provider (FlightAware AeroAPI,
 * FlightRadar24, Amadeus, etc.) just needs to map its response into FlightInfo.
 */

export type FlightStatus =
  | "scheduled"
  | "boarding"
  | "departed"
  | "on-time"
  | "delayed"
  | "arrived"
  | "cancelled"
  | "diverted";

export interface Airport {
  iata: string; // e.g. "ICN"
  icao?: string; // e.g. "RKSI"
  city: string; // e.g. "Seoul"
  name: string; // e.g. "Incheon Intl"
  countryCode?: string; // e.g. "KR"
  timeZone: string; // IANA, e.g. "Asia/Seoul"
}

export interface Airline {
  iata: string; // e.g. "KE"
  icao?: string; // e.g. "KAL"
  name: string; // e.g. "Korean Air"
}

export interface FlightInfo {
  /** Carrier flight number as displayed to passengers, e.g. "KE023". */
  flightNumber: string;
  airline: Airline;

  origin: Airport & {
    terminal?: string;
    gate?: string;
  };
  destination: Airport & {
    terminal?: string;
    gate?: string;
    baggageClaim?: string;
  };

  status: FlightStatus;

  /** ISO 8601 timestamps. Always in UTC; render in the relevant local zone. */
  scheduledDeparture: string;
  scheduledArrival: string;
  estimatedDeparture?: string;
  estimatedArrival: string;
  actualDeparture?: string;
  actualArrival?: string;

  /** When this snapshot was produced by the data source. */
  lastUpdated: string;

  /** External tracking link (FlightAware uses ICAO + numeric, e.g. KAL23). */
  flightAwareUrl?: string;
}
