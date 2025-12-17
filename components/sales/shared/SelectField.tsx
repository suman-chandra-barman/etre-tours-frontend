import React from "react";
import { FieldError } from "react-hook-form";
import { LucideIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFieldProps {
  label?: string;
  icon?: LucideIcon;
  value: string;
  onValueChange: (value: string) => void;
  options: ReadonlyArray<{ readonly value: string; readonly label: string }>;
  placeholder: string;
  error?: FieldError;
  className?: string;
}

export function SelectField({
  label,
  icon: Icon,
  value,
  onValueChange,
  options,
  placeholder,
  error,
  className = "",
}: SelectFieldProps) {
  return (
    <div className={className}>
      {label && <Label className="mb-2">{label}</Label>}
      <div className="relative">
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger
            className={`${
              Icon ? "pl-10" : ""
            } w-full h-11 border-gray-400 rounded ${
              error ? "border-red-500" : ""
            }`}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
        )}
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
      </div>
    </div>
  );
}
