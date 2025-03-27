import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { StatCard } from "@/components/admin/dashboard/StatCard";
import { ChartContainer } from "@/components/admin/dashboard/ChartContainer";
import { Sidebar } from "@/components/admin/layouts/Sidebar";
import {
  Users,
  FileText,
  UserCheck,
  ChevronRight,
  CreditCard,
  Flag,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";

const userGrowthData = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 500 },
  { name: "Mar", users: 600 },
  { name: "Apr", users: 800 },
  { name: "May", users: 1000 },
  { name: "Jun", users: 1200 },
  { name: "Jul", users: 1500 },
];

const blogStatsData = [
  { month: "Jan", published: 65, draft: 28 },
  { month: "Feb", published: 59, draft: 30 },
  { month: "Mar", published: 80, draft: 42 },
  { month: "Apr", published: 81, draft: 40 },
  { month: "May", published: 56, draft: 25 },
  { month: "Jun", published: 55, draft: 35 },
  { month: "Jul", published: 60, draft: 45 },
];

// Sample data for sections
const pendingTopics = [
  {
    id: 1,
    title: "How to optimize React applications",
    author: "Jane Smith",
    date: "Today",
  },
  {
    id: 2,
    title: "Introduction to TypeScript",
    author: "Mark Johnson",
    date: "Yesterday",
  },
  {
    id: 3,
    title: "Advanced CSS techniques",
    author: "Sarah Williams",
    date: "2 days ago",
  },
];

const pendingPayouts = [
  {
    id: 1,
    user: "John Doe",
    amount: "$240.50",
    status: "Pending",
    date: "Today",
  },
  {
    id: 2,
    user: "Emily Chen",
    amount: "$180.75",
    status: "Processing",
    date: "Yesterday",
  },
  {
    id: 3,
    user: "Michael Brown",
    amount: "$350.00",
    status: "Scheduled",
    date: "Jul 15, 2023",
  },
];

const userReports = [
  {
    id: 1,
    issue: "Account access problem",
    user: "Robert James",
    severity: "High",
    date: "2 hours ago",
  },
  {
    id: 2,
    issue: "Payment not received",
    user: "Lisa Wang",
    severity: "Medium",
    date: "1 day ago",
  },
  {
    id: 3,
    issue: "Content policy violation",
    user: "Alex Smith",
    severity: "Low",
    date: "3 days ago",
  },
];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { admin, isAuthenticated } = useSelector(
    (state: RootState) => state.adminAuth
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }
  }, [navigate, isAuthenticated]);

  const colors = {
    primary: "#4299E1", // Blue for charts
    secondary: "#A0AEC0", // Gray for secondary chart elements
    grid: "#E2E8F0", // Light gray for chart grid
    areaFill: "rgba(66, 153, 225, 0.1)", // Light blue fill for AreaChart
    barFill: "rgba(66, 153, 225, 0.8)", // Blue fill for BarChart (published)
    barFill2: "rgba(160, 174, 192, 0.7)", // Gray fill for BarChart (draft)
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "text-red-500 bg-red-50";
      case "medium":
        return "text-amber-500 bg-amber-50";
      case "low":
        return "text-green-500 bg-green-50";
      default:
        return "text-blue-500 bg-blue-50";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-amber-500 bg-amber-50";
      case "processing":
        return "text-blue-500 bg-blue-50";
      case "scheduled":
        return "text-violet-500 bg-violet-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto bg-[#F7FAFC]">
        <div className="animate-fade-in">
          <div className="mb-8">
            <h1
              className="text-2xl font-semibold tracking-tight"
              style={{ color: "#1A202C" }} // Dark gray text
            >
              Dashboard Overview
            </h1>
            <p className="text-[#718096]">
              Welcome back, {admin?.email}! Here's what's happening.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <StatCard
              title="Total Users"
              value="2,420"
              icon={Users}
              change={8.2}
              changeLabel="vs. last month"
            />
            <StatCard
              title="Total Blogs"
              value="843"
              icon={FileText}
              change={12.5}
              changeLabel="vs. last month"
            />
            <StatCard
              title="Active Bloggers"
              value="187"
              icon={UserCheck}
              change={-4.3}
              changeLabel="vs. last month"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            <ChartContainer
              title="User Growth"
              subtitle="Total users over time"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={userGrowthData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={colors.grid}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#718096" }} // Medium gray ticks
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#718096" }}
                    width={40}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      borderColor: colors.grid,
                      borderRadius: 8,
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke={colors.primary}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill={colors.areaFill}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>

            <ChartContainer
              title="Blog Statistics"
              subtitle="Published vs. draft blogs"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={blogStatsData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={colors.grid}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#718096" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#718096" }}
                    width={40}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      borderColor: colors.grid,
                      borderRadius: 8,
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="published"
                    fill={colors.barFill}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="draft"
                    fill={colors.barFill2}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 mb-6">
            <div className="stat-card rounded-lg p-5 shadow-sm bg-white border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-gray-500" />
                  <h3 className="font-medium text-gray-800">Pending Topics</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8 px-2 text-blue-500 hover:bg-slate-400"
                >
                  View All <ChevronRight size={14} className="ml-1" />
                </Button>
              </div>

              <div className="space-y-3">
                {pendingTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0 border-gray-200"
                  >
                    <div>
                      <p className="font-medium text-sm line-clamp-1 text-gray-800">
                        {topic.title}
                      </p>
                      <p className="text-xs mt-0.5 text-gray-500">
                        By {topic.author} • {topic.date}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-blue-400 hover:bg-transparent hover:text-gray-600"
                    >
                      Review
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="stat-card rounded-lg p-5 shadow-sm bg-white border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <CreditCard size={18} style={{ color: "#718096" }} />
                  <h3 className="font-medium" style={{ color: "#1A202C" }}>
                    Pending Payouts
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8 px-2 text-[#4299E1]  hover:bg-slate-400"
                >
                  View All <ChevronRight size={14} className="ml-1" />
                </Button>
              </div>

              <div className="space-y-3">
                {pendingPayouts.map((payout) => (
                  <div
                    key={payout.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                    style={{ borderColor: "#E2E8F0" }}
                  >
                    <div>
                      <p
                        className="font-medium text-sm"
                        style={{ color: "#1A202C" }}
                      >
                        {payout.user}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className="text-sm font-medium"
                          style={{ color: "#1A202C" }}
                        >
                          {payout.amount}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(
                            payout.status
                          )}`}
                        >
                          {payout.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs" style={{ color: "#718096" }}>
                      {payout.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="stat-card rounded-lg p-5 shadow-sm bg-white"
              style={{
                border: "1px solid #E2E8F0",
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Flag size={18} style={{ color: "#718096" }} />
                  <h3 className="font-medium" style={{ color: "#1A202C" }}>
                    User Reports
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8 px-2 text-[#4299E1] hover:bg-slate-400"
                >
                  View All <ChevronRight size={14} className="ml-1" />
                </Button>
              </div>

              <div className="space-y-3">
                {userReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                    style={{ borderColor: "#E2E8F0" }}
                  >
                    <div>
                      <p
                        className="font-medium text-sm line-clamp-1"
                        style={{ color: "#1A202C" }}
                      >
                        {report.issue}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "#718096" }}
                      >
                        From {report.user} • {report.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${getSeverityColor(
                          report.severity
                        )}`}
                      >
                        {report.severity}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 text-blue-400 hover:bg-transparent hover:text-gray-600"
                      >
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
