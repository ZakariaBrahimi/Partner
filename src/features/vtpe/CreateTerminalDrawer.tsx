"use client";

import { useState } from "react";
import { Briefcase, CheckCircle2, Landmark, Plus, Smartphone, Wallet } from "lucide-react";
import { Drawer, DrawerSection } from "@/design-system/components/Drawer";
import { Button } from "@/design-system/components/Button";
import { FormField, FormSection, CharacterCounter } from "@/design-system/components/FormField";
import { TextInput, Textarea } from "@/design-system/components/TextInput";
import { Select } from "@/design-system/components/Select";
import { RadioCard, RadioGroup } from "@/design-system/components/RadioCard";
import { Alert } from "@/design-system/components/Alert";
import { AddBankAccountModal } from "./AddBankAccountModal";
import { MOCK_BANK_ACCOUNTS } from "./mock-data";
import type { CreateTerminalInput, SettlementType, TerminalCategory } from "./types";

const DESCRIPTION_MAX = 100;

export function CreateTerminalDrawer({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (input: CreateTerminalInput) => Promise<void>;
}) {
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<TerminalCategory>("classic");
  const [settlementType, setSettlementType] = useState<SettlementType>("balance");
  const [bankAccountId, setBankAccountId] = useState<string>("");
  const [newAccountRequested, setNewAccountRequested] = useState(false);
  const [addBankModalOpen, setAddBankModalOpen] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ label?: string; bankAccount?: string }>({});

  function resetForm() {
    setLabel("");
    setDescription("");
    setCategory("classic");
    setSettlementType("balance");
    setBankAccountId("");
    setNewAccountRequested(false);
    setSubmitError(null);
    setErrors({});
    setSubmitting(false);
  }

  function handleClose() {
    if (submitting) return;
    resetForm();
    onClose();
  }

  function validate() {
    const nextErrors: { label?: string; bankAccount?: string } = {};
    if (!label.trim()) {
      nextErrors.label = "Enter a terminal label.";
    }
    if (settlementType === "existing_bank_account" && !bankAccountId) {
      nextErrors.bankAccount = "Select a bank account to continue.";
    }
    if (settlementType === "new_bank_account" && !newAccountRequested) {
      nextErrors.bankAccount = "Request a new bank account before continuing.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      await onCreate({
        label: label.trim(),
        description: description.trim() || undefined,
        category,
        settlementType,
        bankAccountId: settlementType === "existing_bank_account" ? bankAccountId : undefined,
      });
      resetForm();
      onClose();
    } catch {
      setSubmitError("Please check the information and try again.");
      setSubmitting(false);
    }
  }

  return (
    <>
      <Drawer
        open={open}
        onClose={handleClose}
        title="Create vTPE Terminal"
        description="Set up a new payment terminal and configure how you want to receive payments."
        footer={
          <>
            <Button variant="secondary" onClick={handleClose} disabled={submitting}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} loading={submitting}>
              {submitting ? "Creating..." : "Create terminal"}
            </Button>
          </>
        }
      >
        <DrawerSection>
          {submitError && (
            <Alert tone="error" title="Unable to create terminal" description={submitError} />
          )}

          <FormSection title="Terminal information">
            <FormField
              label="Label"
              required
              htmlFor="terminal-label"
              error={errors.label}
              helperText={errors.label ? undefined : "This name will appear in your terminal list."}
            >
              <TextInput
                id="terminal-label"
                placeholder="e.g. Downtown Store"
                value={label}
                error={Boolean(errors.label)}
                onChange={(e) => setLabel(e.target.value)}
                maxLength={60}
              />
            </FormField>

            <FormField
              label="Description"
              htmlFor="terminal-description"
              counter={<CharacterCounter value={description.length} max={DESCRIPTION_MAX} />}
            >
              <Textarea
                id="terminal-description"
                placeholder="e.g. Main terminal at the front desk."
                value={description}
                maxLength={DESCRIPTION_MAX}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormField>
          </FormSection>

          <FormSection title="Category" required>
            <RadioGroup name="Category">
              <RadioCard
                selected={category === "classic"}
                onSelect={() => setCategory("classic")}
                icon={<Smartphone className="size-[18px]" aria-hidden="true" />}
                title="Classic"
                description="Standard terminal for most businesses."
              />
              <RadioCard
                selected={category === "business"}
                onSelect={() => setCategory("business")}
                icon={<Briefcase className="size-[18px]" aria-hidden="true" />}
                title="Business"
                description="Advanced features for higher-volume businesses."
              />
            </RadioGroup>
          </FormSection>

          <FormSection
            title="Where should the money be received?"
            description="Choose where payments collected through this terminal will be credited."
            required
          >
            <RadioGroup name="Payment destination">
              <RadioCard
                selected={settlementType === "balance"}
                onSelect={() => setSettlementType("balance")}
                icon={<Wallet className="size-[18px]" aria-hidden="true" />}
                title="My Balance"
                description="Payments will be added to your partner balance and can be withdrawn later."
              />
              <RadioCard
                selected={settlementType === "existing_bank_account"}
                onSelect={() => setSettlementType("existing_bank_account")}
                icon={<Landmark className="size-[18px]" aria-hidden="true" />}
                title="Existing bank account"
                description="Send payments directly to one of your linked bank accounts."
                extra={
                  settlementType === "existing_bank_account" ? (
                    <div className="mt-1">
                      <Select
                        aria-label="Select a bank account"
                        value={bankAccountId}
                        error={Boolean(errors.bankAccount)}
                        onChange={(e) => {
                          setBankAccountId(e.target.value);
                          setErrors((prev) => ({ ...prev, bankAccount: undefined }));
                        }}
                      >
                        <option value="" disabled>
                          Select a bank account
                        </option>
                        {MOCK_BANK_ACCOUNTS.map((account) => (
                          <option key={account.id} value={account.id}>
                            {account.bankName} — Account ending in {account.accountLast4}
                          </option>
                        ))}
                      </Select>
                      {errors.bankAccount && (
                        <p className="mt-1.5 text-xs text-error" role="alert">
                          {errors.bankAccount}
                        </p>
                      )}
                    </div>
                  ) : undefined
                }
              />
              <RadioCard
                selected={settlementType === "new_bank_account"}
                onSelect={() => setSettlementType("new_bank_account")}
                icon={<Landmark className="size-[18px]" aria-hidden="true" />}
                title="New bank account"
                description="Request a new bank account to receive payments from this terminal."
                extra={
                  settlementType === "new_bank_account" ? (
                    <div className="mt-1">
                      {newAccountRequested ? (
                        <p className="flex items-center gap-1.5 text-xs font-medium text-success">
                          <CheckCircle2 className="size-3.5" aria-hidden="true" />
                          Request submitted — pending verification.
                        </p>
                      ) : (
                        <>
                          <Button
                            type="button"
                            variant="secondary"
                            size="compact"
                            leadingIcon={<Plus className="size-3.5" aria-hidden="true" />}
                            onClick={() => setAddBankModalOpen(true)}
                          >
                            Add bank account
                          </Button>
                          {errors.bankAccount && (
                            <p className="mt-1.5 text-xs text-error" role="alert">
                              {errors.bankAccount}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  ) : undefined
                }
              />
            </RadioGroup>
          </FormSection>
        </DrawerSection>
      </Drawer>

      <AddBankAccountModal
        open={addBankModalOpen}
        onClose={() => setAddBankModalOpen(false)}
        onRequested={() => {
          setNewAccountRequested(true);
          setErrors((prev) => ({ ...prev, bankAccount: undefined }));
          setAddBankModalOpen(false);
        }}
      />
    </>
  );
}
