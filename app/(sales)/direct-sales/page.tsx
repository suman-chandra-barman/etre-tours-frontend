"use client";

import { useState } from "react";
import Header from "@/components/shared/Header";
import DirectSalesFormSection from "@/components/sales/forms/DirectSalesForm";
import TransportInfo from "@/components/sales/TransportInfo";

function DirectSalesPage() {
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
    currency: "",
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Header />
      <div className="flex-2 flex overflow-hidden">
        <DirectSalesFormSection
          formData={formData}
          onFormDataChange={handleInputChange}
        />
        <TransportInfo />
      </div>
    </>
  );
}

export default DirectSalesPage;
