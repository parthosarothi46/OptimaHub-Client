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
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "The analytics provided by OptimaHub have helped us make data-driven decisions about our workforce.",
    author: "Michael Chen",
    position: "CEO, InnovateNow",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "OptimaHub's customer support is outstanding. They're always there when we need them.",
    author: "Emily Rodriguez",
    position: "Operations Manager, GrowFast Inc.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "We've seen a significant increase in employee satisfaction since implementing OptimaHub.",
    author: "David Thompson",
    position: "CTO, FutureTech Solutions",
    image: "/placeholder.svg?height=100&width=100",
  },
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [sliderRef, instanceRef] =
    useKeenSlider <
    HTMLDivElement >
    {
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      slides: {
        perView: 1,
        spacing: 16,
      },
    };

  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
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
    <div className="bg-white rounded-lg shadow-lg p-8 mx-4">
      <div className="flex items-center mb-4">
        <Quote className="w-8 h-8 text-blue-600 mr-4" />
        <p className="text-xl text-gray-800 italic">{quote}</p>
      </div>
      <div className="flex items-center mt-6">
        <img
          src={image || "/placeholder.svg"}
          alt={author}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <p className="font-semibold text-gray-900">{author}</p>
          <p className="text-gray-600">{position}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
