"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MapPin,
  UserCircle2,
  Phone,
  Users,
  Baby,
  Briefcase,
} from "lucide-react";
import { TOUR_OPTIONS, GUIDE_OPTIONS } from "@/constants/FormOptions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { directSalesSchema, type DirectSalesFormData } from "@/lib/schemas";
import { directSalesDefaultValues } from "@/constants/defaultFormValues";
import { DateTimeField } from "@/components/sales/shared/DateTimeField";
import { SelectField } from "@/components/sales/shared/SelectField";
import { PassengerCounter } from "@/components/sales/shared/PassengerCounter";
import { PaymentMethodSelector } from "@/components/sales/shared/PaymentMethodSelector";
import { TransportDetails } from "@/components/sales/shared/TransportDetails";
import { usePassengerCounter } from "@/components/sales/shared/usePassengerCounter";

interface DirectSalesFormProps {
  onSubmit: (data: DirectSalesFormData) => void;
  defaultValues?: Partial<DirectSalesFormData>;
}

export default function DirectSalesForm({
  onSubmit,
  defaultValues,
}: DirectSalesFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    trigger,
  } = useForm<DirectSalesFormData>({
    resolver: zodResolver(directSalesSchema),
    defaultValues: {
      ...directSalesDefaultValues,
      ...defaultValues,
    },
    mode: "onChange",
  });

  const watchedValues = watch();

  const { incrementCounter, decrementCounter, handleCounterChange } =
    usePassengerCounter<DirectSalesFormData>({
      setValue,
      trigger,
      watchedValues,
    });

  // Pricing constants
  const ADULT_PRICE = 49.0;
  const CHILD_PRICE = 29.0;
  const INFANT_PRICE = 0.0;
  const FOC_PRICE = 0.0;

  // Calculate totals
  const calculateTotal = () => {
    const adultsTotal = watchedValues.adults * ADULT_PRICE;
    const childrenTotal = watchedValues.children * CHILD_PRICE;
    const infantTotal = watchedValues.infant * INFANT_PRICE;
    const focTotal = watchedValues.foc * FOC_PRICE;
    return adultsTotal + childrenTotal + infantTotal + focTotal;
  };

  const onFormSubmit = (data: DirectSalesFormData) => {
    onSubmit(data);
  };

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <form onSubmit={handleSubmit(onFormSubmit)} className="max-w-4xl">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Pacific Tours Ticket
        </h1>
        <p className="text-sm max-w-xs text-gray-500 mb-8">
          Get started with tour, transport details & tourist guide to make work
          easy and smart.
        </p>

        {/* Date and Time Selection */}
        <div className="grid grid-cols-3 items-end gap-4 mb-6">
          <DateTimeField
            type="date"
            label="Date"
            name="date"
            register={register}
            value={watchedValues.date}
            error={errors.date}
            placeholder="Date"
          />
          <DateTimeField
            type="time"
            label="Duration"
            name="departureTime"
            register={register}
            value={watchedValues.departureTime}
            error={errors.departureTime}
            placeholder="Departure Time"
          />
          <DateTimeField
            type="time"
            name="returnTime"
            register={register}
            value={watchedValues.returnTime}
            error={errors.returnTime}
            placeholder="Return Time"
          />
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
          placeholder="Pick a tour spot"
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
        <SelectField
          label="Tourist Guide"
          icon={UserCircle2}
          value={watchedValues.guide}
          onValueChange={(value) => {
            setValue("guide", value);
            trigger("guide");
          }}
          options={GUIDE_OPTIONS}
          placeholder="Assign a guide"
          error={errors.guide}
          className="mb-6"
        />

        {/* Separator */}
        <div className="border border-dashed my-6 border-gray-300" />

        {/* Buyer's Details */}
        <div className="mb-3">
          <Label className="mb-2">Buyer&apos;s Details</Label>
          <div className="space-y-3">
            <div className="relative">
              <Input
                type="text"
                {...register("fullName")}
                placeholder="Enter full name"
                className={`pl-10 h-11 border-gray-400 rounded ${
                  errors.fullName ? "border-red-500" : ""
                }`}
              />
              <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Input
                type="tel"
                {...register("phoneNumber")}
                placeholder="Phone number"
                className={`pl-10 h-11 border-gray-400 rounded ${
                  errors.phoneNumber ? "border-red-500" : ""
                }`}
              />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Passenger Count */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-3">
            <PassengerCounter
              icon={Users}
              label="Adults"
              value={watchedValues.adults}
              onIncrement={() => incrementCounter("adults")}
              onDecrement={() => decrementCounter("adults")}
              onChange={(value) => handleCounterChange("adults", value)}
              error={errors.adults}
              priceInfo={`$${ADULT_PRICE.toFixed(2)} per adult`}
            />

            <PassengerCounter
              icon={Users}
              label="Children"
              value={watchedValues.children}
              onIncrement={() => incrementCounter("children")}
              onDecrement={() => decrementCounter("children")}
              onChange={(value) => handleCounterChange("children", value)}
              priceInfo={`$${CHILD_PRICE.toFixed(2)} per child above 18 y/o`}
            />

            <PassengerCounter
              icon={Baby}
              label="Infant"
              value={watchedValues.infant}
              onIncrement={() => incrementCounter("infant")}
              onDecrement={() => decrementCounter("infant")}
              onChange={(value) => handleCounterChange("infant", value)}
              error={errors.infant}
              priceInfo={`$${INFANT_PRICE.toFixed(2)} per infant`}
            />

            <PassengerCounter
              icon={Briefcase}
              label="FOC"
              value={watchedValues.foc}
              onIncrement={() => incrementCounter("foc")}
              onDecrement={() => decrementCounter("foc")}
              onChange={(value) => handleCounterChange("foc", value)}
              error={errors.foc}
              priceInfo={`$${FOC_PRICE.toFixed(2)} per FOC`}
            />
          </div>
        </div>

        {/* Amount to Pay */}
        {(watchedValues.adults > 0 ||
          watchedValues.children > 0 ||
          watchedValues.infant > 0 ||
          watchedValues.foc > 0) && (
          <div className="mb-6 border-t border-dashed pt-4 border-gray-300">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Amount to Pay
            </h3>
            <div className="space-y-2">
              {watchedValues.adults > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Adults:</span>
                  <span className="text-gray-900 font-medium">
                    ${ADULT_PRICE.toFixed(2)}x{watchedValues.adults}
                  </span>
                </div>
              )}
              {watchedValues.children > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Children:</span>
                  <span className="text-gray-900 font-medium">
                    ${CHILD_PRICE.toFixed(2)}x{watchedValues.children}
                  </span>
                </div>
              )}
              {watchedValues.infant > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Infant:</span>
                  <span className="text-gray-900 font-medium">
                    ${INFANT_PRICE.toFixed(2)}x{watchedValues.infant}
                  </span>
                </div>
              )}
              {watchedValues.foc > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">FOC:</span>
                  <span className="text-gray-900 font-medium">
                    ${FOC_PRICE.toFixed(2)}x{watchedValues.foc}
                  </span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between text-base font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

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
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
