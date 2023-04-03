import React, { useRef, Ref, useState, useEffect } from "react";
import { PointLight } from "three";
import { useFrame } from "@react-three/fiber";

const MovingLights: React.FC = () => {
  const tealLightRef = useRef<PointLight>(null) as Ref<PointLight>;

  const purpleLightRef = useRef<PointLight>(null) as Ref<PointLight>;

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (tealLightRef.current && purpleLightRef.current) {
      const radius = 10;
      const frequency = 0.5;
      const speed = 0.02;

      tealLightRef.current.position.set(
        Math.sin(elapsedTime * frequency) * radius,
        Math.cos(elapsedTime * frequency) * radius,
        Math.sin(elapsedTime * frequency + Math.PI * 0.5) * radius
      );

      purpleLightRef.current.position.set(
        Math.cos(elapsedTime * frequency + Math.PI) * radius,
        Math.sin(elapsedTime * frequency + Math.PI * 1.5) * radius,
        Math.cos(elapsedTime * frequency + Math.PI * 0.5) * radius
      );
    }
  });

  return (
    <>
      <pointLight
        ref={tealLightRef}
        color={"rgba(0, 128, 128, 0.5)"}
        intensity={0.5}
      />
      <pointLight
        ref={purpleLightRef}
        color={"rgba(128, 0, 128, 0.5)"}
        intensity={0.5}
      />
    </>
  );
};

export default MovingLights;
