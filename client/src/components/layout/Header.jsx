import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Button from "../ui/Button";
import { IoMdClose } from "react-icons/io";
import { RiMenu3Fill } from "react-icons/ri";
import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";

function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  const handleClickAway = () => {
    setOpenMenu(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <header className="header">
        <NavLink to="/" className="home-link">
          <img src={logo} alt="Go to home" title="Go to home" />
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
        <NavLink to="/signup" className="register">
          <Button color="secondary">Get Ticket</Button>
        </NavLink>
      </header>
    </ClickAwayListener>
  );
}
export default Header;
