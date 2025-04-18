"use client";
import { useState, useRef } from "react";
import {
  RichTextEditor,
  BlogFormData,
} from "@/components/client/tiptap/BlogEditor";
import { toast } from "sonner";
import { newBlog } from "@/service/client/api/clientApi";
import { Editor } from "@tiptap/react";
import { BlogPostData } from "@/types/blog";

const NewBlog = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef<Editor | null>(null);
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    slug: "",
    content: "",
    metaDescription: "",
    tags: [],
    topics: [],
    isPremium: false,
    status: "draft",
    readTime: "",
  });

  const handleEditorRef = (editor: Editor | null) => {
    editorRef.current = editor;
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!formData.content.trim()) {
      toast.error("Content is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: BlogPostData = {
        ...formData
      };

      await newBlog(payload);
      toast.success(
        `Blog post ${
          formData.status === "draft" ? "saved as draft" : "published"
        } successfully`
      );

      setFormData({
        title: "",
        slug: "",
        content: "",
        metaDescription: "",
        tags: [],
        topics: [],
        isPremium: false,
        status: "draft",
        readTime: "",
      });
      editorRef.current?.commands.clearContent();
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormChange = (data: BlogFormData) => {
    console.log(data);
    setFormData(data);
  };


  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Create New Blog Post
            </h1>
            <p className="text-muted-foreground">
              Write and publish your next blog post
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <RichTextEditor
                className="rounded-lg shadow-sm"
                onChange={handleFormChange}
                editorRef={handleEditorRef}
                initialData={formData}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBlog;
