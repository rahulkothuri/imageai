
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
          <span className="bg-black/70 text-white text-xs px-3 py-1 rounded-full">
            Before
          </span>
        </div>
        
        <div className="absolute bottom-4 right-4">
          <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
            After
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageComparison;
