"use client";

import { useState } from "react";
import Header from "@/components/shared/Header";
import TransportInfo from "@/components/sales/TransportInfo";
import CruiseSalesForm from "@/components/sales/forms/CruiseSalesForm";

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

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Header />
      <div className="flex-2 flex overflow-hidden">
        <CruiseSalesForm
          formData={formData}
          onFormDataChange={handleInputChange}
        />
        <TransportInfo />
      </div>
    </>
  );

}

export default CruiseSalesPage;
