import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import tshirtModel from "../../assets/3d/t_shirt.glb?url";

export function TShirtModel({ rotationY = 0, cameraShift = [0, 0, 4], modelScale = 1, modelShift = 0.42, progress = 0 }) {
  const groupRef = useRef(null);
  const { scene } = useGLTF(tshirtModel);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const normalizeScale = 2.02 / Math.max(size.x, size.y, size.z);

    clone.scale.setScalar(normalizeScale);
    clone.position.sub(center.multiplyScalar(normalizeScale));
    clone.position.y -= 0.14;

    clone.traverse((node) => {
      if (!node.isMesh) return;
      node.castShadow = false;
      node.receiveShadow = false;
      if (node.material) {
        node.material = node.material.clone();
        if (node.material.color) node.material.color.lerp(new THREE.Color(0x3a3027), 0.18);
        node.material.roughness = Math.min(0.92, node.material.roughness ?? 0.82);
        node.material.metalness = 0;
      }
    });

    return clone;
  }, [scene]);

  useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.add(model);
    return () => {
      groupRef.current?.remove(model);
    };
  }, [model]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const responsiveScale = state.size.width < 560 ? 0.74 : 1;
    const targetScale = responsiveScale * modelScale;
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, rotationY, 4.5, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, Math.sin(progress * Math.PI) * 0.11, 4, delta);
    const targetX = state.size.width < 720 ? 0 : modelShift;
    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 4, delta);
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.3) * 0.025;
    groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta);
    groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, targetScale, 4, delta);
    groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, targetScale, 4, delta);

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, cameraShift[0], 3, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, cameraShift[1], 3, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, cameraShift[2], 3, delta);
    state.camera.lookAt(0.18, 0.05, 0);
  });

  return <group ref={groupRef} />;
}

useGLTF.preload(tshirtModel);
