import { Link } from "@tanstack/react-router";
import type { PropertyData } from "#/lib/types";
import "./PropertyDetail.css";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);

export default function PropertyDetail({ property }: { property: PropertyData }) {
  const specs = [
    property.bedrooms != null && {
      icon: "bed",
      value: String(property.bedrooms),
      label: property.bedrooms === 1 ? "Bedroom" : "Bedrooms",
    },
    property.bathrooms != null && {
      icon: "bath",
      value: String(property.bathrooms),
      label: property.bathrooms === 1 ? "Bathroom" : "Bathrooms",
    },
    property.builtArea != null && {
      icon: "area",
      value: `${property.builtArea} m²`,
      label: "Built Area",
    },
    property.floor != null && {
      icon: "floor",
      value: property.floor === 0 ? "Ground" : `Floor ${property.floor}`,
      label: "Floor",
    },
    property.zone && {
      icon: "zone",
      value: property.zone,
      label: "Zone",
    },
    property.propertyType && {
      icon: "type",
      value: property.propertyType,
      label: "Type",
    },
  ].filter(Boolean) as { icon: string; value: string; label: string }[];

  const hasGallery = property.galleryImages && property.galleryImages.length > 0;

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="hero">
        {property.mainImage ? (
          <img
            src={property.mainImage.url}
            alt={property.mainImage.name || property.title}
            className="hero-img"
          />
        ) : (
          <div className="hero-img hero-img--empty" />
        )}
        <div className="hero-overlay" />

        <div className="hero-top">
          <Link to="/" className="back-link">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M9 2L4 7L9 12"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to listings
          </Link>
        </div>

        <div className="hero-bottom">
          <span className={`badge badge--${property.operationType.toLowerCase()}`}>
            {property.operationType}
          </span>
          <h1 className="hero-title">{property.title}</h1>
          {property.price && (
            <p className="hero-price">{formatPrice(property.price)}</p>
          )}
        </div>
      </section>

      {/* ─── Specs strip ───────────────────────────────────── */}
      {specs.length > 0 && (
        <div className="specs-strip">
          <ul className="specs-list">
            {specs.map((s) => (
              <li className="spec-item" key={s.label}>
                <span className="spec-icon" aria-hidden="true">
                  {s.icon === "bed" && (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
                      <path d="M2 14h20" />
                      <path d="M2 20h20" />
                      <rect x="2" y="4" width="7" height="6" rx="1" />
                    </svg>
                  )}
                  {s.icon === "bath" && (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                    </svg>
                  )}
                  {s.icon === "area" && (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="1" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                  )}
                  {s.icon === "floor" && (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 21h18M4 11v10M20 11v10M8 11v4M12 11v4M16 11v4" />
                      <path d="M3 7l9-4 9 4" />
                    </svg>
                  )}
                  {s.icon === "zone" && (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  )}
                  {s.icon === "type" && (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  )}
                </span>
                <span className="spec-value">{s.value}</span>
                <span className="spec-label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ─── Main content ──────────────────────────────────── */}
      <section className="content-section">
        <div className="content-grid">
          {/* Description */}
          <div className="description-col">
            <span className="eyebrow">Property</span>
            <h2 className="section-title">About this property</h2>
            <div className="gold-rule" />
            <div className="long-description">
              {property.longDescription.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Details card */}
          <aside className="details-col">
            <div className="details-card">
              <h3 className="details-card-heading">Key Details</h3>

              <dl className="detail-list">
                <div className="detail-row">
                  <dt>Reference</dt>
                  <dd>{property.internalReference}</dd>
                </div>
                <div className="detail-row">
                  <dt>Zone</dt>
                  <dd>{property.zone}</dd>
                </div>
                <div className="detail-row">
                  <dt>Type</dt>
                  <dd>{property.propertyType}</dd>
                </div>
                <div className="detail-row">
                  <dt>Operation</dt>
                  <dd>{property.operationType}</dd>
                </div>
                {property.levels != null && (
                  <div className="detail-row">
                    <dt>Levels</dt>
                    <dd>{property.levels}</dd>
                  </div>
                )}
              </dl>

              {property.extraFeatures && property.extraFeatures.length > 0 && (
                <div className="amenities-block">
                  <h4 className="amenities-heading">Amenities</h4>
                  <ul className="amenities-list">
                    {property.extraFeatures.map((f) => (
                      <li key={f.id}>
                        <span className="dot" aria-hidden="true" />
                        {f.feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {property.price && (
                <div className="price-block">
                  <span className="price-label">
                    {property.operationType === "Rent"
                      ? "Monthly rent"
                      : "Asking price"}
                  </span>
                  <span className="price-amount">{formatPrice(property.price)}</span>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* ─── Gallery ──────────────────────────────────────── */}
      {hasGallery && (
        <section className="gallery-section">
          <div className="gallery-header">
            <span className="eyebrow" style={{ textAlign: "center", display: "block" }}>
              Visual tour
            </span>
            <h2 className="section-title" style={{ textAlign: "center" }}>
              All Photos
            </h2>
            <div className="gold-rule" style={{ margin: "1rem auto 0" }} />
          </div>
          <div className="gallery-grid">
            {property.galleryImages!.map((img) => (
              <div className="gallery-item" key={img.id}>
                <img src={img.url} alt={img.name || property.title} loading="lazy" />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
