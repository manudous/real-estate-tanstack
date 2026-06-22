import { createFileRoute, notFound } from "@tanstack/react-router";
import PropertyDetail from "#/components/PropertyDetail";
import { getPropertyBySlug } from "#/lib/queries";

export const Route = createFileRoute("/properties/$slug")({
  // SSR: la propiedad se resuelve en el servidor (snapshot) por cada request.
  loader: async ({ params }) => {
    const property = await getPropertyBySlug({ data: params.slug });
    if (!property) throw notFound();
    return { property };
  },
  component: PropertyPage,
});

function PropertyPage() {
  const { property } = Route.useLoaderData();
  return <PropertyDetail property={property} />;
}
