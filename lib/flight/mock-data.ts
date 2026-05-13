import type { FlightInfo } from "./types";

/**
 * Mock flight data, keyed by normalized (upper-case) flight number.
 *
 * Replace with a real provider in `service.ts` when ready.
 */
export const MOCK_FLIGHTS: Record<string, FlightInfo> = {
  KE023: {
    flightNumber: "KE023",
    airline: { iata: "KE", icao: "KAL", name: "대한항공" },
    origin: {
      iata: "ICN",
      icao: "RKSI",
      city: "서울/인천",
      name: "인천국제공항",
      countryCode: "KR",
      timeZone: "Asia/Seoul",
      terminal: "T2",
      gate: "248",
    },
    destination: {
      iata: "SFO",
      icao: "KSFO",
      city: "샌프란시스코",
      name: "San Francisco Intl",
      countryCode: "US",
      timeZone: "America/Los_Angeles",
      terminal: "International G",
      baggageClaim: "G3",
    },
    status: "on-time",
    // Scheduled: depart 14:30 KST, arrive 09:00 PDT (same calendar day)
    scheduledDeparture: "2026-05-13T05:30:00Z", // 14:30 KST
    scheduledArrival: "2026-05-13T16:00:00Z", // 09:00 PDT
    estimatedDeparture: "2026-05-13T05:30:00Z",
    estimatedArrival: "2026-05-13T16:05:00Z", // 5 min later but still "on time"
    lastUpdated: "2026-05-13T11:45:00Z",
    flightAwareUrl: "https://www.flightaware.com/live/flight/KAL23",
  },
};
