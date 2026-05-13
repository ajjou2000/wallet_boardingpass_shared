import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FlightPass } from "@/components/FlightPass";
import { buildFlightAwareUrl, getFlight } from "@/lib/flight/service";

const SAMSUNG_WALLET_URL = "https://www.samsung.com/sec/apps/samsung-wallet/";

interface PageProps {
  params: Promise<{ flightNumber: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { flightNumber } = await params;
  const flight = await getFlight(flightNumber);
  if (!flight) {
    return { title: `${flightNumber} · 항공편 정보` };
  }
  return {
    title: `${flight.flightNumber} ${flight.origin.iata} → ${flight.destination.iata}`,
    description: `${flight.airline.name} ${flight.flightNumber} 운항 현황`,
  };
}

export default async function FlightPage({ params }: PageProps) {
  const { flightNumber } = await params;
  const flight = await getFlight(flightNumber);
  if (!flight) notFound();

  const flightAwareUrl = buildFlightAwareUrl(flight);

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-4 py-8 sm:py-12">
      <header className="mb-6 flex flex-col items-center gap-2.5">
        <a
          href={SAMSUNG_WALLET_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Samsung Wallet 안내 페이지 열기"
          className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-2.5 shadow-sm ring-1 ring-black/5 transition hover:bg-white/95 active:scale-[0.98]"
        >
          <Image
            src="/samsung-wallet-logo.png"
            alt="Samsung Wallet"
            width={355}
            height={66}
            priority
            className="h-6 w-auto sm:h-7"
          />
        </a>
        <p className="text-[12px] text-wallet-mute">
          Samsung Wallet에서 공유된 정보입니다
        </p>
      </header>

      <div className="mb-5 px-1">
        <p className="text-[11px] uppercase tracking-[0.2em] text-wallet-mute">
          마중 안내
        </p>
        <h2 className="mt-1 text-base text-white/90">
          {flight.origin.city}에서 출발하는 항공편의 현재 상황이에요.
        </h2>
      </div>

      <FlightPass flight={flight} />

      <div className="mt-6 flex flex-col gap-3 px-1">
        <a
          href={flightAwareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3.5 text-[15px] font-medium text-white/90 transition hover:bg-white/[0.08] active:scale-[0.99]"
        >
          FlightAware에서 상세 보기
          <ExternalLinkIcon />
        </a>
        <p className="text-center text-[11px] text-wallet-mute">
          외부 사이트로 이동합니다 · flightaware.com
        </p>
      </div>
    </main>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </svg>
  );
}
