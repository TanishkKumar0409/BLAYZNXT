import { motion } from "framer-motion";

const TimelineSection = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Our Real Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700"
          >
            From a college idea to a fully launched product — here's how our
            journey unfolded.
          </motion.p>
        </div>

        {/* Timeline Line */}
        <div className="relative">
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600"></div>

          {/* Timeline Events */}
          <div className="relative z-10">
            <TimelineEvent
              year="2025"
              title="The Spark of an Idea"
              description="It all started as a simple college project — an attempt to solve real-world file sharing concerns with simplicity and security."
              alignment="right"
              delay={0}
              imageUrl="/Images/idea_spark.jpeg"
            />

            <TimelineEvent
              year="2025"
              title="Project Foundation"
              description="Turning ambition into action, we began building the core framework — late nights, whiteboards, and countless lines of code."
              alignment="left"
              delay={0.2}
              imageUrl="/Images/foundation.jpeg"
            />

            <TimelineEvent
              year="2025"
              title="Going Live"
              description="With real dedication and teamwork, our platform finally launched to the world — a proud moment born from vision and persistence."
              alignment="right"
              delay={0.4}
              imageUrl="/Images/going_live.jpeg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineEvent = ({
  year,
  title,
  description,
  alignment,
  delay = 0,
  imageUrl,
}) => (
  <div
    className={`relative flex flex-col md:flex-row items-center mb-16 ${
      alignment === "left" ? "md:flex-row-reverse text-left" : "text-left"
    }`}
  >
    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full border-4 border-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md z-20"></div>

    <motion.div
      initial={{ opacity: 0, x: alignment === "left" ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className={`w-full md:w-5/12 px-4 py-4 ${
        alignment === "left" ? "md:text-right" : "md:text-left"
      }`}
    >
      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center mb-2">
          <div className="text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700">
            {year}
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>

    <div className="w-0 md:w-2/12"></div>

    <motion.div
      initial={{ opacity: 0, x: alignment === "left" ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: delay + 0.2, duration: 0.5 }}
      viewport={{ once: true }}
      className="hidden md:block w-full md:w-5/12 px-4 py-4"
    >
      <div className="overflow-hidden rounded-xl shadow-sm border border-gray-100">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>
    </motion.div>
  </div>
);

export default TimelineSection;
