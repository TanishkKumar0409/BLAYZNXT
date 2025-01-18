import React from "react";
import HomeBanner from "./HomeComponents/HomeBanner/HomeBanner";
import Footer from "../../Components/Footer/Footer";
import AboutUs from "./HomeComponents/AboutUs.jsx/AboutUs";
import FAQ from "./HomeComponents/FAQ/FAQ";
import Newsletter from "./HomeComponents/Newsletter.jsx/Newsletter";
import Features from "./HomeComponents/Features/Features";
import Testimonials from "./HomeComponents/Testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <HomeBanner />
      <AboutUs />
      <Features />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
    </>
  );
}
