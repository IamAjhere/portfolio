import { useEffect, useRef } from 'react';
import './cursor.css';

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const INTERACTIVE_SELECTOR = '.nav-link, button';

    const onMouseMove = (event: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${
          event.clientX - 16
        }px, ${event.clientY - 16}px, 0)`;
      }
    };

    const onMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (cursorRef.current && target.closest(INTERACTIVE_SELECTOR)) {
        cursorRef.current.classList.add('cursor-hover');
      }
    };

    const onMouseOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (cursorRef.current && target.closest(INTERACTIVE_SELECTOR)) {
        cursorRef.current.classList.remove('cursor-hover');
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return <div className='cursor hidden sm:flex' ref={cursorRef} />;
}

export default CustomCursor;
