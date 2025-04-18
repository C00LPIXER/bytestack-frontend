import "./tiptap.css";
import { cn } from "@/lib/utils";
import { useState, useRef, forwardRef } from "react";
import { ImageExtension } from "./extensions/image";
import { ImagePlaceholder } from "./extensions/image-placeholder";
import SearchAndReplace from "./extensions/search-and-replace";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import {
  Editor,
  EditorContent,
  type Extension,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TipTapFloatingMenu } from "./extensions/floating-menu";
import { FloatingToolbar } from "./extensions/floating-toolbar";
import { EditorToolbar } from "./toolbars/editor-toolbar";
import Placeholder from "@tiptap/extension-placeholder";
import { BlogFormInputs } from "./BlogFormInputs";

export interface BlogFormData {
  title: string;
  slug: string;
  content: string;
  metaDescription: string;
  tags: string[];
  topics: string[];
  isPremium: boolean;
  status: "draft" | "published" | "hidden";
  readTime: string;
}

const extensions = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc",
      },
    },
    heading: {
      levels: [1, 2, 3, 4],
    },
  }),
  Placeholder.configure({
    emptyNodeClass: "is-editor-empty",
    placeholder: ({ node }) => {
      switch (node.type.name) {
        case "heading":
          return `Heading ${node.attrs.level}`;
        case "detailsSummary":
          return "Section title";
        case "codeBlock":
          return "";
        default:
          return "Write, type '/' for commands";
      }
    },
    includeChildren: false,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  TextStyle,
  Subscript,
  Superscript,
  Underline,
  Link,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  ImageExtension,
  ImagePlaceholder,
  SearchAndReplace,
  Typography,
];

const RichTextEditor = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    onChange?: (data: BlogFormData) => void;
    onSubmit?: () => void;
    isSubmitting?: boolean;
    initialData?: {
      title?: string;
      slug?: string;
      content?: string;
      metaDescription?: string;
      tags?: string[];
      topics?: string[];
      isPremium?: boolean;
      status?: "draft" | "published" | "hidden";
      readTime?: string;
    };
    editorRef?: (editor: Editor | null) => void;
  }
>(({ className, onChange, onSubmit, isSubmitting, initialData, editorRef }, ref) => {
  const editor = useRef<Editor | null>(null);
  const [formData, setFormData] = useState<BlogFormData>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    content: initialData?.content || "",
    metaDescription: initialData?.metaDescription || "",
    tags: initialData?.tags || [],
    topics: initialData?.topics || [],
    isPremium: initialData?.isPremium || false,
    status: initialData?.status || "draft",
    readTime: initialData?.readTime || "",
  });

  const handleEditor = useEditor({
    extensions: extensions as Extension[],
    content: formData.content,
    editorProps: {
      attributes: {
        class: "max-w-full focus:outline-none prose dark:prose-invert",
      },
    },
    onUpdate: ({ editor: e }) => {
      const html = e.getHTML();
      setFormData((prev) => ({ ...prev, content: html }));
      if (onChange) {
        console.log(html);
        onChange({ ...formData, content: html });
      }
    },
    onCreate: ({ editor: createdEditor }) => {
      editor.current = createdEditor;
      if (editorRef) editorRef(createdEditor);
    },
  });

  if (!handleEditor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative border bg-card rounded-lg shadow-sm overflow-hidden",
        className
      )}
    >
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 min-w-0">
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <EditorToolbar editor={handleEditor} />
          </div>
          <div className="p-4 sm:p-6">
            <FloatingToolbar editor={handleEditor} />
            <TipTapFloatingMenu editor={handleEditor} />
            <EditorContent
              editor={handleEditor}
              className="cursor-text prose dark:prose-invert max-w-none"
            />
          </div>
        </div>
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-border bg-muted/50">
          <div className="sticky top-0 p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">Blog Details</h3>
            <BlogFormInputs
              onChange={(data) => {
                setFormData((prev) => ({ ...prev, ...data }));
                if (onChange) onChange({ ...formData, ...data });
              }}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              initialData={initialData}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor };
