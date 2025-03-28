import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface DataTableProps<T> {
  columns: { header: string; accessor: keyof T | string; render?: (item: T) => React.ReactNode }[];
  data: T[];
  actions: { label: string | ((item: T) => string); onClick: (item: T) => void }[];
  page: number;
  pageSize: number;
}

export const DataTable = <T,>({ columns, data, actions, page, pageSize }: DataTableProps<T>) => {
  return (
    <div className="rounded-lg border" style={{ borderColor: "#E2E8F0" }}>
      <Table>
        <TableHeader>
          <TableRow style={{ backgroundColor: "#F7FAFC" }}>
            <TableHead style={{ color: "#1A202C" }}>S.No</TableHead>
            {columns.map((column) => (
              <TableHead key={String(column.accessor)} style={{ color: "#1A202C" }}>
                {column.header}
              </TableHead>
            ))}
            <TableHead style={{ color: "#1A202C" }}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + 2}
                className="text-center"
                style={{ color: "#718096" }}
              >
                No data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => (
              <TableRow key={index} style={{ backgroundColor: "#FFFFFF" }}>
                <TableCell style={{ color: "#1A202C" }}>
                  {(page - 1) * pageSize + index + 1}
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={String(column.accessor)} style={{ color: "#1A202C" }}>
                    {column.render
                      ? column.render(item)
                      : String(item[column.accessor as keyof T])}
                  </TableCell>
                ))}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        style={{ color: "#718096" }}
                      >
                        <MoreHorizontal size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E2E8F0",
                      }}
                    >
                      {actions.map((action, idx) => (
                        <DropdownMenuItem
                          key={idx}
                          onClick={() => action.onClick(item)}
                          style={{ color: "#1A202C" }}
                        >
                          {typeof action.label === "function"
                            ? action.label(item)
                            : action.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};