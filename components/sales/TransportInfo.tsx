"use client";

import { UserCircle2 } from "lucide-react";

export default function TransportInfo() {
  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center mb-1">
            <img
              src="https://via.placeholder.com/24"
              alt="Logo"
              className="w-6 h-6 rounded-full mr-2"
            />
            <h3 className="font-semibold text-gray-800">
              Island Transport Ltd
            </h3>
          </div>
          <p className="text-xs text-gray-500">24 Sep, 2025 · 9:00 AM</p>
        </div>
        <div className="flex items-center space-x-2">
          <UserCircle2 className="w-8 h-8 text-gray-400" />
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">Maria</p>
            <p className="text-xs text-gray-500">Counter Master</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          No transport selected
        </h4>
        <p className="text-sm text-gray-500 mb-6">N/A</p>

        <div className="flex justify-center space-x-8 mb-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-200 rounded-lg mb-2 mx-auto flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-xs text-gray-600 mb-1">Available</p>
            <p className="text-xs text-gray-600 font-medium">Seat (41)</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gray-400 rounded-lg mb-2 mx-auto"></div>
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
