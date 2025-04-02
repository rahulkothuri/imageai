
import { useState } from "react";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import ImageComparison from "@/components/ImageComparison";
import { unblurImage } from "@/services/imageService";

const Index = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageSelect = async (file: File) => {
    try {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size exceeds 10MB limit. Please select a smaller image.");
        return;
      }

      setSelectedFile(file);
      setIsProcessing(true);
      setProcessedImage(null);
      
      // Convert the file to a data URL for display
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Process the image
      const processed = await unblurImage(file);
      setProcessedImage(processed);
      toast.success("Image successfully enhanced!");
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setSelectedFile(null);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Image Unblurring Tool
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your blurry images and watch them transform with our AI-powered enhancement technology.
          </p>
          <div className="mt-6 inline-block">
            <span className="subtle-badge flex items-center">
              <Sparkles className="h-3 w-3 mr-1" />
              Powered by AI
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-fade-in">
          {!originalImage ? (
            <ImageUploader 
              onImageSelect={handleImageSelect} 
              className="max-w-xl mx-auto"
            />
          ) : (
            <ImageComparison
              originalImage={originalImage}
              processedImage={processedImage}
              isProcessing={isProcessing}
              fileName={selectedFile?.name || "image"}
              onReset={handleReset}
            />
          )}
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
          <h3 className="text-lg font-medium text-blue-800 mb-2">How it works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 font-bold mb-2">1</div>
              <h4 className="font-medium mb-1">Upload Your Image</h4>
              <p className="text-gray-600">Drag and drop or select any blurry image from your device.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 font-bold mb-2">2</div>
              <h4 className="font-medium mb-1">AI Enhancement</h4>
              <p className="text-gray-600">Our algorithm analyzes and enhances your image to reduce blur.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 font-bold mb-2">3</div>
              <h4 className="font-medium mb-1">Download Result</h4>
              <p className="text-gray-600">Compare the before and after, then download your improved image.</p>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Image Unblurring Tool. All rights reserved.</p>
          <p className="mt-1">We don't store your images - all processing happens in your browser.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
