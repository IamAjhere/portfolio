// src/components/GalaxyBackground.tsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Galaxy from './3D/Galaxy';

const GalaxyBackground = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full z-[-1]'>
      <Suspense>
        <Canvas style={{ background: 'black' }}>
          <Galaxy />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default GalaxyBackground;
