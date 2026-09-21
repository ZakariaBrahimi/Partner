import { z } from "zod";

export const createTerminalSchema = z
  .object({
    label: z.string().trim().min(1, { error: "Enter a terminal label." }).max(60),
    description: z.string().trim().max(100).optional(),
    category: z.enum(["classic", "business"]),
    settlementType: z.enum(["balance", "existing_bank_account", "new_bank_account"]),
    bankAccountId: z.string().optional(),
    newAccountRequested: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.settlementType === "existing_bank_account" && !data.bankAccountId) {
      ctx.addIssue({ code: "custom", path: ["bankAccountId"], message: "Select a bank account to continue." });
    }
    if (data.settlementType === "new_bank_account" && !data.newAccountRequested) {
      ctx.addIssue({ code: "custom", path: ["bankAccountId"], message: "Request a new bank account before continuing." });
    }
  });

export type CreateTerminalFormValues = z.infer<typeof createTerminalSchema>;
