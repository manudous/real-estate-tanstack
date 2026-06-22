import type { FooterData } from "#/lib/types";
import "./Footer.css";

export default function Footer({ footer }: { footer: FooterData }) {
  const footerLinks = [
    footer.linkHome,
    footer.linkBuy,
    footer.linkRent,
    footer.linkContact,
  ];

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <p className="company-name">{footer.companyName.label}</p>
            <p className="motto">{footer.motto}</p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            <p className="footer-nav-label">Navigation</p>
            {footerLinks.map((link) => (
              <a key={link.id} href={link.url || "#"} className="footer-nav-link">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
