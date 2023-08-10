import paystack from "../../../assets/images/paystack.png";
import adobe from "../../../assets/images/adobe.png";
import airbnb from "../../../assets/images/airbnb.png";
import andela from "../../../assets/images/andela.png";
import kuda from "../../../assets/images/kuda.png";
import mtn from "../../../assets/images/mtn.png";
import microsoft from "../../../assets/images/microsoft.png";
import google from "../../../assets/images/google.png";
import youtube from "../../../assets/images/youtube.png";
import Button from "../../../components/ui/Button";
import { Link } from "react-router-dom";

function Sponsors() {
  return (
    <section className="sponsors">
      <h2>Our Sponsors/Partners</h2>
      <ul role="list">
        <li>
          <img src={paystack} alt="paystack" />
        </li>
        <li>
          <img src={adobe} alt="adobe" />
        </li>
        <li>
          <img src={airbnb} alt="airbnb" />
        </li>
        <li>
          <img src={andela} alt="andela" />
        </li>
        <li>
          <img src={kuda} alt="kuda" />
        </li>
        <li>
          <img src={mtn} alt="mtn" />
        </li>
        <li>
          <img src={microsoft} alt="microsoft" />
        </li>
        <li>
          <img src={google} alt="google" />
        </li>
        <li>
          <img src={youtube} alt="youtube" />
        </li>
      </ul>
      <div>
        <h3>Want to be part of our sponsors?</h3>
        <Link to="/contact">
          <Button>Join Sponsors</Button>
        </Link>
      </div>
    </section>
  );
}
export default Sponsors;
