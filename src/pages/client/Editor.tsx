import { RichTextEditorDemo } from "@/components/client/tiptap/rich-text-editor";

export const Editor = () => {
  return (
    <div className="container mx-auto p-4">
      <h1>Create New Blog Post</h1>
      <RichTextEditorDemo className="mt-4" />
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function EditorPage() {
  const [title, setTitle] = useState("");

  const handleSave = () => {
    // Implement your save logic here
    console.log("Saving post...");
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Create New Blog Post</h1>
        <Input
          placeholder="Enter your post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl font-semibold"
        />
      </div>
      
      <RichTextEditorDemo className="min-h-[500px]" />
      
      <div className="mt-6 flex justify-end gap-4">
        <Button variant="outline">Save as Draft</Button>
        <Button onClick={handleSave}>Publish</Button>
      </div>
    </div>
  );
}