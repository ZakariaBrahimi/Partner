import { z } from "zod";

export const bankAccountRequestSchema = z.object({
  holderName: z.string().trim().min(1, { error: "Enter the account holder name." }),
  bank: z.string().trim().min(1, { error: "Enter the bank name." }),
  rib: z
    .string()
    .trim()
    .regex(/^\d{20}$/, { error: "Enter a valid 20-digit RIB." }),
});

export type BankAccountRequestFormValues = z.infer<typeof bankAccountRequestSchema>;
