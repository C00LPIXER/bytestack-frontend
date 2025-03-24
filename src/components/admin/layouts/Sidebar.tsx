import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearAdmin } from "@/redux/slices/adminAuthSlice";
import { adminLogout } from "@/service/admin/api/adminApi";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  LogOut,
  Settings,
  Users,
  Folder,
  Tag,
  CreditCard,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  expanded: boolean;
  onClick?: () => void;
}

interface SidebarSectionProps {
  title: string;
  expanded: boolean;
  children: React.ReactNode;
}

const SidebarItem = ({ icon: Icon, label, path, expanded, onClick }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      onClick={onClick}
      className={cn(
        "sidebar-item flex items-center gap-3 p-2 rounded-md transition-colors",
        isActive ? "bg-[#4A5568] text-white" : "text-[#E2E8F0] hover:bg-[#4A5568]"
      )}
      style={{
        justifyContent: expanded ? "flex-start" : "center",
      }}
    >
      <Icon size={20} style={{ color: isActive ? "#FFFFFF" : "#E2E8F0" }} />
      {expanded && (
        <span className="transition-opacity duration-200">{label}</span>
      )}
    </Link>
  );
};

const SidebarSection = ({ title, expanded, children }: SidebarSectionProps) => {
  return (
    <div className="mt-6 first:mt-0">
      {expanded && (
        <div className="mb-2 px-3">
          <h3
            className="text-xs uppercase font-semibold"
            style={{ color: "#A0AEC0" }} // Medium gray for section titles
          >
            {title}
          </h3>
        </div>
      )}
      <div className="space-y-1 px-2">{children}</div>
    </div>
  );
};

export const Sidebar = () => {
  console.log("Sidebar is rendering"); // Debug log

  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin } = useSelector((state: RootState) => state.adminAuth);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleLogout = async () => {
    try {
      await adminLogout();
      dispatch(clearAdmin());
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 transition-all duration-300 ease-in-out",
        expanded ? "w-64" : "w-[70px]"
      )}
      style={{
        backgroundColor: "#2D3748", // Dark gray background
        borderRight: "1px solid #4A5568", // Slightly lighter gray border
      }}
    >
      <div className="flex flex-col h-full">
        <div
          className={cn(
            "h-16 flex items-center px-4 justify-between",
            !expanded && "justify-center"
          )}
          style={{
            borderBottom: "1px solid #4A5568",
          }}
        >
          {expanded ? (
            <h1
              className="font-semibold text-xl tracking-tight"
              style={{ color: "#FFFFFF" }}
            >
              ByteStack Admin
            </h1>
          ) : (
            <div
              className="font-semibold text-xl tracking-tight"
              style={{ color: "#FFFFFF" }}
            >
              B
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full ml-auto h-7 w-7"
            style={{ color: "#E2E8F0" }}
            onClick={toggleSidebar}
          >
            {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </Button>
        </div>

        <div className="flex-1 p-2 overflow-y-auto">
          <SidebarSection title="Menu" expanded={expanded}>
            <SidebarItem
              icon={Home}
              label="Overview"
              path="/admin/dashboard"
              expanded={expanded}
            />
            <SidebarItem
              icon={Users}
              label="Users"
              path="/admin/users"
              expanded={expanded}
            />
            <SidebarItem
              icon={FileText}
              label="Topics"
              path="/admin/topics"
              expanded={expanded}
            />
            <SidebarItem
              icon={Tag}
              label="Category"
              path="/admin/category"
              expanded={expanded}
            />
            <SidebarItem
              icon={Folder}
              label="Blogs"
              path="/admin/blogs"
              expanded={expanded}
            />
          </SidebarSection>

          <SidebarSection title="Analysis" expanded={expanded}>
            <SidebarItem
              icon={BarChart}
              label="Reports"
              path="/admin/reports"
              expanded={expanded}
            />
            <SidebarItem
              icon={CreditCard}
              label="Payouts"
              path="/admin/payouts"
              expanded={expanded}
            />
          </SidebarSection>
        </div>

        <div
          className="p-2 mt-auto"
          style={{ borderTop: "1px solid #4A5568" }}
        >
          <SidebarItem
            icon={Settings}
            label="Settings"
            path="/admin/settings"
            expanded={expanded}
          />
          <SidebarItem
            icon={LogOut}
            label="Logout"
            path="/admin/login"
            expanded={expanded}
            onClick={handleLogout}
          />
        </div>
      </div>
    </aside>
  );
};