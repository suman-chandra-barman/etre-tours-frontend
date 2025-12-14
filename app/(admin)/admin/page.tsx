import AdminHeader from "@/components/admin/AdminHeader";
import { StatsGrid } from "@/components/admin/StatsGrid";
import { TotalRevenue } from "@/components/admin/TotalRevenue";
import TourTable from "@/components/tables/TourTable";

export default function AdminPage() {
  return (
    <div className="flex-1 overflow-auto p-8 bg-gray-50">
      <div className="space-y-8">
        <AdminHeader />
        <StatsGrid />
        <TotalRevenue />
        <TourTable />
      </div>
    </div>
  );
}
