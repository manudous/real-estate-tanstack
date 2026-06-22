import type { HeroData } from "#/lib/types";
import "./HeroSection.css";

export default function HeroSection({ hero }: { hero: HeroData }) {
  return (
    <section className="hero">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${hero.backgroundImage.url})` }}
      ></div>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <p className="hero-eyebrow">Premier Real Estate</p>
        <div className="hero-divider"></div>
        <h1 className="hero-title">{hero.name}</h1>
        <div className="hero-actions">
          <a href={hero.buy.url || "#"} className="btn-primary">
            {hero.buy.label}
          </a>
          <a href={hero.rent.url || "#"} className="btn-secondary">
            {hero.rent.label}
          </a>
        </div>
      </div>

      <div className="hero-scroll-indicator" aria-hidden="true">
        <span className="scroll-line"></span>
      </div>
    </section>
  );
}
