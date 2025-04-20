import { useState, useRef } from "react";
import {
  RichTextEditor,
  BlogFormData,
} from "@/components/client/tiptap/BlogEditor";
import { newBlog } from "@/service/client/api/clientApi";
import { Editor } from "@tiptap/react";
import { BlogPostData } from "@/types/blog";
import { Navbar } from "@/components/client/layouts/Navbar";
import { Footer } from "@/components/client/layouts/Footer";
import { toast } from "sonner";

const NewBlog = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef<Editor | null>(null);
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
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
    setIsSubmitting(true);
    try {
      const payload: BlogPostData = {
        ...formData,
      };

      await newBlog(payload);
      toast.success("")
      setFormData({
        title: "",
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormChange = (data: BlogFormData) => {
    setFormData(data);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                Create New Blog Post
              </h1>
              <p className="text-muted-foreground">
                Write and publish your next blog post
              </p>
            </div>
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
      <Footer />
    </>
  );
};

export default NewBlog;
