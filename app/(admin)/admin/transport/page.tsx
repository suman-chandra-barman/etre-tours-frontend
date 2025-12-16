"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import TransportTable from "@/components/tables/TransportTable";
import AddTransportModal from "@/components/modals/AddTransportModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
      <div className="mb-6 flex items-center justify-between no-print">
        <AdminHeader />
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Transport
        </Button>
      </div>
      <TransportTable onAddTransport={() => setIsModalOpen(true)} />

      <AddTransportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTransport}
      />
    </div>
  );
}
