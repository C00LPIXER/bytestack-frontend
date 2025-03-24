import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Sidebar } from "@/components/admin/layouts/Sidebar";
import { DataTable } from "@/components/shared/DataTable";
import { Pagination } from "@/components/shared/Pagination";
import { FilterSearch } from "@/components/shared/FilterSearch";
import { toast } from "sonner";

export interface User {
  id: string;
  name: string;
  isBlogger: boolean;
  isPremium: boolean;
  isBanned: boolean;
}

export const dummyUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    isBlogger: true,
    isPremium: false,
    isBanned: false,
  },
  {
    id: "2",
    name: "Jane Smith",
    isBlogger: false,
    isPremium: true,
    isBanned: true,
  },
  {
    id: "3",
    name: "Mark Johnson",
    isBlogger: true,
    isPremium: true,
    isBanned: false,
  },
  {
    id: "4",
    name: "Sarah Williams",
    isBlogger: false,
    isPremium: false,
    isBanned: false,
  },
  {
    id: "5",
    name: "Emily Chen",
    isBlogger: true,
    isPremium: false,
    isBanned: true,
  },
];

const Users: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.adminAuth
  );

  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(dummyUsers);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }
  }, [navigate, isAuthenticated]);

  useEffect(() => {
    let filtered = users;

    // Apply search filter
    if (search) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((user) =>
        statusFilter === "banned" ? user.isBanned : !user.isBanned
      );
    }

    setFilteredUsers(filtered);
    setPage(1); // Reset to first page on filter change
  }, [search, statusFilter, users]);

  const handleSeeProfile = (user: User) => {
    navigate(`/admin/users/${user.id}`);
  };

  const handleBanUser = (user: User) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, isBanned: !u.isBanned } : u))
    );
    toast.success(
      user.isBanned
        ? `${user.name} has been unbanned`
        : `${user.name} has been banned`
    );
  };

  const handleMakePremium = (user: User) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, isPremium: !u.isPremium } : u
      )
    );
    toast.success(
      user.isPremium
        ? `${user.name} is no longer a premium user`
        : `${user.name} is now a premium user`
    );
  };

  const columns = [
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Is Blogger",
      accessor: "isBlogger",
      render: (user: User) => (user.isBlogger ? "Yes" : "No"),
    },
    {
      header: "Is Premium",
      accessor: "isPremium",
      render: (user: User) => (user.isPremium ? "Yes" : "No"),
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
    {
      label: (user: User) =>
        user.isPremium ? "Remove Premium" : "Make Premium",
      onClick: handleMakePremium,
    },
  ];

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div
        className="flex-1 p-6 overflow-y-auto"
        style={{ backgroundColor: "#F7FAFC" }}
      >
        <div className="mb-8">
          <h1
            className="text-2xl font-semibold tracking-tight"
            style={{ color: "#1A202C" }}
          >
            Users
          </h1>
          <p style={{ color: "#718096" }}>
            Manage your users and their permissions.
          </p>
        </div>

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
          data={paginatedUsers}
          actions={actions}
          page={page}
          pageSize={pageSize}
        />

        <Pagination
          page={page}
          totalItems={filteredUsers.length}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Users;
