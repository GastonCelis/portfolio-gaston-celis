import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/layout/GrainOverlay";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/layout/Cursor";
import Preloader from "@/components/ui/Preloader";
import { PreloaderProvider } from "@/lib/preloader-context";
import { identity } from "@/lib/data";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const description =
  "Full Stack Developer con +4 años construyendo aplicaciones web escalables de punta a punta: React, Next.js, TypeScript, Node.js y .NET.";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${identity.website}`),
  title: {
    default: `${identity.name} — ${identity.role}`,
    template: `%s — ${identity.name}`,
  },
  description,
  keywords: [
    "Gastón Celis",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    ".NET",
    "Córdoba Argentina",
  ],
  authors: [{ name: identity.name }],
  creator: identity.name,
  alternates: {
    canonical: `https://${identity.website}`,
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: `https://${identity.website}`,
    siteName: `${identity.name} — ${identity.role}`,
    title: `${identity.name} — ${identity.role}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${identity.name} — ${identity.role}`,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-base text-fg">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-200 -translate-y-24 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-fg transition-transform focus:translate-y-0"
        >
          Saltar al contenido
        </a>
        <PreloaderProvider>
          <GrainOverlay />
          <Preloader />
          <Cursor />
          <SmoothScroll>
            <Navbar />
            <main id="main-content" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </PreloaderProvider>
      </body>
    </html>
  );
}
