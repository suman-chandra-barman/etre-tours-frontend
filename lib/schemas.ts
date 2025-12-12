import { z } from "zod";
import {
  TOUR_OPTIONS,
  TRANSPORT_OPTIONS,
  DRIVER_OPTIONS,
  BUS_ID_OPTIONS,
  GUIDE_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  CURRENCY_OPTIONS,
  CARD_TYPE_OPTIONS,
  PARTNER_OPTIONS,
  PARTNER_TYPE_OPTIONS,
} from "@/constants/FormOptions";

// Create union types from the options
const tourValues = TOUR_OPTIONS.map((option) => option.value);
const transportValues = TRANSPORT_OPTIONS.map((option) => option.value);
const driverValues = DRIVER_OPTIONS.map((option) => option.value);
const busIdValues = BUS_ID_OPTIONS.map((option) => option.value);
const guideValues = GUIDE_OPTIONS.map((option) => option.value);
const paymentMethodValues = PAYMENT_METHOD_OPTIONS.map(
  (option) => option.value
);
const currencyValues = CURRENCY_OPTIONS.map((option) => option.value);
const cardTypeValues = CARD_TYPE_OPTIONS.map((option) => option.value);
const partnerValues = PARTNER_OPTIONS.map((option) => option.value);
const partnerTypeValues = PARTNER_TYPE_OPTIONS.map((option) => option.value);

export const directSalesSchema = z
  .object({
    date: z.string().min(1, "Date is required"),
    departureTime: z.string().min(1, "Departure time is required"),
    returnTime: z.string().min(1, "Return time is required"),
    tour: z.enum(tourValues as [string, ...string[]], {
      message: "Please select a valid tour",
    }),
    transport: z.enum(transportValues as [string, ...string[]], {
      message: "Please select a valid transport",
    }),
    driver: z.enum(driverValues as [string, ...string[]], {
      message: "Please select a valid driver",
    }),
    busId: z.enum(busIdValues as [string, ...string[]], {
      message: "Please select a valid bus ID",
    }),
    guide: z.enum(guideValues as [string, ...string[]], {
      message: "Please select a valid guide",
    }),
    fullName: z.string().min(1, "Full name is required").trim(),
    phoneNumber: z.string().min(1, "Phone number is required").trim(),
    adults: z.number().min(0).max(99),
    children: z.number().min(0).max(99),
    infant: z.number().min(0).max(99),
    foc: z.number().min(0).max(99),
    paymentMethod: z.enum(paymentMethodValues as [string, ...string[]], {
      message: "Please select a payment method",
    }),
    cardType: z.enum(cardTypeValues as [string, ...string[]]).optional(),
    currency: z.enum(currencyValues as [string, ...string[]]).optional(),
  })
  .refine(
    (data) => {
      // At least one passenger type must be greater than 0
      return (
        data.adults > 0 || data.children > 0 || data.infant > 0 || data.foc > 0
      );
    },
    {
      message: "At least one passenger is required",
      path: ["adults"], // This will show the error on the adults field
    }
  )
  .refine(
    (data) => {
      // If payment method is card, currency is required
      if (data.paymentMethod === "card") {
        return data.currency && data.currency.length > 0;
      }
      return true;
    },
    {
      message: "Currency is required for card payments",
      path: ["currency"],
    }
  );

export type DirectSalesFormData = z.infer<typeof directSalesSchema>;

export const partnerSalesSchema = z
  .object({
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    tour: z.enum(tourValues as [string, ...string[]], {
      message: "Please select a valid tour",
    }),
    transport: z.enum(transportValues as [string, ...string[]], {
      message: "Please select a valid transport",
    }),
    driver: z.enum(driverValues as [string, ...string[]], {
      message: "Please select a valid driver",
    }),
    busId: z.enum(busIdValues as [string, ...string[]], {
      message: "Please select a valid bus ID",
    }),
    guide: z.string().min(1, "Guide is required").trim(),
    extraGuide: z.string().optional(),
    adults: z.number().min(0).max(99),
    children: z.number().min(0).max(99),
    infant: z.number().min(0).max(99),
    foc: z.number().min(0).max(99),
    partner: z.enum(partnerValues as [string, ...string[]], {
      message: "Please select a valid partner",
    }),
    partnerType: z.enum(partnerTypeValues as [string, ...string[]], {
      message: "Please select a partner type",
    }),
    paymentMethod: z.enum(paymentMethodValues as [string, ...string[]], {
      message: "Please select a payment method",
    }),
    currency: z.enum(currencyValues as [string, ...string[]]).optional(),
  })
  .refine(
    (data) => {
      // At least one passenger type must be greater than 0
      return (
        data.adults > 0 || data.children > 0 || data.infant > 0 || data.foc > 0
      );
    },
    {
      message: "At least one passenger is required",
      path: ["adults"],
    }
  )
  .refine(
    (data) => {
      // If payment method is card, currency is required
      if (data.paymentMethod === "card") {
        return data.currency && data.currency.length > 0;
      }
      return true;
    },
    {
      message: "Currency is required for card payments",
      path: ["currency"],
    }
  );

export type PartnerSalesFormData = z.infer<typeof partnerSalesSchema>;

// Cruise Sales Schema with additional transport support
export const additionalTransportSchema = z.object({
  id: z.number(),
  transport: z.enum(transportValues as [string, ...string[]], {
    message: "Please select a valid transport",
  }),
  driver: z.enum(driverValues as [string, ...string[]], {
    message: "Please select a valid driver",
  }),
  busId: z.enum(busIdValues as [string, ...string[]], {
    message: "Please select a valid bus ID",
  }),
  adults: z.number().min(0).max(99),
  children: z.number().min(0).max(99),
  infant: z.number().min(0).max(99),
  foc: z.number().min(0).max(99),
  guide: z.enum(guideValues as [string, ...string[]], {
    message: "Please select a valid guide",
  }),
  extraGuide: z.string().optional(),
});

export const cruiseSalesSchema = z
  .object({
    date: z.string().min(1, "Date is required"),
    departureTime: z.string().min(1, "Departure time is required"),
    returnTime: z.string().min(1, "Return time is required"),
    tour: z.enum(tourValues as [string, ...string[]], {
      message: "Please select a valid tour",
    }),
    transport: z.enum(transportValues as [string, ...string[]], {
      message: "Please select a valid transport",
    }),
    driver: z.enum(driverValues as [string, ...string[]], {
      message: "Please select a valid driver",
    }),
    busId: z.enum(busIdValues as [string, ...string[]], {
      message: "Please select a valid bus ID",
    }),
    guide: z.enum(guideValues as [string, ...string[]], {
      message: "Please select a valid guide",
    }),
    extraGuide: z.string().optional(),
    adults: z.number().min(0).max(99),
    children: z.number().min(0).max(99),
    infant: z.number().min(0).max(99),
    foc: z.number().min(0).max(99),
    additionalTransports: z.array(additionalTransportSchema).optional(),
  })
  .refine(
    (data) => {
      // At least one passenger type must be greater than 0 in main transport
      return (
        data.adults > 0 || data.children > 0 || data.infant > 0 || data.foc > 0
      );
    },
    {
      message: "At least one passenger is required",
      path: ["adults"],
    }
  );

export type CruiseSalesFormData = z.infer<typeof cruiseSalesSchema>;
export type AdditionalTransport = z.infer<typeof additionalTransportSchema>;
