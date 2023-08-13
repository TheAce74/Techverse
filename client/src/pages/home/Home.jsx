import CTA from "./components/CTA";
import Countdown from "./components/Countdown";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Location from "./components/Location";
import Pricing from "./components/Pricing";
import Speakers from "./components/Speakers";
import Sponsors from "./components/Sponsors";
import Testimonials from "./components/Testimonials";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();

  return (
    <>
      {location.pathname && (
        <motion.div
          key="home"
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Hero />
          <Intro />
          <Countdown />
          <Speakers />
          <Pricing />
          <Sponsors />
          <Testimonials />
          <Location />
          <CTA />
        </motion.div>
      )}
    </>
  );
}
export default Home;
