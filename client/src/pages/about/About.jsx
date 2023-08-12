import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

function About() {
  return (
    <section className="about">
      <h1>About Us</h1>
      <p>
        Techverse Conference is an initiative among top visionary tech
        enthusiasts to great amazing conferences to help tech newbies navigate
        the tech space with ease and clarity. This would help them have a more
        fulfilling experience and reduce thr time it&apos;ll take them to fully
        get integrated into tech. This cohorts conference is the ultimate
        gathering for tech enthusiasts, visionaries, and pioneers in the digital
        realm. With the subtheme &quot;Navigating the digital universe,&quot; we
        invite you to embark on an extraordinary journey where cutting-edge
        ideas converge and innovation knows no bounds. This immersive tech
        conference is designed to push boundaries, challenge perspectives, and
        empower you to thrive in the ever-evolving digital landscape.
      </p>
      <p>
        At Techverse, you&apos;ll be surrounded by a diverse community of
        thought leaders, entrepreneurs, and experts who are shaping the future
        of technology. Engage in thought-provoking sessions, insightful
        keynotes, and hands-on workshops that will equip you with the knowledge
        and tools to navigate the complexities of the digital universe. Whether
        you&apos;re passionate about artificial intelligence, blockchain,
        cybersecurity, or any other tech frontier, Techverse offers a platform
        for networking, learning, and collaboration like no other.
      </p>
      <Link to="/signup" className="register">
        <Button color="secondary">Get Ticket</Button>
      </Link>
    </section>
  );
}
export default About;
