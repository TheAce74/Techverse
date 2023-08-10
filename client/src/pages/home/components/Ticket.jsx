import Button from "../../../components/ui/Button";
import Icon from "../../../components/ui/Icon";
import { BsFillStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Ticket({
  type,
  price,
  iconFill,
  buttonColor,
  content,
}) {
  return (
    <div className="ticket" data-color={buttonColor}>
      <div className="head">
        <div>
          <h4>{type} ticket</h4>
          <p aria-label={`price: ${price} naira`}>
            <span aria-hidden="true">{`N${price}`}</span>
          </p>
        </div>
        <Icon
          icon={(fill) => <BsFillStarFill data-fill={fill} className="icon" />}
          fill={iconFill}
        />
      </div>
      <div className="body">
        <ul>
          {content.map(({ id, text }) => (
            <li key={id}>{text}</li>
          ))}
        </ul>
        <Link to="/signup">
          <Button color={buttonColor}>Buy ticket</Button>
        </Link>
      </div>
    </div>
  );
}
