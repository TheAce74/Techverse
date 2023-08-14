export default function FormInput({
  type,
  placeholder,
  rounded,
  required,
  textarea,
  id,
}) {
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
        />
      ) : (
        <textarea
          cols="30"
          rows="10"
          className="form-input"
          placeholder={placeholder}
          required={required}
          id={id}
        ></textarea>
      )}
    </>
  );
}
