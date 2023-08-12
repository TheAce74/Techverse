function FormInput({ type, placeholder, rounded, required }) {
  return (
    <input
      type={type || "text"}
      placeholder={placeholder}
      className="form-input"
      data-rounded={rounded}
      required={required}
    />
  );
}
export default FormInput;
