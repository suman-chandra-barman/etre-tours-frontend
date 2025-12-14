"use client";

import Image from "next/image";
import logo from "@/public/logo.svg";
import styles from "@/components/styles/modals/PrintModal.module.css";

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: {
    issueDate: string;
    driver: string;
    totalAmount: string;
    adults: number;
    children: number;
  };
}

// Mock invoice details data
const mockInvoiceDetails = [
  {
    date: "17 Jun, 2025",
    tours: 2,
    passengerSeat: "41 pax",
    amount: "$120.00",
  },
  {
    date: "17 Jun, 2025",
    tours: 1,
    passengerSeat: "41 pax",
    amount: "$120.00",
  },
  {
    date: "17 Jun, 2025",
    tours: 2,
    passengerSeat: "41 pax",
    amount: "$120.00",
  },
  {
    date: "17 Jun, 2025",
    tours: 2,
    passengerSeat: "41 pax",
    amount: "$120.00",
  },
  {
    date: "17 Jun, 2025",
    tours: 2,
    passengerSeat: "41 pax",
    amount: "$120.00",
  },
];

export default function InvoiceModal({
  isOpen,
  onClose,
  invoice,
}: InvoiceModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="modal-overlay fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div
          className={`${styles.printArea} bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
        >
          {/* Modal Content */}
          <div className="p-8">
            {/* Header with Logo */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden">
                  <Image
                    src={logo}
                    alt="Logo"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>

            {/* Invoice Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Invoice</h2>

            {/* Invoice Info */}
            <div className="mb-6">
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-mono">#</span> Monthly Contractor Invoice
              </p>
              <div className="flex justify-between text-sm">
                <p className="text-gray-700">Contractor: {invoice.driver}</p>
                <p className="text-gray-700">Period: {invoice.issueDate}</p>
              </div>
              <p className="text-sm text-gray-700">Invoice No: INV-D-00925</p>
            </div>

            {/* Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                      Tours
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                      Passenger Seat
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockInvoiceDetails.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.date}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.tours}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.passengerSeat}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Amount */}
            <div className="text-right mb-8">
              <p className="text-lg">
                <span className="text-gray-700">Total Amount:</span>{" "}
                <span className="text-blue-600 font-semibold text-xl">
                  $1,200.00
                </span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className={`flex gap-3 justify-end ${styles.noPrint}`}>
              <button
                onClick={onClose}
                className="px-8 py-2.5 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePrint}
                className="px-8 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
