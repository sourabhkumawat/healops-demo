import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Initialize HealOps OpenTelemetry on server-side
if (typeof window === "undefined") {
  require("../lib/tracing");
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HealOps Next.js Demo | OpenTelemetry Integration",
  description: "Professional demo showcasing HealOps OpenTelemetry SDK integration in Next.js 14",
  keywords: ["HealOps", "OpenTelemetry", "Error Monitoring", "Next.js", "Demo"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-black text-zinc-50`}>
        {children}
      </body>
    </html>
  );
}
