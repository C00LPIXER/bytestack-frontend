import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  expanded: boolean;
  onClick?: () => void;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  path,
  expanded,
  onClick,
}: SidebarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      onClick={onClick}
      className={cn(
        "sidebar-item flex items-center gap-3 p-2 rounded-md transition-colors",
        isActive
          ? "bg-[#45474b84] text-white"
          : "text-[#E2E8F0] hover:bg-[#45474b84]"
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
