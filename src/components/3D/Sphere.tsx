import React from "react";
import { MeshProps } from "@react-three/fiber";
import { Mesh } from "three";

const LitSphere: React.FC<MeshProps> = (props) => {
  return (
    <mesh {...props}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

export default LitSphere;
