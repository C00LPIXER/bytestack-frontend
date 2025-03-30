// components/settings/ProfileSection.tsx
import { Navbar } from "@/components/client/layouts/Navbar";
import { Footer } from "@/components/client/layouts/Footer";
import { user } from "./Profile";
import { ProfileSection, SettingsTabs } from "@/components/client/settings/SettingsTabs";
import { useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const profile = user;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-white dark:from-[#1e1e1e] dark:to-black">
      <Navbar />
      <div className="mt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Account Settings
        </h1>

        <SettingsTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          profile={profile}
        />

        <div className="mt-6">
          {activeTab === "profile" && <ProfileSection profile={profile} />}
          {activeTab === "account" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Manage your account settings and preferences.
              </p>
            </div>
          )}
          {activeTab === "notifications" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Notification Preferences
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Manage how you receive notifications.
              </p>
            </div>
          )}
          {activeTab === "blogs" && profile.isBlogger && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Blogs</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Manage your blog posts and content.
              </p>
            </div>
          )}
          {activeTab === "bits" && profile.isBlogger && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Bits</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Manage your short-form content.
              </p>
            </div>
          )}
          {activeTab === "analytics" && profile.isBlogger && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Analytics</h2>
              <p className="text-gray-500 dark:text-gray-400">
                View your content performance metrics.
              </p>
            </div>
          )}
          {activeTab === "subscription" && !profile.isBlogger && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Subscription</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Manage your subscription details.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
