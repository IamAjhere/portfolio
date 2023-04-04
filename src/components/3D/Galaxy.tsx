import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls, Stars, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const Galaxy = () => {
  const { scene } = useThree();

  useEffect(() => {
    scene.fog = new THREE.Fog("black", 10, 50);
  }, [scene]);

  const blackStarMaterial = new THREE.PointsMaterial({
    color: "black",
    size: 0.05,
    sizeAttenuation: true,
  });

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
        saturation={1}
        fade
      />
    </>
  );
};

export default Galaxy;
