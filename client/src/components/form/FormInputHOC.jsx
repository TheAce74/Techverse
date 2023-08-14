import { useState, forwardRef } from "react";
import FormInput from "./FormInput";
import { BsEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const FormInputHOC = forwardRef(
  ({ type, placeholder, rounded, required, icon }, ref) => {
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
          ref={ref}
        />
        {type === "password" ? (
          <button
            className="eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <BsFillEyeSlashFill /> : <BsEyeFill />}
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
);
export default FormInputHOC;
