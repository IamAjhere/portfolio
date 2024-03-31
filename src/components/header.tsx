import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, animateScroll } from 'react-scroll';

interface NavLink {
  label: string;
  href: string;
  icon: string;
}

interface HeaderProps {
  name: string;
  logo?: string;
}
import gearIcon from '../assets/gear-icon.png';
import gitIcon from '../assets/git-icon.png';
import maleuserIcon from '../assets/maleuser-icon.png';
import messageIcon from '../assets/message-icon.png';

const navLinks: NavLink[] = [
  {
    label: 'About',
    href: 'about',
    icon: maleuserIcon,
  },
  {
    label: 'Projects',
    href: 'projects',
    icon: gitIcon,
  },
  {
    label: 'Skills',
    href: 'skills',
    icon: gearIcon,
  },
  {
    label: 'Contact',
    href: 'contact',
    icon: messageIcon,
  },
];
const Header: React.FC<HeaderProps> = ({ name, logo }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  const scrollToTop = () => {
    animateScroll.scrollToTop({ duration: 1000 });
  };
  return (
    <header
      className='text-white py-4 px-2 sm:px-6 fixed bottom-0 left-0 w-full z-10 border-t-2 border-b-0 border-gray-300 sm:border-t-0 sm:border-b-2 sm:top-0 sm:bottom-auto'
      style={{
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(5px)',
      }}
    >
      <div className='container mx-auto flex justify-between items-center'>
        <div
          onClick={scrollToTop}
          className='nav-link hidden sm:flex cursor-interactive'
        >
          {logo ? <img src={logo} alt={name} /> : name}
        </div>
        <div className={`mx-auto sm:mx-0  ${isMobile && 'w-full'}`}>
          <nav>
            <ul className='flex justify-around md:justify-start w-full items-center sm:space-x-6'>
              {navLinks.map((navLink, index) => (
                <li key={index} className='flex-grow-0'>
                  <Link
                    to={navLink.href}
                    smooth={true}
                    duration={1000}
                    offset={-40}
                    className='nav-link cursor-none block w-full text-center space-x-6'
                  >
                    {isMobile ? (
                      <img
                        src={navLink.icon}
                        alt={navLink.label}
                        className='flex sm:hidden mx-auto'
                        style={{
                          height: '30px',
                          width: '30px',
                          alignItems: 'center',
                        }}
                      />
                    ) : (
                      <p className='hidden sm:flex'>{navLink.label}</p>
                    )}
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
