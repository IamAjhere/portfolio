// src/components/GalaxyBackground.tsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import Galaxy from "./3D/Galaxy";

interface GalaxyBackgroundProps {
  activeSection: number;
}

const GalaxyBackground: React.FC<GalaxyBackgroundProps> = ({
  activeSection,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1]">
      <Canvas style={{ background: "black" }}>
        <Galaxy activeSection={activeSection} />
      </Canvas>
    </div>
  );
};

export default GalaxyBackground;
