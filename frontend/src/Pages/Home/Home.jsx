import React from "react";
import Features from "./HomeComponents/Features";
import SecurityPromise from "./HomeComponents/SecurityPromise";
import Testimonials from "./HomeComponents/Testimonials";
import FAQ from "./HomeComponents/Faqs";
import About from "./HomeComponents/Aboutus";
import Partners from "./HomeComponents/Partners";
import Hero from "./HomeComponents/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Features />
      <SecurityPromise />
      <Testimonials />
      {/* <Partners /> */}
      <FAQ />
    </div>
  );
}
