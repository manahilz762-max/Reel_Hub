
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Camera,
  Video,
  CalendarDays,
  PanelsTopLeft,
  ArrowUpRight,
  ChevronDown,
  ClipboardList,
  Clapperboard,
  CheckCircle2,
  MoveRight,
  CircleHelp,
  Sparkles,
} from "lucide-react";
import "./Services.css";

const services = [
  {
    number: "01",
    title: "Photography",
    subtitle: "Moments worth remembering.",
    description:
      "From campus life to formal university occasions, we capture the people, details and moments that tell your story.",
    points: [
      "Campus and student photography",
      "Event and ceremony coverage",
      "Portraits and team photographs",
    ],
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Professional camera ready for a photography session",
    icon: Camera,
    className: "service-photography",
  },
  {
    number: "02",
    title: "Videography",
    subtitle: "Stories in motion.",
    description:
      "Bring university experiences to life through thoughtful filming, engaging visual storytelling and carefully edited video.",
    points: [
      "Event highlight videos",
      "Interviews and student stories",
      "Promotional and recap videos",
    ],
    image:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Video camera used for cinematic filming",
    icon: Video,
    className: "service-videography",
  },
  {
    number: "03",
    title: "Event Coverage",
    subtitle: "From the first moment to the last.",
    description:
      "Document the atmosphere, key moments and people behind university events, creating a visual record to share and revisit.",
    points: [
      "Seminars and conferences",
      "Campus festivals and competitions",
      "Official university occasions",
    ],
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "A live event with an audience and stage lighting",
    icon: CalendarDays,
    className: "service-events",
  },
  {
    number: "04",
    title: "Digital Content",
    subtitle: "Made for today's audience.",
    description:
      "Turn ideas and campus moments into clear, engaging content designed for digital platforms and university communications.",
    points: [
      "Social media visuals and posts",
      "Short-form video and reels",
      "Campaign and promotional content",
    ],
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Creative workspace for planning digital content",
    icon: PanelsTopLeft,
    className: "service-digital",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We understand your event, audience, purpose and the story you want to communicate.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Plan",
    description:
      "We align on the coverage, key moments, visual direction and content requirements.",
    icon: CalendarDays,
  },
  {
    number: "03",
    title: "Create",
    description:
      "The team captures the moments and develops content around the agreed brief.",
    icon: Clapperboard,
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "The finished content is organised for review and sharing according to the agreed plan.",
    icon: CheckCircle2,
  },
];

const requestItems = [
  "Event name and purpose",
  "Date, time and venue",
  "Expected audience",
  "Photography, video or both",
  "Important moments to capture",
  "Preferred delivery format",
];

const faqs = [
  {
    question: "What kind of university events can we request coverage for?",
    answer:
      "Requests can include seminars, conferences, student activities, competitions, festivals, ceremonies and other university occasions. The scope depends on the brief and team availability.",
  },
  {
    question: "Can we request both photography and videography?",
    answer:
      "Yes. You can outline the different deliverables you need in your request, such as event photographs, a highlight video or short social media clips.",
  },
  {
    question: "What information should we provide before an event?",
    answer:
      "Share the event date, venue, schedule, main contact person, key moments and the content you need. This helps the team plan coverage more effectively.",
  },
  {
    question: "Can the content be prepared for social media?",
    answer:
      "You can mention your intended platform and format in the brief. The required dimensions, duration and deliverables can then be discussed during planning.",
  },
];

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Services() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="services-page">
      <section className="services-hero">
        <div className="services-hero-glow" />

        <div className="services-container services-hero-grid">
          <Reveal className="services-hero-copy">
            <span className="services-eyebrow">
              <span className="services-eyebrow-line" />
              NU MEDIA <span>/</span> WHAT WE DO
            </span>

            <h1>
              Every story
              <br />
              deserves <em>to be seen.</em>
            </h1>

            <p className="services-hero-description">
              We turn university moments, ideas and experiences into
              thoughtful visual stories — through photography, film,
              event coverage and digital content.
            </p>

            <div className="services-hero-actions">
              <a className="services-button services-button-gold" href="#service-directory">
                Explore our services <MoveRight size={17} />
              </a>
              <Link className="services-text-link" to="/work">
                View our work <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="services-hero-note">
              <Sparkles size={15} />
              <span>Creative thinking. Meaningful storytelling.</span>
            </div>
          </Reveal>

          <Reveal className="services-hero-visual" delay={0.12}>
            <div className="services-hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1400&q=90"
                alt="University students gathered on campus"
                className="services-hero-image"
              />
              <div className="services-image-shade" />

              <div className="services-hero-image-caption">
                <span>THE CAMPUS. THE PEOPLE. THE STORIES.</span>
                <span className="services-caption-line" />
              </div>
            </div>

            <div className="services-floating-card">
              <span className="services-floating-icon">
                <Camera size={20} />
              </span>
              <div>
                <strong>Made to make an impact.</strong>
                <span>One story at a time.</span>
              </div>
              <ArrowUpRight size={18} className="services-floating-arrow" />
            </div>

            <span className="services-hero-index">01 — 04</span>
          </Reveal>
        </div>

        <div className="services-hero-bottom services-container">
          <span>CREATIVE COVERAGE</span>
          <span className="services-bottom-line" />
          <span>BUILT AROUND YOUR STORY</span>
        </div>
      </section>

      <section className="services-intro">
        <div className="services-container services-intro-grid">
          <Reveal>
            <span className="services-eyebrow">
              <span className="services-eyebrow-line" />
              OUR CAPABILITIES
            </span>
            <h2>
              More than content.
              <br />
              <em>A way to connect.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p>
              Good media does more than record what happened. It helps
              people feel part of the experience, gives ideas a clearer
              voice and keeps important university moments alive beyond
              the day itself.
            </p>
            <p>
              Choose a service or combine several to suit the needs of
              your event, project or campaign.
            </p>
          </Reveal>
        </div>

        <div className="services-container services-info-strip">
          <div>
            <span className="services-info-number">04</span>
            <span>Core service areas</span>
          </div>
          <span className="services-info-divider" />
          <div>
            <span className="services-info-number">01</span>
            <span>Coordinated creative process</span>
          </div>
          <span className="services-info-divider" />
          <div>
            <span className="services-info-number">
              <Sparkles size={21} />
            </span>
            <span>Purpose-led storytelling</span>
          </div>
        </div>
      </section>

      <section className="services-directory" id="service-directory">
        <div className="services-container">
          <Reveal className="services-section-heading">
            <div>
              <span className="services-eyebrow">
                <span className="services-eyebrow-line" />
                WHAT WE OFFER
              </span>
              <h2>
                The right medium.
                <br />
                <em>The right message.</em>
              </h2>
            </div>
            <p>
              Explore the creative support available for your next
              university story.
            </p>
          </Reveal>

          <div className="services-list">
            {services.map((service, index) => {
              const Icon = service.icon;
              const reverse = index % 2 === 1;

              return (
                <Reveal
                  key={service.number}
                  className={`service-row ${reverse ? "service-row-reverse" : ""} ${service.className}`}
                  delay={0.04}
                >
                  <div className="service-row-visual">
                    <div className="service-photo-frame">
                      <img
                        src={service.image}
                        alt={service.imageAlt}
                        loading="lazy"
                      />
                      <div className="service-photo-overlay" />
                      <span className="service-photo-number">{service.number}</span>
                      <span className="service-photo-label">NU MEDIA / CREATIVE</span>
                    </div>
                    <span className="service-visual-decoration" />
                  </div>

                  <div className="service-row-content">
                    <div className="service-content-topline">
                      <span className="service-number">{service.number}</span>
                      <span className="service-icon">
                        <Icon size={19} strokeWidth={1.6} />
                      </span>
                    </div>

                    <span className="service-subtitle">{service.subtitle}</span>
                    <h3>{service.title}</h3>
                    <p className="service-description">{service.description}</p>

                    <div className="service-includes">
                      <span className="service-includes-title">WHAT IT CAN INCLUDE</span>
                      <ul>
                        {service.points.map((point) => (
                          <li key={point}>
                            <CheckCircle2 size={15} />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link to="/work" className="service-explore-link">
                      Explore our work <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="services-process">
        <div className="services-container">
          <Reveal className="services-process-heading">
            <span className="services-eyebrow">
              <span className="services-eyebrow-line" />
              HOW IT COMES TOGETHER
            </span>
            <h2>
              A clear process.
              <br />
              <em>From idea to delivery.</em>
            </h2>
            <p>
              Great coverage starts before the camera comes out. A shared
              brief helps everyone understand the goal and the details
              that matter.
            </p>
          </Reveal>

          <div className="services-process-grid">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Reveal
                  key={step.number}
                  className="services-process-card"
                  delay={index * 0.07}
                >
                  <div className="process-card-top">
                    <span>{step.number}</span>
                    <Icon size={21} strokeWidth={1.5} />
                  </div>
                  <span className="process-card-line" />
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="services-request">
        <div className="services-container services-request-grid">
          <Reveal className="services-request-copy">
            <span className="services-eyebrow">
              <span className="services-eyebrow-line" />
              PLAN YOUR REQUEST
            </span>
            <h2>
              Start with
              <br />
              <em>the details.</em>
            </h2>
            <p>
              Whether you are planning a campus event or developing a
              digital campaign, a few details help shape a more useful
              creative brief.
            </p>
            <Link to="/about" className="services-button services-button-outline">
              Get to know NU Media <ArrowUpRight size={16} />
            </Link>
          </Reveal>

          <Reveal className="services-request-panel" delay={0.1}>
            <div className="request-panel-header">
              <div className="request-panel-icon">
                <ClipboardList size={20} />
              </div>
              <div>
                <span>YOUR CREATIVE BRIEF</span>
                <h3>What to prepare</h3>
              </div>
            </div>

            <p className="request-panel-description">
              Keep these details ready when discussing a project with the team.
            </p>

            <ul className="request-checklist">
              {requestItems.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item}
                  <CheckCircle2 size={16} />
                </li>
              ))}
            </ul>

            <div className="request-panel-footer">
              <span>BETTER BRIEFS MAKE BETTER STORIES.</span>
              <MoveRight size={19} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="services-faq">
        <div className="services-container services-faq-grid">
          <Reveal className="services-faq-intro">
            <span className="services-eyebrow">
              <span className="services-eyebrow-line" />
              GOOD TO KNOW
            </span>
            <h2>
              A few things,
              <br />
              <em>answered.</em>
            </h2>
            <p>
              A little clarity before your next creative project begins.
            </p>
            <CircleHelp size={43} strokeWidth={1} className="services-faq-icon" />
          </Reveal>

          <div className="services-faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div className={`services-faq-item ${isOpen ? "is-open" : ""}`} key={faq.question}>
                  <button
                    className="services-faq-question"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  >
                    <span className="faq-question-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{faq.question}</span>
                    <ChevronDown size={19} className="faq-chevron" />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="services-faq-answer-wrap"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="services-faq-answer">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="services-cta">
        <div className="services-cta-orb services-cta-orb-one" />
        <div className="services-cta-orb services-cta-orb-two" />

        <Reveal className="services-container services-cta-content">
          <span className="services-eyebrow">
            <span className="services-eyebrow-line" />
            YOUR STORY STARTS HERE
          </span>
          <h2>
            Let's make something
            <br />
            <em>worth remembering.</em>
          </h2>
          <p>
            Have an event, an idea or a story to tell? Explore our work
            and discover what thoughtful media can do.
          </p>
          <div className="services-cta-actions">
            <Link to="/work" className="services-button services-button-gold">
              Explore our work <ArrowUpRight size={17} />
            </Link>
            <Link to="/about" className="services-cta-secondary">
              About NU Media <MoveRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
