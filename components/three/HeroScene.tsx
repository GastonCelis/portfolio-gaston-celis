"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { usePreloaderContext } from "@/lib/preloader-context";
import SceneLights from "./SceneLights";

function DistortedShape({
  reducedMotion,
  isMobile,
}: {
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    if (reducedMotion) {
      group.rotation.y += 0.0015;
      group.rotation.x += 0.0006;
      return;
    }

    const { pointer } = state;
    target.current.x = pointer.y * 0.3;
    target.current.y = pointer.x * 0.5;

    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, target.current.x, 0.05);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, target.current.y, 0.05);
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
      <group ref={groupRef} position={isMobile ? [0, 0, 0] : [2.1, -0.1, 0]} scale={isMobile ? 0.75 : 1}>
        <mesh>
          <icosahedronGeometry args={[1.05, isMobile ? 0 : 1]} />
          <MeshDistortMaterial
            color="#8b5cf6"
            roughness={0.35}
            metalness={0.2}
            distort={0.25}
            speed={1.2}
            transparent
            opacity={0.92}
          />
        </mesh>
        {!isMobile && (
          <mesh scale={1.05}>
            <icosahedronGeometry args={[1.05, 1]} />
            <meshBasicMaterial color="#c4b5fd" wireframe transparent opacity={0.3} />
          </mesh>
        )}
      </group>
    </Float>
  );
}

function ReadyReporter() {
  const { setProgress } = usePreloaderContext();

  // The scene is now fully procedural (no HDR/GLTF loads), so there's nothing
  // for drei's useProgress to track — report done as soon as the canvas mounts.
  useEffect(() => {
    setProgress(100);
  }, [setProgress]);

  return null;
}

export default function HeroScene() {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      shadows={false}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <ReadyReporter />
      <SceneLights />
      <DistortedShape reducedMotion={reducedMotion} isMobile={isMobile} />
    </Canvas>
  );
}
