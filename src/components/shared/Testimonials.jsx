import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const testimonials = [
  {
    quote:
      "OptimaHub has revolutionized our HR processes. It's user-friendly and incredibly efficient!",
    author: "Sarah Johnson",
    position: "HR Director, TechCorp",
    image:
      "https://pbs.twimg.com/profile_images/1271544502340198400/8Fq7zjbq_400x400.jpg",
  },
  {
    quote:
      "The analytics provided by OptimaHub have helped us make data-driven decisions about our workforce.",
    author: "Michael Chen",
    position: "CEO, InnovateNow",
    image: "https://doctors.rush.edu/Custom/Photos/Hires/988.jpg",
  },
  {
    quote:
      "OptimaHub's customer support is outstanding. They're always there when we need them.",
    author: "Emily Rodriguez",
    position: "Operations Manager, GrowFast Inc.",
    image:
      "https://miro.medium.com/v2/resize:fit:1200/1*hATEYt0u5wpq4VqRjsXfhQ.png",
  },
  {
    quote:
      "We've seen a significant increase in employee satisfaction since implementing OptimaHub.",
    author: "David Thompson",
    position: "CTO, FutureTech Solutions",
    image:
      "https://imageio.forbes.com/specials-images/imageserve/5a7ba72aa7ea43169012f1b4/0x0.jpg?format=jpg&crop=2250,2250,x1065,y60,safe&height=416&width=416&fit=bounds",
  },
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    slides: {
      perView: 1,
      spacing: 16,
    },
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            Discover why companies trust OptimaHub for their employee management
            needs.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="keen-slider__slide">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow-lg"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-3 h-3 rounded-full mx-1 ${
                currentSlide === idx ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ quote, author, position, image }) => {
  return (
    <div className=" rounded-lg shadow-lg p-8 mx-4">
      <div className="flex items-center mb-4">
        <Quote className="w-8 h-8 text-blue-600 mr-4" />
        <p className="text-xl italic">{quote}</p>
      </div>
      <div className="flex items-center mt-6">
        <img
          src={image || "/placeholder.svg"}
          alt={author}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <p className="font-semibold">{author}</p>
          <p>{position}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
