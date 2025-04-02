
import { toast } from "sonner";

// Using the remove.bg API for demonstration purposes
// In a real app, you would use a specific unblurring API
// For now, this simulates unblurring by enhancing the image
export async function unblurImage(imageFile: File): Promise<string> {
  try {
    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real implementation, you would call an actual API here
    // For now, we'll create a simulated "unblurred" version by increasing contrast
    return applyImageEffect(imageFile);
  } catch (error) {
    console.error("Error processing image:", error);
    toast.error("Failed to process image. Please try again.");
    throw error;
  }
}

// This function simulates unblurring by applying a simple effect to the image
async function applyImageEffect(imageFile: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const img = new Image();
      
      img.onload = () => {
        // Create canvas to manipulate the image
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }
        
        // Draw the original image
        ctx.drawImage(img, 0, 0);
        
        // Apply a simple sharpening effect (simulating unblurring)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Simple contrast enhancement (for demonstration only)
        for (let i = 0; i < data.length; i += 4) {
          // Enhance contrast for RGB channels
          data[i] = Math.min(255, Math.max(0, (data[i] - 128) * 1.2 + 128));
          data[i + 1] = Math.min(255, Math.max(0, (data[i + 1] - 128) * 1.2 + 128));
          data[i + 2] = Math.min(255, Math.max(0, (data[i + 2] - 128) * 1.2 + 128));
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        // Convert to data URL
        resolve(canvas.toDataURL('image/jpeg', 0.9));
      };
      
      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };
      
      img.src = event.target?.result as string;
    };
    
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    
    reader.readAsDataURL(imageFile);
  });
}

export function downloadImage(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename || 'unblurred-image.jpg';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
