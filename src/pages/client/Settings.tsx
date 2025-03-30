import { useState } from "react";
import { Navbar } from "@/components/client/layouts/Navbar";
import { Footer } from "@/components/client/layouts/Footer";
import { SettingsTabs } from "@/components/client/settings/SettingsTabs";
import { ProfileTab } from "@/components/client/settings/tabs/ProfileTab";
import { AccountTab } from "@/components/client/settings/tabs/AccountTab";
import { NotificationsTab } from "@/components/client/settings/tabs/NotificationsTab";
import { BlogsTab } from "@/components/client/settings/tabs/BlogsTab";
import { BitsTab } from "@/components/client/settings/tabs/BitsTab";
import { AnalyticsTab } from "@/components/client/settings/tabs/AnalyticsTab";
import { SubscriptionTab } from "@/components/client/settings/tabs/SubscriptionTab";
import { useAuth } from "@/hooks/useAuth";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-white dark:from-[#1e1e1e] dark:to-black">
      <Navbar />
      <div className="mt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Account Settings
        </h1>

        {user && (
          <SettingsTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            profile={user}
          />
        )}

        <div className="mt-6">
          {activeTab === "profile" && user && <ProfileTab profile={user} />}
          {activeTab === "subscription" && <SubscriptionTab />}
          {activeTab === "account" && <AccountTab />}
          {activeTab === "notifications" && <NotificationsTab />}
          {activeTab === "blogs" && user?.isBlogger && <BlogsTab />}
          {activeTab === "bits" && user?.isBlogger && <BitsTab />}
          {activeTab === "analytics" && user?.isBlogger && <AnalyticsTab />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
