"use client";

import { useState } from "react";
import Header from "@/components/shared/Header";
import CruiseSalesForm from "@/components/sales/forms/CruiseSalesForm";
import CruiseTransportInfo from "@/components/sales/CruiseTransportInfo";

interface AdditionalTransport {
  id: number;
  transport: string;
  driver: string;
  busId: string;
  adults: number;
  children: number;
  infant: number;
  foc: number;
  guide: string;
  extraGuide: string;
}

function CruiseSalesPage() {
  const [formData, setFormData] = useState({
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
    paymentMethod: "Card Payment",
    currency: "USD",
  });

  const [additionalTransports, setAdditionalTransports] = useState<
    AdditionalTransport[]
  >([]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdditionalTransportsChange = (
    transports: AdditionalTransport[]
  ) => {
    setAdditionalTransports(transports);
  };

  return (
    <>
      <Header />
      <div className="flex-2 flex overflow-hidden">
        <CruiseSalesForm
          formData={formData}
          onFormDataChange={handleInputChange}
          onAdditionalTransportsChange={handleAdditionalTransportsChange}
        />
        <CruiseTransportInfo
          formData={formData}
          additionalTransports={additionalTransports}
        />
      </div>
    </>
  );
}

export default CruiseSalesPage;
