"use client";

import { useState } from "react";
import CruiseSalesForm from "@/components/sales/forms/CruiseSalesForm";
import CruiseTransportInfo from "@/components/sales/transportInfo/CruiseTransportInfo";
import { CruiseSalesFormData } from "@/lib/schemas";
import styles from "@/components/styles/Print.module.css";

function CruiseSalesPage() {
  const [currentFormData, setCurrentFormData] = useState<
    Partial<CruiseSalesFormData>
  >({});

  const handleFormSubmit = (data: CruiseSalesFormData) => {
    console.log("Form submitted with data:", data);
    // Here you would typically send the data to your backend API
    // For now, we'll just log it and show a success message

    window.print();
  };

  return (
    <div className="flex flex-2 overflow-hidden">
      <CruiseSalesForm
        onSubmit={handleFormSubmit}
        onFormDataChange={setCurrentFormData}
      />

      <div className={`${styles.printArea}`}>
        <CruiseTransportInfo formData={currentFormData} />
      </div>
    </div>
  );
}

export default CruiseSalesPage;
