"use client";

import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, CheckCircle2, Landmark, Plus, Smartphone, Wallet } from "lucide-react";
import {
  Alert,
  Button,
  CharacterCounter,
  Drawer,
  DrawerSection,
  FormField,
  FormSection,
  Input,
  RadioCard,
  RadioGroup,
  Select,
  Textarea,
} from "@/mizaniya";
import { AddBankAccountModal } from "./AddBankAccountModal";
import { MOCK_BANK_ACCOUNTS } from "./mock-data";
import { createTerminalSchema } from "./terminal-schema";
import type { CreateTerminalFormValues } from "./terminal-schema";
import type { CreateTerminalInput } from "./types";

const DESCRIPTION_MAX = 100;

const defaultValues: CreateTerminalFormValues = {
  label: "",
  description: "",
  category: "classic",
  settlementType: "balance",
  bankAccountId: "",
  newAccountRequested: false,
};

const BANK_ACCOUNT_OPTIONS = MOCK_BANK_ACCOUNTS.map((account) => ({
  value: account.id,
  label: `${account.bankName} — Account ending in ${account.accountLast4}`,
}));

export function CreateTerminalDrawer({
  open,
  onClose,
  onCreate,
  submitting,
  submitError,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (input: CreateTerminalInput) => void;
  submitting: boolean;
  submitError?: string | null;
}) {
  const [addBankModalOpen, setAddBankModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateTerminalFormValues>({
    resolver: zodResolver(createTerminalSchema),
    defaultValues,
  });

  const settlementType = useWatch({ control, name: "settlementType" });
  const description = useWatch({ control, name: "description" }) ?? "";
  const newAccountRequested = useWatch({ control, name: "newAccountRequested" });

  function handleClose() {
    if (submitting) return;
    reset(defaultValues);
    onClose();
  }

  function submit(values: CreateTerminalFormValues) {
    onCreate({
      label: values.label.trim(),
      description: values.description?.trim() || undefined,
      category: values.category,
      settlementType: values.settlementType,
      bankAccountId: values.settlementType === "existing_bank_account" ? values.bankAccountId : undefined,
    });
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
            <Button onClick={handleSubmit(submit)} loading={submitting}>
              {submitting ? "Creating..." : "Create terminal"}
            </Button>
          </>
        }
      >
        <form className="contents" onSubmit={handleSubmit(submit)}>
          <DrawerSection>
            {submitError && <Alert tone="error" title="Unable to create terminal" description={submitError} />}

            <FormSection title="Terminal information">
              <FormField
                label="Label"
                required
                htmlFor="terminal-label"
                error={errors.label?.message}
                helperText={errors.label ? undefined : "This name will appear in your terminal list."}
              >
                <Input id="terminal-label" placeholder="e.g. Downtown Store" maxLength={60} error={Boolean(errors.label)} {...register("label")} />
              </FormField>

              <FormField
                label="Description"
                htmlFor="terminal-description"
                counter={<CharacterCounter value={description.length} max={DESCRIPTION_MAX} />}
              >
                <Textarea
                  id="terminal-description"
                  placeholder="e.g. Main terminal at the front desk."
                  maxLength={DESCRIPTION_MAX}
                  {...register("description")}
                />
              </FormField>
            </FormSection>

            <FormSection title="Category" required>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <RadioGroup name="Category" value={field.value} onValueChange={field.onChange} orientation="horizontal">
                    <RadioCard
                      value="classic"
                      icon={<Smartphone className="size-[18px]" aria-hidden="true" />}
                      title="Classic"
                      description="Standard terminal for most businesses."
                    />
                    <RadioCard
                      value="business"
                      icon={<Briefcase className="size-[18px]" aria-hidden="true" />}
                      title="Business"
                      description="Advanced features for higher-volume businesses."
                    />
                  </RadioGroup>
                )}
              />
            </FormSection>

            <FormSection
              title="Where should the money be received?"
              description="Choose where payments collected through this terminal will be credited."
              required
            >
              <Controller
                control={control}
                name="settlementType"
                render={({ field }) => (
                  <RadioGroup name="Payment destination" value={field.value} onValueChange={field.onChange}>
                    <RadioCard
                      value="balance"
                      icon={<Wallet className="size-[18px]" aria-hidden="true" />}
                      title="My Balance"
                      description="Payments will be added to your partner balance and can be withdrawn later."
                    />
                    <RadioCard
                      value="existing_bank_account"
                      icon={<Landmark className="size-[18px]" aria-hidden="true" />}
                      title="Existing bank account"
                      description="Send payments directly to one of your linked bank accounts."
                      extra={
                        settlementType === "existing_bank_account" ? (
                          <div className="mt-1">
                            <Controller
                              control={control}
                              name="bankAccountId"
                              render={({ field: bankField }) => (
                                <Select
                                  aria-label="Select a bank account"
                                  placeholder="Select a bank account"
                                  value={bankField.value || undefined}
                                  onValueChange={bankField.onChange}
                                  error={Boolean(errors.bankAccountId)}
                                  options={BANK_ACCOUNT_OPTIONS}
                                />
                              )}
                            />
                            {errors.bankAccountId && (
                              <p className="mt-1.5 text-xs text-error" role="alert">
                                {errors.bankAccountId.message}
                              </p>
                            )}
                          </div>
                        ) : undefined
                      }
                    />
                    <RadioCard
                      value="new_bank_account"
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
                                {errors.bankAccountId && (
                                  <p className="mt-1.5 text-xs text-error" role="alert">
                                    {errors.bankAccountId.message}
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        ) : undefined
                      }
                    />
                  </RadioGroup>
                )}
              />
            </FormSection>
          </DrawerSection>
        </form>
      </Drawer>

      <AddBankAccountModal
        open={addBankModalOpen}
        onClose={() => setAddBankModalOpen(false)}
        onRequested={() => {
          setValue("newAccountRequested", true);
          setAddBankModalOpen(false);
        }}
      />
    </>
  );
}
