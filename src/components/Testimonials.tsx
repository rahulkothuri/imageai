
import { Star } from "lucide-react";

const Testimonials = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          What Our Users Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{testimonial.text}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Photographer",
    text: "This tool saved so many of my old photos that were blurry. The results are amazing and it's so easy to use!"
  },
  {
    name: "Michael Chen",
    title: "Graphic Designer",
    text: "I use this for both personal and professional projects. The quality of the unblurred images is impressive."
  },
  {
    name: "Jessica Williams",
    title: "Social Media Manager",
    text: "Fast, effective and free! I've tried many tools and this is by far the best for fixing blurry social media content."
  }
];

export default Testimonials;
