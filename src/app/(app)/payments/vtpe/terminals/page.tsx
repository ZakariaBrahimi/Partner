import type { Metadata } from "next";
import { VtpeTerminalsPage } from "@/features/vtpe/VtpeTerminalsPage";

export const metadata: Metadata = {
  title: "vTPE Terminals — Mizaniya Partner Platform",
};

export default function Page() {
  return <VtpeTerminalsPage />;
}
