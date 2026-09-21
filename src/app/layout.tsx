import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/design-system/components/Toast";
import { MizaniyaProviders } from "@/mizaniya/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mizaniya Partner Platform",
  description: "Manage payments, vTPE terminals, and settlements.",
  icons: {
    icon: [
      { url: "/mizaniya-mark-32.png", sizes: "32x32", type: "image/png" },
      { url: "/mizaniya-mark-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/mizaniya-mark-180.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        <ToastProvider>
          <MizaniyaProviders>{children}</MizaniyaProviders>
        </ToastProvider>
      </body>
    </html>
  );
}
