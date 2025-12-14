"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Mock data - in future this will come from backend
const generateMockData = (filter: TimeFilter) => {
  switch (filter) {
    case "Week":
      return [
        { date: "Mon", label: "Mon 08", revenue: 5200 },
        { date: "Tue", label: "Tue 09", revenue: 5800 },
        { date: "Wed", label: "Wed 10", revenue: 6400 },
        { date: "Thu", label: "Thu 11", revenue: 7200 },
        { date: "Fri", label: "Fri 12", revenue: 8000 },
        { date: "Sat", label: "Sat 13", revenue: 7600 },
        { date: "Sun", label: "Sun 14", revenue: 6800 },
      ];

    case "Month":
      return [
        { date: "Mon 15", label: "Mon 15", revenue: 1200 },
        { date: "Tue 16", label: "Tue 16", revenue: 1800 },
        { date: "Wed 17", label: "Wed 17", revenue: 800 },
        { date: "Thu 18", label: "Thu 18", revenue: 600 },
        { date: "Fri 19", label: "Fri 19", revenue: 1000 },
        { date: "Sat 20", label: "Sat 20", revenue: 1800 },
        { date: "Sun 21", label: "Sun 21", revenue: 2000 },
        { date: "Mon 22", label: "Mon 22", revenue: 2200 },
        { date: "Tue 23", label: "Tue 23", revenue: 2800 },
        { date: "Wed 24", label: "Wed 24", revenue: 3200 },
        { date: "Thu 25", label: "Thu 25", revenue: 3500 },
        { date: "Fri 26", label: "Fri 26", revenue: 3800 },
        { date: "Sat 27", label: "Sat 27", revenue: 4200 },
        { date: "Sun 28", label: "Sun 28", revenue: 3000 },
        { date: "Mon 29", label: "Mon 29", revenue: 3400 },
        { date: "Tue 30", label: "Tue 30", revenue: 5800 },
        { date: "Wed 31", label: "Wed 31", revenue: 5600 },
        { date: "Thu 01", label: "Thu 01", revenue: 6000 },
        { date: "Fri 02", label: "Fri 02", revenue: 6400 },
        { date: "Sat 03", label: "Sat 03", revenue: 6000 },
        { date: "Sun 04", label: "Sun 04", revenue: 5600 },
        { date: "Mon 05", label: "Mon 05", revenue: 8200 },
        { date: "Tue 06", label: "Tue 06", revenue: 8000 },
        { date: "Wed 07", label: "Wed 07", revenue: 8400 },
        { date: "Thu 08", label: "Thu 08", revenue: 7200 },
        { date: "Fri 09", label: "Fri 09", revenue: 7600 },
        { date: "Sat 10", label: "Sat 10", revenue: 8000 },
        { date: "Sun 11", label: "Sun 11", revenue: 8400 },
      ];

    case "Quarter":
      return [
        { date: "Week 1", label: "Week 1", revenue: 15000 },
        { date: "Week 2", label: "Week 2", revenue: 18000 },
        { date: "Week 3", label: "Week 3", revenue: 22000 },
        { date: "Week 4", label: "Week 4", revenue: 25000 },
        { date: "Week 5", label: "Week 5", revenue: 28000 },
        { date: "Week 6", label: "Week 6", revenue: 32000 },
        { date: "Week 7", label: "Week 7", revenue: 35000 },
        { date: "Week 8", label: "Week 8", revenue: 38000 },
        { date: "Week 9", label: "Week 9", revenue: 42000 },
        { date: "Week 10", label: "Week 10", revenue: 45000 },
        { date: "Week 11", label: "Week 11", revenue: 48000 },
        { date: "Week 12", label: "Week 12", revenue: 52000 },
      ];

    case "Year":
      return [
        { date: "Jan", label: "January", revenue: 45000 },
        { date: "Feb", label: "February", revenue: 52000 },
        { date: "Mar", label: "March", revenue: 58000 },
        { date: "Apr", label: "April", revenue: 62000 },
        { date: "May", label: "May", revenue: 68000 },
        { date: "Jun", label: "June", revenue: 75000 },
        { date: "Jul", label: "July", revenue: 82000 },
        { date: "Aug", label: "August", revenue: 78000 },
        { date: "Sep", label: "September", revenue: 85000 },
        { date: "Oct", label: "October", revenue: 92000 },
        { date: "Nov", label: "November", revenue: 88000 },
        { date: "Dec", label: "December", revenue: 95000 },
      ];
  }
};

const getDateRange = (filter: TimeFilter): string => {
  switch (filter) {
    case "Week":
      return "DEC 08 - DEC 14";
    case "Month":
      return "OCT 01 - OCT 31";
    case "Quarter":
      return "OCT 01 - DEC 31";
    case "Year":
      return "JAN 01 - DEC 31";
  }
};

type TimeFilter = "Week" | "Month" | "Quarter" | "Year";

export function TotalRevenue() {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>("Month");
  const data = useMemo(() => generateMockData(activeFilter), [activeFilter]);
  const dateRange = useMemo(() => getDateRange(activeFilter), [activeFilter]);

  return (
    <Card className="p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Total Revenue</h2>
        <div className="flex gap-2">
          {(["Week", "Month", "Quarter", "Year"] as TimeFilter[]).map(
            (filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {filter}
              </button>
            )
          )}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">Sales Report</h3>
        <p className="text-sm text-gray-500">{dateRange}</p>
      </div>

      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value / 1000}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
              formatter={(value: number) => [
                `$${value.toLocaleString()}`,
                "Revenue",
              ]}
              labelFormatter={(label) => {
                const item = data.find((d) => d.date === label);
                return item?.label || label;
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#colorRevenue)"
              dot={false}
              activeDot={{
                r: 6,
                fill: "#6366f1",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
