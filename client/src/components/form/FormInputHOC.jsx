import { useState } from "react";
import FormInput from "./FormInput";
import { BsEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

export default function FormInputHOC({
  type,
  placeholder,
  rounded,
  required,
  icon,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-input-hoc">
      <span>{icon()}</span>
      <FormInput
        type={
          type === "password" ? (!showPassword ? "password" : "text") : type
        }
        placeholder={placeholder}
        rounded={rounded}
        required={required}
      />
      {type === "password" ? (
        <button className="eye" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <BsFillEyeSlashFill /> : <BsEyeFill />}
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
