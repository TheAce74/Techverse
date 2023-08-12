import CTA from "./components/CTA";
import Countdown from "./components/Countdown";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Location from "./components/Location";
import Pricing from "./components/Pricing";
import Speakers from "./components/Speakers";
import Sponsors from "./components/Sponsors";
import Testimonials from "./components/Testimonials";

function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Countdown />
      <Speakers />
      <Pricing />
      <Sponsors />
      <Testimonials />
      <Location />
      <CTA />
    </>
  );
}
export default Home;
