import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  BarChartIcon as ChartBar,
  Shield,
  Headphones,
  Zap,
  Briefcase,
} from "lucide-react";

const services = [
  {
    icon: <Users className="w-12 h-12" />,
    title: "Employee Management",
    description:
      "Streamline your workforce management with our comprehensive employee tracking and organization tools.",
  },
  {
    icon: <ChartBar className="w-12 h-12" />,
    title: "Performance Analytics",
    description:
      "Gain valuable insights into employee performance with our advanced analytics and reporting features.",
  },
  {
    icon: <Shield className="w-12 h-12" />,
    title: "Compliance Management",
    description:
      "Stay compliant with labor laws and regulations using our up-to-date compliance management system.",
  },
  {
    icon: <Headphones className="w-12 h-12" />,
    title: "24/7 Support",
    description:
      "Get round-the-clock assistance from our dedicated support team to resolve any issues promptly.",
  },
  {
    icon: <Zap className="w-12 h-12" />,
    title: "Payroll Automation",
    description:
      "Simplify your payroll process with our automated system, ensuring accurate and timely payments.",
  },
  {
    icon: <Briefcase className="w-12 h-12" />,
    title: "Recruitment Solutions",
    description:
      "Streamline your hiring process with our integrated recruitment tools and applicant tracking system.",
  },
];

const Services = () => {
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
            Our Services
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            Discover how OptimaHub can transform your employee management
            experience with our comprehensive suite of services.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className=" rounded-lg shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl"
    >
      <div className="rounded-full p-3 mb-4">
        {React.cloneElement(icon, { className: "w-8 h-8 text-blue-600" })}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
};

export default Services;
