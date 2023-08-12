import { BsFillCaretRightFill } from "react-icons/bs";
import Icon from "../../../components/ui/Icon";

export default function Speaker({ name, position, imgUrl, text, person }) {
  return (
    <div className="speaker" id={person}>
      <div>
        <div className="image-wrapper">
          <img src={imgUrl} alt="" />
        </div>
        <h3>
          <Icon
            icon={(fill) => (
              <BsFillCaretRightFill data-fill={fill} className="icon" />
            )}
            fill="primary-400"
          />
          <span>{name}</span>
        </h3>
        <p>{position}</p>
      </div>
      <p>{text}</p>
    </div>
  );
}
