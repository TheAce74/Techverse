import { forwardRef, useRef, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import DropdownItem from "./DropdownItem";
import { BsFillCaretDownFill } from "react-icons/bs";

const Dropdown = forwardRef(
  ({ items, arrowFill, first, initial, image }, ref) => {
    const [selectedOption, setSelectedOption] = useState(initial);
    const optionsRef = useRef(null);
    const selectedRef = useRef(null);

    const handleDrop = () => {
      optionsRef.current.className = "options options--shown";
    };

    const handleSelect = (value) => {
      setSelectedOption(value);
      optionsRef.current.className = "options";
      selectedRef.current.className =
        "selected-option selected-option--selected";
    };

    const handleKeyDown = (event) => {
      if (event.key === "Enter") event.target.click();
    };

    const handleClickAway = () => {
      optionsRef.current.className = "options";
    };

    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className="custom-dropdown">
          <div
            className="selected-option"
            onClick={handleDrop}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-label="selected dropdown item"
            ref={selectedRef}
          >
            {image()}
            <span ref={ref}>{selectedOption}</span>
            <BsFillCaretDownFill className="arrow" data-fill={arrowFill} />
          </div>
          <div className="options" ref={optionsRef}>
            <div className="wrapper">
              {items.map(({ icon, value }, index) => (
                <DropdownItem
                  key={index + 1}
                  handleSelect={handleSelect}
                  id={index + 1}
                  icon={icon}
                  value={value}
                  first={first}
                />
              ))}
            </div>
          </div>
        </div>
      </ClickAwayListener>
    );
  }
);

export default Dropdown;
