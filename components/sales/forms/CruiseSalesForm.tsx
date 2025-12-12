"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  Clock,
  MapPin,
  Bus,
  UserCircle2,
  Users,
  Baby,
  Briefcase,
  MinusCircle,
  PlusCircle,
  Plus,
  Minus,
} from "lucide-react";
import {
  TOUR_OPTIONS,
  TRANSPORT_OPTIONS,
  DRIVER_OPTIONS,
  BUS_ID_OPTIONS,
  GUIDE_OPTIONS,
} from "@/constants/FormOptions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  cruiseSalesSchema,
  type CruiseSalesFormData,
  type AdditionalTransport,
} from "@/lib/schemas";

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
      date: "",
      departureTime: "",
      returnTime: "",
      tour: "",
      transport: "",
      driver: "",
      busId: "",
      guide: "",
      extraGuide: "",
      adults: 0,
      children: 0,
      infant: 0,
      foc: 0,
      additionalTransports: [],
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
      Math.min(currentValue + 1, 99)
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
      Math.min(Math.max(numValue, 0), 99)
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

  const incrementCounter = (
    field: "adults" | "children" | "infant" | "foc"
  ) => {
    const currentValue = watchedValues[field] || 0;
    setValue(field, Math.min(currentValue + 1, 99));
    trigger(field);
  };

  const decrementCounter = (
    field: "adults" | "children" | "infant" | "foc"
  ) => {
    const currentValue = watchedValues[field] || 0;
    setValue(field, Math.max(currentValue - 1, 0));
    trigger(field);
  };

  const handleCounterChange = (
    field: "adults" | "children" | "infant" | "foc",
    value: string
  ) => {
    const numValue = parseInt(value) || 0;
    setValue(field, Math.min(Math.max(numValue, 0), 99));
    trigger(field);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 overflow-y-auto p-8"
    >
      <div className="max-w-4xl">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Batch Entry
        </h1>

        {/* Date and Time Selection */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Date</Label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              <Input
                type="date"
                {...register("date")}
                className="pl-10 h-11  border-gray-400 rounded [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Departure Time
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              <Input
                type="time"
                {...register("departureTime")}
                placeholder="Departure Time"
                className="pl-10 h-11 border-gray-400 rounded [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Return Time
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              <Input
                type="time"
                {...register("returnTime")}
                placeholder="Return Time"
                className="pl-10 h-11 border-gray-400 rounded [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Tour Details */}
        <div className="mb-6">
          <Label className="mb-2">Tour Details</Label>
          <div className="relative">
            <Select
              value={watchedValues.tour}
              onValueChange={(value) => {
                setValue("tour", value);
                trigger("tour");
              }}
            >
              <SelectTrigger className="pl-10 w-full h-11  border-gray-400 rounded">
                <SelectValue placeholder="Pick a tour spot" />
              </SelectTrigger>
              <SelectContent>
                {TOUR_OPTIONS.map((tour) => (
                  <SelectItem key={tour.value} value={tour.value}>
                    {tour.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
          </div>
        </div>

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
          <Label className="mb-2">Transport</Label>
          <div className="relative mb-3">
            <Select
              value={watchedValues.transport}
              onValueChange={(value) => {
                setValue("transport", value);
                trigger("transport");
              }}
            >
              <SelectTrigger className="pl-10 w-full h-11 border-gray-400 rounded">
                <SelectValue placeholder="Select a transport" />
              </SelectTrigger>
              <SelectContent>
                {TRANSPORT_OPTIONS.map((transport) => (
                  <SelectItem key={transport.value} value={transport.value}>
                    {transport.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Bus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <Select
                value={watchedValues.driver}
                onValueChange={(value) => {
                  setValue("driver", value);
                  trigger("driver");
                }}
              >
                <SelectTrigger className="pl-10 w-full h-11 border-gray-400 rounded">
                  <SelectValue placeholder="Assign driver" />
                </SelectTrigger>
                <SelectContent>
                  {DRIVER_OPTIONS.map((driver) => (
                    <SelectItem key={driver.value} value={driver.value}>
                      {driver.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
            </div>

            <div className="relative">
              <Select
                value={watchedValues.busId}
                onValueChange={(value) => {
                  setValue("busId", value);
                  trigger("busId");
                }}
              >
                <SelectTrigger className="pl-10 w-full h-11 border-gray-400 rounded">
                  <SelectValue placeholder="Bus ID" />
                </SelectTrigger>
                <SelectContent>
                  {BUS_ID_OPTIONS.map((busId) => (
                    <SelectItem key={busId.value} value={busId.value}>
                      {busId.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
            </div>
          </div>
        </div>

        {/* Passengers Details */}
        <div className="mb-3">
          <Label className="mb-2">Passengers Details</Label>

          {/* Passenger Count */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="border border-gray-400 rounded px-3 py-1.5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">Adults</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => decrementCounter("adults")}
                      >
                        <MinusCircle className="h-4 w-4 text-gray-600 hover:text-blue-500 cursor-pointer" />
                      </button>
                      <input
                        type="number"
                        value={
                          watchedValues.adults?.toString().padStart(2, "0") ||
                          "00"
                        }
                        onChange={(e) =>
                          handleCounterChange("adults", e.target.value)
                        }
                        className="w-12 text-center text-sm font-medium border bg-gray-200 rounded py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        min="0"
                        max="99"
                      />
                      <button
                        type="button"
                        onClick={() => incrementCounter("adults")}
                      >
                        <PlusCircle className="h-4 w-4 text-gray-600 hover:text-blue-500 cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="border border-gray-400 rounded px-3 py-1.5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">Children</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => decrementCounter("children")}
                      >
                        <MinusCircle className="h-4 w-4 text-gray-600 hover:text-blue-500 cursor-pointer" />
                      </button>
                      <input
                        type="number"
                        value={
                          watchedValues.children?.toString().padStart(2, "0") ||
                          "00"
                        }
                        onChange={(e) =>
                          handleCounterChange("children", e.target.value)
                        }
                        className="w-12 text-center text-sm font-medium border bg-gray-200 rounded py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        min="0"
                        max="99"
                      />
                      <button
                        type="button"
                        onClick={() => incrementCounter("children")}
                      >
                        <PlusCircle className="h-4 w-4 text-gray-600 hover:text-blue-500 cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="border border-gray-400 rounded px-3 py-1.5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <Baby className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">Infant</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => decrementCounter("infant")}
                      >
                        <MinusCircle className="h-4 w-4 text-gray-600 hover:text-blue-500 cursor-pointer" />
                      </button>
                      <input
                        type="number"
                        value={
                          watchedValues.infant?.toString().padStart(2, "0") ||
                          "00"
                        }
                        onChange={(e) =>
                          handleCounterChange("infant", e.target.value)
                        }
                        className="w-12 text-center text-sm font-medium border bg-gray-200 rounded py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        min="0"
                        max="99"
                      />
                      <button
                        type="button"
                        onClick={() => incrementCounter("infant")}
                      >
                        <PlusCircle className="h-4 w-4 text-gray-600 hover:text-blue-500 cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="border border-gray-400 rounded px-3 py-1.5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <Briefcase className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">
                        FOC ( Free of charge )
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => decrementCounter("foc")}
                      >
                        <MinusCircle className="h-4 w-4 text-gray-600 hover:text-blue-500 cursor-pointer" />
                      </button>
                      <input
                        type="number"
                        value={
                          watchedValues.foc?.toString().padStart(2, "0") || "00"
                        }
                        onChange={(e) =>
                          handleCounterChange("foc", e.target.value)
                        }
                        className="w-12 text-center text-sm font-medium border bg-gray-200 rounded py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        min="0"
                        max="99"
                      />
                      <button
                        type="button"
                        onClick={() => incrementCounter("foc")}
                      >
                        <PlusCircle className="h-4 w-4 text-gray-600 hover:text-blue-500 cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tourist Guide */}
        <div className="mb-6">
          <Label className="mb-2">Tourist Guide</Label>
          <div className="grid grid-cols-2 items-center gap-3">
            <div className="relative">
              <Select
                value={watchedValues.guide}
                onValueChange={(value) => {
                  setValue("guide", value);
                  trigger("guide");
                }}
              >
                <SelectTrigger className="pl-10 w-full h-11 border-gray-400 rounded">
                  <SelectValue placeholder="Assign a guide" />
                </SelectTrigger>
                <SelectContent>
                  {GUIDE_OPTIONS.map((guide) => (
                    <SelectItem key={guide.value} value={guide.value}>
                      {guide.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
            </div>
            <div className="relative">
              <Select
                value={watchedValues.extraGuide || ""}
                onValueChange={(value) => setValue("extraGuide", value)}
              >
                <SelectTrigger className="pl-10 w-full h-11 border-gray-400 rounded">
                  <SelectValue placeholder="Add extra guide" />
                </SelectTrigger>
                <SelectContent>
                  {GUIDE_OPTIONS.map((guide) => (
                    <SelectItem key={guide.value} value={guide.value}>
                      {guide.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
            </div>
          </div>
        </div>

        {/* Additional Transports */}
        {fields.map((field, index) => (
          <div key={field.id} className="mb-6">
            {/* Separator */}
            <div className="border border-dashed my-6 border-gray-300" />

            <div className="flex items-center justify-between gap-2 mb-2">
              <Label className="">Transport {index + 2}</Label>
              <Button
                variant="link"
                size="sm"
                className="text-red-500"
                onClick={() => removeTransport(index)}
                type="button"
              >
                <Minus className="w-4 h-4" /> Remove
              </Button>
            </div>

            <Label className="mb-2">Transport</Label>
            <div className="relative mb-3">
              <Select
                value={
                  watchedValues.additionalTransports?.[index]?.transport || ""
                }
                onValueChange={(value) =>
                  setValue(`additionalTransports.${index}.transport`, value)
                }
              >
                <SelectTrigger className="pl-10 w-full h-11 border-gray-400 rounded">
                  <SelectValue placeholder="Select a transport" />
                </SelectTrigger>
                <SelectContent>
                  {TRANSPORT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Bus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Select
                  value={
                    watchedValues.additionalTransports?.[index]?.driver || ""
                  }
                  onValueChange={(value) =>
                    setValue(`additionalTransports.${index}.driver`, value)
                  }
                >
                  <SelectTrigger className="pl-10 w-full h-11 border-gray-400 rounded">
                    <SelectValue placeholder="Assign driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {DRIVER_OPTIONS.map((driver) => (
                      <SelectItem key={driver.value} value={driver.value}>
                        {driver.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
              </div>

              <div className="relative">
                <Select
                  value={
                    watchedValues.additionalTransports?.[index]?.busId || ""
                  }
                  onValueChange={(value) =>
                    setValue(`additionalTransports.${index}.busId`, value)
                  }
                >
                  <SelectTrigger className="pl-10 w-full h-11 border-gray-400 rounded">
                    <SelectValue placeholder="Bus ID" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUS_ID_OPTIONS.map((busId) => (
                      <SelectItem key={busId.value} value={busId.value}>
                        {busId.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
              </div>
            </div>

            {/* Passengers Details */}
            <div className="mb-3 mt-4">
              <Label className="mb-2">Passengers Details</Label>
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-gray-400 rounded px-3 py-1.5">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-700">Adults</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() =>
                            decrementAdditionalCounter(index, "adults")
                          }
                        >
                          <MinusCircle className="h-4 w-4 text-gray-600 hover:text-blue-500 cursor-pointer" />
                        </button>
                        <input
                          type="number"
                          value={(
                            watchedValues.additionalTransports?.[index]
                              ?.adults || 0
                          )
                            .toString()
                            .padStart(2, "0")}
                          onChange={(e) =>
                            handleAdditionalCounterChange(
                              index,
                              "adults",
                              e.target.value
                            )
                          }
                          className="w-12 text-center text-sm font-medium border bg-gray-200 rounded py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          min="0"
                          max="99"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            incrementAdditionalCounter(index, "adults")
                          }
                        >
                          <PlusCircle className="h-4 w-4 text-gray-600 hover:text-blue-500 cursor-pointer" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="border border-gray-400 rounded px-3 py-1.5">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <Users className="w-5 h-5 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-700">
                            Children
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() =>
                              decrementAdditionalCounter(index, "children")
                            }
                          >
                            <MinusCircle className="h-4 w-4 text-gray-600 hover:text-blue-500 cursor-pointer" />
                          </button>
                          <input
                            type="number"
                            value={(
                              watchedValues.additionalTransports?.[index]
                                ?.children || 0
                            )
                              .toString()
                              .padStart(2, "0")}
                            onChange={(e) =>
                              handleAdditionalCounterChange(
                                index,
                                "children",
                                e.target.value
                              )
                            }
                            className="w-12 text-center text-sm font-medium border bg-gray-200 rounded py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            min="0"
                            max="99"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              incrementAdditionalCounter(index, "children")
                            }
                          >
                            <PlusCircle className="h-4 w-4 text-gray-600 hover:text-blue-500 cursor-pointer" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="border border-gray-400 rounded px-3 py-1.5">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <Baby className="w-5 h-5 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-700">Infant</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() =>
                              decrementAdditionalCounter(index, "infant")
                            }
                          >
                            <MinusCircle className="h-4 w-4 text-gray-600 hover:text-blue-500 cursor-pointer" />
                          </button>
                          <input
                            type="number"
                            value={(
                              watchedValues.additionalTransports?.[index]
                                ?.infant || 0
                            )
                              .toString()
                              .padStart(2, "0")}
                            onChange={(e) =>
                              handleAdditionalCounterChange(
                                index,
                                "infant",
                                e.target.value
                              )
                            }
                            className="w-12 text-center text-sm font-medium border bg-gray-200 rounded py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            min="0"
                            max="99"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              incrementAdditionalCounter(index, "infant")
                            }
                          >
                            <PlusCircle className="h-4 w-4 text-gray-600 hover:text-blue-500 cursor-pointer" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="border border-gray-400 rounded px-3 py-1.5">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <Briefcase className="w-5 h-5 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-700">
                            FOC (Free of charge)
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() =>
                              decrementAdditionalCounter(index, "foc")
                            }
                          >
                            <MinusCircle className="h-4 w-4 text-gray-600 hover:text-blue-500 cursor-pointer" />
                          </button>
                          <input
                            type="number"
                            value={(
                              watchedValues.additionalTransports?.[index]
                                ?.foc || 0
                            )
                              .toString()
                              .padStart(2, "0")}
                            onChange={(e) =>
                              handleAdditionalCounterChange(
                                index,
                                "foc",
                                e.target.value
                              )
                            }
                            className="w-12 text-center text-sm font-medium border bg-gray-200 rounded py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            min="0"
                            max="99"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              incrementAdditionalCounter(index, "foc")
                            }
                          >
                            <PlusCircle className="h-4 w-4 text-gray-600 hover:text-blue-500 cursor-pointer" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tourist Guide */}
            <div className="mb-6">
              <Label className="mb-2">Tourist Guide</Label>
              <div className="grid grid-cols-2 items-center gap-3">
                <div className="relative">
                  <Select
                    value={
                      watchedValues.additionalTransports?.[index]?.guide || ""
                    }
                    onValueChange={(value) =>
                      setValue(`additionalTransports.${index}.guide`, value)
                    }
                  >
                    <SelectTrigger className="pl-10 w-full h-11 border-gray-400 rounded">
                      <SelectValue placeholder="Assign a guide" />
                    </SelectTrigger>
                    <SelectContent>
                      {GUIDE_OPTIONS.map((guide) => (
                        <SelectItem key={guide.value} value={guide.value}>
                          {guide.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                </div>
                <div className="relative">
                  <Select
                    value={
                      watchedValues.additionalTransports?.[index]?.extraGuide ||
                      ""
                    }
                    onValueChange={(value) =>
                      setValue(
                        `additionalTransports.${index}.extraGuide`,
                        value
                      )
                    }
                  >
                    <SelectTrigger className="pl-10 w-full h-11 border-gray-400 rounded">
                      <SelectValue placeholder="Add extra guide" />
                    </SelectTrigger>
                    <SelectContent>
                      {GUIDE_OPTIONS.map((guide) => (
                        <SelectItem key={guide.value} value={guide.value}>
                          {guide.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                </div>
              </div>
            </div>
          </div>
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
