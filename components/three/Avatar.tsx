"use client";

// Opción A (no usada todavía) — swap desde la forma abstracta de HeroScene.tsx.
//
// Para activarla:
// 1. Generar un avatar low-poly/estilizado en https://readyplayer.me
// 2. Copiar el .glb resultante a `public/models/avatar.glb`
// 3. En HeroScene.tsx, reemplazar <DistortedShape /> por <Avatar reducedMotion={reducedMotion} />
// 4. Ajustar cámara/escala según las proporciones reales del modelo exportado

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Avatar({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/avatar.glb");
  const target = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    if (reducedMotion) {
      group.rotation.y += 0.001;
      return;
    }

    const { pointer } = state;
    target.current.x = pointer.y * 0.15;
    target.current.y = pointer.x * 0.25;

    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, target.current.x, 0.05);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, target.current.y, 0.05);
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}
