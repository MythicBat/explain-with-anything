"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function HumanBuddy() {
  const group = useRef<THREE.Group>(null);
  const arm = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.8) * 0.18;
    }

    if (arm.current) {
      arm.current.rotation.z = Math.sin(t * 4) * 0.35 - 0.9;
    }
  });

  return (
    <group ref={group}>
      {/* head */}
      <mesh position={[0, 1.25, 0]}>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial color="#f2c6a0" roughness={0.45} />
      </mesh>

      {/* hair */}
      <mesh position={[0, 1.52, 0]}>
        <sphereGeometry args={[0.43, 32, 32]} />
        <meshStandardMaterial color="#111827" roughness={0.35} />
      </mesh>

      {/* face eyes */}
      <mesh position={[-0.13, 1.28, 0.38]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#020617" />
      </mesh>
      <mesh position={[0.13, 1.28, 0.38]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#020617" />
      </mesh>

      {/* body */}
      <mesh position={[0, 0.45, 0]}>
        <capsuleGeometry args={[0.38, 0.9, 8, 24]} />
        <meshStandardMaterial color="#2563eb" roughness={0.35} metalness={0.1} />
      </mesh>

      {/* left arm */}
      <group position={[-0.48, 0.75, 0]} rotation={[0, 0, 0.65]}>
        <mesh position={[0, -0.3, 0]}>
          <capsuleGeometry args={[0.09, 0.55, 8, 16]} />
          <meshStandardMaterial color="#f2c6a0" />
        </mesh>
      </group>

      {/* waving right arm */}
      <group ref={arm} position={[0.48, 0.78, 0]} rotation={[0, 0, -0.9]}>
        <mesh position={[0, -0.3, 0]}>
          <capsuleGeometry args={[0.09, 0.55, 8, 16]} />
          <meshStandardMaterial color="#f2c6a0" />
        </mesh>
      </group>

      {/* legs */}
      <mesh position={[-0.16, -0.35, 0]}>
        <capsuleGeometry args={[0.1, 0.65, 8, 16]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[0.16, -0.35, 0]}>
        <capsuleGeometry args={[0.1, 0.65, 8, 16]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </group>
  );
}

export default function HumanStudyBuddy() {
  return (
    <div className="h-56 w-full">
      <Canvas camera={{ position: [0, 0.8, 4], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 4, 4]} intensity={1.8} />
        <Float speed={2} rotationIntensity={0.35} floatIntensity={0.5}>
          <HumanBuddy />
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}