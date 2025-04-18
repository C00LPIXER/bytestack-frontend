"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface BlogFormInputsProps {
  onChange: (data: {
    title: string;
    slug: string;
    metaDescription: string;
    tags: string[];
    topics: string[];
    isPremium: boolean;
    status: "draft" | "published" | "hidden";
    readTime: string;
  }) => void;
  initialData?: {
    title?: string;
    slug?: string;
    metaDescription?: string;
    tags?: string[];
    topics?: string[];
    isPremium?: boolean;
    status?: "draft" | "published" | "hidden";
    readTime?: string;
  };
  onSubmit?: () => void;
  isSubmitting?: boolean;
}

export const BlogFormInputs = ({ 
  onChange, 
  initialData,
  onSubmit,
  isSubmitting = false
}: BlogFormInputsProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    metaDescription: initialData?.metaDescription || "",
    tags: initialData?.tags || [],
    topics: initialData?.topics || [],
    isPremium: initialData?.isPremium || false,
    status: initialData?.status || "draft",
    readTime: initialData?.readTime || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (name === "tags" || name === "topics") {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.value.split(", ").filter(Boolean),
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    onChange({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const isDraft = formData.status === "draft";
  const isPublished = formData.status === "published";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter blog title"
          required
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="Enter slug"
          required
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="metaDescription">Meta Description</Label>
        <Textarea
          id="metaDescription"
          name="metaDescription"
          value={formData.metaDescription}
          onChange={handleChange}
          placeholder="Enter meta description (max 160 chars)"
          maxLength={160}
          className="w-full min-h-[100px]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          name="tags"
          value={formData.tags.join(", ")}
          onChange={handleChange}
          placeholder="Enter tags (comma-separated)"
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="topics">Categories (Topics)</Label>
        <Input
          id="topics"
          name="topics"
          value={formData.topics.join(", ")}
          onChange={handleChange}
          placeholder="Enter categories (comma-separated)"
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="readTime">Read Time</Label>
        <Input
          id="readTime"
          name="readTime"
          value={formData.readTime}
          onChange={handleChange}
          placeholder="e.g., 7 min"
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded-md bg-background text-foreground"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="hidden">Hidden</option>
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <input
          id="isPremium"
          name="isPremium"
          type="checkbox"
          checked={formData.isPremium}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <Label htmlFor="isPremium">Premium Content</Label>
      </div>

      <div className="pt-4 border-t">
        {isDraft && (
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="w-full"
            variant="outline"
          >
            {isSubmitting ? "Saving..." : "Save Draft"}
          </Button>
        )}
        {isPublished && (
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </Button>
        )}
        {formData.status === "hidden" && (
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="w-full"
            variant="outline"
          >
            {isSubmitting ? "Saving..." : "Save as Hidden"}
          </Button>
        )}
      </div>
    </div>
  );
};