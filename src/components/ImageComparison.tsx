
import { useState, useEffect, useRef } from "react";
import { Download, RefreshCw, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [progressValue, setProgressValue] = useState(0);

  // Simulate progress during loading
  useEffect(() => {
    let interval: number;
    
    if (isProcessing) {
      setProgressValue(0);
      interval = window.setInterval(() => {
        setProgressValue((prev) => {
          // Slow down progress as it gets closer to 90%
          const increment = prev < 30 ? 5 : prev < 60 ? 3 : prev < 80 ? 1 : 0.5;
          const nextValue = prev + increment;
          return nextValue > 90 ? 90 : nextValue;
        });
      }, 200);
    } else if (processedImage) {
      setProgressValue(100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isProcessing, processedImage]);

  // Handle mouse and touch events for the slider
  useEffect(() => {
    const handleMove = (clientX: number) => {
      if (!isDragging.current || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const newPosition = (x / rect.width) * 100;
      setSliderPosition(newPosition);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      handleMove(e.touches[0].clientX);
    };
    
    const handleEnd = () => {
      isDragging.current = false;
      document.body.style.cursor = 'default';
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleEnd);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, []);

  const handleStart = () => {
    isDragging.current = true;
    document.body.style.cursor = 'ew-resize';
  };

  const handleMouseDown = () => {
    handleStart();
  };

  const handleTouchStart = () => {
    handleStart();
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
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-md bg-gray-50"
      >
        {/* Loading State */}
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="flex flex-col items-center space-y-6 p-8 bg-white/80 rounded-xl backdrop-blur-sm max-w-xs w-full">
              <div className="animate-spin">
                <Loader className="h-10 w-10 text-blue-500" />
              </div>
              <div className="w-full space-y-2">
                <Progress value={progressValue} className="h-2" />
                <p className="text-sm font-medium text-gray-600 text-center">
                  Enhancing your image... {Math.round(progressValue)}%
                </p>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Using AI to remove blur and enhance details
              </p>
            </div>
          </div>
        )}
        
        {/* Original Image (When no processed image yet) */}
        {originalImage && !processedImage && !isProcessing && (
          <div className="absolute top-0 left-0 w-full h-full">
            <img 
              src={originalImage} 
              alt="Original"
              className="w-full h-full object-contain bg-gray-900/5"
            />
          </div>
        )}
        
        {/* Before & After Comparison View */}
        {originalImage && processedImage && (
          <>
            {/* Enhanced Image (Right Side) */}
            <div className="absolute top-0 left-0 w-full h-full">
              <img 
                src={processedImage} 
                alt="Enhanced"
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Blurred Image (Left Side - controlled by slider) */}
            <div 
              className="absolute top-0 left-0 h-full overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src={originalImage} 
                alt="Blurred"
                className="w-full h-full object-contain"
                style={{ 
                  width: `${(100 / sliderPosition) * 100}%`, 
                  maxWidth: 'none' 
                }}
              />
            </div>
            
            {/* Divider Line */}
            <div
              ref={sliderRef}
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg cursor-ew-resize z-20"
              style={{ left: `${sliderPosition}%` }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            />
            
            {/* Slider Handle */}
            <div
              className="absolute w-10 h-10 -ml-5 bg-white rounded-full shadow-lg flex items-center justify-center cursor-ew-resize z-20"
              style={{ 
                left: `${sliderPosition}%`,
                top: `calc(50% - 20px)`
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              <div className="flex space-x-[1px]">
                <div className="w-0.5 h-6 bg-gray-300"></div>
                <div className="w-0.5 h-6 bg-gray-300"></div>
              </div>
            </div>
            
            {/* Labels */}
            <div className="absolute top-4 left-4 z-20">
              <span className="bg-black/70 text-white text-xs px-4 py-1.5 rounded-full">
                Blurred
              </span>
            </div>
            
            <div className="absolute top-4 right-4 z-20">
              <span className="bg-blue-500 text-white text-xs px-4 py-1.5 rounded-full">
                Enhanced
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageComparison;
