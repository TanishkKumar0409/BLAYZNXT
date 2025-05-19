import React from "react";
import { motion } from "framer-motion";
import PageHeader from "../../Components/PageHeader/PageHeader";
import ContactForm from "./ContactComponents/ContactForm";
import ContactInfo from "./ContactComponents/ContactInfo";
import ContactMap from "./ContactComponents/ContactMap";

const Contact = () => {
  return (
    <div>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our team for support, inquiries, or feedback"
        backgroundImage="/Images/contact_us_banner.jpeg"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <ContactInfo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <ContactMap />
    </div>
  );
};

export default Contact;
