import { useState } from "react";
import { useDispatch } from "react-redux";
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
import { SidebarItem } from "./SidebarItem";
import { SidebarSection } from "./SidebarSection";
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import { useNavigate } from "react-router-dom";
import { persistor } from "@/redux/store";

export const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleLogout = async () => {
    await adminLogout();
    dispatch(clearAdmin());
    await persistor.flush();
    localStorage.removeItem("persist:_auth");
    persistor.persist();
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 transition-all duration-300 ease-in-out bg-[#282828] ",
        expanded ? "w-64" : "w-[70px]"
      )}
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
          {expanded && (
            <h1 className="font-semibold text-xl tracking-tight text-[#FFFFFF]">
              ByteStack
            </h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full ml-auto h-7 w-7 bg-transparent text-[#E2E8F0]"
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
              path="/admin"
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

        <div className="p-2 mt-auto" style={{ borderTop: "1px solid #4A5568" }}>
          <SidebarItem
            icon={Settings}
            label="Settings"
            path="/admin/settings"
            expanded={expanded}
          />
          <SidebarItem
            icon={LogOut}
            label="Logout"
            path="#"
            expanded={expanded}
            onClick={() => setIsLogoutDialogOpen(true)}
          />
        </div>
      </div>
      <ConfirmationDialog
        trigger={<span className="hidden">Logout</span>}
        title="Confirm Logout"
        description="Are you sure you want to log out? You will need to sign in again to access admin dashboard."
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutDialogOpen(false)}
        isOpen={isLogoutDialogOpen}
        setIsOpen={setIsLogoutDialogOpen}
      />
    </aside>
  );
};
