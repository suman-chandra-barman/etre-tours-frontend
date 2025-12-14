import { StatsGrid } from "@/components/admin/StatsGrid";
import { TotalRevenue } from "@/components/admin/TotalRevenue";
import TourTable from "@/components/tables/TourTable";

export default function AdminPage() {
  return (
    <div className="flex-1 overflow-auto p-8 bg-gray-50">
      {/* Header */}
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hey, Evelyn!</h1>
          <p className="text-gray-600 mt-2">
            Here&#39;s what&#39;s happening today
          </p>
        </div>
        <StatsGrid />
        <TotalRevenue />
        <TourTable />
      </div>
    </div>
  );
}
