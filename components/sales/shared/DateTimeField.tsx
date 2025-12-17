/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister, FieldError } from "react-hook-form";
import { CalendarIcon, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DateTimeFieldProps {
  type: "date" | "time";
  label?: string;
  name: string;
  register: UseFormRegister<any>;
  value?: string;
  error?: FieldError;
  placeholder?: string;
}

export function DateTimeField({
  type,
  label,
  name,
  register,
  value,
  error,
  placeholder,
}: DateTimeFieldProps) {
  const Icon = type === "date" ? CalendarIcon : Clock;

  return (
    <div className="space-y-2">
      {label && (
        <Label className="text-sm font-medium text-gray-700">{label}</Label>
      )}
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none z-10" />
        <Input
          type={type}
          {...register(name)}
          style={{
            colorScheme: value ? "auto" : "light",
            color: value ? "inherit" : "transparent",
          }}
          className={`pl-10 h-11 border-gray-400 rounded [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer ${
            error ? "border-red-500" : ""
          }`}
        />
        {!value && placeholder && (
          <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm">
            {placeholder}
          </span>
        )}
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
      </div>
    </div>
  );
}
