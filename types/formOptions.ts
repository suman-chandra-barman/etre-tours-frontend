/**
 * Type definitions for form options
 * Extracted from FormOptions constants
 */

import {
  TOUR_OPTIONS,
  TRANSPORT_OPTIONS,
  DRIVER_OPTIONS,
  BUS_ID_OPTIONS,
  GUIDE_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  CURRENCY_OPTIONS,
  CARD_TYPE_OPTIONS,
} from "@/constants/FormOptions";

export type TTourOption = (typeof TOUR_OPTIONS)[number]["value"];
export type TTransportOption = (typeof TRANSPORT_OPTIONS)[number]["value"];
export type TDriverOption = (typeof DRIVER_OPTIONS)[number]["value"];
export type TBusIdOption = (typeof BUS_ID_OPTIONS)[number]["value"];
export type TGuideOption = (typeof GUIDE_OPTIONS)[number]["value"];
export type TPaymentMethodOption =
  (typeof PAYMENT_METHOD_OPTIONS)[number]["value"];
export type TCurrencyOption = (typeof CURRENCY_OPTIONS)[number]["value"];
export type TCardTypeOption = (typeof CARD_TYPE_OPTIONS)[number]["value"];
