// src/components/Header.tsx
import React from "react";

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
  return (
    <header className="text-white py-4 px-6 fixed top-0 left-0 w-full z-10 backdrop-blur-lg border-b border-gray-300">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="nav-link cursor-none">
          {logo ? <img src={logo} alt={name} /> : name}
        </a>
        <nav>
          <ul className="flex space-x-6">
            {navLinks.map((navLink, index) => (
              <li key={index}>
                <a href={navLink.href} className="nav-link cursor-none">
                  {navLink.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
