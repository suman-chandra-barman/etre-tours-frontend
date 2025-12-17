"use client";

import { useState, useCallback } from "react";
import PartnerSalesForm from "@/components/sales/forms/PartnerSalesForm";
import PartnerTransportInfo from "@/components/sales/transportInfo/PartnerTransportInfo";
import { PartnerSalesFormData } from "@/lib/schemas";

export default function PartnerSalesPage() {
  const [formData, setFormData] = useState<Partial<PartnerSalesFormData>>({
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
    paymentMethod: "Card Payment",
    currency: "",
  });

  const handleFormDataChange = useCallback(
    (field: string, value: string | number) => {
      setFormData((prev) => {
        if (prev[field as keyof PartnerSalesFormData] === value) {
          return prev;
        }
        return { ...prev, [field]: value };
      });
    },
    []
  );

  const handleFormSubmit = (data: PartnerSalesFormData) => {
    console.log("Form submitted with data:", data);
    setFormData(data);
    // Here you would typically send the data to your backend API
    // For now, we'll just log it and show a success message
  };

  return (
    <>
      <div className="flex-2 flex overflow-hidden">
        <PartnerSalesForm
          onSubmit={handleFormSubmit}
          onFormDataChange={handleFormDataChange}
        />
        <PartnerTransportInfo formData={formData} />
      </div>
    </>
  );
}
