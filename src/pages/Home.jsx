
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Clapperboard,
  Film,
  Play,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Home.css";

// Check that this path and filename match your actual image.

const featuredWork = [
  {
    number: "01",
    title: "University in Focus",
    category: "CAMPUS PHOTOGRAPHY",
    image:
      "src/assets/img/NU Clips/campus.png",
    size: "large",
  },
  {
    number: "02",
    title: "Ideas & Exchange",
    category: "EVENT DOCUMENTATION",
    image:
      "src/assets/img/NU Clips/staff.jpg",
    size: "small",
  },
  {
    number: "03",
    title: "The People Behind It",
    category: "STORIES & PEOPLE",
    image:
      "src/assets/img/NU Clips/rector.jpeg",
    size: "small",
  },
];

const highlights = [
  {
    number: "01",
    title: "Official Meetings",
    text: "Documenting the conversations, decisions and collaborations that move our university forward.",
    image:
      "src/assets/img/NU Clips/officialmeeting.jpeg",
  },
  {
    number: "02",
    title: "Academic Gatherings",
    text: "Capturing seminars, conferences and the exchange of knowledge across our campus.",
    image:
      "src/assets/img/NU Clips/academicgathering.jpeg",
  },
  {
    number: "03",
    title: "Campus Celebrations",
    text: "Preserving the shared experiences and memorable moments of university life.",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1000&q=85",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

function SectionLabel({ children }) {
  return (
    <div className="nu-home-label">
      <span />
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main className="nu-home">
      {/* HERO */}{/* HERO */}
      <section className="nu-home-hero">

        <motion.div
          className="nu-home-hero-image"
          initial={{ scale: 1.13, opacity: 0.72 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="src/assets/img/NU Clips/university.jpeg"
            alt="Northern University campus"
          />
        </motion.div>

        <div className="nu-home-hero-shade" />

        <div className="nu-home-hero-content">

          <motion.div
            className="nu-home-hero-copy"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
          >

            <motion.div variants={fadeUp}>
              <SectionLabel>
                NORTHERN UNIVERSITY · MEDIA TEAM
              </SectionLabel>
            </motion.div>

            <motion.h1 variants={fadeUp}>
              Northern
              <br />
              <em>University</em>
            </motion.h1>

            <motion.h2 variants={fadeUp}>
              Inform <span>•</span> Inspire <span>•</span> Connect
            </motion.h2>

            <motion.p variants={fadeUp}>
              Bridging Ideas, Sharing Stories,
              <br />
              Celebrating Our University.
            </motion.p>

            <motion.div
              className="nu-home-hero-actions"
              variants={fadeUp}
            >
              <Link to="/work" className="nu-home-button">
                EXPLORE OUR WORK
                <ArrowUpRight size={17} />
              </Link>

              <a
                href="#about-nu-media"
                className="nu-home-text-link"
              >
                DISCOVER NU MEDIA
                <ArrowDown size={15} />
              </a>
            </motion.div>

          </motion.div>
        </div>

        <div className="nu-home-hero-bottom">
          <span>CAPTURING MOMENTS • CREATING MEMORIES</span>
          <span>01 — NORTHERN UNIVERSITY</span>
        </div>

        <div className="nu-home-hero-index" aria-hidden="true">
          NU
          <span>MEDIA</span>
        </div>

      </section>

      {/* INTRODUCTION */}
      <section className="nu-home-intro" id="about-nu-media">
        <motion.div
          className="nu-home-intro-top"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
        >
          <SectionLabel>WHO WE ARE</SectionLabel>
          <span className="nu-home-intro-side">
            AN OFFICIAL UNIVERSITY MEDIA PLATFORM
          </span>
        </motion.div>

        <div className="nu-home-intro-grid">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
          >
            Every moment has a story.
            <br />
            <em>We make it last.</em>
          </motion.h2>

          <motion.div
            className="nu-home-intro-description"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
          >
            <p>
              NU Media is dedicated to documenting university life
              through thoughtful photography, video production and
              creative storytelling.
            </p>
            <p>
              From official meetings to student experiences, we
              preserve the moments that define our community and
              share them with the world.
            </p>

            <Link to="/about" className="nu-home-underlined-link">
              MORE ABOUT OUR TEAM
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </div>

        <div className="nu-home-divider" />
      </section>

      {/* CREATIVE SERVICES */}
      <section className="nu-home-services">
        <div className="nu-home-services-heading">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <SectionLabel>WHAT WE DO</SectionLabel>
            <h2>
              University life,
              <br />
              <em>beautifully documented.</em>
            </h2>
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Every frame is an opportunity to communicate something
            meaningful. We bring university stories to life through
            creativity, detail and purpose.
          </motion.p>
        </div>

        <div className="nu-home-service-grid">
          <motion.article
            className="nu-home-service"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <span className="nu-home-service-icon">
              <Camera size={23} strokeWidth={1.3} />
            </span>
            <span className="nu-home-service-number">01 / CAPTURE</span>
            <h3>Photography</h3>
            <p>
              Campus life, official ceremonies, meetings and the
              details that make every occasion unique.
            </p>
          </motion.article>

          <motion.article
            className="nu-home-service"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <span className="nu-home-service-icon">
              <Film size={23} strokeWidth={1.3} />
            </span>
            <span className="nu-home-service-number">02 / CREATE</span>
            <h3>Film & Video</h3>
            <p>
              Moving images, event recaps and visual narratives
              that bring the university experience closer.
            </p>
          </motion.article>

          <motion.article
            className="nu-home-service"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <span className="nu-home-service-icon">
              <Film size={23} strokeWidth={1.3} />            </span>
            <span className="nu-home-service-number">03 / TELL</span>
            <h3>Digital Stories</h3>
            <p>
              Creative media, university highlights and stories
              worth sharing with our wider community.
            </p>
          </motion.article>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="nu-home-work">
        <div className="nu-home-work-heading">
          <div>
            <SectionLabel>SELECTED MOMENTS</SectionLabel>
            <h2>
              Seen through
              <br />
              <em>our lens.</em>
            </h2>
          </div>

          <Link to="/work" className="nu-home-underlined-link">
            EXPLORE OUR WORK
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="nu-home-work-grid">
          {featuredWork.map((item, index) => (
            <motion.article
              className={`nu-home-work-card nu-home-work-${item.size}`}
              key={item.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
            >
              <Link
                to="/work"
                className="nu-home-work-image"
                aria-label={`Explore ${item.title}`}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <span className="nu-home-work-image-shade" />

                <span className="nu-home-work-index">
                  {item.number}
                </span>

                <span className="nu-home-work-arrow">
                  <ArrowUpRight size={21} />
                </span>

                <span className="nu-home-work-caption">
                  <span>{item.category}</span>
                  <strong>{item.title}</strong>
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* EVENTS PREVIEW */}
      <section className="nu-home-events">
        <div className="nu-home-events-top">
          <div>
            <SectionLabel>FROM OUR EVENT ARCHIVE</SectionLabel>
            <h2>
              Life at Northern.
              <br />
              <em>In every frame.</em>
            </h2>
          </div>

          <Link to="/events" className="nu-home-underlined-link">
            ALL EVENTS
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="nu-home-highlight-grid">
          {highlights.map((item, index) => (
            <motion.article
              className="nu-home-highlight"
              key={item.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to="/events"
                className="nu-home-highlight-image"
                aria-label={`Explore ${item.title} events`}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <span>
                  <ArrowUpRight size={20} />
                </span>
              </Link>

              <div className="nu-home-highlight-info">
                <span>{item.number} / UNIVERSITY MOMENTS</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="nu-home-events-footer">
          <span>MEMORIES PRESERVED BY NU MEDIA</span>
          <Link to="/events">
            VISIT EVENTS & HIGHLIGHTS
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* FINAL STATEMENT */}
      <section className="nu-home-closing">
        <div className="nu-home-closing-symbol">
          <Play size={17} fill="currentColor" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel>THE STORY CONTINUES</SectionLabel>

          <h2>
            One university.
            <br />
            <em>Countless stories.</em>
          </h2>

          <p>
            Explore the moments, people and ideas that make
            Northern University what it is.
          </p>

          <Link to="/events" className="nu-home-button">
            DISCOVER OUR STORIES
            <ArrowUpRight size={17} />
          </Link>
        </motion.div>

        <div className="nu-home-closing-footer">
          <span>NU MEDIA</span>
          <span>CAPTURING OUR COMMUNITY</span>
        </div>
      </section>
    </main>
  );
}
