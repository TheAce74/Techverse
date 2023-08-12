import techverse from "../../../assets/images/techverse.png";

function Location() {
  return (
    <section className="location">
      <div className="wrapper">
        <div>
          <h2>New to the area? We&apos;ve got you covered</h2>
          <p>
            Your safety matters to us! Get to know your way around the
            conference venue using this custom map we&apos;ve designed for you
            that helps you navigate the surroundings so you can easily move
            around
          </p>
        </div>
        <img src={techverse} alt="" />
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.1955598720333!2d6.99189007383898!3d5.387137035327012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10425d762018584d%3A0x4ffe8b989faa3ba!2sUCC%20Building%20Futo!5e0!3m2!1sen!2sng!4v1691797959048!5m2!1sen!2sng"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowfullscreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
}
export default Location;
