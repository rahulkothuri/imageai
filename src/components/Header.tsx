
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-blue-500">
            ImageAI
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-blue-500">
            Home
          </Link>
          <Link to="/" className="text-gray-600 hover:text-blue-500">
            Features
          </Link>
          <Link to="/" className="text-gray-600 hover:text-blue-500">
            How It Works
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden md:inline-flex border-gray-200 hover:bg-gray-50 hover:text-blue-500">
            Sign In
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Try Free
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
