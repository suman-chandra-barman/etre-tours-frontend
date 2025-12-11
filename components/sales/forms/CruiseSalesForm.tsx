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
  Plus,
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

export default function CruiseSalesForm({
  formData,
  onFormDataChange,
}: DirectSalesFormProps) {
  const [isCardPaymentExpanded, setIsCardPaymentExpanded] =
    React.useState(false);

  // Pricing constants
  const ADULT_PRICE = 49.0;
  const CHILD_PRICE = 29.0;
  const INFANT_PRICE = 0.0;
  const FOC_PRICE = 0.0;

  const incrementCounter = (field: string) => {
    const currentValue = formData[field as keyof FormData] as number;
    onFormDataChange(field as keyof FormData, Math.min(currentValue + 1, 99));
  };

  const decrementCounter = (field: string) => {
    const currentValue = formData[field as keyof FormData] as number;
    onFormDataChange(field as keyof FormData, Math.max(currentValue - 1, 0));
  };

  const handleCounterChange = (field: string, value: string) => {
    const numValue = parseInt(value) || 0;
    onFormDataChange(
      field as keyof FormData,
      Math.min(Math.max(numValue, 0), 99)
    );
  };

  // Calculate totals
  const calculateTotal = () => {
    const adultsTotal = formData.adults * ADULT_PRICE;
    const childrenTotal = formData.children * CHILD_PRICE;
    const infantTotal = formData.infant * INFANT_PRICE;
    const focTotal = formData.foc * FOC_PRICE;
    return adultsTotal + childrenTotal + infantTotal + focTotal;
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
                value={formData.date}
                onChange={(e) => onFormDataChange("date", e.target.value)}
                required
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
                value={formData.departureTime}
                onChange={(e) =>
                  onFormDataChange("departureTime", e.target.value)
                }
                required
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
                value={formData.returnTime}
                onChange={(e) => onFormDataChange("returnTime", e.target.value)}
                required
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
              value={formData.tour}
              onValueChange={(value) => onFormDataChange("tour", value)}
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
            <Button variant="link" size="sm" className="text-blue-500">
              <Plus /> Add new transport
            </Button>
          </div>
          <Label className="mb-2">Transport</Label>
          <div className="relative mb-3">
            <Select
              value={formData.transport}
              onValueChange={(value) => onFormDataChange("transport", value)}
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
                value={formData.driver}
                onValueChange={(value) => onFormDataChange("driver", value)}
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
                value={formData.busId}
                onValueChange={(value) => onFormDataChange("busId", value)}
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
                        value={formData.adults.toString().padStart(2, "0")}
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
                        value={formData.children.toString().padStart(2, "0")}
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
                        value={formData.infant.toString().padStart(2, "0")}
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
                <div className="border border-gray-400 rounded px-3 py-1.5">
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
                        value={formData.foc.toString().padStart(2, "0")}
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
        </div>

        {/* Tourist Guide */}
        <div className="mb-6">
          <Label className="mb-2">Tourist Guide</Label>
          <div className="grid grid-cols-2 items-center gap-3">
            <div className="relative">
              <Select
                value={formData.guide}
                onValueChange={(value) => onFormDataChange("guide", value)}
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
                value={formData.guide}
                onValueChange={(value) => onFormDataChange("guide", value)}
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

        {/* Amount to Pay */}
        {(formData.adults > 0 ||
          formData.children > 0 ||
          formData.infant > 0 ||
          formData.foc > 0) && (
          <div className="mb-6">
            {/* Separator */}
            <div className="border border-dashed my-6 border-gray-300" />

            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Amount to Pay
            </h3>
            <div className="space-y-2">
              {formData.adults > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Adults:</span>
                  <span className="text-gray-900 font-medium">
                    ${ADULT_PRICE.toFixed(2)}x{formData.adults}
                  </span>
                </div>
              )}
              {formData.children > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Children:</span>
                  <span className="text-gray-900 font-medium">
                    ${CHILD_PRICE.toFixed(2)}x{formData.children}
                  </span>
                </div>
              )}
              {formData.infant > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Infant:</span>
                  <span className="text-gray-900 font-medium">
                    ${INFANT_PRICE.toFixed(2)}x{formData.infant}
                  </span>
                </div>
              )}
              {formData.foc > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">FOC:</span>
                  <span className="text-gray-900 font-medium">
                    ${FOC_PRICE.toFixed(2)}x{formData.foc}
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
              {/* Separator */}
              <div className="border border-dashed my-6 border-gray-300" />
            </div>
          </div>
        )}

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
