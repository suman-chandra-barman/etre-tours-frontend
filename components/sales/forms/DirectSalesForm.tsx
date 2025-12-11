"use client";

import React from "react";
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

interface FormData {
  date: string;
  departureTime: string;
  returnTime: string;
  tour: string;
  transport: string;
  driver: string;
  busId: string;
  guide: string;
  fullName: string;
  phoneNumber: string;
  adults: number;
  children: number;
  infant: number;
  foc: number;
  paymentMethod: string;
  cardType?: string;
  currency: string;
}

interface DirectSalesFormProps {
  formData: FormData;
  onFormDataChange: <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => void;
}

export default function DirectSalesForm({
  formData,
  onFormDataChange,
}: DirectSalesFormProps) {
  const [isCardPaymentExpanded, setIsCardPaymentExpanded] =
    React.useState(false);

  const incrementCounter = (field: string) => {
    const currentValue = formData[field as keyof FormData] as number;
    onFormDataChange(field as keyof FormData, Math.min(currentValue + 1, 99));
  };

  const decrementCounter = (field: string) => {
    const currentValue = formData[field as keyof FormData] as number;
    onFormDataChange(field as keyof FormData, Math.max(currentValue - 1, 0));
  };

  const isFormValid = () => {
    return (
      formData.date !== "" &&
      formData.departureTime !== "" &&
      formData.returnTime !== "" &&
      formData.tour !== "" &&
      formData.transport !== "" &&
      formData.driver !== "" &&
      formData.busId !== "" &&
      formData.guide !== "" &&
      formData.fullName.trim() !== "" &&
      formData.phoneNumber.trim() !== "" &&
      (formData.adults > 0 ||
        formData.children > 0 ||
        formData.infant > 0 ||
        formData.foc > 0) &&
      formData.paymentMethod !== "" &&
      (formData.paymentMethod === "cash" || formData.currency !== "")
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Pacific Tours Ticket
        </h1>
        <p className="text-sm max-w-xs text-gray-500 mb-8">
          Get started with tour, transport details & tourist guide to make work
          easy and smart.
        </p>

        {/* Date and Time Selection */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Date</Label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => onFormDataChange("date", e.target.value)}
                required
                className="pl-10 h-11 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
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
                value={formData.departureTime}
                onChange={(e) =>
                  onFormDataChange("departureTime", e.target.value)
                }
                required
                placeholder="Departure Time"
                className="pl-10 h-11 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
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
                value={formData.returnTime}
                onChange={(e) => onFormDataChange("returnTime", e.target.value)}
                required
                placeholder="Return Time"
                className="pl-10 h-11 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Tour Details */}
        <div className="mb-6">
          <Label className="mb-2">Tour Details</Label>
          <div className="relative">
            <Select
              value={formData.tour}
              onValueChange={(value) => onFormDataChange("tour", value)}
            >
              <SelectTrigger className="pl-10 w-full h-11">
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

        {/* Transport Details */}
        <div className="mb-6">
          <Label className="mb-2">Transport Details</Label>
          <div className="relative mb-3">
            <Select
              value={formData.transport}
              onValueChange={(value) => onFormDataChange("transport", value)}
            >
              <SelectTrigger className="pl-10 w-full h-11">
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
                value={formData.driver}
                onValueChange={(value) => onFormDataChange("driver", value)}
              >
                <SelectTrigger className="pl-10 w-full h-11">
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
                value={formData.busId}
                onValueChange={(value) => onFormDataChange("busId", value)}
              >
                <SelectTrigger className="pl-10 w-full h-11">
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

        {/* Tourist Guide */}
        <div className="mb-6">
          <Label className="mb-2">Tourist Guide</Label>
          <div className="relative">
            <Select
              value={formData.guide}
              onValueChange={(value) => onFormDataChange("guide", value)}
            >
              <SelectTrigger className="pl-10 w-full h-11">
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
        </div>

        {/* Separator */}
        <div className="border border-dashed my-6" />

        {/* Buyer's Details */}
        <div className="mb-3">
          <Label className="mb-2">Buyer&apos;s Details</Label>
          <div className="space-y-3">
            <div className="relative">
              <Input
                type="text"
                value={formData.fullName}
                onChange={(e) => onFormDataChange("fullName", e.target.value)}
                required
                placeholder="Enter full name"
                className="pl-10 h-11"
              />
              <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>

            <div className="relative">
              <Input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) =>
                  onFormDataChange("phoneNumber", e.target.value)
                }
                required
                placeholder="Phone number"
                className="pl-10 h-11"
              />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Passenger Count */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-gray-200 rounded-lg px-3 h-11 flex items-center">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700">Adults</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MinusCircle
                    className="h-4 w-4 rounded-full border-gray-600 cursor-pointer"
                    onClick={() => decrementCounter("adults")}
                  />
                  <span className="text-sm font-medium w-8 text-center">
                    {formData.adults.toString().padStart(2, "0")}
                  </span>
                  <PlusCircle
                    className="h-4 w-4 rounded-full border-gray-600 cursor-pointer"
                    onClick={() => incrementCounter("adults")}
                  />
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg px-3 h-11 flex items-center">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700">Children</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MinusCircle
                    className="h-4 w-4 rounded-full border-gray-600 cursor-pointer"
                    onClick={() => decrementCounter("children")}
                  />
                  <span className="text-sm font-medium w-8 text-center">
                    {formData.children.toString().padStart(2, "0")}
                  </span>
                  <PlusCircle
                    className="h-4 w-4 rounded-full border-gray-600 cursor-pointer"
                    onClick={() => incrementCounter("children")}
                  />
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg px-3 h-11 flex items-center">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <Baby className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700">Infant</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MinusCircle
                    className="h-4 w-4 rounded-full border-gray-600 cursor-pointer"
                    onClick={() => decrementCounter("infant")}
                  />
                  <span className="text-sm font-medium w-8 text-center">
                    {formData.infant.toString().padStart(2, "0")}
                  </span>
                  <PlusCircle
                    className="h-4 w-4 rounded-full border-gray-600 cursor-pointer"
                    onClick={() => incrementCounter("infant")}
                  />
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg px-3 h-11 flex items-center">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700">FOC</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MinusCircle
                    className="h-4 w-4 rounded-full border-gray-600 cursor-pointer"
                    onClick={() => decrementCounter("foc")}
                  />
                  <span className="text-sm font-medium w-8 text-center">
                    {formData.foc.toString().padStart(2, "0")}
                  </span>
                  <PlusCircle
                    className="h-4 w-4 rounded-full border-gray-600 cursor-pointer"
                    onClick={() => incrementCounter("foc")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border border-dashed my-6" />

        {/* Payment Method */}
        <div className="mb-8">
          <Label className="mb-2">Payment Method</Label>
          <div className="space-y-3">
            <div className="relative">
              <div className={`border rounded-lg transition-colors`}>
                <div
                  className="px-3 h-11 flex items-center justify-between cursor-pointer bg-transparent hover:bg-gray-50 rounded-lg"
                  onClick={() => {
                    setIsCardPaymentExpanded(!isCardPaymentExpanded);
                    onFormDataChange("paymentMethod", "card");
                  }}
                >
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span
                      className={`text-sm ${
                        formData.currency && formData.paymentMethod === "card"
                          ? "text-gray-900"
                          : "text-gray-700"
                      }`}
                    >
                      {formData.currency && formData.paymentMethod === "card"
                        ? CURRENCY_OPTIONS.find(
                            (c) => c.value === formData.currency
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
                        formData.currency === currency.value
                          ? "bg-blue-50 text-blue-600"
                          : ""
                      }`}
                      onClick={() => {
                        onFormDataChange("currency", currency.value);
                        setIsCardPaymentExpanded(false);
                      }}
                    >
                      <span className="text-sm">{currency.label}</span>
                      {formData.currency === currency.value && (
                        <Check className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              className={`border rounded-lg px-3 h-11 flex items-center justify-between cursor-pointer transition-colors`}
              onClick={() => {
                onFormDataChange("paymentMethod", "cash");
                setIsCardPaymentExpanded(false);
              }}
            >
              <div className="flex items-center">
                <Banknote className="w-4 h-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-gray-700">Cash</span>
              </div>
              <div
                className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center ${
                  formData.paymentMethod === "cash"
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              >
                {formData.paymentMethod === "cash" && (
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" size="default" className="rounded-full">
            Cancel
          </Button>
          <Button
            size="default"
            disabled={!isFormValid()}
            onClick={() => console.log("Form Data:", formData)}
            className="bg-blue-500 hover:bg-blue-600 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
