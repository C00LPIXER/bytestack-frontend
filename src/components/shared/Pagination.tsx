import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-4">
      <div
        className="text-sm text-[#718096]"
      >
        Showing {(page - 1) * pageSize + 1} to{" "}
        {Math.min(page * pageSize, totalItems)} of {totalItems} entries
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={`border-[#E2E8F0] ${
            page === 1 ? "text-[#A0AEC0]" : "text-[#c0c0c0]"
          }`}
        >
          <ChevronLeft size={16} />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className={`border-[#E2E8F0] ${
            page === totalPages ? "text-[#A0AEC0]" : "text-[#c0c0c0]"
          }`}
        >
          Next
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};