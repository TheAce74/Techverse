export default function Button({
  children,
  type,
  color,
  rounded,
  handleLogout,
}) {
  return (
    <button
      className="button"
      type={type || "button"}
      data-color={color}
      data-rounded={rounded}
      onClick={handleLogout ? handleLogout : null}
    >
      {children}
    </button>
  );
}
