"use client";

import { useState } from "react";
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
  Minus,
  Plus,
  ChevronDown,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [tourDropdownOpen, setTourDropdownOpen] = useState(false);
  const [paymentDropdownOpen, setPaymentDropdownOpen] = useState(false);

  const tours = [
    "Lagoon Snorkeling",
    "Lagoon Snorkeling",
    "Lagoon Snorkeling",
    "Lagoon Snorkeling",
  ];

  const currencies = ["XPF", "USD", "AUD", "Euro"];

  const incrementCounter = (field: string) => {
    const currentValue = formData[field as keyof FormData] as number;
    onFormDataChange(field as keyof FormData, Math.min(currentValue + 1, 99));
  };

  const decrementCounter = (field: string) => {
    const currentValue = formData[field as keyof FormData] as number;
    onFormDataChange(field as keyof FormData, Math.max(currentValue - 1, 0));
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
                placeholder="Return Time"
                className="pl-10 h-11 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Tour Details */}
        <div className="mb-6">
          <Label className="mb-2">Tour Details</Label>
          <DropdownMenu
            open={tourDropdownOpen}
            onOpenChange={setTourDropdownOpen}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start h-11 font-normal"
              >
                <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                <span
                  className={
                    formData.tour ? "text-foreground" : "text-muted-foreground"
                  }
                >
                  {formData.tour || "Pick a tour spot"}
                </span>
                <ChevronDown className="w-4 h-4 ml-auto text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
              {tours.map((tour, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => onFormDataChange("tour", tour)}
                  className="flex items-center justify-between"
                >
                  {tour}
                  {formData.tour === tour && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Transport Details */}
        <div className="mb-6">
          <Label className="mb-2">Transport Details</Label>
          <div className="relative mb-3">
            <Select
              value={formData.transport}
              onValueChange={(value) => onFormDataChange("transport", value)}
            >
              <SelectTrigger className="pl-10 w-full">
                <SelectValue placeholder="Select a transport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bus 1">Bus 1</SelectItem>
                <SelectItem value="Bus 2">Bus 2</SelectItem>
                <SelectItem value="Van 1">Van 1</SelectItem>
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
                <SelectTrigger className="pl-10 w-full">
                  <SelectValue placeholder="Assign driver" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Driver 1">Driver 1</SelectItem>
                  <SelectItem value="Driver 2">Driver 2</SelectItem>
                </SelectContent>
              </Select>
              <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
            </div>

            <div className="relative">
              <Select
                value={formData.busId}
                onValueChange={(value) => onFormDataChange("busId", value)}
              >
                <SelectTrigger className="pl-10 w-full">
                  <SelectValue placeholder="Bus ID" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BUS-001">BUS-001</SelectItem>
                  <SelectItem value="BUS-002">BUS-002</SelectItem>
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
              <SelectTrigger className="pl-10 w-full">
                <SelectValue placeholder="Assign a guide" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Guide 1">Guide 1</SelectItem>
                <SelectItem value="Guide 2">Guide 2</SelectItem>
              </SelectContent>
            </Select>
            <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
          </div>
        </div>

        {/* Buyer's Details */}
        <div className="mb-6">
          <Label className="mb-2">Buyer&apos;s Details</Label>
          <div className="space-y-3">
            <div className="relative">
              <Input
                type="text"
                value={formData.fullName}
                onChange={(e) => onFormDataChange("fullName", e.target.value)}
                placeholder="Enter full name"
                className="pl-10"
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
                placeholder="Phone number"
                className="pl-10"
              />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Passenger Count */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700">Adults</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 rounded-full border-gray-600"
                    onClick={() => decrementCounter("adults")}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium w-8 text-center">
                    {formData.adults.toString().padStart(2, "0")}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 rounded-full border-gray-600"
                    onClick={() => incrementCounter("adults")}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700">Children</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 rounded-full border-gray-600"
                    onClick={() => decrementCounter("children")}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium w-8 text-center">
                    {formData.children.toString().padStart(2, "0")}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 rounded-full border-gray-600"
                    onClick={() => incrementCounter("children")}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Baby className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700">Infant</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 rounded-full border-gray-600"
                    onClick={() => decrementCounter("infant")}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium w-8 text-center">
                    {formData.infant.toString().padStart(2, "0")}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 rounded-full border-gray-600"
                    onClick={() => incrementCounter("infant")}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700">FOC</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 rounded-full border-gray-600"
                    onClick={() => decrementCounter("foc")}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium w-8 text-center">
                    {formData.foc.toString().padStart(2, "0")}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 rounded-full border-gray-600"
                    onClick={() => incrementCounter("foc")}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-8">
          <Label className="mb-2">Payment Method</Label>
          <div className="mb-3">
            <DropdownMenu
              open={paymentDropdownOpen}
              onOpenChange={setPaymentDropdownOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start h-11 font-normal"
                >
                  <CreditCard className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{formData.paymentMethod}</span>
                  <ChevronDown className="w-4 h-4 ml-auto text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                {currencies.map((currency, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => onFormDataChange("currency", currency)}
                    className="flex items-center justify-between"
                  >
                    {currency}
                    {formData.currency === currency && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Card className="p-1">
            <CardContent className="p-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="paymentType"
                  value="Cash"
                  checked={formData.paymentMethod === "Cash"}
                  onChange={() => onFormDataChange("paymentMethod", "Cash")}
                  className="w-4 h-4 text-primary"
                />
                <Banknote className="w-4 h-4 ml-3 mr-2 text-muted-foreground" />
                <span className="text-sm">Cash</span>
              </label>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" size="default">
            Cancel
          </Button>
          <Button size="default">Confirm booking</Button>
        </div>
      </div>
    </div>
  );
}
