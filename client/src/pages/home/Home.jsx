import Countdown from "./components/Countdown";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Pricing from "./components/Pricing";
import Speakers from "./components/Speakers";

function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Countdown />
      <Speakers />
      <Pricing />
    </>
  );
}
export default Home;
