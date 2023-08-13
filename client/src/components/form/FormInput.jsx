function FormInput({ type, placeholder, rounded, required, textarea }) {
  return (
    <>
      {!textarea ? (
        <input
          type={type || "text"}
          placeholder={placeholder}
          className="form-input"
          data-rounded={rounded}
          required={required}
        />
      ) : (
        <textarea
          cols="30"
          rows="10"
          className="form-input"
          placeholder={placeholder}
          required={required}
        ></textarea>
      )}
    </>
  );
}
export default FormInput;
