import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
  filters?: {
    label: string;
    key: string;
    options: { label: string; value: string }[];
    value: string;
    onChange: (value: string) => void;
  }[];
}

export const FilterSearch: React.FC<FilterSearchProps> = ({
  search,
  onSearchChange,
  filters,
}) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <Input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
        style={{
          borderColor: "#E2E8F0",
          color: "#1A202C",
        }}
      />
      {filters && filters.length > 0 && (
        <div className="flex items-center gap-2">
          {filters.map((filter) => (
            <div key={filter.key} className="flex items-center gap-2">
              <span style={{ color: "#1A202C" }}>{filter.label}:</span>
              <Select value={filter.value} onValueChange={filter.onChange}>
                <SelectTrigger
                  className="w-[180px]"
                  style={{
                    borderColor: "#E2E8F0",
                    color: "#1A202C",
                  }}
                >
                  <SelectValue placeholder={`Select ${filter.label}`} />
                </SelectTrigger>
                <SelectContent
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E2E8F0",
                  }}
                >
                  {filter.options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      style={{ color: "#1A202C" }}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};