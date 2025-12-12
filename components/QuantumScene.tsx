/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Points, PointMaterial, Environment, Line } from '@react-three/drei';
import * as THREE from 'three';

// Fix for TypeScript errors: Property does not exist on type 'JSX.IntrinsicElements'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      group: any;
      mesh: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      torusGeometry: any;
    }
  }
}

// Additional fix for React 18+ types where JSX might be namespaced under React
declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            ambientLight: any;
            pointLight: any;
            group: any;
            mesh: any;
            meshStandardMaterial: any;
            meshBasicMaterial: any;
            torusGeometry: any;
        }
    }
}

const DataNode = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.1;
    }
  });

  return (
    <Sphere ref={ref} args={[0.5, 32, 32]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={1}
        clearcoat={1}
        metalness={0.6}
        roughness={0.2}
        distort={0.3}
        speed={1.5}
      />
    </Sphere>
  );
};

const ConnectionRing = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
       const t = state.clock.getElapsedTime();
       ref.current.rotation.x = Math.sin(t * 0.1) * 0.2;
       ref.current.rotation.y = t * 0.05;
    }
  });

  return (
    <Torus ref={ref} args={[3.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#C5A059" emissive="#C5A059" emissiveIntensity={0.2} transparent opacity={0.4} />
    </Torus>
  );
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          {/* Main central node */}
          <DataNode position={[0, 0, 0]} color="#1c1917" scale={1.5} />
          <ConnectionRing />
        </Float>
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
           <DataNode position={[-3, 1, -2]} color="#C5A059" scale={0.4} />
           <DataNode position={[3, -1, -3]} color="#57534e" scale={0.5} />
           <DataNode position={[-2, -2, 1]} color="#C5A059" scale={0.3} />
        </Float>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export const DataNetworkScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0 bg-stone-900">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#C5A059" intensity={1} />
        
        <Float rotationIntensity={0.2} floatIntensity={0.2} speed={1}>
          <group rotation={[0, 0, 0]}>
             {/* Abstract Global Network */}
             <Points limit={200} range={5}>
                <PointMaterial transparent color="#C5A059" size={0.05} sizeAttenuation={true} depthWrite={false} />
             </Points>
             
             {/* Central Hub */}
             <Sphere args={[1, 32, 32]}>
                <meshStandardMaterial color="#C5A059" wireframe transparent opacity={0.1} />
             </Sphere>
             
             {/* Connecting Lines (Simulated) */}
             <mesh rotation={[0, 0, Math.PI / 4]}>
                <torusGeometry args={[2, 0.01, 16, 100]} />
                <meshBasicMaterial color="#555" transparent opacity={0.3} />
             </mesh>
             <mesh rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[2, 0.01, 16, 100]} />
                <meshBasicMaterial color="#555" transparent opacity={0.3} />
             </mesh>
          </group>
        </Float>
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}