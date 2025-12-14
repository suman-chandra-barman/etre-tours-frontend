"use client";

import { useState } from "react";
import {
  Calendar,
  Search,
  Printer,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import styles from "@/components/styles/modals/PrintModal.module.css";

interface FinanceItem {
  id: number;
  date: string;
  time: string;
  tour: string;
  transport: string;
  transportId: string;
  driver: string;
  guide: string;
  buyerName: string;
  contact: string;
  adults: number;
  children: number;
  totalAmount: string;
}

// Mock data based on the Finance table design
const mockFinanceData: FinanceItem[] = [
  {
    id: 1,
    date: "17 Jun, 2025",
    time: "9:00 AM",
    tour: "Sunset Cruise",
    transport: "Bus",
    transportId: "TNI 2241",
    driver: "Michael",
    guide: "Daniel",
    buyerName: "Mira",
    contact: "+1 (212) 555-1234",
    adults: 2,
    children: 1,
    totalAmount: "$120.00",
  },
  {
    id: 2,
    date: "17 Jun, 2025",
    time: "9:00 AM",
    tour: "Island Tour",
    transport: "Bus",
    transportId: "TNI 2241",
    driver: "Michael",
    guide: "Daniel",
    buyerName: "Ashlynn",
    contact: "+1 (212) 555-1234",
    adults: 1,
    children: 1,
    totalAmount: "$120.00",
  },
  {
    id: 3,
    date: "17 Jun, 2025",
    time: "9:00 AM",
    tour: "Island Tour",
    transport: "Bus",
    transportId: "TNI 2241",
    driver: "Michael",
    guide: "Daniel",
    buyerName: "James",
    contact: "+1 (212) 555-1234",
    adults: 2,
    children: 1,
    totalAmount: "$120.00",
  },
  {
    id: 4,
    date: "17 Jun, 2025",
    time: "9:00 AM",
    tour: "Jungle Trek",
    transport: "Bus",
    transportId: "TNI 2241",
    driver: "Michael",
    guide: "Daniel",
    buyerName: "Gustavo",
    contact: "+1 (212) 555-1234",
    adults: 2,
    children: 1,
    totalAmount: "$120.00",
  },
  {
    id: 5,
    date: "17 Jun, 2025",
    time: "9:00 AM",
    tour: "Whale Watching",
    transport: "Bus",
    transportId: "TNI 2241",
    driver: "Michael",
    guide: "Daniel",
    buyerName: "Tatiana",
    contact: "+1 (212) 555-1234",
    adults: 2,
    children: 1,
    totalAmount: "$120.00",
  },
  {
    id: 6,
    date: "17 Jun, 2025",
    time: "9:00 AM",
    tour: "Sunset Dinner",
    transport: "Bus",
    transportId: "TNI 2241",
    driver: "Michael",
    guide: "Daniel",
    buyerName: "Jaxson",
    contact: "+1 (212) 555-1234",
    adults: 2,
    children: 1,
    totalAmount: "$120.00",
  },
  {
    id: 7,
    date: "17 Jun, 2025",
    time: "9:00 AM",
    tour: "Cave Exploring",
    transport: "Bus",
    transportId: "TNI 2241",
    driver: "Michael",
    guide: "Daniel",
    buyerName: "Martin",
    contact: "+1 (212) 555-1234",
    adults: 2,
    children: 1,
    totalAmount: "$120.00",
  },
  {
    id: 8,
    date: "17 Jun, 2025",
    time: "9:00 AM",
    tour: "Sunset Hike",
    transport: "Bus",
    transportId: "TNI 2241",
    driver: "Michael",
    guide: "Daniel",
    buyerName: "Kaiya",
    contact: "+1 (212) 555-1234",
    adults: 2,
    children: 1,
    totalAmount: "$120.00",
  },
  {
    id: 9,
    date: "17 Jun, 2025",
    time: "9:00 AM",
    tour: "Jungle Cruise",
    transport: "Bus",
    transportId: "TNI 2241",
    driver: "Michael",
    guide: "Daniel",
    buyerName: "Talan",
    contact: "+1 (212) 555-1234",
    adults: 2,
    children: 1,
    totalAmount: "$120.00",
  },
  {
    id: 10,
    date: "17 Jun, 2025",
    time: "9:00 AM",
    tour: "Reef Snorkeling",
    transport: "Bus",
    transportId: "TNI 2241",
    driver: "Michael",
    guide: "Daniel",
    buyerName: "Jordyn",
    contact: "+1 (212) 555-1234",
    adults: 2,
    children: 1,
    totalAmount: "$120.00",
  },
];

export default function FinanceTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("Any time");
  const [selectedTourZone, setSelectedTourZone] = useState("Select tour zone");
  const [selectedBusId, setSelectedBusId] = useState("Filter by bus ID");
  const [selectedDriver, setSelectedDriver] = useState("Select driver");
  const [selectedGuide, setSelectedGuide] = useState("Select guide");
  const [selectedSaleType, setSelectedSaleType] = useState("Sale type (All)");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = mockFinanceData;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col bg-gray-50">
      <div className="flex-1 overflow-auto">
        {/* Header Section */}
        <div
          className={`flex items-center justify-between mb-6 ${styles.noPrint}`}
        >
          <h2 className="text-2xl font-semibold text-gray-900">Finance</h2>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>

        {/* Filters Section */}
        <div className={`mb-4 ${styles.noPrint}`}>
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
                <option>TNI 2241</option>
                <option>TNI 2242</option>
                <option>TNI 2243</option>
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

              {/* Sale Type Dropdown */}
              <select
                value={selectedSaleType}
                onChange={(e) => setSelectedSaleType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10 bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_16px] cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                }}
              >
                <option>Sale type (All)</option>
                <option>Direct Sales</option>
                <option>Partner Sales</option>
                <option>Cruise Sales</option>
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
        <div
          className={`bg-white rounded-xl border border-gray-200 overflow-hidden ${styles.printArea}`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Tour
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Transport
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Transport ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Driver
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Guide
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Buyer Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Adults
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Children
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Total Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {item.time}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {item.tour}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {item.transport}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {item.transportId}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {item.driver}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {item.guide}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {item.buyerName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {item.contact}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap text-center">
                      {item.adults}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap text-center">
                      {item.children}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {item.totalAmount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div
            className={`px-4 py-3 border-t border-gray-200 flex items-center justify-between ${styles.noPrint}`}
          >
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredData.length)} of {filteredData.length}{" "}
              entries
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
  );
}
