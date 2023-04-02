import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Galaxy from "./components/3D/galaxy";
import "./customCss/cursor.css";
import "./App.css";

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

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <div className="cursor" ref={cursorRef} />;
}

function App() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Canvas
        className="absolute top-0 left-0 w-full h-full"
        style={{ background: "black" }}
      >
        <Galaxy />
      </Canvas>
      <CustomCursor />
    </div>
  );
}

export default App;
