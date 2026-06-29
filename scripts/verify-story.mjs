import { chromium } from "playwright-core";
import fs from "node:fs";

const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});

const page = await browser.newPage({ viewport: { width: 1366, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://127.0.0.1:5176/?v=product-story", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(5500);
await page.evaluate(() => {
  const section = document.querySelector(".productStory3d");
  window.scrollTo(0, section.offsetTop);
});
await page.waitForTimeout(2500);

const firstPath = "C:/Projetos/saceris/dist/story-desktop-start.png";
await page.screenshot({ path: firstPath, fullPage: false });

const first = await page.evaluate(() => ({
  canvasCount: document.querySelectorAll(".productStory3d canvas").length,
  activeText: document.querySelector(".storyFeature.isActive")?.innerText,
  sectionHeight: document.querySelector(".productStory3d")?.getBoundingClientRect().height,
}));

await page.mouse.wheel(0, 2200);
await page.waitForTimeout(900);
const midPath = "C:/Projetos/saceris/dist/story-desktop-mid.png";
await page.screenshot({ path: midPath, fullPage: false });

const mid = await page.evaluate(() => ({
  activeText: document.querySelector(".storyFeature.isActive")?.innerText,
  progress: document.querySelector(".storyProgress span")?.innerText,
}));

await page.setViewportSize({ width: 390, height: 844 });
await page.evaluate(() => {
  const section = document.querySelector(".productStory3d");
  window.scrollTo(0, section.offsetTop);
});
await page.waitForTimeout(1200);
const mobilePath = "C:/Projetos/saceris/dist/story-mobile.png";
await page.screenshot({ path: mobilePath, fullPage: false });

await browser.close();

console.log(JSON.stringify({
  first,
  mid,
  firstPath,
  midPath,
  mobilePath,
  screenshots: [firstPath, midPath, mobilePath].map((path) => fs.existsSync(path)),
}, null, 2));
