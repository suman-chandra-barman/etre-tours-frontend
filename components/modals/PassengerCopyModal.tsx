"use client";

import styles from "@/components/styles/Print.module.css";
import { X } from "lucide-react";

interface PassengerCopyModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    buyerName: string;
    tour: string;
    date: string;
    time: string;
    adults: number;
    children: number;
    infant: number;
    guide: string;
    transport: string;
    driver: string;
    busId: string;
    paymentMethod: string;
    totalAmount: number;
    currency: string;
    availableSeats?: number;
    bookedSeats?: number;
  };
}

export default function PassengerCopyModal({
  isOpen,
  onClose,
  bookingData,
}: PassengerCopyModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const formatPassengers = () => {
    const parts = [];
    if (bookingData.adults > 0)
      parts.push(
        `${bookingData.adults} Adult${bookingData.adults > 1 ? "s" : ""}`
      );
    if (bookingData.children > 0)
      parts.push(
        `${bookingData.children} Child${bookingData.children > 1 ? "ren" : ""}`
      );
    if (bookingData.infant > 0)
      parts.push(
        `${bookingData.infant} Infant${bookingData.infant > 1 ? "s" : ""}`
      );
    return parts.join(", ");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="modal-overlay fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div
          className={`${styles.printArea} bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`${styles.noPrint} absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Content */}
          <div className="p-8">
            <div>
              {/* Left Side - Blue Ticket Card */}
              <div className="relative w-full">
                <div className="relative overflow-hidden rounded-2xl bg-blue-600 p-8 text-white shadow-xl">
                  {/* Circular cutout at top */}
                  <div className="absolute -top-6 left-1/2 size-12 -translate-x-1/2 rounded-full bg-white"></div>

                  {/* Circular cutout at bottom */}
                  <div className="absolute -bottom-6 left-1/2 size-12 -translate-x-1/2 rounded-full bg-white"></div>

                  <div className="flex gap-8">
                    {/* Left side - Vertical text */}
                    <div className="relative flex items-center border-r-2 border-dashed border-white/40 pr-6">
                      <div className="text-[#E8F2FF] absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-xl font-medium tracking-wider">
                        Passenger&apos;s copy
                      </div>
                    </div>

                    {/* Main content */}
                    <div className="flex flex-1 gap-12">
                      {/* Left column */}
                      <div className="flex flex-col gap-6">
                        <div>
                          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-blue-200">
                            Buyer
                          </p>
                          <p className="text-lg font-semibold">
                            {bookingData.buyerName}
                          </p>
                        </div>

                        <div>
                          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-blue-200">
                            Passengers
                          </p>
                          <p className="text-lg font-semibold">
                            {formatPassengers()}
                          </p>
                        </div>

                        <div>
                          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-blue-200">
                            Guide
                          </p>
                          <p className="text-lg font-semibold">
                            {bookingData.guide}
                          </p>
                        </div>
                      </div>

                      {/* Right column */}
                      <div className="flex flex-1 flex-col gap-6 border-r-2 border-dashed border-white/40 pr-6">
                        <div>
                          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-blue-200">
                            Tour
                          </p>
                          <p className="text-lg font-semibold">
                            {bookingData.tour}
                          </p>
                          <p className="mt-0.5 text-sm text-blue-100">
                            ({formatDate(bookingData.date)}, {bookingData.time})
                          </p>
                        </div>

                        <div>
                          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-blue-200">
                            Transport
                          </p>
                          <p className="text-lg font-semibold">
                            {bookingData.transport}-{bookingData.driver}-Bus
                          </p>
                          <p className="mt-0.5 text-sm text-blue-100">
                            NC-{bookingData.busId}
                          </p>
                        </div>

                        <div>
                          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-blue-200">
                            Transport
                          </p>
                          <p className="text-lg font-semibold">
                            {bookingData.paymentMethod} - $
                            {bookingData.totalAmount.toFixed(2)} (
                            {bookingData.currency})
                          </p>
                        </div>
                      </div>

                      {/* Right side - Vertical text */}
                      <div className="relative flex items-center pl-2">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-90 whitespace-nowrap text-xs font-medium uppercase tracking-wider text-blue-200">
                          Tour Code PENDING
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className={`${styles.noPrint} flex justify-end gap-4 mt-8 pt-6 border-t`}
            >
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handlePrint}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
