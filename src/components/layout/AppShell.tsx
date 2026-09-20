import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { MobileNav } from "./MobileNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <MobileNav />
        <div className="hidden md:block">
          <Topbar />
        </div>
        <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
