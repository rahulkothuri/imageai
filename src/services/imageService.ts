
import { toast } from "sonner";

// API key for ImgGen
const API_KEY = "f8f7906f-809a-4251-8ea4-8681e0c06bc0";

type ImageProcessingType = "unblur" | "restore" | "remove-bg";

export async function processImage(imageFile: File, type: ImageProcessingType): Promise<string> {
  try {
    // Create form data to send the image
    const formData = new FormData();
    formData.append("image", imageFile);
    
    // Determine endpoint based on type
    let endpoint = "";
    switch (type) {
      case "unblur":
        endpoint = "https://app.imggen.ai/v1/unblur-image";
        break;
      case "restore":
        endpoint = "https://app.imggen.ai/v1/image-restoration";
        break;
      case "remove-bg":
        endpoint = "https://app.imggen.ai/v1/remove-background";
        break;
    }

    // Call the ImgGen API
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "X-IMGGEN-KEY": API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to process image`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || "Failed to process image");
    }

    // The API returns a base64 encoded image
    return `data:image/jpeg;base64,${result.image}`;
  } catch (error) {
    console.error("Error processing image:", error);
    toast.error("Failed to process image. Please try again.");
    throw error;
  }
}

// Legacy function for backward compatibility
export async function unblurImage(imageFile: File): Promise<string> {
  return processImage(imageFile, "unblur");
}

export function downloadImage(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename || 'processed-image.jpg';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
