const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || "2026-07-10";

export const sanityEnabled = Boolean(projectId && dataset);

const contentQuery = `{
  "settings": *[_type == "siteSettings"][0]{
    heroEyebrow,
    heroTitle,
    heroText,
    promoMessages,
    defaultPaymentUrl,
    whatsappNumber
  },
  "products": *[_type == "product" && active == true] | order(position asc, _createdAt desc){
    _id,
    "id": slug.current,
    name,
    price,
    colors,
    tag,
    paymentUrl,
    "image": image.asset->url,
    "imageAlt": coalesce(image.alt, name)
  }
}`;

export async function fetchSanityContent() {
  if (!sanityEnabled) return null;

  const endpoint = new URL(`https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`);
  endpoint.searchParams.set("query", contentQuery);

  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(`Sanity request failed: ${response.status}`);
  const data = await response.json();
  return data.result;
}
