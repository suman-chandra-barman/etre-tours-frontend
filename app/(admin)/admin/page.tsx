"use client";

import { StatsGrid } from "@/components/admin/StatsGrid";

export default function AdminPage() {
  return (
    <div className="flex-1 overflow-auto p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hey, Evelyn!</h1>
          <p className="text-gray-600 mt-2">Here’s what’s happening today</p>
        </div>

        {/* Stats Grid */}
        <StatsGrid />
      </div>
    </div>
  );
}
