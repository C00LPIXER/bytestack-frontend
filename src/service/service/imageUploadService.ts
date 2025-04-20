import { axiosInstance } from "@/api/axios";
import axios from "axios";
import { toast } from "sonner";

export interface UploadImageParams {
  file: File;
  folder: "profile-images" | "blog-images";
}

export const uploadImage = async (
  params: UploadImageParams
): Promise<string> => {
  const { file, folder } = params;

  // Validate file type and size
  const validTypes = ["image/jpeg", "image/png"];
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (!validTypes.includes(file.type)) {
    throw new Error("Please upload a JPEG or PNG image");
  }
  if (file.size > maxSize) {
    throw new Error("Image size must be less than 5MB");
  }

  // Request a presigned URL from the backend
  const response = await axiosInstance.post(
    `${import.meta.env.VITE_PRIVATE_API_URI}/profile/upload-url`,
    {
      folder,
      fileType: file.type,
    }
  );

  const { uploadURL, key } = response.data;

  // Upload the image to S3
  try {
    await axios.put(uploadURL, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
  } catch {
    toast.error("Failed to upload image");
  }

  // Generate the public URL for the image
  const imageUrl = `https://${import.meta.env.VITE_S3_BUCKET_NAME}.s3.${
    import.meta.env.VITE_AWS_REGION
  }.amazonaws.com/${key}`;

  return imageUrl;
};
