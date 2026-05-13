import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "항공편 정보",
  description: "마중 나가시는 분을 위한 간단한 항공편 정보",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-dvh bg-wallet-bg font-sans text-wallet-text">
        {children}
      </body>
    </html>
  );
}
