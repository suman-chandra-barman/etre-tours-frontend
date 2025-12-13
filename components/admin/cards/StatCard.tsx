import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  badge?: string;
}

export function StatCard({ title, value, trend, badge }: StatCardProps) {
  return (
    <Card className="border shadow-sm">
      <CardContent className="px-4">
        <div className="flex flex-col gap-4">
          {/* Header with title and badge */}
          <div className="flex items-start justify-between">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {title}
            </h3>
            {badge && (
              <span className="text-xs px-2 py-1 rounded bg-red-50 text-red-600 font-medium">
                {badge}
              </span>
            )}
          </div>

          {/* Value and trend */}
          <div className="flex items-end justify-between">
            <p className="text-xl font-bold text-gray-900">{value}</p>
            {trend && (
              <div
                className={cn(
                  "flex items-center gap-1 text-sm font-semibold",
                  trend.isPositive ? "text-green-500" : "text-red-500"
                )}
              >
                <span>{trend.value}</span>
                <span>{trend.isPositive ? <ArrowUp size={14}/> : <ArrowDown />}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
