import video from "../../../assets/videos/video.mp4";
import Button from "../../../components/ui/Button";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";

function Hero() {
  const { user, setLoader } = useAppContext();
  return (
    <section className="hero">
      <h1>
        Discover, <span>Connect</span>, and Navigate the Frontiers of Technology
      </h1>
      <p>
        Explore and discover a limitless world filled with endless opportunities
        through the leveraging of new and exciting technologies
      </p>
      {!user?.username ? (
        <Link to="/signup">
          <Button>Register Now</Button>
        </Link>
      ) : (
        <Link to="/profile">
          <Button>Your Profile</Button>
        </Link>
      )}
      <video
        onPlaying={() => setLoader(false)}
        src={video}
        loop
        autoPlay
        muted
        playsInline
        aria-hidden="true"
      ></video>
    </section>
  );
}
export default Hero;
