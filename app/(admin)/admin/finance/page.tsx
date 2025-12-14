"use client";

import { useState } from "react";
import FinanceTable from "@/components/tables/FinanceTable";
import InvoicesTable from "@/components/tables/InvoicesTable";
import VoucherTable from "@/components/tables/VoucherTable";
import AdminHeader from "@/components/admin/AdminHeader";

type TabType = "finance" | "invoices" | "voucher";

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<TabType>("finance");

  return (
    <div className="flex-1 overflow-auto p-8 bg-gray-50">
      <AdminHeader />
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex items-center gap-1 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("finance")}
            className={`px-6 py-3 text-sm font-medium transition-colors relative ${
              activeTab === "finance"
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Finance
            {activeTab === "finance" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("invoices")}
            className={`px-6 py-3 text-sm font-medium transition-colors relative ${
              activeTab === "invoices"
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Invoices
            {activeTab === "invoices" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("voucher")}
            className={`px-6 py-3 text-sm font-medium transition-colors relative ${
              activeTab === "voucher"
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Voucher
            {activeTab === "voucher" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "finance" && <FinanceTable />}
          {activeTab === "invoices" && <InvoicesTable />}
          {activeTab === "voucher" && <VoucherTable />}
        </div>
      </div>
    </div>
  );
}
