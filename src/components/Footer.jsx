
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  ArrowUp,
  Camera,
  Video,
  Globe,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { h1 } from "framer-motion/client";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Our Work", to: "/work" },
  { label: "Creative Studio", to: "/studio" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/northernuniversity/",
    Icon: Camera,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@northernuniversity",
    Icon: Video,
  },
  {
    label: "University Website",
    href: "https://northern.edu.pk/",
    Icon: Globe,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="nu-footer">
      <div className="footer-top-rule" />

      <div className="footer-container">
        <div className="footer-main">
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
                      >
            <div className="footer-brand-line">
              <span className="footer-brand-dot" />
              <span>THE CREATIVE VOICE OF NORTHERN UNIVERSITY</span>
            </div>

            <Link to="/" className="footer-wordmark" aria-label="NU Media home">
              NU<span>.</span>MEDIA
            </Link>

            <p className="footer-tagline">
              Stories with purpose.
              <br />
              <em>Moments that matter.</em>
            </p>
          </motion.div>

          <div className="footer-columns">
            <motion.div
              className="footer-column footer-navigation"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <span className="footer-heading">EXPLORE</span>

              <nav aria-label="Footer navigation">
                {footerLinks.map((item, index) => (
                  <Link
                    to={item.to}
                    className="footer-nav-link"
                    key={item.to}
                  >
                    <span className="footer-nav-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="footer-nav-label">{item.label}</span>
                    <ArrowUpRight
                      size={14}
                      className="footer-nav-arrow"
                    />
                  </Link>
                ))}
              </nav>
            </motion.div>

            <motion.div
              className="footer-column footer-social"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.16 }}
            >
              <span className="footer-heading">STAY CONNECTED</span>

              <p className="footer-social-copy">
                Discover campus stories, creative work, and moments from
                Northern University.
              </p>

              <div className="footer-social-links">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    className="footer-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={16} strokeWidth={1.6} />
                    <span>{label}</span>
                    <ArrowUpRight
                      size={13}
                      className="social-arrow"
                    />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="footer-closing"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <div>
            <span className="footer-closing-eyebrow">
              EVERY FRAME HAS A STORY
            </span>
            <p className="footer-closing-title">
              Made to be <em>remembered.</em>
            </p>
          </div>

          <button
            type="button"
            className="footer-back-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <span className="footer-back-top-icon">
              <ArrowUp size={16} />
            </span>
          </button>
        </motion.div>

        <div className="footer-bottom">
          <Link to="/" className="footer-mini-logo">
            NU MEDIA<span>.</span>
          </Link>

          <p className="footer-copyright">
            © {year} Northern University
          </p>

          <span className="footer-credit">
            CREATIVITY WITH A PURPOSE
            <ArrowDownRight size={13} />
          </span>
        </div>
      </div>
    </footer>
  );
}
