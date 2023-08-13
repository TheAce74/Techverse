import { NavLink } from "react-router-dom";
import { BsGithub, BsTwitter, BsLinkedin } from "react-icons/bs";
import { TiSocialInstagram } from "react-icons/ti";

function Footer() {
  return (
    <footer className="footer">
      <div className="wrapper">
        <div>
          <h2>Quick Links</h2>
          <nav aria-label="secondary navigation" id="primary-menu">
            <ul role="list">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/speakers">Speakers</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/faq">FAQ</NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <h2>Follow us on</h2>
          <ul role="list">
            <li>
              <a
                href="https://github.com/TheAce74/Techverse"
                target="_blank"
                aria-label="github"
                rel="noreferrer"
              >
                <BsGithub />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/asor_christopher/"
                target="_blank"
                aria-label="instagram"
                rel="noreferrer"
              >
                <TiSocialInstagram />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/shadowbytee?s=20"
                target="_blank"
                aria-label="twitter"
                rel="noreferrer"
              >
                <BsTwitter />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/chisom-udonsi-45196b216/"
                target="_blank"
                aria-label="linkedin"
                rel="noreferrer"
              >
                <BsLinkedin />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p>&copy; 2023 Techverse. All rights reserved</p>
    </footer>
  );
}
export default Footer;
