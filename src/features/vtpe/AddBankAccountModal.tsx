"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, FormField, Input, Modal } from "@/mizaniya";
import { bankAccountRequestSchema } from "./bank-account-schema";
import type { BankAccountRequestFormValues } from "./bank-account-schema";
import { useRequestBankAccountMutation } from "./queries";

const defaultValues: BankAccountRequestFormValues = { holderName: "", bank: "", rib: "" };

export function AddBankAccountModal({
  open,
  onClose,
  onRequested,
}: {
  open: boolean;
  onClose: () => void;
  onRequested: () => void;
}) {
  const requestMutation = useRequestBankAccountMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BankAccountRequestFormValues>({
    resolver: zodResolver(bankAccountRequestSchema),
    defaultValues,
  });

  function handleClose() {
    if (requestMutation.isPending) return;
    reset(defaultValues);
    onClose();
  }

  function submit(values: BankAccountRequestFormValues) {
    requestMutation.mutate(values, {
      onSuccess: () => {
        reset(defaultValues);
        onRequested();
      },
    });
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Add bank account"
      description="Request a new bank account to receive payments from this terminal."
      width="460px"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={requestMutation.isPending}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(submit)} loading={requestMutation.isPending}>
            {requestMutation.isPending ? "Requesting..." : "Request account"}
          </Button>
        </>
      }
    >
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(submit)}>
        <Alert
          tone="info"
          title="Verification required"
          description="New bank accounts may require verification before they can receive settlements. We'll notify you once this account is approved."
        />
        <FormField label="Account holder name" required htmlFor="bank-holder" error={errors.holderName?.message}>
          <Input id="bank-holder" placeholder="e.g. Mizaniya Retail SARL" error={Boolean(errors.holderName)} {...register("holderName")} />
        </FormField>
        <FormField label="Bank" required htmlFor="bank-name" error={errors.bank?.message}>
          <Input id="bank-name" placeholder="e.g. CPA" error={Boolean(errors.bank)} {...register("bank")} />
        </FormField>
        <FormField
          label="Account number / RIB"
          required
          htmlFor="bank-rib"
          error={errors.rib?.message}
          helperText={errors.rib ? undefined : "20-digit RIB as shown on your bank statement."}
        >
          <Input id="bank-rib" placeholder="e.g. 00799999002012345678" error={Boolean(errors.rib)} {...register("rib")} />
        </FormField>
      </form>
    </Modal>
  );
}
