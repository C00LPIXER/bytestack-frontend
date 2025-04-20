import { useState } from "react";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { SettingsTabs } from "@/components/settings/SettingsTabs";
import { ProfileTab } from "@/components/settings/tabs/ProfileTab";
import { AccountTab } from "@/components/settings/tabs/AccountTab";
import { NotificationsTab } from "@/components/settings/tabs/NotificationsTab";
import { BlogsTab } from "@/components/settings/tabs/BlogsTab";
import { BitsTab } from "@/components/settings/tabs/BitsTab";
import { AnalyticsTab } from "@/components/settings/tabs/AnalyticsTab";
import { SubscriptionTab } from "@/components/settings/tabs/SubscriptionTab";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-white dark:from-[#1e1e1e] dark:to-black">
      <Navbar />
      <div className="mt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Account Settings
          </h1>
          <Link to={`/u/${user?.slug}`}>
            <Button className="h-8">Back to Profile</Button>
          </Link>
        </div>

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
