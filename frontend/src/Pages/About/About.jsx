import PageHeader from "../../Components/PageHeader/PageHeader";
import FAQSection from "./AboutComponent/FAQSection";
import FeaturesSection from "./AboutComponent/FeaturesSection";
import ImpactSection from "./AboutComponent/ImpactSection";
import MissionSection from "./AboutComponent/MissionSection";
import TestimonialsSection from "./AboutComponent/TestimonialsSection";
import TimelineSection from "./AboutComponent/TimeLineSection";

const About = () => {
  return (
    <div>
      <PageHeader
        title="About Us"
        subtitle="Need help or have questions about your shared files? Contact our team for support or feedback."
        backgroundImage="/Images/about_us_banner.jpeg"
      />

      <MissionSection />
      <FeaturesSection />
      <TimelineSection />
      <ImpactSection />
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
};

export default About;
