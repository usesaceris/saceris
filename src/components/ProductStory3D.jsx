import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { FeatureStep } from "./FeatureStep.jsx";
import { TShirtModel } from "./TShirtModel.jsx";

const features = [
  {
    title: "Camisetas Exclusivas",
    description: "Modelos pensados para destacar sua marca, evento ou coleção.",
    rotationY: 0,
    cameraPosition: [0, 0.04, 5.65],
    modelScale: 0.94,
    modelShift: 0.42,
  },
  {
    title: "Artes personalizadas",
    description: "Criamos artes sob medida para transformar sua ideia em uma peça única.",
    rotationY: Math.PI * 0.52,
    cameraPosition: [0.52, 0.02, 4.75],
    modelScale: 1.03,
    modelShift: 0.34,
  },
  {
    title: "Produção Própria",
    description: "Controle real de qualidade em cada etapa da produção.",
    rotationY: Math.PI,
    cameraPosition: [0, 0.12, 4.15],
    modelScale: 1.1,
    modelShift: 0.46,
  },
  {
    title: "Envio para todo o Brasil",
    description: "Atendimento nacional com processo organizado do pedido à entrega.",
    rotationY: Math.PI * 1.36,
    cameraPosition: [-0.45, -0.02, 4.85],
    modelScale: 1.04,
    modelShift: 0.52,
  },
  {
    title: "Tecidos premium",
    description: "Materiais selecionados para conforto, durabilidade e caimento superior.",
    rotationY: Math.PI * 1.68,
    cameraPosition: [0.22, 0.24, 4.18],
    modelScale: 1.1,
    modelShift: 0.5,
  },
  {
    title: "Acabamentos sofisticados",
    description: "Detalhes de costura, gola e finalização pensados para uma peça de alto padrão.",
    rotationY: Math.PI * 2,
    cameraPosition: [0.1, 0.42, 4.28],
    modelScale: 1.06,
    modelShift: 0.44,
  },
];

function Scene({ activeFeature, progress }) {
  return (
    <Canvas
      dpr={[0.85, 1.35]}
      camera={{ position: [0, 0.05, 5.45], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <color attach="background" args={["#050504"]} />
      <ambientLight intensity={0.65} />
      <hemisphereLight args={["#fff0cf", "#1a100b", 1.65]} />
      <directionalLight position={[3.2, 4.8, 4]} intensity={4.2} color="#ffe2a7" />
      <directionalLight position={[-4, 2.2, -3]} intensity={2.6} color="#9d312a" />
      <pointLight position={[-2.3, 1.6, 2.2]} intensity={1.8} color="#ffffff" />
      <Suspense fallback={null}>
        <TShirtModel
          rotationY={activeFeature.rotationY}
          cameraShift={activeFeature.cameraPosition}
          modelScale={activeFeature.modelScale}
          modelShift={activeFeature.modelShift}
          progress={progress}
        />
      </Suspense>
    </Canvas>
  );
}

export function ProductStory3D() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const max = rect.height - window.innerHeight;
        const next = Math.min(1, Math.max(0, -rect.top / max));
        setProgress(Number.isFinite(next) ? next : 0);
      });
    };

    const section = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSceneReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "900px 0px" }
    );

    if (section) observer.observe(section);

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!sceneReady) return undefined;
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const max = rect.height - window.innerHeight;
      const next = Math.min(1, Math.max(0, -rect.top / max));
      setProgress(Number.isFinite(next) ? next : 0);
    };

    update();
    return undefined;
  }, [sceneReady]);

  const activeIndex = Math.min(features.length - 1, Math.floor(progress * features.length));
  const activeFeature = features[activeIndex];
  const side = activeIndex % 2 === 0 ? "left" : "right";
  const progressLabel = useMemo(() => `${Math.round(progress * 100)}%`, [progress]);

  return (
    <section className="productStory3d" ref={sectionRef}>
      <div className="storySticky">
        <div className="storyBackdrop" />
        <div className="storyHeader">
          <p className="eyebrow">Produto em foco</p>
          <h2>Cada detalhe da SACERIS em movimento.</h2>
        </div>

        <div className="storyCanvasWrap">
          {sceneReady ? <Scene activeFeature={activeFeature} progress={progress} /> : null}
          <div className="storyGlow" />
        </div>

        <div className="storyFeatureLayer">
          {features.map((feature, index) => (
            <FeatureStep
              feature={feature}
              active={index === activeIndex}
              side={side}
              index={index}
              key={feature.title}
            />
          ))}
        </div>

        <div className="storyProgress">
          <span>{progressLabel}</span>
          <div>
            <i style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>
      </div>
      <Loader />
    </section>
  );
}
