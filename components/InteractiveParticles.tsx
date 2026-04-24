"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import { useState, useRef } from "react";
import * as THREE from "three";

function ParticleField() {
    const ref = useRef<THREE.Points>(null);
    const { mouse } = useThree();

    const [positions] = useState(() => {
        const count = 1800;
        const arr = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 9;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 9;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 9;
        }
        return arr;
    });

    useFrame((state) => {
        if (!ref.current) return;

        ref.current.rotation.y += 0.0008;
        ref.current.rotation.x += 0.0003;

        ref.current.position.x = THREE.MathUtils.lerp(
            ref.current.position.x,
            mouse.x * 0.35,
            0.04
        );

        const t = state.clock.getElapsedTime();
        ref.current.scale.setScalar(1 + Math.sin(t * 0.6) * 0.02);
    });

    return (
        <Points ref={ref} positions={positions} stride={3}>
            <PointMaterial
                transparent
                color="#67e8f9"
                size={0.018}
                sizeAttenuation
                depthWrite={false}
            />
        </Points>
    );
}

export default function InteractiveParticles() {
    return (
        <div className="absolute inset-0">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 65 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            >
                <ambientLight intensity={0.6} />
                <ParticleField />
            </Canvas>
        </div>
    );
}