import {
  type DirectSalesFormData,
  type CruiseSalesFormData,
  type PartnerSalesFormData,
} from "@/lib/schemas";

export const directSalesDefaultValues: Partial<DirectSalesFormData> = {
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
};

export const cruiseSalesDefaultValues: Partial<CruiseSalesFormData> = {
  date: "",
  departureTime: "",
  returnTime: "",
  tour: "",
  transport: "",
  driver: "",
  busId: "",
  guide: "",
  extraGuide: "",
  adults: 0,
  children: 0,
  infant: 0,
  foc: 0,
  additionalTransports: [],
};

export const partnerSalesDefaultValues: Partial<PartnerSalesFormData> = {
  date: "",
  time: "",
  tour: "",
  transport: "",
  driver: "",
  busId: "",
  guide: "",
  extraGuide: "",
  adults: 0,
  children: 0,
  infant: 0,
  foc: 0,
  partner: "",
  partnerType: "",
  paymentMethod: "card",
  currency: "",
};

export default {
  directSalesDefaultValues,
  cruiseSalesDefaultValues,
  partnerSalesDefaultValues,
};
