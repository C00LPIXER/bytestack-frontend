import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/admin/layouts/Sidebar";
import { DataTable } from "@/components/shared/DataTable";
import { Pagination } from "@/components/shared/Pagination";
import { FilterSearch } from "@/components/shared/FilterSearch";
import { toast } from "sonner";
import { fetchUsers, updateUser } from "@/service/admin/api/adminApi";
import { User } from "@/types/user";
import { useDebounce } from "@/hooks/useDebounce";

const Users: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const debouncedSearch = useDebounce(search, 500); // Debounce search input

  const previousDataRef = useRef<{ users: User[]; total: number } | null>(null);

  const { data, isError, refetch } = useQuery({
    queryKey: ["users", page, pageSize, debouncedSearch, statusFilter],
    queryFn: async () => {
      const status = statusFilter === "all" ? undefined : statusFilter;
      const newData = await fetchUsers(page, pageSize, debouncedSearch, status);
      previousDataRef.current = newData;
      return newData;
    },
    staleTime: 3000,
  });

  const users = data?.users || previousDataRef.current?.users || [];
  const totalUsers = data?.total || previousDataRef.current?.total || 0;

  const handleSeeProfile = (user: User) => {
    window.open(`/u/${user.slug}`, "_blank");
  };

  const handleBanUser = async (user: User) => {
    try {
      await updateUser(user._id, { isBanned: !user.isBanned });
      toast.success(
        user.isBanned
          ? `${user.name} has been unbanned`
          : `${user.name} has been banned`
      );
      refetch();
    } catch {
      toast.error("Failed to update user status");
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    {
      header: "Is Blogger",
      accessor: "isBlogger",
      render: (user: User) => (user.isBlogger ? "Yes" : "No"),
    },
    {
      header: "Is Premium",
      accessor: "isSubscribed",
      render: (user: User) => (user.isSubscribed ? "Yes" : "No"),
    },
    {
      header: "Status",
      accessor: "isBanned",
      render: (user: User) => (
        <span
          className={
            user.isBanned
              ? "text-red-500 bg-red-50 px-2 py-1 rounded-full text-xs"
              : "text-green-500 bg-green-50 px-2 py-1 rounded-full text-xs"
          }
        >
          {user.isBanned ? "Banned" : "Active"}
        </span>
      ),
    },
  ];

  const actions = [
    { label: "See Profile", onClick: handleSeeProfile },
    {
      label: (user: User) => (user.isBanned ? "Unban" : "Ban"),
      onClick: handleBanUser,
    },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto bg-[#F7FAFC]">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-[#1A202C]">
            Users
          </h1>
          <p className="text-[#718096]">
            Manage your users and their permissions.
          </p>
        </div>

        {isError && (
          <div className="text-center mb-4 p-4 rounded-lg bg-[#FEE2E2] text-[#DC2626]">
            Failed to load users. Please try again.
          </div>
        )}

        <FilterSearch
          search={search}
          onSearchChange={setSearch}
          filters={[
            {
              label: "Status",
              key: "status",
              options: [
                { label: "All", value: "all" },
                { label: "Active", value: "active" },
                { label: "Banned", value: "banned" },
              ],
              value: statusFilter,
              onChange: setStatusFilter,
            },
          ]}
        />

        <DataTable
          columns={columns}
          data={users}
          actions={actions}
          page={page}
          pageSize={pageSize}
        />
        <Pagination
          page={page}
          totalItems={totalUsers}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Users;
