"use client";

import { useState } from "react";
import { Search, Printer, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface TransportItem {
  id: number;
  companyName: string;
  transportId: string;
  passengerSeat: string;
  driver?: string;
  guide?: string;
}

// Mock data based on the Transport List design
const mockTransportData: TransportItem[] = [
  {
    id: 1,
    companyName: "Tropical Transit",
    transportId: "CN-45898",
    passengerSeat: "41 pax",
  },
  {
    id: 2,
    companyName: "Coastal Commute",
    transportId: "SE-45898",
    passengerSeat: "41 pax",
  },
  {
    id: 3,
    companyName: "Seaside Shuttle",
    transportId: "CN-45898",
    passengerSeat: "41 pax",
  },
  {
    id: 4,
    companyName: "Lagoon Link",
    transportId: "CN-45898",
    passengerSeat: "41 pax",
  },
  {
    id: 5,
    companyName: "Harbor Hop",
    transportId: "CN-45898",
    passengerSeat: "41 pax",
  },
  {
    id: 6,
    companyName: "Bay Breeze Transport",
    transportId: "SE-45898",
    passengerSeat: "41 pax",
  },
  {
    id: 7,
    companyName: "Island Express",
    transportId: "CN-45898",
    passengerSeat: "41 pax",
  },
  {
    id: 8,
    companyName: "Cove Cruiser",
    transportId: "CN-45898",
    passengerSeat: "41 pax",
  },
  {
    id: 9,
    companyName: "Reef Ride",
    transportId: "SE-45898",
    passengerSeat: "41 pax",
  },
  {
    id: 10,
    companyName: "Vista Voyage",
    transportId: "SE-45898",
    passengerSeat: "41 pax",
  },
];

interface TransportTableProps {
  onAddTransport: () => void;
}

export default function TransportTable({
  onAddTransport,
}: TransportTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBusId, setSelectedBusId] = useState("Filter by bus ID");
  const [selectedDriver, setSelectedDriver] = useState("Select driver");
  const [selectedGuide, setSelectedGuide] = useState("Select guide");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = mockTransportData.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      item.companyName.toLowerCase().includes(searchLower) ||
      item.transportId.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Transport List
          </h2>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onAddTransport}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-600 hover:bg-blue-50 px-6 py-1 rounded-full text-sm font-medium transition-colors"
            >
              <span className="text-lg">+</span>
              Add Transport
            </Button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-wrap gap-3">
              {/* Filter Dropdowns */}
              <select
                value={selectedBusId}
                onChange={(e) => setSelectedBusId(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10 bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_16px] cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                }}
              >
                <option>Filter by bus ID</option>
                <option>CN-45898</option>
                <option>SE-45898</option>
              </select>

              <select
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10 bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_16px] cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                }}
              >
                <option>Select driver</option>
                <option>Michael</option>
                <option>James</option>
              </select>

              <select
                value={selectedGuide}
                onChange={(e) => setSelectedGuide(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10 bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_16px] cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                }}
              >
                <option>Select guide</option>
                <option>Daniel</option>
                <option>Sarah</option>
              </select>
            </div>
            {/* Apply Filter Button */}
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
              Apply filter
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transport ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Passenger Seat
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">
                        A
                      </span>
                    </div>
                    <span className="text-sm text-gray-900">
                      {item.companyName}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {item.transportId}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {item.passengerSeat}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-200 flex items-center justify-end gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 rounded-lg transition-colors ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
        {totalPages > 3 && <span className="px-2 text-gray-400">...</span>}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
