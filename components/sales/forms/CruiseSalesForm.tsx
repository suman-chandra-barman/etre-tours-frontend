"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MapPin,
  UserCircle2,
  Users,
  Baby,
  Briefcase,
  Plus,
} from "lucide-react";
import { TOUR_OPTIONS, GUIDE_OPTIONS } from "@/constants/FormOptions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cruiseSalesSchema, type CruiseSalesFormData } from "@/lib/schemas";
import { cruiseSalesDefaultValues } from "@/constants/defaultFormValues";
import { DateTimeField } from "@/components/sales/shared/DateTimeField";
import { SelectField } from "@/components/sales/shared/SelectField";
import { PassengerCounter } from "@/components/sales/shared/PassengerCounter";
import { TransportDetails } from "@/components/sales/shared/TransportDetails";
import { usePassengerCounter } from "@/components/sales/shared/usePassengerCounter";
import { AdditionalTransportCard } from "@/components/sales/shared/AdditionalTransportCard";

interface CruiseSalesFormProps {
  onSubmit: (data: CruiseSalesFormData) => void;
  defaultValues?: Partial<CruiseSalesFormData>;
  onFormDataChange?: (data: Partial<CruiseSalesFormData>) => void;
}

export default function CruiseSalesForm({
  onSubmit,
  defaultValues,
  onFormDataChange,
}: CruiseSalesFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isValid },
    trigger,
    reset,
  } = useForm<CruiseSalesFormData>({
    resolver: zodResolver(cruiseSalesSchema),
    defaultValues: {
      ...cruiseSalesDefaultValues,
      ...defaultValues,
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "additionalTransports",
  });

  const watchedValues = watch();
  const [nextTransportId, setNextTransportId] = React.useState(2);

  // Call onFormDataChange whenever form values change
  React.useEffect(() => {
    if (!onFormDataChange) return;

    const subscription = watch((value) => {
      onFormDataChange(value as Partial<CruiseSalesFormData>);
    });

    return () => subscription.unsubscribe();
  }, [watch, onFormDataChange]);

  const addNewTransport = () => {
    append({
      id: nextTransportId,
      transport: "",
      driver: "",
      busId: "",
      adults: 0,
      children: 0,
      infant: 0,
      foc: 0,
      guide: "",
      extraGuide: "",
    });
    setNextTransportId((prev) => prev + 1);
  };

  const removeTransport = (index: number) => {
    remove(index);
  };

  const incrementAdditionalCounter = (
    index: number,
    field: "adults" | "children" | "infant" | "foc"
  ) => {
    const currentValue =
      watchedValues.additionalTransports?.[index]?.[field] || 0;
    setValue(
      `additionalTransports.${index}.${field}`,
      Math.min(currentValue + 1)
    );
  };

  const decrementAdditionalCounter = (
    index: number,
    field: "adults" | "children" | "infant" | "foc"
  ) => {
    const currentValue =
      watchedValues.additionalTransports?.[index]?.[field] || 0;
    setValue(
      `additionalTransports.${index}.${field}`,
      Math.max(currentValue - 1, 0)
    );
  };

  const handleAdditionalCounterChange = (
    index: number,
    field: "adults" | "children" | "infant" | "foc",
    value: string
  ) => {
    const numValue = parseInt(value) || 0;
    setValue(
      `additionalTransports.${index}.${field}`,
      Math.min(Math.max(numValue, 0))
    );
  };

  // Calculate total passengers across all transports
  const getTotalPassengers = () => {
    const mainAdults = watchedValues.adults || 0;
    const mainChildren = watchedValues.children || 0;
    const mainInfant = watchedValues.infant || 0;
    const mainFoc = watchedValues.foc || 0;

    const additionalAdults =
      watchedValues.additionalTransports?.reduce(
        (sum, t) => sum + (t.adults || 0),
        0
      ) || 0;
    const additionalChildren =
      watchedValues.additionalTransports?.reduce(
        (sum, t) => sum + (t.children || 0),
        0
      ) || 0;
    const additionalInfant =
      watchedValues.additionalTransports?.reduce(
        (sum, t) => sum + (t.infant || 0),
        0
      ) || 0;
    const additionalFoc =
      watchedValues.additionalTransports?.reduce(
        (sum, t) => sum + (t.foc || 0),
        0
      ) || 0;

    return {
      adults: mainAdults + additionalAdults,
      children: mainChildren + additionalChildren,
      infant: mainInfant + additionalInfant,
      foc: mainFoc + additionalFoc,
      total:
        mainAdults +
        additionalAdults +
        mainChildren +
        additionalChildren +
        mainInfant +
        additionalInfant +
        mainFoc +
        additionalFoc,
    };
  };

  const { incrementCounter, decrementCounter, handleCounterChange } =
    usePassengerCounter<CruiseSalesFormData>({
      setValue,
      trigger,
      watchedValues,
    });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 overflow-y-auto p-2 md:p-4 lg:p-6"
    >
      <div className="max-w-4xl">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Batch Entry
        </h1>

        {/* Date and Time Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-3 items-end gap-4 mb-6">
          <DateTimeField
            type="date"
            label="Date"
            name="date"
            register={register}
            value={watchedValues.date}
            placeholder="Date"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end lg:col-span-2">
            <DateTimeField
              type="time"
              label="Durations"
              name="departureTime"
              register={register}
              value={watchedValues.departureTime}
              placeholder="Departure Time"
            />
            <DateTimeField
              type="time"
              name="returnTime"
              register={register}
              value={watchedValues.returnTime}
              placeholder="Return Time"
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
          placeholder="Pick a tour spot"
          className="mb-6"
        />

        {/* Separator */}
        <div className="border border-dashed my-6 border-gray-300" />

        {/* Transport Details */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-2 mb-2">
            <Label className="">Transport Details</Label>
            <Button
              variant="link"
              size="sm"
              className="text-blue-500"
              onClick={addNewTransport}
              type="button"
            >
              <Plus /> Add new transport
            </Button>
          </div>
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
            showLabel={false}
          />
        </div>

        {/* Passengers Details */}
        <div className="mb-3">
          <Label className="mb-2">Passengers Details</Label>

          {/* Passenger Count */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
            <PassengerCounter
              icon={Users}
              label="Adults"
              value={watchedValues.adults || 0}
              onIncrement={() => incrementCounter("adults")}
              onDecrement={() => decrementCounter("adults")}
              onChange={(value) => handleCounterChange("adults", value)}
              maxWidth="w-20"
            />

            <PassengerCounter
              icon={Users}
              label="Children"
              value={watchedValues.children || 0}
              onIncrement={() => incrementCounter("children")}
              onDecrement={() => decrementCounter("children")}
              onChange={(value) => handleCounterChange("children", value)}
              maxWidth="w-20"
            />

            <PassengerCounter
              icon={Baby}
              label="Infant"
              value={watchedValues.infant || 0}
              onIncrement={() => incrementCounter("infant")}
              onDecrement={() => decrementCounter("infant")}
              onChange={(value) => handleCounterChange("infant", value)}
              maxWidth="w-20"
            />

            <PassengerCounter
              icon={Briefcase}
              label="FOC"
              value={watchedValues.foc || 0}
              onIncrement={() => incrementCounter("foc")}
              onDecrement={() => decrementCounter("foc")}
              onChange={(value) => handleCounterChange("foc", value)}
              maxWidth="w-20"
            />
          </div>
        </div>

        {/* Tourist Guide */}
        <div className="mb-6">
          <Label className="mb-2">Tourist Guide</Label>
          <div className="grid grid-cols-2 items-center gap-3">
            <SelectField
              icon={UserCircle2}
              value={watchedValues.guide}
              onValueChange={(value) => {
                setValue("guide", value);
                trigger("guide");
              }}
              options={GUIDE_OPTIONS}
              placeholder="Assign a guide"
            />
            <SelectField
              icon={UserCircle2}
              value={watchedValues.extraGuide || ""}
              onValueChange={(value) => setValue("extraGuide", value)}
              options={GUIDE_OPTIONS}
              placeholder="Add extra guide"
            />
          </div>
        </div>

        {/* Additional Transports */}
        {fields.map((field, index) => (
          <AdditionalTransportCard
            key={field.id}
            index={index}
            transport={watchedValues.additionalTransports?.[index] || {}}
            onRemove={() => removeTransport(index)}
            onTransportChange={(value) =>
              setValue(`additionalTransports.${index}.transport`, value)
            }
            onDriverChange={(value) =>
              setValue(`additionalTransports.${index}.driver`, value)
            }
            onBusIdChange={(value) =>
              setValue(`additionalTransports.${index}.busId`, value)
            }
            onGuideChange={(value) =>
              setValue(`additionalTransports.${index}.guide`, value)
            }
            onExtraGuideChange={(value) =>
              setValue(`additionalTransports.${index}.extraGuide`, value)
            }
            onAdultsIncrement={() =>
              incrementAdditionalCounter(index, "adults")
            }
            onAdultsDecrement={() =>
              decrementAdditionalCounter(index, "adults")
            }
            onAdultsChange={(value) =>
              handleAdditionalCounterChange(index, "adults", value)
            }
            onChildrenIncrement={() =>
              incrementAdditionalCounter(index, "children")
            }
            onChildrenDecrement={() =>
              decrementAdditionalCounter(index, "children")
            }
            onChildrenChange={(value) =>
              handleAdditionalCounterChange(index, "children", value)
            }
            onInfantIncrement={() =>
              incrementAdditionalCounter(index, "infant")
            }
            onInfantDecrement={() =>
              decrementAdditionalCounter(index, "infant")
            }
            onInfantChange={(value) =>
              handleAdditionalCounterChange(index, "infant", value)
            }
            onFocIncrement={() => incrementAdditionalCounter(index, "foc")}
            onFocDecrement={() => decrementAdditionalCounter(index, "foc")}
            onFocChange={(value) =>
              handleAdditionalCounterChange(index, "foc", value)
            }
          />
        ))}

        {/* Passengers */}
        {(getTotalPassengers().adults > 0 ||
          getTotalPassengers().children > 0 ||
          getTotalPassengers().infant > 0 ||
          getTotalPassengers().foc > 0) && (
          <div className="mb-6">
            {/* Separator */}
            <div className="border border-dashed my-6 border-gray-300" />

            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Passengers
            </h3>
            <div className="space-y-2">
              {getTotalPassengers().adults > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Adults:</span>
                  <span className="text-gray-900 font-medium">
                    {getTotalPassengers().adults.toString().padStart(2, "0")}
                  </span>
                </div>
              )}
              {getTotalPassengers().children > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Children:</span>
                  <span className="text-gray-900 font-medium">
                    {getTotalPassengers().children.toString().padStart(2, "0")}
                  </span>
                </div>
              )}
              {getTotalPassengers().foc > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">FOC (Free of charge):</span>
                  <span className="text-gray-900 font-medium">
                    {getTotalPassengers().foc.toString().padStart(2, "0")}
                  </span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between text-base font-semibold">
                  <span className="text-gray-900">Total Passengers</span>
                  <span className="text-gray-900">
                    {getTotalPassengers().total.toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
              {/* Separator */}
              <div className="border border-dashed my-6 border-gray-300" />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            size="default"
            className="rounded-full"
            onClick={() => reset()}
          >
            Reset
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
      </div>
    </form>
  );
}

