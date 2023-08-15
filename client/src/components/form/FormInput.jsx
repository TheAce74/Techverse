import { forwardRef } from "react";

const FormInput = forwardRef(
  ({ type, placeholder, rounded, required, textarea, id, value }, ref) => {
    return (
      <>
        {!textarea ? (
          <input
            type={type || "text"}
            placeholder={placeholder}
            className="form-input"
            data-rounded={rounded}
            required={required}
            id={id}
            ref={ref}
            value={value}
          />
        ) : (
          <textarea
            cols="30"
            rows="10"
            className="form-input"
            placeholder={placeholder}
            required={required}
            id={id}
            ref={ref}
            value={value}
          ></textarea>
        )}
      </>
    );
  }
);

export default FormInput;
