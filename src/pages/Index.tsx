
import { useState } from "react";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import ImageUploader from "@/components/ImageUploader";
import ImageComparison from "@/components/ImageComparison";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
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
    <div className="min-h-screen bg-white">
      <Header />
      
      {!originalImage && (
        <>
          <Banner />
          
          <div className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Unblur Your Images Now
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Upload your blurry image and our AI will enhance it instantly.
                </p>
              </div>
              
              <ImageUploader 
                onImageSelect={handleImageSelect} 
                className="max-w-2xl mx-auto shadow-md"
              />
            </div>
          </div>
          
          <Features />
          <Testimonials />
        </>
      )}
      
      {originalImage && (
        <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Image Enhancement Results
              </h2>
              <div className="inline-block bg-blue-50 px-4 py-2 rounded-full">
                <span className="flex items-center text-blue-600 text-sm font-medium">
                  <Sparkles className="h-4 w-4 mr-1" />
                  Enhanced with AI Technology
                </span>
              </div>
            </div>
            
            <ImageComparison
              originalImage={originalImage}
              processedImage={processedImage}
              isProcessing={isProcessing}
              fileName={selectedFile?.name || "image"}
              onReset={handleReset}
            />
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
