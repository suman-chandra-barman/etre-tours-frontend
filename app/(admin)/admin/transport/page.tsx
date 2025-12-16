"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import TransportTable from "@/components/tables/TransportTable";
import AddTransportModal from "@/components/modals/AddTransportModal";

export default function TransportPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTransport = (data: {
    transportName: string;
    transportId: string;
  }) => {
    console.log("New transport added:", data);
    // Here you can add API call to save the transport data
  };

  return (
    <div className="flex-1 overflow-auto p-8 bg-gray-50">
      <AdminHeader />
      <div className="mt-6">
        <TransportTable onAddTransport={() => setIsModalOpen(true)} />
      </div>

      <AddTransportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTransport}
      />
    </div>
  );
}
