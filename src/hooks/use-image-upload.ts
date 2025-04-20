import { useState, useRef } from "react";
import { toast } from "sonner";
import {
  uploadImage,
  UploadImageParams,
} from "@/service/service/imageUploadService";

interface UseImageUploadProps {
  onUpload: (imageUrl: string) => void;
}

export const useImageUpload = ({ onUpload }: UseImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    setError(null);
    setUploading(true);

    try {
      const params: UploadImageParams = {
        file,
        folder: "blog-images",
      };
      const imageUrl = await uploadImage(params);
      onUpload(imageUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      const errorMessage = (error as Error).message || "Failed to upload image";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setUploading(false);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    previewUrl,
    fileInputRef,
    handleFileChange,
    handleRemove,
    uploading,
    error,
  };
};
