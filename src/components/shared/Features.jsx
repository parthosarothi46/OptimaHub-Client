import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Zap, Lock } from "lucide-react";

const features = [
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Easy to Use",
    description:
      "Intuitive interface designed for seamless user experience across all devices.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Time-Saving",
    description:
      "Automate repetitive tasks and streamline your HR processes to save valuable time.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Powerful Analytics",
    description:
      "Gain actionable insights with our advanced reporting and analytics tools.",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Secure & Compliant",
    description:
      "Rest easy knowing your data is protected with state-of-the-art security measures.",
  },
];

const Features = () => {
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
            Why Choose OptimaHub?
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            Discover the features that make OptimaHub the preferred choice for
            employee management.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg"
    >
      <div className="bg-blue-100 rounded-full p-3 mb-4">
        {React.cloneElement(icon, { className: "w-6 h-6 text-blue-600" })}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
};

export default Features;
