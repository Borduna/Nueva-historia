import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Sparkles, Sky } from '@react-three/drei';
import * as THREE from 'three';


export default function Background() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#02010a']} />
        
        {/* Soft ambient light */}
        <ambientLight intensity={0.2} />
        
        {/* Volumetric-like spotlights */}
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={0.5} 
          color="#3b0764" 
        />
        <spotLight 
          position={[-10, -10, -10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={0.5} 
          color="#1e1b4b" 
        />

        <ParticleField />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#02010a', 5, 20]} />
      </Canvas>
    </div>
  );
}

function ParticleField() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
      groupRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={12} size={2} speed={0.4} opacity={0.2} color="#fbcfe8" />
    </group>
  );
}
