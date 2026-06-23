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
  title: "Marmo Creativo | Agencia Digital",
  description: "Desarrollo web, software a medida, diseño gráfico y outsourcing creativo.",
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