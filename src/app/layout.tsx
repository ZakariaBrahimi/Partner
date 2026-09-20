import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/design-system/components/Toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mizaniya Partner Platform",
  description: "Manage payments, vTPE terminals, and settlements.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
