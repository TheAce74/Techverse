import focus from "../../../assets/images/focused-man-using-laptop-transformed.png";

function Intro() {
  return (
    <section className="intro">
      <div>
        <h2>What&apos;s Techverse?</h2>
        <p>
          Welcome to Techverse, the ultimate gathering for tech enthusiasts,
          visionaries, and pioneers in the digital realm. With the subtheme
          &quot;Navigating the digital universe,&quot; we invite you to embark
          on an extraordinary journey where cutting-edge ideas converge and
          innovation knows no bounds. This immersive tech conference is designed
          to push boundaries, challenge perspectives, and empower you to thrive
          in the ever-evolving digital landscape.
        </p>
        <p>
          At Techverse, you&apos;ll be surrounded by a diverse community of
          thought leaders, entrepreneurs, and experts who are shaping the future
          of technology. Engage in thought-provoking sessions, insightful
          keynotes, and hands-on workshops that will equip you with the
          knowledge and tools to navigate the complexities of the digital
          universe. Whether you&apos;re passionate about artificial
          intelligence, block- chain, cybersecurity, or any other tech frontier,
          Techverse offers a platform for networking, learning, and
          collaboration like no other.
        </p>
      </div>
      <img src={focus} alt="" />
    </section>
  );
}
export default Intro;
