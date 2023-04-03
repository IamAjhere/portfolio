import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls, Stars, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface GalaxyProps {
  activeSection: number;
}

const Galaxy: React.FC<GalaxyProps> = ({ activeSection }) => {
  const { scene } = useThree();

  useEffect(() => {
    scene.fog = new THREE.Fog("black", 10, 50);
  }, [scene]);

  useEffect(() => {
    // Update the galaxy based on the active section
    // You can customize this effect as per your needs
    if (activeSection === 1) {
      scene.background = new THREE.Color("black");
    } else if (activeSection === 2) {
      scene.background = new THREE.Color("darkblue");
    } else if (activeSection === 3) {
      scene.background = new THREE.Color("darkred");
    } else if (activeSection === 4) {
      scene.background = new THREE.Color("darkgreen");
    } else {
      scene.background = new THREE.Color("black");
    }
  }, [activeSection, scene]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} near={1} far={1000} />
      <OrbitControls
        maxDistance={50}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2 - 0.1}
      />
      <ambientLight intensity={0.1} />
      <Stars
        radius={100}
        depth={50}
        count={10000}
        factor={4}
        saturation={0}
        fade
      />
    </>
  );
};

export default Galaxy;
