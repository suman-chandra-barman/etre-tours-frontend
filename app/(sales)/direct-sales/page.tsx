"use client";

import { useState, useCallback } from "react";
import DirectSalesForm from "@/components/sales/forms/DirectSalesForm";
import DirectTransportInfo from "@/components/sales/transportInfo/DirectTransportInfo";
import { DirectSalesFormData } from "@/lib/schemas";

function DirectSalesPage() {
  const [currentFormData, setCurrentFormData] = useState<
    Partial<DirectSalesFormData>
  >({});

  const handleFormDataChange = useCallback(
    (data: Partial<DirectSalesFormData>) => {
      setCurrentFormData(data);
    },
    []
  );

  const handleFormSubmit = (data: DirectSalesFormData) => {
    console.log("Form submitted with data:", data);
    // Here you would typically send the data to your backend API
    // For now, we'll just log it and show a success message
  };

  return (
    <div className="flex-2 flex overflow-hidden">
      <DirectSalesForm
        onSubmit={handleFormSubmit}
        onFormDataChange={handleFormDataChange}
      />
      <DirectTransportInfo formData={currentFormData} />
    </div>
  );
}

export default DirectSalesPage;
