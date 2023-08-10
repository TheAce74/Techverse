import Countdown from "./components/Countdown";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Speakers from "./components/Speakers";

function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Countdown />
      <Speakers />
    </>
  );
}
export default Home;
