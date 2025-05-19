import React from "react";
import { motion } from "framer-motion";

const ContactMap = () => {
  return (
    <section className="py-0 bg-gray-50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative h-96 w-full"
      >
        <div className="" />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0888247439395!2d-122.39673238478173!3d37.7911218797561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858075e71e512b%3A0x705df759e97f02e8!2sSalesforce%20Tower!5e0!3m2!1sen!2sus!4v1639007062027!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="FileShare Office Location"
        ></iframe>
      </motion.div>
    </section>
  );
};

export default ContactMap;
