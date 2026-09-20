"use client";

import { useState } from "react";
import { Modal } from "@/design-system/components/Modal";
import { Button } from "@/design-system/components/Button";
import { FormField } from "@/design-system/components/FormField";
import { TextInput } from "@/design-system/components/TextInput";
import { Alert } from "@/design-system/components/Alert";

export function AddBankAccountModal({
  open,
  onClose,
  onRequested,
}: {
  open: boolean;
  onClose: () => void;
  onRequested: () => void;
}) {
  const [holderName, setHolderName] = useState("");
  const [bank, setBank] = useState("");
  const [rib, setRib] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function reset() {
    setHolderName("");
    setBank("");
    setRib("");
    setSubmitting(false);
  }

  function handleClose() {
    reset();
    onClose();
  }

  async function handleSubmit() {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitting(false);
    reset();
    onRequested();
  }

  const canSubmit = holderName.trim().length > 0 && bank.trim().length > 0 && rib.trim().length > 0;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Add bank account"
      description="Request a new bank account to receive payments from this terminal."
      width="460px"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={submitting} disabled={!canSubmit}>
            {submitting ? "Requesting..." : "Request account"}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <Alert
          tone="info"
          title="Verification required"
          description="New bank accounts may require verification before they can receive settlements. We'll notify you once this account is approved."
        />
        <FormField label="Account holder name" required htmlFor="bank-holder">
          <TextInput
            id="bank-holder"
            placeholder="e.g. Mizaniya Retail SARL"
            value={holderName}
            onChange={(e) => setHolderName(e.target.value)}
          />
        </FormField>
        <FormField label="Bank" required htmlFor="bank-name">
          <TextInput
            id="bank-name"
            placeholder="e.g. CPA"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
          />
        </FormField>
        <FormField
          label="Account number / RIB"
          required
          htmlFor="bank-rib"
          helperText="20-digit RIB as shown on your bank statement."
        >
          <TextInput
            id="bank-rib"
            placeholder="e.g. 00799999002012345678"
            value={rib}
            onChange={(e) => setRib(e.target.value)}
          />
        </FormField>
      </div>
    </Modal>
  );
}
