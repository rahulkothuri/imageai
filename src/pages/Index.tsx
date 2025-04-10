
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
import ProcessingTypeSelector, { ProcessingType } from "@/components/ProcessingTypeSelector";
import { processImage } from "@/services/imageService";

const Index = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingType, setProcessingType] = useState<ProcessingType>("unblur");

  const handleProcessingTypeChange = (type: ProcessingType) => {
    setProcessingType(type);
    // Reset images when changing the processing type
    if (originalImage) {
      handleReset();
    }
  };

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

      // Process the image with the selected processing type
      const processed = await processImage(file, processingType);
      setProcessedImage(processed);
      
      // Show appropriate success message
      const successMessages = {
        unblur: "Image successfully unblurred!",
        restore: "Image successfully restored!",
        "remove-bg": "Background successfully removed!"
      };
      toast.success(successMessages[processingType]);
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
  
  const getProcessingTitle = () => {
    switch (processingType) {
      case "unblur": return "Unblur Your Images";
      case "restore": return "Restore Old Photos";
      case "remove-bg": return "Remove Image Background";
      default: return "Process Your Images";
    }
  };
  
  const getProcessingDescription = () => {
    switch (processingType) {
      case "unblur": return "Upload your blurry image and our AI will enhance it instantly.";
      case "restore": return "Upload damaged or old photos and our AI will restore them to their original glory.";
      case "remove-bg": return "Upload any image and our AI will remove the background, leaving only the subject.";
      default: return "Upload your image and let our AI process it for you.";
    }
  };

  const getResultTitle = () => {
    switch (processingType) {
      case "unblur": return "Image Enhancement Results";
      case "restore": return "Image Restoration Results";
      case "remove-bg": return "Background Removal Results";
      default: return "Image Processing Results";
    }
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
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  ImageAI
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  AI-powered image processing tools
                </p>
                
                <ProcessingTypeSelector 
                  selectedType={processingType} 
                  onChange={handleProcessingTypeChange} 
                />
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {getProcessingTitle()}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {getProcessingDescription()}
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
                {getResultTitle()}
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
              processingType={processingType}
            />
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
