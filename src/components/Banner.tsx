
import { Check } from "lucide-react";

const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Edit Images in Seconds using AI
        </h1>
        <p className="text-xl text-gray-600 mb-8 mx-auto max-w-2xl">
          Our AI-powered tool makes blurry photos crystal clear with just one click. No signup required.
        </p>
        
        <div className="flex justify-center space-x-8 mb-10">
          <div className="flex items-center text-gray-700">
            <Check className="h-5 w-5 text-blue-500 mr-2" />
            <span>100% Free</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Check className="h-5 w-5 text-blue-500 mr-2" />
            <span>No Registration</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Check className="h-5 w-5 text-blue-500 mr-2" />
            <span>AI-Powered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
