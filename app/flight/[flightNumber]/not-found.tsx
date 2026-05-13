import Link from "next/link";

export default function FlightNotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-wallet-mute">
        404
      </p>
      <h1 className="mt-3 text-2xl font-semibold">항공편을 찾을 수 없어요</h1>
      <p className="mt-3 text-sm text-wallet-mute">
        편명을 다시 한 번 확인해 주세요.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black"
      >
        홈으로
      </Link>
    </main>
  );
}
