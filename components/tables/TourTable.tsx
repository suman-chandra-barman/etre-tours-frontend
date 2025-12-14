"use client";

import { useState } from "react";
import {
  Calendar,
  Search,
  Printer,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface TourHistoryItem {
  id: number;
  date: string;
  departureTime: string;
  tourSpot: string;
  busName: string;
  busId: string;
  driver: string;
  guide: string;
  totalPassengers: string;
  adults: number;
  children: number;
  serviceFee: string;
  status: "In Progress" | "Scheduled" | "Completed";
}

// Mock data based on the image
const mockHistoryData: TourHistoryItem[] = [
  {
    id: 1,
    date: "17 Jun, 2025",
    departureTime: "9:00 AM",
    tourSpot: "Lagoon Snorkeling",
    busName: "Island Transport",
    busId: "CN-45898",
    driver: "Michael",
    guide: "Zaire",
    totalPassengers: "39 persons",
    adults: 13,
    children: 26,
    serviceFee: "$20.00",
    status: "In Progress",
  },
  {
    id: 2,
    date: "17 Jun, 2025",
    departureTime: "9:00 AM",
    tourSpot: "Lagoon Snorkeling",
    busName: "Island Transport",
    busId: "CN-45898",
    driver: "Michael",
    guide: "Nolan",
    totalPassengers: "39 persons",
    adults: 13,
    children: 26,
    serviceFee: "$20.00",
    status: "Scheduled",
  },
  {
    id: 3,
    date: "17 Jun, 2025",
    departureTime: "9:00 AM",
    tourSpot: "Lagoon Snorkeling",
    busName: "Island Transport",
    busId: "CN-45898",
    driver: "Michael",
    guide: "Brandon",
    totalPassengers: "39 persons",
    adults: 13,
    children: 26,
    serviceFee: "$20.00",
    status: "Completed",
  },
  {
    id: 4,
    date: "17 Jun, 2025",
    departureTime: "9:00 AM",
    tourSpot: "Lagoon Snorkeling",
    busName: "Island Transport",
    busId: "CN-45898",
    driver: "Michael",
    guide: "Marilyn",
    totalPassengers: "39 persons",
    adults: 13,
    children: 26,
    serviceFee: "$20.00",
    status: "In Progress",
  },
  {
    id: 5,
    date: "17 Jun, 2025",
    departureTime: "9:00 AM",
    tourSpot: "Lagoon Snorkeling",
    busName: "Island Transport",
    busId: "CN-45898",
    driver: "Michael",
    guide: "Giana",
    totalPassengers: "39 persons",
    adults: 13,
    children: 26,
    serviceFee: "$20.00",
    status: "In Progress",
  },
  {
    id: 6,
    date: "17 Jun, 2025",
    departureTime: "9:00 AM",
    tourSpot: "Lagoon Snorkeling",
    busName: "Island Transport",
    busId: "CN-45898",
    driver: "Michael",
    guide: "Mira",
    totalPassengers: "39 persons",
    adults: 13,
    children: 26,
    serviceFee: "$20.00",
    status: "In Progress",
  },
  {
    id: 7,
    date: "17 Jun, 2025",
    departureTime: "9:00 AM",
    tourSpot: "Lagoon Snorkeling",
    busName: "Island Transport",
    busId: "CN-45898",
    driver: "Michael",
    guide: "Ryan",
    totalPassengers: "39 persons",
    adults: 13,
    children: 26,
    serviceFee: "$20.00",
    status: "In Progress",
  },
  {
    id: 8,
    date: "17 Jun, 2025",
    departureTime: "9:00 AM",
    tourSpot: "Lagoon Snorkeling",
    busName: "Island Transport",
    busId: "CN-45898",
    driver: "Michael",
    guide: "Ashlynn",
    totalPassengers: "39 persons",
    adults: 13,
    children: 26,
    serviceFee: "$20.00",
    status: "In Progress",
  },
  {
    id: 9,
    date: "17 Jun, 2025",
    departureTime: "9:00 AM",
    tourSpot: "Lagoon Snorkeling",
    busName: "Island Transport",
    busId: "CN-45898",
    driver: "Michael",
    guide: "Phillip",
    totalPassengers: "39 persons",
    adults: 13,
    children: 26,
    serviceFee: "$20.00",
    status: "In Progress",
  },
  {
    id: 10,
    date: "17 Jun, 2025",
    departureTime: "9:00 AM",
    tourSpot: "Lagoon Snorkeling",
    busName: "Island Transport",
    busId: "CN-45898",
    driver: "Michael",
    guide: "Talan",
    totalPassengers: "39 persons",
    adults: 13,
    children: 26,
    serviceFee: "$20.00",
    status: "In Progress",
  },
  {
    id: 11,
    date: "17 Jun, 2025",
    departureTime: "9:00 AM",
    tourSpot: "Lagoon Snorkeling",
    busName: "Island Transport",
    busId: "CN-45898",
    driver: "Michael",
    guide: "Kaiya",
    totalPassengers: "39 persons",
    adults: 13,
    children: 26,
    serviceFee: "$20.00",
    status: "In Progress",
  },
  {
    id: 12,
    date: "17 Jun, 2025",
    departureTime: "9:00 AM",
    tourSpot: "Lagoon Snorkeling",
    busName: "Island Transport",
    busId: "CN-45898",
    driver: "Michael",
    guide: "Alfredo",
    totalPassengers: "39 persons",
    adults: 13,
    children: 26,
    serviceFee: "$20.00",
    status: "In Progress",
  },
  {
    id: 13,
    date: "17 Jun, 2025",
    departureTime: "9:00 AM",
    tourSpot: "Lagoon Snorkeling",
    busName: "Island Transport",
    busId: "CN-45898",
    driver: "Michael",
    guide: "Abram",
    totalPassengers: "39 persons",
    adults: 13,
    children: 26,
    serviceFee: "$20.00",
    status: "In Progress",
  },
  {
    id: 14,
    date: "17 Jun, 2025",
    departureTime: "9:00 AM",
    tourSpot: "Lagoon Snorkeling",
    busName: "Island Transport",
    busId: "CN-45898",
    driver: "Michael",
    guide: "Brandon",
    totalPassengers: "39 persons",
    adults: 13,
    children: 26,
    serviceFee: "$20.00",
    status: "In Progress",
  },
  {
    id: 15,
    date: "17 Jun, 2025",
    departureTime: "9:00 AM",
    tourSpot: "Lagoon Snorkeling",
    busName: "Island Transport",
    busId: "CN-45898",
    driver: "Michael",
    guide: "Anika",
    totalPassengers: "39 persons",
    adults: 13,
    children: 26,
    serviceFee: "$20.00",
    status: "In Progress",
  },
];

export default function TourTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("Any time");
  const [selectedTourZone, setSelectedTourZone] = useState("Select tour zone");
  const [selectedBusId, setSelectedBusId] = useState("Filter by bus ID");
  const [selectedDriver, setSelectedDriver] = useState("Select driver");
  const [selectedGuide, setSelectedGuide] = useState("Select guide");
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = mockHistoryData;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-purple-100 text-purple-700";
      case "Scheduled":
        return "bg-red-100 text-red-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-auto">
        <div className="max-w-[1920px] mx-auto p-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6 no-print">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-gray-900">Tours</h1>
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>

          {/* Filters Section */}
          <div className="p-4 mb-4 no-print">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-wrap gap-3">
                {/* Date Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="DD/MM/YY"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="pl-4 pr-10 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-36"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                {/* Time Dropdown */}
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10 bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_16px] cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  }}
                >
                  <option>Any time</option>
                  <option>Morning (6-12)</option>
                  <option>Afternoon (12-18)</option>
                  <option>Evening (18-24)</option>
                </select>

                {/* Tour Zone Dropdown */}
                <select
                  value={selectedTourZone}
                  onChange={(e) => setSelectedTourZone(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10 bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_16px] cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  }}
                >
                  <option>Select tour zone</option>
                  <option>Lagoon Snorkeling</option>
                  <option>Island Hopping</option>
                  <option>City Tour</option>
                </select>

                {/* Bus ID Dropdown */}
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
                  <option>CN-45899</option>
                  <option>CN-45900</option>
                </select>

                {/* Driver Dropdown */}
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
                  <option>John</option>
                  <option>David</option>
                </select>

                {/* Guide Dropdown */}
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
                  <option>James</option>
                </select>

                {/* Status Dropdown */}
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10 bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_16px] cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  }}
                >
                  <option>Status</option>
                  <option>In Progress</option>
                  <option>Scheduled</option>
                  <option>Completed</option>
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

          {/* Table Section */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden print-area">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Departure Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Tour Spot
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Bus Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Bus ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Driver
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Guide
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Total Passengers
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Adults
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Children
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Service fee
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentData.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.date}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.departureTime}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.tourSpot}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.busName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.busId}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.driver}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.guide}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.totalPassengers}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap text-center">
                        {item.adults}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap text-center">
                        {item.children}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.serviceFee}
                      </td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between no-print">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredData.length)} of{" "}
                {filteredData.length} entries
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
