import { motion } from "framer-motion";
import { Shield, Zap, Lock } from "lucide-react";

const features = [
  {
    icon: <Shield className="h-8 w-8 text-blue-600" />,
    title: "Secure Storage",
    description:
      "Enterprise-grade encryption keeps your files safe and private.",
  },
  {
    icon: <Zap className="h-8 w-8 text-green-600" />,
    title: "Fast Upload",
    description:
      "Lightning-fast upload speeds with our optimized infrastructure.",
  },
  {
    icon: <Lock className="h-8 w-8 text-red-600" />,
    title: "Access Control",
    description: "Set permissions and control who can access your files.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-green-50 to-blue-50 opacity-50 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Teams
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to share, store, and collaborate on files
            securely
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="bg-gray-50 p-3 rounded-lg inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
