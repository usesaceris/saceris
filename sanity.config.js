import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas/index.js";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || "replace-me";
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.VITE_SANITY_DATASET || "production";

export default defineConfig({
  name: "saceris",
  title: "SACERIS",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
