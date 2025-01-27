import { motion } from "framer-motion";
import { Users, TrendingUp, Award, Zap } from "lucide-react";

const Banner = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Banner Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Welcome to OptimaHub
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-8">
            Empowering Your Workforce, Elevating Your Business
          </p>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
        >
          <FeatureCard
            icon={<Users className="w-12 h-12" />}
            title="5000+"
            description="Employees Managed"
          />
          <FeatureCard
            icon={<TrendingUp className="w-12 h-12" />}
            title="30%"
            description="Increase in Productivity"
          />
          <FeatureCard
            icon={<Award className="w-12 h-12" />}
            title="#1"
            description="in Employee Satisfaction"
          />
          <FeatureCard
            icon={<Zap className="w-12 h-12" />}
            title="24/7"
            description="Support & Assistance"
          />
        </motion.div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white bg-opacity-10 rounded-lg p-6 text-center"
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-lg">{description}</p>
    </motion.div>
  );
};

export default Banner;
