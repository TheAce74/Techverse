import { HashLink } from "react-router-hash-link";
import Button from "../../../components/ui/Button";
import { BsFillCaretRightFill } from "react-icons/bs";
import Icon from "../../../components/ui/Icon";

export default function Speaker({ name, position, imgUrl, speakerUrl }) {
  return (
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
      <HashLink to={speakerUrl}>
        <Button color="secondary">View Profile</Button>
      </HashLink>
    </div>
  );
}
