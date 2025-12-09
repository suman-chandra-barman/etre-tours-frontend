"use client";

import Image from "next/image";

export default function TransportInfo() {
  return (
    <div className="min-w-md bg-gray-50 border-l border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center mb-1">
            <h3 className="font-semibold text-gray-800 text-xl">
              Island Transport Ltd
            </h3>
          </div>
          <p className="text-xs text-gray-500">24 Sep, 2025 · 9:00 AM</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 text-center">
        <div className="flex justify-center space-x-8 mb-4">
          <div className="text-center flex flex-col justify-center items-center">
            <Image
              src="/available_seat.svg"
              alt="Available Seat Icon"
              width={28}
              height={24}
            />
            <p className="text-xs text-gray-600 mb-1">Available</p>
            <p className="text-xs text-gray-600 font-medium">Seat (41)</p>
          </div>

          <div className="text-center flex flex-col justify-center items-center">
            <Image
              src="/booked_seat.svg"
              alt="Booked Seat Icon"
              width={28}
              height={24}
            />
            <p className="text-xs text-gray-600 mb-1">Booked</p>
            <p className="text-xs text-gray-600 font-medium">Seat (00)</p>
          </div>
        </div>

        <p className="text-sm text-orange-500 font-medium">
          *available seat 41
        </p>
      </div>
    </div>
  );
}
