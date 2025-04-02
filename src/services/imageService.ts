
import { toast } from "sonner";

// API key for ImgGen
const API_KEY = "75b8cfcb-1e7a-4a7d-8b10-35a786b90e4a";

export async function unblurImage(imageFile: File): Promise<string> {
  try {
    // Create form data to send the image
    const formData = new FormData();
    formData.append("image", imageFile);

    // Call the ImgGen API
    const response = await fetch("https://app.imggen.ai/v1/unblur-image", {
      method: "POST",
      headers: {
        "X-IMGGEN-KEY": API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to unblur image");
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

export function downloadImage(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename || 'unblurred-image.jpg';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
