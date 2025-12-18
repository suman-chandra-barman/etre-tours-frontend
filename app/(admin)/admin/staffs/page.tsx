/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Printer, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/admin/cards/StatCard";
import StaffTable from "@/components/tables/StaffTable";
import AddStaffModal from "@/components/modals/AddStaffModal";
import { Staff, StaffStats, StatCardData } from "@/types/admin";
import AdminHeader from "@/components/admin/AdminHeader";
import styles from "@/components/styles/Print.module.css";

// Mock data for demonstration
const mockStats: StaffStats = {
  totalStaff: 100,
  todaysStaff: 90,
  activeStaffs: 90,
  offline: 10,
};

const mockStaffData: Staff[] = [
  {
    id: "STF-ID11202",
    name: "Mira",
    role: "Guide",
    contact: "+1 (212) 555-1234",
    secondaryContact: "+1 (212) 555-1234",
    email: "example@gmail.com",
  },
  {
    id: "STF-ID11202",
    name: "Ashlynn",
    role: "Driver",
    contact: "+1 (212) 555-1234",
    secondaryContact: "+1 (212) 555-1234",
    email: "example@gmail.com",
  },
  {
    id: "STF-ID11202",
    name: "James",
    role: "Driver",
    contact: "+1 (212) 555-1234",
    secondaryContact: "+1 (212) 555-1234",
    email: "example@gmail.com",
  },
  {
    id: "STF-ID11202",
    name: "Gustavo",
    role: "Guide",
    contact: "+1 (212) 555-1234",
    secondaryContact: "+1 (212) 555-1234",
    email: "example@gmail.com",
  },
  {
    id: "STF-ID11202",
    name: "Tatiana",
    role: "Guide",
    contact: "+1 (212) 555-1234",
    secondaryContact: "+1 (212) 555-1234",
    email: "example@gmail.com",
  },
  {
    id: "STF-ID11202",
    name: "Jaxson",
    role: "Driver",
    contact: "+1 (212) 555-1234",
    secondaryContact: "+1 (212) 555-1234",
    email: "example@gmail.com",
  },
  {
    id: "STF-ID11202",
    name: "Martin",
    role: "Guide",
    contact: "+1 (212) 555-1234",
    secondaryContact: "+1 (212) 555-1234",
    email: "example@gmail.com",
  },
  {
    id: "STF-ID11202",
    name: "Kaiya",
    role: "Driver",
    contact: "+1 (212) 555-1234",
    secondaryContact: "+1 (212) 555-1234",
    email: "example@gmail.com",
  },
];

export default function StaffsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffData, setStaffData] = useState<Staff[]>(mockStaffData);
  const [stats] = useState<StaffStats>(mockStats);

  const statsCards: StatCardData[] = [
    {
      title: "TOTAL STAFF",
      value: stats.totalStaff,
      badge: "Present",
    },
    {
      title: "TODAY'S STAFF",
      value: stats.todaysStaff,
      badge: "Present",
    },
    {
      title: "ACTIVE STAFFS",
      value: stats.activeStaffs,
    },
    {
      title: "OFFLINE",
      value: stats.offline,
    },
  ];

  const handleAddStaff = (newStaff: any) => {
    const staff: Staff = {
      id: newStaff.staffId,
      name: newStaff.name,
      role: newStaff.role,
      contact: newStaff.phoneNumber,
      secondaryContact: newStaff.secondaryContact,
      email: newStaff.email,
      address: newStaff.address,
      hireDate: newStaff.hireDate,
      status: newStaff.status,
      employmentType: newStaff.employmentType,
    };
    setStaffData([...staffData, staff]);
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 overflow-auto p-8 bg-gray-50">
      {/* Header Section */}
      <div
        className={`mb-6 flex items-center justify-between ${styles.noPrint}`}
      >
        <AdminHeader />
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Staff
        </Button>
      </div>

      {/* Stats Cards */}
      <div
        className={`grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 ${styles.noPrint}`}
      >
        {statsCards.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            trend={card.trend}
            badge={card.badge}
          />
        ))}
      </div>

      {/* Staff Table Section */}
      <Card className="bg-white">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Staff&#39;s</h2>
            <button
              onClick={() => window.print()}
              className={`flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium ${styles.noPrint}`}
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
          <div className={`mt-4 flex items-center gap-4 ${styles.noPrint}`}>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-gray-300"
            >
              Select role
              <ChevronDown className="w-4 h-4" />
            </Button>
            <Button className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-6">
              Apply filter
            </Button>
          </div>
        </div>

        <div className={styles.printArea}>
          <StaffTable staffData={staffData} />
        </div>
      </Card>

      {/* Add Staff Modal */}
      <AddStaffModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddStaff}
      />
    </div>
  );
}
