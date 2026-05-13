import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-6 py-12 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-wallet-mute">
        Wallet · Flight
      </p>
      <h1 className="mt-3 text-2xl font-semibold">항공편 정보 공유</h1>
      <p className="mt-3 text-sm text-wallet-mute">
        마중 나가시는 분께 항공편 카드 링크를 보내주세요.
      </p>

      <Link
        href="/flight/KE023"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition active:scale-[0.98]"
      >
        예시 보기 · KE023
      </Link>
    </main>
  );
}
