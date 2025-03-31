import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next"
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Roboto,
  Roboto_Mono,
} from "next/font/google"
import "./globals.css"
import Provider from "./provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
})

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
})

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Todo App",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${roboto.variable} ${robotoMono.variable} antialiased`}
      >
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  )
}
