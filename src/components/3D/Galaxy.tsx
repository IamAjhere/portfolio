import React, { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const Galaxy: React.FC = () => {
  const { scene } = useThree();

  useEffect(() => {
    scene.fog = new THREE.Fog("black", 10, 50);
  }, [scene]);

  useFrame(() => {
    scene.rotation.z += 0.001;
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <OrbitControls />
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} />
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
