
import { useState, useEffect, useRef } from "react";
import { Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { downloadImage } from "@/services/imageService";

interface ImageComparisonProps {
  originalImage: string;
  processedImage: string | null;
  isProcessing: boolean;
  fileName: string;
  onReset: () => void;
}

const ImageComparison = ({
  originalImage,
  processedImage,
  isProcessing,
  fileName,
  onReset
}: ImageComparisonProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const newPosition = (x / rect.width) * 100;
      setSliderPosition(newPosition);
    };
    
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleDownload = () => {
    if (processedImage) {
      downloadImage(processedImage, `unblurred-${fileName}`);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Before & After</h3>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onReset}
            className="border-gray-200 hover:bg-gray-100"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            New Image
          </Button>
          <Button 
            size="sm" 
            onClick={handleDownload}
            disabled={!processedImage}
            className="blue-button"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-md image-card"
      >
        {/* Original Image (Left Side) */}
        <div className="absolute top-0 left-0 w-full h-full">
          <img 
            src={originalImage} 
            alt="Original"
            className="w-full h-full object-contain bg-gray-900/5"
          />
        </div>
        
        {/* Processed Image (Right Side with Slider) */}
        {processedImage ? (
          <div 
            className="absolute top-0 left-0 h-full overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img 
              src={processedImage} 
              alt="Processed"
              className="absolute top-0 left-0 w-[100vw] max-w-none h-full object-contain bg-gray-900/5"
              style={{ 
                left: `${-((100 - sliderPosition) / sliderPosition) * 100}%`,
                width: `${10000 / sliderPosition}%`
              }}
            />
          </div>
        ) : isProcessing ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin">
                <RefreshCw className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-sm font-medium text-gray-600">
                Enhancing your image...
              </p>
            </div>
          </div>
        ) : null}
        
        {/* Slider */}
        {processedImage && (
          <>
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-md cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
              onMouseDown={handleMouseDown}
            />
            <div
              className="absolute w-8 h-8 bg-white rounded-full -ml-4 shadow-md flex items-center justify-center cursor-ew-resize"
              style={{ 
                left: `${sliderPosition}%`,
                top: `calc(50% - 16px)`
              }}
              onMouseDown={handleMouseDown}
            >
              <div className="w-1 h-6 bg-gray-300 rounded-full"></div>
            </div>
          </>
        )}
        
        {/* Labels */}
        <div className="absolute bottom-4 left-4">
          <span className="subtle-badge">
            Before
          </span>
        </div>
        
        <div className="absolute bottom-4 right-4">
          <span className="subtle-badge">
            After
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageComparison;
