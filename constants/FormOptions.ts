/**
 * Form options constants for sales forms
 * Centralized location for all dropdown/select options
 */

export const TOUR_OPTIONS = [
  { value: "lagoon-snorkeling", label: "Lagoon Snorkeling" },
  { value: "island-tour", label: "Island Tour" },
  { value: "sunset-cruise", label: "Sunset Cruise" },
  { value: "diving-experience", label: "Diving Experience" },
] as const;

export const TRANSPORT_OPTIONS = [
  { value: "bus-1", label: "Bus 1" },
  { value: "bus-2", label: "Bus 2" },
  { value: "van-1", label: "Van 1" },
  { value: "van-2", label: "Van 2" },
] as const;

export const DRIVER_OPTIONS = [
  { value: "driver-1", label: "Driver 1" },
  { value: "driver-2", label: "Driver 2" },
  { value: "driver-3", label: "Driver 3" },
] as const;

export const BUS_ID_OPTIONS = [
  { value: "BUS-001", label: "BUS-001" },
  { value: "BUS-002", label: "BUS-002" },
  { value: "VAN-001", label: "VAN-001" },
  { value: "VAN-002", label: "VAN-002" },
] as const;

export const GUIDE_OPTIONS = [
  { value: "guide-1", label: "Guide 1" },
  { value: "guide-2", label: "Guide 2" },
  { value: "guide-3", label: "Guide 3" },
] as const;

export const PAYMENT_METHOD_OPTIONS = [
  { value: "card", label: "Card Payment" },
  { value: "cash", label: "Cash" },
  { value: "bankTransfer", label: "Bank Transfer" },
  { value: "cheque", label: "Cheque" },
] as const;

export const CARD_TYPE_OPTIONS = [
  { value: "visa", label: "Visa" },
  { value: "mastercard", label: "Mastercard" },
  { value: "amex", label: "American Express" },
  { value: "discover", label: "Discover" },
] as const;

export const CURRENCY_OPTIONS = [
  { value: "XPF", label: "XPF" },
  { value: "USD", label: "USD" },
  { value: "AUD", label: "AUD" },
  { value: "EUR", label: "Euro" },
] as const;

export const PARTNER_OPTIONS = [
  { value: "ocean-view-hotel", label: "Ocean View Hotel (Hotel Partner)" },
  { value: "sunset-resort", label: "Sunset Resort (Hotel Partner)" },
  { value: "island-travel", label: "Island Travel (Travel Agency)" },
  { value: "pacific-tours", label: "Pacific Tours (Tour Operator)" },
] as const;

export const PARTNER_TYPE_OPTIONS = [
  { value: "hotel", label: "Hotel Partner" },
  { value: "travel-agency", label: "Travel Agency" },
  { value: "tour-operator", label: "Tour Operator" },
  { value: "other", label: "Other" },
] as const;
