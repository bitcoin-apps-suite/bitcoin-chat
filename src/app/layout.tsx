import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import DevLayout from "@/components/DevLayout";
import BitcoinOSWrapper from "@/components/BitcoinOSWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bitcoin Chat",
  description: "Decentralized messaging platform on Bitcoin SV blockchain",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
  },
  openGraph: {
    title: "Bitcoin Chat",
    description: "Decentralized messaging platform on Bitcoin SV blockchain",
    url: "https://bitcoin-chat.vercel.app",
    siteName: "Bitcoin Chat",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bitcoin Chat - Decentralized Messaging",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitcoin Chat",
    description: "Decentralized messaging platform on Bitcoin SV blockchain",
    images: ["/og-image.jpg"],
  },
  metadataBase: new URL("https://bitcoin-chat.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <BitcoinOSWrapper>
            <DevLayout>
              <div style={{ minHeight: 'calc(100vh - 68px)', display: 'flex', flexDirection: 'column' }}>
                {children}
              </div>
            </DevLayout>
          </BitcoinOSWrapper>
        </Providers>
      </body>
    </html>
  );
}