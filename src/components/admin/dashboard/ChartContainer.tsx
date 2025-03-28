import React from "react";

interface ChartContainerProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div
      className="stat-card rounded-lg p-5 shadow-sm"
      style={{
        backgroundColor: "#FFFFFF", // White background
        border: "1px solid #E2E8F0", // Light gray border
      }}
    >
      <div className="mb-4">
        <h3
          className="font-medium"
          style={{ color: "#1A202C" }} // Dark gray
        >
          {title}
        </h3>
        <p
          className="text-sm"
          style={{ color: "#718096" }} // Medium gray
        >
          {subtitle}
        </p>
      </div>
      <div className="h-[250px]">{children}</div>
    </div>
  );
};
