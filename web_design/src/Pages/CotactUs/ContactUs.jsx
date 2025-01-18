import React from "react";
import InnerPagesBanner from "../../Components/InnerPagesBanner/InnerPagesBanner";
import Footer from "../../Components/Footer/Footer";

import ContactCards from "./ContactComponents/ContactCards";
import ContactForm from "./ContactComponents/ContactForm";

export default function ContactUs() {
  const BannerData = {
    icon: "blender-phone",
    heading: "Contact Us",
    para: "Have questions or need assistance? Reach out to us and we’ll be happy to help. Our support team is available to assist you with any inquiries or issues you may have.",
  };

  return (
    <>
      <InnerPagesBanner BannerData={BannerData} />
      <ContactCards />
      <ContactForm />
      <Footer />
    </>
  );
}
