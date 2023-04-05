import React from "react";
import { Link, animateScroll } from "react-scroll";

interface NavLink {
  label: string;
  href: string;
}

interface HeaderProps {
  name: string;
  logo?: string;
  navLinks: NavLink[];
}

const Header: React.FC<HeaderProps> = ({ name, logo, navLinks }) => {
  const scrollToTop = () => {
    animateScroll.scrollToTop({ duration: 1000 });
  };
  return (
    <header className="text-white py-4 px-6 fixed top-0 left-0 w-full z-10 backdrop-blur-lg border-b border-gray-300">
      <div className="container mx-auto flex justify-between items-center">
        <div onClick={scrollToTop} className="nav-link hidden sm:flex">
          {logo ? <img src={logo} alt={name} /> : name}
        </div>
        <div className="mx-auto sm:mx-0">
          <nav>
            <ul className="flex space-x-6">
              {navLinks.map((navLink, index) => (
                <li key={index}>
                  <Link
                    to={navLink.href}
                    smooth={true}
                    duration={1000}
                    offset={0}
                    className="nav-link cursor-none"
                  >
                    {navLink.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
