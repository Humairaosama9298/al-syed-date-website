import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// ✅ Full SEO Metadata
export const metadata: Metadata = {
  title: {
    default: "Al Syed Brothers | Premium Pakistani Dates Exporters",
    template: "%s | Al Syed Brothers",
  },
  description:
    "Al Syed Brothers exports premium Pakistani dates worldwide — including Ajwa, Medjool, and more organic varieties. 100% natural, high-quality, and rich in nutrients.",

  metadataBase: new URL("https://www.alsyedbrother.com"),

  openGraph: {
    title: "Al Syed Brothers | Premium Pakistani Dates Exporters",
    description:
      "Discover the finest quality Pakistani dates — organic, nutritious, and naturally sweet. Exported worldwide from Pakistan.",
    url: "https://www.alsyedbrother.com",
    siteName: "Al Syed Brothers",
    images: [
      {
        url: "/images/og-image.jpg", // 👉 add your image in public/images folder
        width: 1200,
        height: 630,
        alt: "Al Syed Brothers – Premium Pakistani Dates Exporters",
      },
    ],
    locale: "en_US",
    type: "website",
  },


  icons: {
    icon: "/favicon3.png",
    shortcut: "/favicon3.png",
    apple: "/favicon3.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${playfair.variable} ${inter.variable} antialiased bg-bg`}
      >
        <Navbar />
        <main className="min-h-screen py-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
