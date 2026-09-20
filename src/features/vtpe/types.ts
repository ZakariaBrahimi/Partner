export type TerminalCategory = "classic" | "business";
export type SettlementType = "balance" | "existing_bank_account" | "new_bank_account";
export type TerminalStatus = "active" | "pending" | "disabled";

export interface BankAccount {
  id: string;
  bankName: string;
  accountLast4: string;
}

export interface Terminal {
  id: string;
  code: string;
  label: string;
  description?: string;
  category: TerminalCategory;
  paymentVolume: number;
  qrCodeCount: number;
  settlementType: SettlementType;
  bankAccount?: BankAccount;
  status: TerminalStatus;
  createdAt: string;
  lastActivityAt?: string;
}

export interface CreateTerminalInput {
  label: string;
  description?: string;
  category: TerminalCategory;
  settlementType: SettlementType;
  bankAccountId?: string;
}
