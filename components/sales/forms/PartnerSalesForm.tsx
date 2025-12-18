"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MapPin,
  UserCircle2,
  Users,
  Baby,
  Briefcase,
  Building2,
} from "lucide-react";
import {
  TOUR_OPTIONS,
  PARTNER_OPTIONS,
  PARTNER_TYPE_OPTIONS,
} from "@/constants/FormOptions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { partnerSalesSchema, type PartnerSalesFormData } from "@/lib/schemas";
import { partnerSalesDefaultValues } from "@/constants/defaultFormValues";
import { DateTimeField } from "@/components/sales/shared/DateTimeField";
import { SelectField } from "@/components/sales/shared/SelectField";
import { PassengerCounter } from "@/components/sales/shared/PassengerCounter";
import { PaymentMethodSelector } from "@/components/sales/shared/PaymentMethodSelector";
import { TransportDetails } from "@/components/sales/shared/TransportDetails";
import { usePassengerCounter } from "@/components/sales/shared/usePassengerCounter";

interface PartnerSalesFormProps {
  onSubmit: (data: PartnerSalesFormData) => void;
  onFormDataChange?: (field: string, value: string | number) => void;
  defaultValues?: Partial<PartnerSalesFormData>;
}

export default function PartnerSalesForm({
  onSubmit,
  onFormDataChange,
  defaultValues,
}: PartnerSalesFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    trigger,
  } = useForm<PartnerSalesFormData>({
    resolver: zodResolver(partnerSalesSchema),
    defaultValues: {
      ...partnerSalesDefaultValues,
      ...defaultValues,
    },
    mode: "onChange",
  });

  const watchedValues = watch();

  // Call onFormDataChange whenever form values change
  React.useEffect(() => {
    if (!onFormDataChange) return;

    // Debounce the callback to prevent excessive re-renders
    const timer = setTimeout(() => {
      Object.entries(watchedValues).forEach(([key, value]) => {
        onFormDataChange(key, value);
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [watchedValues, onFormDataChange]);

  const { incrementCounter, decrementCounter, handleCounterChange } =
    usePassengerCounter<PartnerSalesFormData>({
      setValue,
      trigger,
      watchedValues,
    });

  const onFormSubmit = (data: PartnerSalesFormData) => {
    onSubmit(data);
  };

  return (
    <div className="flex-1 overflow-y-auto  p-4 lg:p-8">
      <form onSubmit={handleSubmit(onFormSubmit)} className="max-w-4xl">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Partner sales
        </h1>
        {/* Reservation Date and Time */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-3">
            <DateTimeField
              type="date"
              label="Reservation Date"
              name="date"
              register={register}
              value={watchedValues.date}
              error={errors.date}
              placeholder="Date"
            />
            <DateTimeField
              type="time"
              label="Time"
              name="time"
              register={register}
              value={watchedValues.time}
              error={errors.time}
              placeholder="Time"
            />
          </div>
        </div>

        {/* Tour Details */}
        <SelectField
          label="Tour Details"
          icon={MapPin}
          value={watchedValues.tour}
          onValueChange={(value) => {
            setValue("tour", value);
            trigger("tour");
          }}
          options={TOUR_OPTIONS}
          placeholder="Pick a tour"
          error={errors.tour}
          className="mb-6"
        />

        {/* Transport Details */}
        <TransportDetails
          transport={watchedValues.transport}
          driver={watchedValues.driver}
          busId={watchedValues.busId}
          onTransportChange={(value) => {
            setValue("transport", value);
            trigger("transport");
          }}
          onDriverChange={(value) => {
            setValue("driver", value);
            trigger("driver");
          }}
          onBusIdChange={(value) => {
            setValue("busId", value);
            trigger("busId");
          }}
          transportError={errors.transport}
          driverError={errors.driver}
          busIdError={errors.busId}
        />

        {/* Tourist Guide */}
        <div className="mb-6">
          <Label className="mb-2">Tourist Guide</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <Input
                type="text"
                {...register("guide")}
                placeholder="Guide"
                className={`pl-10 h-11 border-gray-400 rounded ${
                  errors.guide ? "border-red-500" : ""
                }`}
              />
              <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              {errors.guide && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.guide.message}
                </p>
              )}
            </div>
            <div className="relative">
              <Input
                type="text"
                {...register("extraGuide")}
                placeholder="Extra guide"
                className="pl-10 h-11 border-gray-400 rounded"
              />
              <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border border-dashed my-6 border-gray-300" />

        {/* Group Info */}
        <div className="mb-6">
          <Label className="mb-2">Group Info</Label>
          <div className="grid grid-cols-2 gap-3">
            <PassengerCounter
              icon={Users}
              label="Adults"
              value={watchedValues.adults}
              onIncrement={() => incrementCounter("adults")}
              onDecrement={() => decrementCounter("adults")}
              onChange={(value) => handleCounterChange("adults", value)}
              error={errors.adults}
              maxWidth="w-20"
            />

            <PassengerCounter
              icon={Users}
              label="Children"
              value={watchedValues.children}
              onIncrement={() => incrementCounter("children")}
              onDecrement={() => decrementCounter("children")}
              onChange={(value) => handleCounterChange("children", value)}
              maxWidth="w-20"
            />

            <PassengerCounter
              icon={Baby}
              label="Infant"
              value={watchedValues.infant}
              onIncrement={() => incrementCounter("infant")}
              onDecrement={() => decrementCounter("infant")}
              onChange={(value) => handleCounterChange("infant", value)}
              maxWidth="w-20"
            />

            <PassengerCounter
              icon={Briefcase}
              label="FOC"
              value={watchedValues.foc}
              onIncrement={() => incrementCounter("foc")}
              onDecrement={() => decrementCounter("foc")}
              onChange={(value) => handleCounterChange("foc", value)}
              maxWidth="w-20"
            />
          </div>
        </div>

        {/* Separator */}
        <div className="border border-dashed my-6 border-gray-300" />

        {/* Partner Type */}
        <div className="mb-6">
          <Label className="mb-2">Partner Type</Label>
          <SelectField
            icon={Building2}
            value={watchedValues.partner}
            onValueChange={(value) => {
              setValue("partner", value);
              trigger("partner");
            }}
            options={PARTNER_OPTIONS}
            placeholder="Partner"
            error={errors.partner}
            className="mb-3"
          />

          <SelectField
            icon={Building2}
            value={watchedValues.partnerType}
            onValueChange={(value) => {
              setValue("partnerType", value);
              trigger("partnerType");
            }}
            options={PARTNER_TYPE_OPTIONS}
            placeholder="Partner Type"
            error={errors.partnerType}
          />
        </div>

        {/* Separator */}
        <div className="border border-dashed my-6 border-gray-300" />

        {/* Payment Method */}
        <PaymentMethodSelector
          paymentMethod={watchedValues.paymentMethod}
          currency={watchedValues.currency}
          onPaymentMethodChange={(method) => {
            setValue("paymentMethod", method);
            trigger("paymentMethod");
          }}
          onCurrencyChange={(currency) => {
            setValue("currency", currency);
            trigger("currency");
          }}
          paymentMethodError={errors.paymentMethod}
          currencyError={errors.currency}
          showBankTransfer
          showCheque
        />

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            size="default"
            className="rounded-full"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="default"
            disabled={!isValid}
            className="bg-blue-500 hover:bg-blue-600 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit report and print
          </Button>
        </div>
      </form>
    </div>
  );
}
