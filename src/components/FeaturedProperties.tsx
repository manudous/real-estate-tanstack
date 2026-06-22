import { Link } from "@tanstack/react-router";
import type { PropertyData } from "#/lib/types";
import "./FeaturedProperties.css";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);

export default function FeaturedProperties({ properties }: { properties: PropertyData[] }) {
  if (properties.length === 0) {
    return null;
  }

  return (
    <section className="featured-section">
      <div className="featured-inner">
        <header className="section-header">
          <p className="section-eyebrow">Hand-picked for you</p>
          <div className="section-divider" />
          <h2 className="section-title">Featured Properties</h2>
        </header>

        <div className="properties-grid">
          {properties.map((property) => (
            <article className="property-card" key={property.slug}>
              <Link
                to="/properties/$slug"
                params={{ slug: property.slug }}
                className="card-image-link"
                aria-label={`View ${property.title}`}
              >
                {property.mainImage ? (
                  <img
                    src={property.mainImage.url}
                    alt={property.mainImage.name || property.title}
                    className="card-image"
                    loading="lazy"
                  />
                ) : (
                  <div className="card-image-placeholder" />
                )}
                <span className={`operation-badge badge-${property.operationType.toLowerCase()}`}>
                  {property.operationType}
                </span>
              </Link>

              <div className="card-body">
                <h3 className="card-title">{property.title}</h3>
                {property.price && (
                  <p className="card-price">{formatPrice(property.price)}</p>
                )}
                <Link
                  to="/properties/$slug"
                  params={{ slug: property.slug }}
                  className="card-cta"
                >
                  View Property
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
