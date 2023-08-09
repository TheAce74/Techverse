export default function DropdownItem({ icon, handleSelect, id, value, first }) {
  return (
    <button
      className="option"
      onClick={() => handleSelect(value)}
      aria-label={`dropdown item ${id}`}
    >
      {first === "text" ? (
        <>
          <span>{value}</span>
          {icon()}
        </>
      ) : (
        <>
          {icon()}
          <span>{value}</span>
        </>
      )}
    </button>
  );
}
