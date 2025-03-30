// import { User } from "@/types/user";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, X } from "lucide-react";
import { useState } from "react";

interface ProfileSectionProps {
  profile: User;
}

export const ProfileSection = ({ profile }: ProfileSectionProps) => {
  const [links, setLinks] = useState<{ label: string; url: string }[]>([
    {
      label: "GitHub",
      url: profile.links?.find((link) => link.includes("github.com")) || "",
    },
    { label: "Dev.to", url: "" },
    { label: "LinkedIn", url: "" },
  ]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(
    profile.techInterests || []
  );
  const [newTopic, setNewTopic] = useState("");
  const [showTopicInput, setShowTopicInput] = useState(false);

  const predefinedTopics = [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "Machine Learning",
    "DevOps",
    "AWS",
    "GraphQL",
    "Rust",
    "Blockchain",
  ];

  const addLink = () => setLinks([...links, { label: "Custom", url: "" }]);
  const updateLink = (index: number, field: "label" | "url", value: string) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };
  const removeLink = (index: number) =>
    setLinks(links.filter((_, i) => i !== index));

  const addTopic = () => {
    if (newTopic && !selectedTopics.includes(newTopic)) {
      setSelectedTopics([...selectedTopics, newTopic]);
      setNewTopic("");
      setShowTopicInput(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-700 shadow-md">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="text-3xl">
              {profile.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" /> Change Photo
          </Button>
        </div>

        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input id="displayName" defaultValue={profile.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input id="headline" defaultValue={profile.headline} />
          </div>
          <div className="space-y-2">
            <Label>Links</Label>
            {links.map((link, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  placeholder="Label"
                  value={link.label}
                  onChange={(e) => updateLink(index, "label", e.target.value)}
                  className="w-1/3"
                />
                <Input
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) => updateLink(index, "url", e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLink(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addLink}>
              + Add Link
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" rows={4} defaultValue={profile.bio} />
      </div>

      <div className="space-y-2">
        <Label>Interested Topics</Label>
        <div className="flex flex-wrap gap-2">
          {selectedTopics.map((topic, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="pl-2 pr-1 py-1 flex items-center gap-1"
            >
              <span>{topic}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 rounded-full"
                onClick={() =>
                  setSelectedTopics(selectedTopics.filter((t) => t !== topic))
                }
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {!showTopicInput && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTopicInput(true)}
            >
              + Add Topic
            </Button>
          )}
          {showTopicInput && (
            <div className="flex gap-2">
              <select
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                className="border rounded p-1"
              >
                <option value="">Select a topic</option>
                {predefinedTopics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
              <Button onClick={addTopic}>Add</Button>
              <Button variant="ghost" onClick={() => setShowTopicInput(false)}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      <Button>Update Profile</Button>
    </div>
  );
};

// components/settings/SettingsTabs.tsx
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
            className="capitalize pb-2 bottom-0  data-[state=active]:bg-transparent data-[state=active]:text-white"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};