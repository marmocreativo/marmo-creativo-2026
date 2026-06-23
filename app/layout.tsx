import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://marmo-creativo.com"),
  title: "Marmo Creativo | Agencia Digital",
  description: "Desarrollo web, software a medida, diseño gráfico y outsourcing creativo.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Marmo Creativo | Agencia Digital",
    description: "Desarrollo web, software a medida, diseño gráfico y outsourcing creativo.",
    url: "https://marmo-creativo.com",
    siteName: "Marmo Creativo",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-main.jpg",
        width: 1200,
        height: 630,
        alt: "Marmo Creativo | Agencia Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marmo Creativo | Agencia Digital",
    description: "Desarrollo web, software a medida, diseño gráfico y outsourcing creativo.",
    images: ["/og-home.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={cn(inter.variable, fontMono.variable, "antialiased bg-cover bg-center bg-fixed")}>
        <Header />
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-QTEDWT40GE" />
    </html>
  );
}