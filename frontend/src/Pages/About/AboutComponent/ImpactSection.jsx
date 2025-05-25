import { motion } from "framer-motion";
import { Users, FileText } from "lucide-react";

const ImpactSection = () => {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Our Impact in Numbers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700"
          >
            The numbers speak for themselves. Here's how FileShare is making a
            difference around the world.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16 justify-center">
          <StatCard
            icon={<Users className="h-10 w-10 text-purple-600" />}
            value="100+"
            label="Early Users"
            description="Joined during our beta launch and provided valuable feedback"
            delay={0}
          />
          <StatCard
            icon={<FileText className="h-10 w-10 text-purple-600" />}
            value="150+"
            label="Files Shared"
            description="Securely transferred in our early access phase"
            delay={0.1}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Real-World Use Cases
            </h3>

            <div className="space-y-6">
              <UseCaseCard
                title="Students"
                description="Easily share assignments, notes, and study materials with classmates and teachers."
              />
              <UseCaseCard
                title="Freelancers"
                description="Send project files to clients quickly and securely, with no size limit."
              />
              <UseCaseCard
                title="Small Business Owners"
                description="Share invoices, reports, and documents with partners and team members."
              />
              <UseCaseCard
                title="Friends & Family"
                description="Send personal photos, videos, or documents to loved ones with just a few clicks."
              />
            </div>
          </motion.div>

          {/* What's Next & Global Accessibility */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                What's Next?
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                We're constantly innovating to stay ahead of security threats
                and provide the best experience for our users.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mr-2"></div>
                  <span>AI-powered threat detection and prevention</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-600 mr-2"></div>
                  <span>
                    Advanced collaboration tools with real-time editing
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-pink-600 mr-2"></div>
                  <span>Expanded integrations with productivity tools</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                  <span>Enhanced mobile experience for on-the-go security</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Global Accessibility
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                We believe secure file sharing should be available to everyone,
                regardless of location or ability.
              </p>
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  Sustainability & Green Storage
                </h4>
                <p className="text-gray-600 mb-4">
                  Our data centers run on 100% renewable energy, and we're
                  committed to reducing our carbon footprint through efficient
                  storage technologies.
                </p>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2.5 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <span className="ml-3 text-sm text-gray-600">
                    75% towards carbon neutrality
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ icon, value, label, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center"
  >
    <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-50 to-purple-50">
      {icon}
    </div>
    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-1">
      {value}
    </h3>
    <p className="text-lg font-semibold text-gray-900 mb-2">{label}</p>
    <p className="text-gray-600 text-sm">{description}</p>
  </motion.div>
);

const UseCaseCard = ({ title, description }) => (
  <div className="bg-white p-5 rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all">
    <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default ImpactSection;
