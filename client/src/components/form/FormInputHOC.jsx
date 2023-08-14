import FormInput from "./FormInput";
import { BsEyeFill } from "react-icons/bs";

export default function FormInputHOC({
  type,
  placeholder,
  rounded,
  required,
  icon,
}) {
  return (
    <div className="form-input-hoc">
      <span>{icon()}</span>
      <FormInput
        type={type}
        placeholder={placeholder}
        rounded={rounded}
        required={required}
      />
      {type === "password" ? <BsEyeFill /> : ""}
    </div>
  );
}
