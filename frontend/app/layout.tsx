import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EpiCenter — Find the Fault. Prove the Fix.",
  description:
    "Autonomous incident-to-patch platform. Ingest a production error, get a citation-backed root-cause diagnosis, a reproducing regression test, and a minimal patch — all proven by a sandbox before the PR opens.",
  keywords: ["incident response", "autonomous repair", "TDAR", "AI debugging", "CodeQL", "LangGraph"],
  openGraph: {
    title: "EpiCenter — Find the Fault. Prove the Fix.",
    description: "Test-Driven Autonomous Repair for production incidents.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
