import React from "react";
import { FieldError } from "react-hook-form";
import { CreditCard, Banknote, ChevronDown, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { CURRENCY_OPTIONS } from "@/constants/FormOptions";

interface PaymentMethodSelectorProps {
  paymentMethod: string;
  currency?: string;
  onPaymentMethodChange: (method: string) => void;
  onCurrencyChange?: (currency: string) => void;
  paymentMethodError?: FieldError;
  currencyError?: FieldError;
  showBankTransfer?: boolean;
  showCheque?: boolean;
}

export function PaymentMethodSelector({
  paymentMethod,
  currency,
  onPaymentMethodChange,
  onCurrencyChange,
  paymentMethodError,
  currencyError,
  showBankTransfer = false,
  showCheque = false,
}: PaymentMethodSelectorProps) {
  const [isCardPaymentExpanded, setIsCardPaymentExpanded] =
    React.useState(false);

  return (
    <div className="mb-8">
      <Label className="mb-2">Payment Method</Label>
      <div className="space-y-3">
        {/* Card Payment */}
        <div className="relative">
          <div
            className={`border border-gray-400 rounded transition-colors ${
              paymentMethodError || currencyError ? "border-red-500" : ""
            }`}
          >
            <div
              className="px-3 h-11 flex items-center justify-between cursor-pointer bg-transparent hover:bg-gray-50 rounded-lg"
              onClick={() => {
                onPaymentMethodChange("card");
                setIsCardPaymentExpanded(!isCardPaymentExpanded);
              }}
            >
              <div className="flex items-center">
                <CreditCard className="w-4 h-4 mr-2 text-muted-foreground" />
                <span
                  className={`text-sm ${
                    currency && paymentMethod === "card"
                      ? "text-gray-900"
                      : "text-gray-700"
                  }`}
                >
                  {currency && paymentMethod === "card"
                    ? CURRENCY_OPTIONS.find((c) => c.value === currency)?.label
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

          {isCardPaymentExpanded && onCurrencyChange && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {CURRENCY_OPTIONS.map((curr) => (
                <div
                  key={curr.value}
                  className={`px-3 h-10 flex items-center justify-between cursor-pointer hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                    currency === curr.value ? "bg-blue-50 text-blue-600" : ""
                  }`}
                  onClick={() => {
                    onCurrencyChange(curr.value);
                    setIsCardPaymentExpanded(false);
                  }}
                >
                  <span className="text-sm">{curr.label}</span>
                  {currency === curr.value && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </div>
              ))}
            </div>
          )}
          {(paymentMethodError || currencyError) && (
            <p className="text-red-500 text-xs mt-1">
              {paymentMethodError?.message || currencyError?.message}
            </p>
          )}
        </div>

        {/* Cash */}
        <div
          className={`border border-gray-400 rounded px-3 h-11 flex items-center justify-between cursor-pointer transition-colors ${
            paymentMethodError ? "border-red-500" : ""
          }`}
          onClick={() => {
            onPaymentMethodChange("cash");
            setIsCardPaymentExpanded(false);
          }}
        >
          <div className="flex items-center">
            <Banknote className="w-4 h-4 mr-2 text-muted-foreground" />
            <span className="text-sm text-gray-700">Cash</span>
          </div>
          <div
            className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center ${
              paymentMethod === "cash" ? "border-blue-500" : "border-gray-300"
            }`}
          >
            {paymentMethod === "cash" && (
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            )}
          </div>
        </div>

        {/* Bank Transfer */}
        {showBankTransfer && (
          <div
            className={`border border-gray-400 rounded px-3 h-11 flex items-center justify-between cursor-pointer transition-colors ${
              paymentMethodError ? "border-red-500" : ""
            }`}
            onClick={() => {
              onPaymentMethodChange("bankTransfer");
              setIsCardPaymentExpanded(false);
            }}
          >
            <div className="flex items-center">
              <CreditCard className="w-4 h-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-gray-700">Bank Transfer</span>
            </div>
            <div
              className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === "bankTransfer"
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
            >
              {paymentMethod === "bankTransfer" && (
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              )}
            </div>
          </div>
        )}

        {/* Cheque */}
        {showCheque && (
          <div
            className={`border border-gray-400 rounded px-3 h-11 flex items-center justify-between cursor-pointer transition-colors ${
              paymentMethodError ? "border-red-500" : ""
            }`}
            onClick={() => {
              onPaymentMethodChange("cheque");
              setIsCardPaymentExpanded(false);
            }}
          >
            <div className="flex items-center">
              <CreditCard className="w-4 h-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-gray-700">Cheque</span>
            </div>
            <div
              className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === "cheque"
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
            >
              {paymentMethod === "cheque" && (
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
