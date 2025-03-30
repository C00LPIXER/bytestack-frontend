import { User } from "@/types/user";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, X } from "lucide-react";
import { useState } from "react";

interface ProfileTabProps {
  profile: User;
}

export const ProfileTab = ({ profile }: ProfileTabProps) => {
  const [links, setLinks] = useState<{ url: string }[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(
    profile.techInterests?.slice(0, 10) || []
  );
  const [newTopic, setNewTopic] = useState("");
  const [showTopicInput, setShowTopicInput] = useState(false);
  const [displayName, setDisplayName] = useState(profile.name);
  const [headline, setHeadline] = useState(profile.headline);
  const [bio, setBio] = useState(profile.bio);
  const [image, setImage] = useState(profile.avatar);
  const [showUpdateButton, setShowUpdateButton] = useState(false);

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

  const addLink = () => {
    if (links.length < 3) {
      setLinks([...links, { url: "" }]);
      setShowUpdateButton(true);
    }
  };

  const updateLink = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index].url = value;
    setLinks(newLinks);
    setShowUpdateButton(true);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
    setShowUpdateButton(true);
  };

  const addTopic = () => {
    if (
      newTopic &&
      !selectedTopics.includes(newTopic) &&
      selectedTopics.length < 10
    ) {
      setSelectedTopics([...selectedTopics, newTopic]);
      setNewTopic("");
      setShowTopicInput(false);
      setShowUpdateButton(true);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setShowUpdateButton(true);
    }
  };

  const handleUpdateProfile = () => {
    const updatedProfile = {
      name: displayName,
      headline,
      bio,
      links,
      techInterests: selectedTopics,
      avatar: image,
    };
    console.log("Updated Profile:", updatedProfile);
    setShowUpdateButton(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-700 shadow-md">
            <AvatarImage src={image} alt={displayName} />
            <AvatarFallback className="text-3xl">
              {displayName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="imageUpload"
            onChange={handleImageUpload}
          />
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => document.getElementById("imageUpload")?.click()}
          >
            <Upload className="h-4 w-4" /> Change Photo
          </Button>
        </div>

        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
                setShowUpdateButton(true);
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="displayName">Email</Label>
            <Input disabled id="displayEmail" value={profile.email} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              value={headline}
              onChange={(e) => {
                setHeadline(e.target.value);
                setShowUpdateButton(true);
              }}
            />
          </div>
          <div className="space-y-2">
            <Label>Links</Label>
            <br />
            {links.map((link, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) => updateLink(index, e.target.value)}
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
            {links.length < 3 && (
              <Button variant="outline" size="sm" onClick={addLink}>
                + Add Link
              </Button>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={4}
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
                setShowUpdateButton(true);
              }}
            />
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
                    onClick={() => {
                      setSelectedTopics(
                        selectedTopics.filter((t) => t !== topic)
                      );
                      setShowUpdateButton(true);
                    }}
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
                  <Button
                    variant="ghost"
                    onClick={() => setShowTopicInput(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
          {showUpdateButton && (
            <Button className="w-full" onClick={handleUpdateProfile}>
              Update Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
