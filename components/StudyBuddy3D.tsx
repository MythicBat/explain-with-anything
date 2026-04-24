"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function BuddyBot() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.25;
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.2, 1, 0.55]} />
        <meshStandardMaterial color="#0f172a" roughness={0.35} metalness={0.4} />
      </mesh>

      <mesh position={[-0.28, 0.5, 0.29]}>
        <sphereGeometry args={[0.09, 32, 32]} />
        <meshStandardMaterial emissive="#22d3ee" color="#67e8f9" />
      </mesh>

      <mesh position={[0.28, 0.5, 0.29]}>
        <sphereGeometry args={[0.09, 32, 32]} />
        <meshStandardMaterial emissive="#22d3ee" color="#67e8f9" />
      </mesh>

      <mesh position={[0, -0.35, 0]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.2} />
      </mesh>
    </group>
  );
}

export default function StudyBuddy3D() {
  return (
    <div className="h-52 w-full">
      <Canvas camera={{ position: [0, 0.2, 4], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 3, 3]} intensity={1.5} />
        <Float speed={2.2} rotationIntensity={0.4} floatIntensity={0.7}>
          <BuddyBot />
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}