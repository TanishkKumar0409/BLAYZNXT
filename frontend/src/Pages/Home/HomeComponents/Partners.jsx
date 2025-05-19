import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const partners = [
  {
    name: "Microsoft",
    logo: "https://images.unsplash.com/photo-1583321500900-82807e458f3c?w=200",
  },
  {
    name: "Google",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200",
  },
  {
    name: "Amazon",
    logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=200",
  },
  {
    name: "Meta",
    logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200",
  },
  {
    name: "Apple",
    logo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=200",
  },
  {
    name: "IBM",
    logo: "https://images.unsplash.com/photo-1496200186974-4293800e2c20?w=200",
  },
  // Duplicate for infinite scroll
  {
    name: "Microsoft",
    logo: "https://images.unsplash.com/photo-1583321500900-82807e458f3c?w=200",
  },
  {
    name: "Google",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200",
  },
  {
    name: "Amazon",
    logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=200",
  },
];

const Partners = () => {
  const scrollRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPos = 0;
    const scroll = () => {
      scrollPos += 0.5;
      if (scrollPos >= scrollContainer.scrollWidth / 2) {
        scrollPos = 0;
      }
      scrollContainer.scrollLeft = scrollPos;
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full bg-white/10 text-blue-300 font-medium mb-4"
          >
            Trusted Worldwide
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join thousands of companies worldwide who trust us with their file
            sharing needs
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10" />

          <div
            ref={scrollRef}
            className="flex overflow-x-hidden"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div className="flex space-x-8 py-4">
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0"
                >
                  <div className="bg-white/10 p-6 rounded-xl hover:bg-white/20 transition-colors cursor-pointer backdrop-blur-sm">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
