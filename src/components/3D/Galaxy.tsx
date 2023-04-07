import React, { useMemo, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";

const Galaxy = () => {
  const { scene, camera, size } = useThree();

  useEffect(() => {
    scene.fog = new THREE.Fog("black", 10, 50);
  }, [scene]);

  useFrame(() => {
    const scrollY = window.scrollY;
    const scrollPercent =
      scrollY / (document.body.scrollHeight - window.innerHeight);
    camera.position.z = 8 + scrollPercent * 60;
    camera.updateProjectionMatrix();
  });
  const starGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const count = 10000;
    const positions = new Float32Array(count * 4);
    for (let i = 0; i < count * 4; i++) {
      positions[i] = (Math.random() - 0.5) * 100;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  const starMaterial = useMemo(
    () => new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 }),
    []
  );

  const fov = size.width / size.height < 1 ? 75 : 50;

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 8]}
        near={1}
        far={1000}
        fov={fov}
      />
      <points geometry={starGeometry} material={starMaterial} />
      <Stars fade />
    </>
  );
};

export default Galaxy;
