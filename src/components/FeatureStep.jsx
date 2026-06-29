import { motion } from "framer-motion";
import React from "react";

export function FeatureStep({ feature, active, side = "left", index }) {
  return (
    <motion.article
      className={`storyFeature ${side} ${active ? "isActive" : ""}`}
      initial={false}
      animate={{
        opacity: active ? 1 : 0,
        y: active ? 0 : 24,
        filter: active ? "blur(0px)" : "blur(10px)",
        pointerEvents: active ? "auto" : "none",
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden={!active}
    >
      <span className="featureIndex">0{index + 1}</span>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
      <span className="featureLine" />
    </motion.article>
  );
}
