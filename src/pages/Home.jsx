import Banner from "@/components/shared/Banner";
import CTA from "@/components/shared/CTA";
import Features from "@/components/shared/Features";
import Services from "@/components/shared/Services";
import Testimonials from "@/components/shared/Testimonials";

const Home = () => {
  return (
    <>
      <Banner />
      <Services />
      {/* <Testimonials /> */}
      <Features />
      <CTA />
    </>
  );
};

export default Home;
