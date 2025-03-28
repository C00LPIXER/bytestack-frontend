import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  change: number;
  changeLabel: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  changeLabel,
}) => {
  const isPositive = change >= 0;

  return (
    <div
      className="stat-card rounded-lg p-5 shadow-sm"
      style={{
        backgroundColor: "#FFFFFF", // White background
        border: "1px solid #E2E8F0", // Light gray border
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className="text-sm"
            style={{ color: "#718096" }} // Medium gray
          >
            {title}
          </p>
          <h3
            className="text-2xl font-semibold mt-1"
            style={{ color: "#1A202C" }} // Dark gray
          >
            {value}
          </h3>
        </div>
        <Icon size={24} style={{ color: "#718096" }} />
      </div>
      <div className="flex items-center gap-1 mt-2 text-sm">
        <span
          className={cn(
            "flex items-center",
            isPositive ? "text-green-500" : "text-red-500"
          )}
        >
          {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
          {Math.abs(change)}%
        </span>
        <span style={{ color: "#718096" }}>{changeLabel}</span>
      </div>
    </div>
  );
};