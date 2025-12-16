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

export interface Staff {
  id: string;
  name: string;
  role: string;
  contact: string;
  secondaryContact: string;
  email: string;
  address?: string;
  hireDate?: string;
  status?: "active" | "inactive" | "on-leave";
  employmentType?: "full-time" | "part-time" | "contract";
}

export interface StaffStats {
  totalStaff: number;
  todaysStaff: number;
  activeStaffs: number;
  offline: number;
}
