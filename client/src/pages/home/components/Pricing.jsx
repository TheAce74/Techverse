import { tickets } from "../../../data/pricing";
import Ticket from "./Ticket";

function Pricing() {
  return (
    <section className="pricing">
      <div>
        <h2>Pricing Plan</h2>
        <h3>Get your tickets</h3>
        <p>
          Elevate your tech expertise and secure your place at Techverse - the
          premier tech conference where groundbreaking ideas collide,
          connections flourish, and the digital universe awaits your
          exploration. Don&apos;t miss out on this transformative experience -
          grab your tickets today and prepare to navigate the forefront of
          innovation.
        </p>
      </div>
      <div className="tickets">
        {tickets.map(({ id, ...otherProps }) => (
          <Ticket key={id} {...otherProps} />
        ))}
      </div>
    </section>
  );
}

export default Pricing;
