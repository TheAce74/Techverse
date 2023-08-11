import { ImQuotesRight } from "react-icons/im";

export default function Testimonial({ text, imgUrl, name, position }) {
  return (
    <li className="testimonial">
      <ImQuotesRight className="quote" />
      <p>{text}</p>
      <div className="info">
        <img src={imgUrl} alt="" />
        <div>
          <h3>{name}</h3>
          <p>{position}</p>
        </div>
      </div>
    </li>
  );
}
