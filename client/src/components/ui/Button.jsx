export default function Button({ children, type, color, rounded }) {
  return (
    <button
      className="button"
      type={type || "button"}
      data-color={color}
      data-rounded={rounded}
    >
      {children}
    </button>
  );
}
