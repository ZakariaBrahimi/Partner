import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  CreditCard,
  FileBarChart,
  LayoutDashboard,
  Link2,
  QrCode,
  Receipt,
  Settings,
  SmartphoneNfc,
  Users,
  Wallet,
  Banknote,
} from "lucide-react";
import type { AccentKey } from "@/mizaniya";

export interface NavLeaf {
  label: string;
  href: string;
  icon?: LucideIcon;
  /** Identity color for the sidebar's active state. Defaults to the brand
   * primary when omitted (e.g. Settings stays neutral/brand, deliberately). */
  accent?: AccentKey;
}

export interface NavItem extends NavLeaf {
  children?: NavLeaf[];
}

export interface NavSection {
  label?: string;
  icon?: LucideIcon;
  href?: string;
  items?: NavItem[];
}

export const NAV: NavSection[] = [
  {
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, accent: "violet" }],
  },
  {
    label: "Payments",
    icon: CreditCard,
    items: [
      { label: "Overview", href: "/payments/overview", icon: BarChart3, accent: "sky" },
      { label: "Transactions", href: "/payments/transactions", icon: Receipt, accent: "teal" },
      { label: "Payment Links", href: "/payments/payment-links", icon: Link2, accent: "pink" },
      { label: "QR Payments", href: "/payments/qr-payments", icon: QrCode, accent: "orange" },
      {
        label: "vTPE",
        href: "/payments/vtpe/terminals",
        icon: SmartphoneNfc,
        accent: "violet",
        children: [
          { label: "Terminals", href: "/payments/vtpe/terminals" },
          { label: "Terminal Activity", href: "/payments/vtpe/terminal-activity" },
        ],
      },
    ],
  },
  {
    items: [
      { label: "Customers", href: "/customers", icon: Users, accent: "pink" },
      { label: "Balance", href: "/balance", icon: Wallet, accent: "teal" },
      { label: "Withdrawals", href: "/withdrawals", icon: Banknote, accent: "orange" },
      { label: "Reports", href: "/reports", icon: FileBarChart, accent: "sky" },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];
