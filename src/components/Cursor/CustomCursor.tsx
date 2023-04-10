import { useEffect, useRef } from "react";
import "./cursor.css";

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${
          event.clientX - 16
        }px, ${event.clientY - 16}px, 0)`;
      }
    };

    const onMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add("cursor-hover");
      }
    };

    const onMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove("cursor-hover");
      }
    };

    const buttons = document.querySelectorAll(".nav-link, button");

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", onMouseEnter);
      button.addEventListener("mouseleave", onMouseLeave);
    });

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("mouseenter", onMouseEnter);
        button.removeEventListener("mouseleave", onMouseLeave);
      });
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <div className="cursor hidden sm:flex" ref={cursorRef} />;
}

export default CustomCursor;
