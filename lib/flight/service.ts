import type { FlightInfo } from "./types";
import { MOCK_FLIGHTS } from "./mock-data";

/**
 * Provider interface — any real backend (FlightAware AeroAPI, FlightRadar24,
 * Amadeus, internal API, ...) can implement this and be swapped in below
 * without changing the page.
 */
export interface FlightDataProvider {
  getFlight(flightNumber: string): Promise<FlightInfo | null>;
}

class MockFlightProvider implements FlightDataProvider {
  async getFlight(flightNumber: string): Promise<FlightInfo | null> {
    const key = flightNumber.trim().toUpperCase();
    return MOCK_FLIGHTS[key] ?? null;
  }
}

/**
 * Example of how a real provider would look. Not wired up yet — keep the
 * shape compatible with FlightDataProvider so it can replace the mock with a
 * one-line change below.
 *
 * class AeroApiFlightProvider implements FlightDataProvider {
 *   constructor(private apiKey: string) {}
 *   async getFlight(flightNumber: string): Promise<FlightInfo | null> {
 *     const res = await fetch(
 *       `https://aeroapi.flightaware.com/aeroapi/flights/${flightNumber}`,
 *       { headers: { "x-apikey": this.apiKey }, next: { revalidate: 60 } },
 *     );
 *     if (!res.ok) return null;
 *     const data = await res.json();
 *     return mapAeroApiToFlightInfo(data); // mapper lives next to the provider
 *   }
 * }
 */

function createProvider(): FlightDataProvider {
  // When FLIGHT_API_KEY (or similar) is set in the future, instantiate the
  // real provider here. For now we always use the mock.
  return new MockFlightProvider();
}

const provider = createProvider();

export async function getFlight(
  flightNumber: string,
): Promise<FlightInfo | null> {
  return provider.getFlight(flightNumber);
}

/**
 * FlightAware uses ICAO airline code + numeric flight number in its URLs
 * (e.g. KE023 → KAL23). When we have ICAO info, build the URL; otherwise
 * fall back to whatever the provider already supplied.
 */
export function buildFlightAwareUrl(flight: FlightInfo): string {
  if (flight.flightAwareUrl) return flight.flightAwareUrl;
  const icao = flight.airline.icao;
  if (!icao) {
    return `https://www.flightaware.com/live/flight/${flight.flightNumber}`;
  }
  const numeric = flight.flightNumber.replace(/^[A-Za-z]+/, "").replace(/^0+/, "");
  return `https://www.flightaware.com/live/flight/${icao}${numeric}`;
}
