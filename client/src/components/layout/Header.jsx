import { NavLink } from "react-router-dom";
import techverse from "../../assets/images/techverse.svg";
import Button from "../ui/Button";
import { IoMdClose } from "react-icons/io";
import { RiMenu3Fill } from "react-icons/ri";
import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { useAppContext } from "../../context/AppContext";

function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  const handleClickAway = () => {
    setOpenMenu(false);
  };

  const randomColor = () => {
    const colors = [
      "primary-400",
      "secondary-400",
      "accent-400",
      "accent-500",
      "neutral-900",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const { user } = useAppContext();

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <header className="header">
        <NavLink to="/" className="home-link">
          <img src={techverse} alt="Go to home" title="Go to home" />
        </NavLink>
        <button
          aria-controls="primary-menu"
          className={openMenu ? "menu-button menu-button--open" : "menu-button"}
          onClick={() => setOpenMenu(!openMenu)}
        >
          {openMenu ? <IoMdClose /> : <RiMenu3Fill />}
        </button>
        <nav
          aria-label="primary navigation"
          id="primary-menu"
          className={openMenu ? "open" : ""}
          aria-expanded={openMenu ? true : false}
        >
          <ul role="list">
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link--current" : "nav-link"
                }
                onClick={handleClickAway}
              >
                About Us
                <span></span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/speakers"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link--current" : "nav-link"
                }
                onClick={handleClickAway}
              >
                Speakers
                <span></span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link--current" : "nav-link"
                }
                onClick={handleClickAway}
              >
                Contact Us
                <span></span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/faq"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link--current" : "nav-link"
                }
                onClick={handleClickAway}
              >
                FAQ
                <span></span>
              </NavLink>
            </li>
          </ul>
        </nav>
        {!user?.username ? (
          <NavLink to="/signup" className="register">
            <Button color="secondary">Get Ticket</Button>
          </NavLink>
        ) : (
          <div className="user">
            <span aria-hidden="true" data-color={randomColor()}>
              <span aria-hidden="true">{user.username[0].toUpperCase()}</span>
            </span>
            <p>{user.username}</p>
          </div>
        )}
      </header>
    </ClickAwayListener>
  );
}
export default Header;
