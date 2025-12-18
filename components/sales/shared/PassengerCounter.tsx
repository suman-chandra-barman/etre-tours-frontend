
import { FieldError } from "react-hook-form";
import { MinusCircle, PlusCircle, LucideIcon } from "lucide-react";

interface PassengerCounterProps {
  icon: LucideIcon;
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (value: string) => void;
  error?: FieldError;
  priceInfo?: string;
  maxWidth?: string;
}

export function PassengerCounter({
  icon: Icon,
  label,
  value,
  onIncrement,
  onDecrement,
  onChange,
  error,
  priceInfo,
  maxWidth = "w-20",
}: PassengerCounterProps) {
  return (
    <div>
      <div
        className={`border rounded px-3 py-1.5 ${
          error ? "border-red-500" : "border-gray-400"
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <Icon className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">{label}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button type="button" onClick={onDecrement}>
              <MinusCircle className="h-4 w-4 text-gray-600 hover:text-blue-500 cursor-pointer" />
            </button>
            <input
              type="number"
              value={value.toString().padStart(2, "0")}
              onChange={(e) => onChange(e.target.value)}
              className={`${maxWidth} text-center text-sm font-medium border bg-gray-200 rounded py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              min="0"
            />
            <button type="button" onClick={onIncrement}>
              <PlusCircle className="h-4 w-4 text-gray-600 hover:text-blue-500 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
      {priceInfo && (
        <p className="text-xs text-gray-500 mt-1.5 pl-0.5">{priceInfo}</p>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}
