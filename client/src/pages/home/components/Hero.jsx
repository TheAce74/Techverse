import video from "../../../assets/videos/video.mp4";
import Button from "../../../components/ui/Button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <h1>
        Discover, <span>Connect</span>, and Navigate the Frontiers of Technology
      </h1>
      <p>
        Explore and discover a limitless world filled with endless opportunities
        through the leveraging of new and exciting technologies
      </p>
      <Link to="/signup">
        <Button>Register Now</Button>
      </Link>
      <video src={video} loop autoPlay aria-hidden="true"></video>
    </section>
  );
}
export default Hero;
