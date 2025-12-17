"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  Clock,
  MapPin,
  Bus,
  UserCircle2,
  Phone,
  Users,
  Baby,
  Briefcase,
  CreditCard,
  Banknote,
  MinusCircle,
  PlusCircle,
  ChevronDown,
  Check,
} from "lucide-react";
import {
  TOUR_OPTIONS,
  TRANSPORT_OPTIONS,
  DRIVER_OPTIONS,
  BUS_ID_OPTIONS,
  GUIDE_OPTIONS,
  CURRENCY_OPTIONS,
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
import { directSalesSchema, type DirectSalesFormData } from "@/lib/schemas";

interface DirectSalesFormProps {
  onSubmit: (data: DirectSalesFormData) => void;
  defaultValues?: Partial<DirectSalesFormData>;
}

export default function DirectSalesForm({
  onSubmit,
  defaultValues,
}: DirectSalesFormProps) {
  const [isCardPaymentExpanded, setIsCardPaymentExpanded] =
    React.useState(false);

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
      date: "",
      departureTime: "",
      returnTime: "",
      tour: "",
      transport: "",
      driver: "",
      busId: "",
      guide: "",
      fullName: "",
      phoneNumber: "",
      adults: 0,
      children: 0,
      infant: 0,
      foc: 0,
      paymentMethod: "card",
      currency: "",
      ...defaultValues,
    },
    mode: "onChange",
  });

  const watchedValues = watch();

  // Pricing constants
  const ADULT_PRICE = 49.0;
  const CHILD_PRICE = 29.0;
  const INFANT_PRICE = 0.0;
  const FOC_PRICE = 0.0;

  const incrementCounter = (
    field: keyof Pick<
      DirectSalesFormData,
      "adults" | "children" | "infant" | "foc"
    >
  ) => {
    const currentValue = watchedValues[field];
    setValue(field, Math.min(currentValue + 1, 99) as never);
    trigger(field);
  };

  const decrementCounter = (
    field: keyof Pick<
      DirectSalesFormData,
      "adults" | "children" | "infant" | "foc"
    >
  ) => {
    const currentValue = watchedValues[field];
    setValue(field, Math.max(currentValue - 1, 0) as never);
    trigger(field);
  };

  const handleCounterChange = (
    field: keyof Pick<
      DirectSalesFormData,
      "adults" | "children" | "infant" | "foc"
    >,
    value: string
  ) => {
    const numValue = parseInt(value) || 0;
    setValue(field, Math.min(Math.max(numValue, 0), 99) as never);
    trigger(field);
  };

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
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none z-10" />
              <Input
                type="date"
                {...register("date")}
                style={{
                  colorScheme: watchedValues.date ? "auto" : "light",
                  color: watchedValues.date ? "inherit" : "transparent",
                }}
                className={`pl-10 h-11 border-gray-400 rounded [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer ${
                  errors.date ? "border-red-500" : ""
                }`}
              />
              {!watchedValues.date && (
                <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm">
                  Date
                </span>
              )}
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none z-10" />
              <Input
                type="time"
                {...register("departureTime")}
                style={{
                  colorScheme: watchedValues.departureTime ? "auto" : "light",
                  color: watchedValues.departureTime
                    ? "inherit"
                    : "transparent",
                }}
                className={`pl-10 h-11 border-gray-400 rounded [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer ${
                  errors.departureTime ? "border-red-500" : ""
                }`}
              />
              {!watchedValues.departureTime && (
                <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm">
                  Departure Time
                </span>
              )}
              {errors.departureTime && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.departureTime.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none z-10" />
              <Input
                type="time"
                {...register("returnTime")}
                style={{
                  colorScheme: watchedValues.returnTime ? "auto" : "light",
                  color: watchedValues.returnTime ? "inherit" : "transparent",
                }}
                className={`pl-10 h-11 border-gray-400 rounded [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer ${
                  errors.returnTime ? "border-red-500" : ""
                }`}
              />
              {!watchedValues.returnTime && (
                <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm">
                  Return Time
                </span>
              )}
              {errors.returnTime && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.returnTime.message}
                </p>
              )}
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
              <SelectTrigger
                className={`pl-10 w-full h-11 border-gray-400 rounded ${
                  errors.tour ? "border-red-500" : ""
                }`}
              >
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
            {errors.tour && (
              <p className="text-red-500 text-xs mt-1">{errors.tour.message}</p>
            )}
          </div>
        </div>

        {/* Transport Details */}
        <div className="mb-6">
          <Label className="mb-2">Transport Details</Label>
          <div className="relative mb-3">
            <Select
              value={watchedValues.transport}
              onValueChange={(value) => {
                setValue("transport", value);
                trigger("transport");
              }}
            >
              <SelectTrigger
                className={`pl-10 w-full h-11 border-gray-400 rounded ${
                  errors.transport ? "border-red-500" : ""
                }`}
              >
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
            {errors.transport && (
              <p className="text-red-500 text-xs mt-1">
                {errors.transport.message}
              </p>
            )}
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
                <SelectTrigger
                  className={`pl-10 w-full h-11 border-gray-400 rounded ${
                    errors.driver ? "border-red-500" : ""
                  }`}
                >
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
              {errors.driver && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.driver.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Select
                value={watchedValues.busId}
                onValueChange={(value) => {
                  setValue("busId", value);
                  trigger("busId");
                }}
              >
                <SelectTrigger
                  className={`pl-10 w-full h-11 border-gray-400 rounded ${
                    errors.busId ? "border-red-500" : ""
                  }`}
                >
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
              {errors.busId && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.busId.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Tourist Guide */}
        <div className="mb-6">
          <Label className="mb-2">Tourist Guide</Label>
          <div className="relative">
            <Select
              value={watchedValues.guide}
              onValueChange={(value) => {
                setValue("guide", value);
                trigger("guide");
              }}
            >
              <SelectTrigger
                className={`pl-10 w-full h-11 border-gray-400 rounded ${
                  errors.guide ? "border-red-500" : ""
                }`}
              >
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
            {errors.guide && (
              <p className="text-red-500 text-xs mt-1">
                {errors.guide.message}
              </p>
            )}
          </div>
        </div>

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
            <div>
              <div
                className={`border rounded px-3 py-1.5 ${
                  errors.adults ? "border-red-500" : "border-gray-400"
                }`}
              >
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
                      value={watchedValues.adults.toString().padStart(2, "0")}
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
              <p className="text-xs text-gray-500 mt-1.5 pl-0.5">
                ${ADULT_PRICE.toFixed(2)} per adult
              </p>
              {errors.adults && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.adults.message}
                </p>
              )}
            </div>

            <div>
              <div
                className={`border rounded px-3 py-1.5 ${
                  errors.children ? "border-red-500" : "border-gray-400"
                }`}
              >
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
                      value={watchedValues.children.toString().padStart(2, "0")}
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
              <p className="text-xs text-gray-500 mt-1.5 pl-0.5">
                ${CHILD_PRICE.toFixed(2)} per child above 18 y/o
              </p>
            </div>

            <div>
              <div
                className={`border rounded px-3 py-1.5 ${
                  errors.infant ? "border-red-500" : "border-gray-400"
                }`}
              >
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
                      value={watchedValues.infant.toString().padStart(2, "0")}
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
              <p className="text-xs text-gray-500 mt-1.5 pl-0.5">
                ${INFANT_PRICE.toFixed(2)} per infant
              </p>
            </div>

            <div>
              <div
                className={`border rounded px-3 py-1.5 ${
                  errors.foc ? "border-red-500" : "border-gray-400"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <Briefcase className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">FOC</span>
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
                      value={watchedValues.foc.toString().padStart(2, "0")}
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
              <p className="text-xs text-gray-500 mt-1.5 pl-0.5">
                ${FOC_PRICE.toFixed(2)} per FOC
              </p>
            </div>
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
        <div className="mb-8">
          <Label className="mb-2">Payment Method</Label>
          <div className="space-y-3">
            <div className="relative">
              <div
                className={`border border-gray-400 rounded transition-colors ${
                  errors.paymentMethod || errors.currency
                    ? "border-red-500"
                    : ""
                }`}
              >
                <div
                  className="px-3 h-11 flex items-center justify-between cursor-pointer bg-transparent hover:bg-gray-50 rounded-lg"
                  onClick={() => {
                    setValue("paymentMethod", "card");
                    setIsCardPaymentExpanded(!isCardPaymentExpanded);
                    trigger("paymentMethod");
                  }}
                >
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span
                      className={`text-sm ${
                        watchedValues.currency &&
                        watchedValues.paymentMethod === "card"
                          ? "text-gray-900"
                          : "text-gray-700"
                      }`}
                    >
                      {watchedValues.currency &&
                      watchedValues.paymentMethod === "card"
                        ? CURRENCY_OPTIONS.find(
                            (c) => c.value === watchedValues.currency
                          )?.label
                        : "Card Payment"}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform ${
                      isCardPaymentExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {isCardPaymentExpanded && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {CURRENCY_OPTIONS.map((currency) => (
                    <div
                      key={currency.value}
                      className={`px-3 h-10 flex items-center justify-between cursor-pointer hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                        watchedValues.currency === currency.value
                          ? "bg-blue-50 text-blue-600"
                          : ""
                      }`}
                      onClick={() => {
                        setValue("currency", currency.value);
                        setIsCardPaymentExpanded(false);
                        trigger("currency");
                      }}
                    >
                      <span className="text-sm">{currency.label}</span>
                      {watchedValues.currency === currency.value && (
                        <Check className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                  ))}
                </div>
              )}
              {(errors.paymentMethod || errors.currency) && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.paymentMethod?.message || errors.currency?.message}
                </p>
              )}
            </div>

            <div
              className={`border border-gray-400 rounded px-3 h-11 flex items-center justify-between cursor-pointer transition-colors ${
                errors.paymentMethod ? "border-red-500" : ""
              }`}
              onClick={() => {
                setValue("paymentMethod", "cash");
                setIsCardPaymentExpanded(false);
                trigger("paymentMethod");
              }}
            >
              <div className="flex items-center">
                <Banknote className="w-4 h-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-gray-700">Cash</span>
              </div>
              <div
                className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center ${
                  watchedValues.paymentMethod === "cash"
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              >
                {watchedValues.paymentMethod === "cash" && (
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                )}
              </div>
            </div>
          </div>
        </div>

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
