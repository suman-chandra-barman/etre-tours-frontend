"use client";

import { useState } from "react";
import Sidebar from "@/components/shared/Sidebar";
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
    currency: "USD",
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex">
        <DirectSalesFormSection
          formData={formData}
          onFormDataChange={handleInputChange}
        />
        <TransportInfo />
      </div>
    </div>
  );
}

export default DirectSalesPage;
