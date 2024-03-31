import React from 'react';
import { Text } from '@react-three/drei';

const MyText: React.FC = () => {
  return (
    <Text
      color='white'
      fontSize={1}
      font='/fonts/helvetiker_bold.typeface.json'
      position={[0, 0, -5]}
      rotation={[0, 0, 0]}
      anchorX='center'
      anchorY='middle'
    >
      Hello, World!
    </Text>
  );
};

export default MyText;
