import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/types/user";

interface SettingsTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  profile: User;
}

export const SettingsTabs = ({
  activeTab,
  setActiveTab,
  profile,
}: SettingsTabsProps) => {
  const commonTabs = ["profile", "account", "notifications"];
  const bloggerTabs = profile.isBlogger
    ? [...commonTabs, "blogs", "bits", "analytics"]
    : [...commonTabs, "subscription"];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="flex justify-start rounded-none gap-3 border-b border-gray-200 dark:border-gray-700 bg-transparent">
        {bloggerTabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="capitalize pb-2 data-[state=active]:bg-transparent dark:data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
