import { z } from "zod";

/** Only full-amount refunds are backed by the mutation today — the schema
 * still validates the amount explicitly (rather than trusting a disabled
 * field blindly) so the form is ready for a real partial-refund capability
 * without silently accepting an invalid value in the meantime. */
export function createRefundSchema(fullAmount: number) {
  return z.object({
    amount: z
      .number({ error: "Enter a refund amount." })
      .positive("Enter a valid amount.")
      .refine((v) => v === fullAmount, {
        message: "Partial refunds aren't supported yet — the full payment amount will be refunded.",
      }),
  });
}

export type RefundFormValues = z.infer<ReturnType<typeof createRefundSchema>>;
