"use client";

import { useState } from "react";
import CruiseSalesForm from "@/components/sales/forms/CruiseSalesForm";
import CruiseTransportInfo from "@/components/sales/transportInfo/CruiseTransportInfo";
import { CruiseSalesFormData } from "@/lib/schemas";

function CruiseSalesPage() {
  const [currentFormData, setCurrentFormData] = useState<
    Partial<CruiseSalesFormData>
  >({});

  const handleFormSubmit = (data: CruiseSalesFormData) => {
    console.log("Form submitted with data:", data);
    // Here you would typically send the data to your backend API
    // For now, we'll just log it and show a success message
  };

  return (
    <div className="flex flex-2">
      <CruiseSalesForm
        onSubmit={handleFormSubmit}
        onFormDataChange={setCurrentFormData}
      />
      <CruiseTransportInfo formData={currentFormData} />
    </div>
  );
}

export default CruiseSalesPage;
