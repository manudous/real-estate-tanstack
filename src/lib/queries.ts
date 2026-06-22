import { createServerFn } from "@tanstack/react-start";
import type {
  HeaderData,
  FooterData,
  HeroData,
  PropertyData,
} from "#/lib/types";

// Traza server-only de que la lectura sale del snapshot (visible en los logs del servidor SSR).
async function getClient() {
  const { client, snapshotInfo } = await import("#/lib/content-island.server");
  console.log(
    `[content-island] SSR read · mode=snapshot · accessToken="${snapshotInfo.accessToken}" · path=${snapshotInfo.snapshotPath}`,
  );
  return client;
}

export const getHeader = createServerFn().handler(async () => {
  const client = await getClient();
  const headers = await client.getContentList<HeaderData>({
    contentType: "Header",
    includeRelatedContent: true,
  });
  return headers[0];
});

export const getFooter = createServerFn().handler(async () => {
  const client = await getClient();
  const footers = await client.getContentList<FooterData>({
    contentType: "Footer",
    includeRelatedContent: true,
  });
  return footers[0];
});

export const getHero = createServerFn().handler(async () => {
  const client = await getClient();
  const heroes = await client.getContentList<HeroData>({
    contentType: "Hero",
    includeRelatedContent: true,
  });
  return heroes[0];
});

export const getFeaturedProperties = createServerFn().handler(async () => {
  const client = await getClient();
  return client.getContentList<PropertyData>({
    contentType: "Property",
    "fields.featured": true,
  });
});

export const getPropertyBySlug = createServerFn()
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const client = await getClient();
    const properties = await client.getContentList<PropertyData>({
      contentType: "Property",
      "fields.slug": slug,
      includeRelatedContent: true,
    });
    return properties[0] ?? null;
  });
