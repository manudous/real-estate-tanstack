import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "#/components/HeroSection";
import FeaturedProperties from "#/components/FeaturedProperties";
import { getHero, getFeaturedProperties } from "#/lib/queries";

export const Route = createFileRoute("/")({
  // SSR: se ejecuta en el servidor en cada request, leyendo del snapshot.
  loader: async () => ({
    hero: await getHero(),
    featured: await getFeaturedProperties(),
    renderedAt: new Date().toISOString(),
  }),
  component: Home,
});

function Home() {
  const { hero, featured, renderedAt } = Route.useLoaderData();
  return (
    <>
      <HeroSection hero={hero} />
      <FeaturedProperties properties={featured} />
      <p className="ssr-stamp">
        SSR render @ {renderedAt} · contenido desde snapshot
      </p>
    </>
  );
}
