import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/admin/layouts/Sidebar";
import { DataTable } from "@/components/shared/DataTable";
import { Pagination } from "@/components/shared/Pagination";
import { FilterSearch } from "@/components/shared/FilterSearch";
import { toast } from "sonner";
import { fetchUsers, updateUser } from "@/service/admin/api/adminApi";
import { User } from "@/types/user";

const Users: React.FC = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from the API
  useEffect(() => {
    const loadUsers = async () => {
      // setLoading(true);
      setError(null);
      try {
        const status = statusFilter === "all" ? undefined : statusFilter;
        const { users: fetchedUsers, total } = await fetchUsers(
          page,
          pageSize,
          search,
          status
        );
        setUsers(fetchedUsers);
        setTotalUsers(total);
      } catch (err) {
        console.error(err);
        setError("Failed to load users. Please try again.");
        toast.error("Failed to load users");
      } finally {
        // setLoading(false);
      }
    };
    loadUsers();
  }, [page, pageSize, search, statusFilter]);

  const handleSeeProfile = (user: User) => {
    navigate(`/admin/users/${user._id}`);
  };

  const handleBanUser = async (user: User) => {
    try {
      await updateUser(user._id, { isBanned: !user.isBanned });
      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, isBanned: !u.isBanned } : u
        )
      );
      toast.success(
        user.isBanned
          ? `${user.name} has been unbanned`
          : `${user.name} has been banned`
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user status");
    }
  };

  const columns = [
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Email",
      accessor: "email",
    },
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
      <div
        className="flex-1 p-6 overflow-y-auto bg-[#F7FAFC]"
      >
        <div className="mb-8">
          <h1
            className="text-2xl font-semibold tracking-tight text-[#1A202C]"
          >
            Users
          </h1>
          <p className="text-[#718096]">
            Manage your users and their permissions.
          </p>
        </div>

        {error && (
          <div className="text-center mb-4 p-4 rounded-lg bg-[#FEE2E2] text-[#DC2626]">
            {error}
          </div>
        )}
        <div>
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

          <>
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
          </>
        </div>
      </div>
    </div>
  );
};

export default Users;
