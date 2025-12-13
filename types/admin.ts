export interface DashboardStats {
  totalSale: number;
  directSales: number;
  cruiseOperation: number;
  partnerBooking: number;
  totalCost: number;
  transport: number;
  serviceProviderFee: number;
  netProfit: number;
  trends: {
    totalSale: string;
    directSales: string;
    cruiseOperation: string;
    partnerBooking: string;
    totalCost: string;
    transport: string;
    netProfit: string;
  };
}

export interface StatCardData {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  badge?: string;
}
