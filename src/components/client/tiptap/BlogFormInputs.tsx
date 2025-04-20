"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";

interface BlogFormInputsProps {
  onChange: (data: {
    title: string;
    metaDescription: string;
    tags: string[];
    topics: string[];
    isPremium: boolean;
    status: "draft" | "published" | "hidden";
    readTime: string;
  }) => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  initialData?: {
    title?: string;
    metaDescription?: string;
    tags?: string[];
    topics?: string[];
    isPremium?: boolean;
    status?: "draft" | "published" | "hidden";
    readTime?: string;
  };
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  metaDescription: Yup.string()
    .required("Meta description is required")
    .max(160, "Meta description must be less than 160 characters"),
  tags: Yup.array().of(Yup.string()),
  topics: Yup.array().of(Yup.string()),
  readTime: Yup.string()
    .required("Read time is required")
    .matches(/^\d+\s*min$/, "Read time must be in format 'X min'"),
  status: Yup.string()
    .oneOf(["draft", "published", "hidden"], "Invalid status")
    .required("Status is required"),
  isPremium: Yup.boolean(),
});

export const BlogFormInputs = ({ 
  onChange, 
  initialData,
  onSubmit,
  isSubmitting = false
}: BlogFormInputsProps) => {
  const formik = useFormik({
    initialValues: {
      title: initialData?.title || "",
      metaDescription: initialData?.metaDescription || "",
      tags: initialData?.tags || [],
      topics: initialData?.topics || [],
      isPremium: initialData?.isPremium || false,
      status: initialData?.status || "draft",
      readTime: initialData?.readTime || "",
    },
    validationSchema,
    onSubmit: () => {
      if (onSubmit) onSubmit();
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    formik.handleChange(e);
    onChange({
      ...formik.values,
      [e.target.name]: e.target.value
    });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(", ").filter(Boolean);
    formik.setFieldValue("tags", tags);
    onChange({
      ...formik.values,
      tags
    });
  };

  const handleTopicsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const topics = e.target.value.split(", ").filter(Boolean);
    formik.setFieldValue("topics", topics);
    onChange({
      ...formik.values,
      topics
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    formik.handleChange(e);
    onChange({
      ...formik.values,
      status: e.target.value as "draft" | "published" | "hidden"
    });
  };

  const handlePremiumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    onChange({
      ...formik.values,
      isPremium: e.target.checked
    });
  };

  const isDraft = formik.values.status === "draft";
  const isPublished = formik.values.status === "published";

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formik.values.title}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter blog title"
          className="w-full"
        />
        {formik.touched.title && formik.errors.title && (
          <div className="text-sm text-red-500">{formik.errors.title}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="metaDescription">Meta Description</Label>
        <Textarea
          id="metaDescription"
          name="metaDescription"
          value={formik.values.metaDescription}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter meta description (max 160 chars)"
          maxLength={160}
          className="w-full min-h-[100px]"
        />
        {formik.touched.metaDescription && formik.errors.metaDescription && (
          <div className="text-sm text-red-500">{formik.errors.metaDescription}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          name="tags"
          value={formik.values.tags.join(", ")}
          onChange={handleTagsChange}
          onBlur={formik.handleBlur}
          placeholder="Enter tags (comma-separated)"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="topics">Categories (Topics)</Label>
        <Input
          id="topics"
          name="topics"
          value={formik.values.topics.join(", ")}
          onChange={handleTopicsChange}
          onBlur={formik.handleBlur}
          placeholder="Enter categories (comma-separated)"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="readTime">Read Time</Label>
        <Input
          id="readTime"
          name="readTime"
          value={formik.values.readTime}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          placeholder="e.g., 7 min"
          className="w-full"
        />
        {formik.touched.readTime && formik.errors.readTime && (
          <div className="text-sm text-red-500">{formik.errors.readTime}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          name="status"
          value={formik.values.status}
          onChange={handleStatusChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 border rounded-md bg-background text-foreground"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="hidden">Hidden</option>
        </select>
        {formik.touched.status && formik.errors.status && (
          <div className="text-sm text-red-500">{formik.errors.status}</div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="isPremium"
          name="isPremium"
          type="checkbox"
          checked={formik.values.isPremium}
          onChange={handlePremiumChange}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <Label htmlFor="isPremium">Premium Content</Label>
      </div>

      <div className="pt-4 border-t">
        {isDraft && (
          <Button
            type="submit"
            disabled={isSubmitting || !formik.isValid}
            className="w-full"
            variant="outline"
          >
            {isSubmitting ? "Saving..." : "Save Draft"}
          </Button>
        )}
        {isPublished && (
          <Button
            type="submit"
            disabled={isSubmitting || !formik.isValid}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </Button>
        )}
        {formik.values.status === "hidden" && (
          <Button
            type="submit"
            disabled={isSubmitting || !formik.isValid}
            className="w-full"
            variant="outline"
          >
            {isSubmitting ? "Saving..." : "Save as Hidden"}
          </Button>
        )}
      </div>
    </form>
  );
};