"use client";

import Header from "@/components/shared/Header";
import DirectSalesForm from "@/components/sales/forms/DirectSalesForm";
import TransportInfo from "@/components/sales/TransportInfo";
import { DirectSalesFormData } from "@/lib/schemas";

function DirectSalesPage() {

  const handleFormSubmit = (data: DirectSalesFormData) => {
    console.log("Form submitted with data:", data);
    // Here you would typically send the data to your backend API
    // For now, we'll just log it and show a success message
  };

  return (
    <>
      <Header />
      <div className="flex-2 flex overflow-hidden">
        <DirectSalesForm onSubmit={handleFormSubmit} />
        <TransportInfo />
      </div>
    </>
  );
}

export default DirectSalesPage;
