import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FeedType } from "@/types/feed";

interface Tab {
  label: string;
  value: FeedType;
}

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (query: string) => void;
  className?: string;
  tabs?: Tab[];
  activeTab?: FeedType;
  onTabChange?: (tab: FeedType) => void;
}

export const SearchBar = ({
  placeholder,
  value,
  onChange,
  className,
  tabs,
  activeTab,
  onTabChange,
}: SearchBarProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {/* Search Input */}
      <div className="relative w-full">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {/* Tabs as plain text */}
      {tabs && tabs.length > 0 && (
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap px-1">
          {tabs.map((tab) => (
            <span
              key={tab.value}
              onClick={() => onTabChange?.(tab.value)}
              className={`cursor-pointer text-sm transition-colors duration-200 ${
                activeTab === tab.value
                  ? "text-primary font-semibold underline underline-offset-4"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
