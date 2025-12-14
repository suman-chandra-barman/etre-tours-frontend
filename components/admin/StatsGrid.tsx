import { StatCard } from "@/components/admin/cards/StatCard";
import { DashboardStats, StatCardData } from "@/types/admin";
import { useEffect, useState } from "react";



// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return `$${amount.toLocaleString()}`;
};

// Helper function to parse trend string and determine if positive
const parseTrend = (trendStr: string) => {
  const isPositive = !trendStr.includes("-");
  return {
    value: trendStr,
    isPositive,
  };
};

// Transform API data to card format
const getCardData = (dashboardData: DashboardStats | null): StatCardData[] => {
  if (!dashboardData) return [];

  return [
    {
      title: "TOTAL SALE",
      value: formatCurrency(dashboardData.totalSale),
      trend: parseTrend(dashboardData.trends.totalSale),
    },
    {
      title: "DIRECT SALES",
      value: formatCurrency(dashboardData.directSales),
      trend: parseTrend(dashboardData.trends.directSales),
    },
    {
      title: "CRUISE OPERATION",
      value: formatCurrency(dashboardData.cruiseOperation),
      trend: parseTrend(dashboardData.trends.cruiseOperation),
    },
    {
      title: "PARTNER BOOKING",
      value: formatCurrency(dashboardData.partnerBooking),
      trend: parseTrend(dashboardData.trends.partnerBooking),
    },
    {
      title: "TOTAL COST",
      value: formatCurrency(dashboardData.totalCost),
      trend: parseTrend(dashboardData.trends.totalCost),
    },
    {
      title: "TRANSPORT",
      value: formatCurrency(dashboardData.transport),
      trend: parseTrend(dashboardData.trends.transport),
    },
    {
      title: "SERVICE PROVIDER FEE",
      value: formatCurrency(dashboardData.serviceProviderFee),
      badge: "Fixed rate",
    },
    {
      title: "NET PROFIT",
      value: formatCurrency(dashboardData.netProfit),
      trend: parseTrend(dashboardData.trends.netProfit),
    },
  ];
};

export function StatsGrid() {
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // TODO: Replace with your actual API endpoint
        // const response = await fetch('/api/admin/dashboard');
        // const data = await response.json();
        // setDashboardData(data);

        // Mock data for demonstration (remove this when API is ready)
        const mockData: DashboardStats = {
          totalSale: 6005,
          directSales: 850,
          cruiseOperation: 4280,
          partnerBooking: 875,
          totalCost: 1250,
          transport: 850,
          serviceProviderFee: 400,
          netProfit: 1615,
          trends: {
            totalSale: "+ 36%",
            directSales: "+ 36%",
            cruiseOperation: "+ 36%",
            partnerBooking: "+ 36%",
            totalCost: "14%",
            transport: "14%",
            netProfit: "+ 26.9%",
          },
        };
        setDashboardData(mockData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  const cardData = getCardData(dashboardData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardData.map((card, index) => (
        <StatCard
          key={index}
          title={card.title}
          value={card.value}
          trend={card.trend}
          badge={card.badge}
        />
      ))}
    </div>
  );
}
