"use client";

import { X, Truck, Hash } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddTransportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: { transportName: string; transportId: string }) => void;
}

export default function AddTransportModal({
  isOpen,
  onClose,
  onAdd,
}: AddTransportModalProps) {
  const [transportName, setTransportName] = useState("");
  const [transportId, setTransportId] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (transportName.trim() && transportId.trim()) {
      onAdd({ transportName, transportId });
      setTransportName("");
      setTransportId("");
      onClose();
    }
  };

  const handleCancel = () => {
    setTransportName("");
    setTransportId("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Add Transport
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Add essential transport information
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">
              Transport Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Transport Name */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Transport Name
                </Label>
                <div className="relative">
                  <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  <Input
                    type="text"
                    placeholder="Transport Name"
                    value={transportName}
                    onChange={(e) => setTransportName(e.target.value)}
                    className="pl-10 h-11 border-gray-400 rounded"
                  />
                </div>
              </div>

              {/* Transport ID */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Transport ID
                </Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  <Input
                    type="text"
                    placeholder="Transport ID"
                    value={transportId}
                    onChange={(e) => setTransportId(e.target.value)}
                    className="pl-10 h-11 border-gray-400 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={handleCancel}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add Transport
          </button>
        </div>
      </div>
    </div>
  );
}
