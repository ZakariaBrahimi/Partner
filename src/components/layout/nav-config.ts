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

export interface NavLeaf {
  label: string;
  href: string;
  icon?: LucideIcon;
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
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Payments",
    icon: CreditCard,
    items: [
      { label: "Overview", href: "/payments/overview", icon: BarChart3 },
      { label: "Transactions", href: "/payments/transactions", icon: Receipt },
      { label: "Payment Links", href: "/payments/payment-links", icon: Link2 },
      { label: "QR Payments", href: "/payments/qr-payments", icon: QrCode },
      {
        label: "vTPE",
        href: "/payments/vtpe/terminals",
        icon: SmartphoneNfc,
        children: [
          { label: "Terminals", href: "/payments/vtpe/terminals" },
          { label: "Terminal Activity", href: "/payments/vtpe/terminal-activity" },
        ],
      },
    ],
  },
  {
    items: [
      { label: "Customers", href: "/customers", icon: Users },
      { label: "Balance", href: "/balance", icon: Wallet },
      { label: "Withdrawals", href: "/withdrawals", icon: Banknote },
      { label: "Reports", href: "/reports", icon: FileBarChart },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];
