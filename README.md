# wallet-boardingpass-shared

A Wallet-style flight summary page designed for the *person picking someone up*,
not for aviation experts.

```text
/flight/KE023
```

shows the essentials only — flight number, route, status, ETA, departure time,
arrival terminal and baggage carousel, plus a "FlightAware에서 상세 보기"
deep-link for anyone who wants the full radar view.

## Run it

```bash
npm install
npm run dev
```

Then open <http://localhost:3000/flight/KE023>.

## Project layout

```text
app/
  flight/[flightNumber]/page.tsx   ← the shareable page
  flight/[flightNumber]/not-found.tsx
  layout.tsx, page.tsx, globals.css

components/
  FlightPass.tsx                   ← the Wallet-style card
  RouteRow.tsx, StatusBadge.tsx, InfoGrid.tsx

lib/flight/
  types.ts                         ← FlightInfo domain model
  mock-data.ts                     ← KE023 mock
  service.ts                       ← FlightDataProvider interface + mock impl
  format.ts                        ← i18n / status helpers
```

## Swapping mock data for a real API

`lib/flight/service.ts` defines a `FlightDataProvider` interface. The page
talks to `getFlight(flightNumber)` and nothing else, so wiring a real
provider is a one-file change:

```ts
// lib/flight/service.ts
class AeroApiFlightProvider implements FlightDataProvider {
  constructor(private apiKey: string) {}
  async getFlight(flightNumber: string) {
    const res = await fetch(
      `https://aeroapi.flightaware.com/aeroapi/flights/${flightNumber}`,
      { headers: { "x-apikey": this.apiKey }, next: { revalidate: 60 } },
    );
    if (!res.ok) return null;
    return mapAeroApiToFlightInfo(await res.json());
  }
}

function createProvider(): FlightDataProvider {
  const key = process.env.FLIGHT_API_KEY;
  return key ? new AeroApiFlightProvider(key) : new MockFlightProvider();
}
```

The page, the card, and the FlightAware URL builder all keep working
unchanged because they only depend on the `FlightInfo` type.
