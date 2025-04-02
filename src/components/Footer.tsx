
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">Unblur.AI</h3>
          <p className="text-gray-600 text-sm">
            The easiest way to unblur and enhance your blurry images online.
          </p>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-4">Products</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-blue-500">Unblur Image</Link></li>
            <li><Link to="/" className="hover:text-blue-500">Enhance Photos</Link></li>
            <li><Link to="/" className="hover:text-blue-500">Background Remover</Link></li>
            <li><Link to="/" className="hover:text-blue-500">AI Generator</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-4">Learn</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-blue-500">Help Center</Link></li>
            <li><Link to="/" className="hover:text-blue-500">Tutorials</Link></li>
            <li><Link to="/" className="hover:text-blue-500">Blog</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-blue-500">About Us</Link></li>
            <li><Link to="/" className="hover:text-blue-500">Contact</Link></li>
            <li><Link to="/" className="hover:text-blue-500">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-blue-500">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Unblur.AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
