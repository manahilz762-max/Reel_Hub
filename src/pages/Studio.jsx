
import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Aperture,
  Camera,
  Clapperboard,
  Film,
  Maximize2,
  Play,
  X,
} from "lucide-react";
import "./Studio.css";

const galleryItems = [
  {
    id: 1,
    title: "Between the lectures",
    category: "Campus life",
    type: "image",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=85",
    description:
      "The little moments that make university life memorable.",
    ratio: "portrait",
    number: "01",
  },
  {
    id: 2,
    title: "Light in motion",
    category: "Photography",
    type: "image",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    description:
      "Finding a story in light, shadow, and composition.",
    ratio: "landscape",
    number: "02",
  },
  {
    id: 3,
    title: "A place to create",
    category: "Campus life",
    type: "image",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1400&q=85",
    description:
      "The spaces, people, and ideas that bring a campus to life.",
    ratio: "square",
    number: "03",
  },
  {
    id: 4,
    title: "The quiet details",
    category: "Photography",
    type: "image",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85",
    description:
      "An exercise in noticing what others might overlook.",
    ratio: "portrait",
    number: "04",
  },
  {
    id: 5,
    title: "A moving story",
    category: "Motion",
    type: "video",
    image:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1400&q=85",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    description:
      "Experiments in movement, rhythm, and visual storytelling.",
    ratio: "landscape",
    number: "05",
  },
  {
    id: 6,
    title: "Frames of the day",
    category: "Photography",
    type: "image",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
    description:
      "Collecting fleeting scenes and turning them into memories.",
    ratio: "square",
    number: "06",
  },
  {
    id: 7,
    title: "Beyond the ordinary",
    category: "Motion",
    type: "image",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1400&q=85",
    description:
      "Visual experiments shaped by curiosity and imagination.",
    ratio: "portrait",
    number: "07",
  },
  {
    id: 8,
    title: "Our point of view",
    category: "Campus life",
    type: "image",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=85",
    description:
      "Different perspectives, one shared creative community.",
    ratio: "landscape",
    number: "08",
  },
];

const categories = [
  "All frames",
  "Photography",
  "Campus life",
  "Motion",
];

function Studio() {
  const [activeCategory, setActiveCategory] = useState("All frames");
  const [activeItem, setActiveItem] = useState(null);

  const filteredItems =
    activeCategory === "All frames"
      ? galleryItems
      : galleryItems.filter(
          (item) => item.category === activeCategory
        );

  const activeIndex = activeItem
    ? filteredItems.findIndex((item) => item.id === activeItem.id)
    : -1;

  function openItem(item) {
    setActiveItem(item);
  }

  function closeItem() {
    setActiveItem(null);
  }

  function showNext() {
    if (activeIndex < 0 || filteredItems.length === 0) return;

    const nextIndex = (activeIndex + 1) % filteredItems.length;
    setActiveItem(filteredItems[nextIndex]);
  }

  function showPrevious() {
    if (activeIndex < 0 || filteredItems.length === 0) return;

    const previousIndex =
      (activeIndex - 1 + filteredItems.length) %
      filteredItems.length;

    setActiveItem(filteredItems[previousIndex]);
  }

  useEffect(() => {
    if (!activeItem) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") closeItem();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrevious();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem, activeIndex, filteredItems]);

  return (
    <main className="lab-page">
      {/* HERO INTRODUCTION */}
      <section className="lab-hero">
        <div className="lab-hero-content">
          <p className="lab-hero-label">
            REELHUB STUDIO <span>/</span> CREATIVE LAB
          </p>

          <div className="lab-hero-title">
            <h1>
              Stories, seen
              <br />
              <span>differently.</span>
            </h1>
          </div>

          <p className="lab-hero-description">
            A space for campus stories, bold frames, moving
            images, and the moments that deserve to be
            remembered.
          </p>

          <a href="#lab-gallery" className="lab-hero-link">
            EXPLORE THE COLLECTION
            <span>↗</span>
          </a>

          <div className="lab-hero-bottom">
            <span>PHOTOGRAPHY</span>
            <span>FILM</span>
            <span>CAMPUS CULTURE</span>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="lab-introduction">
        <div className="lab-section-marker">
          <span>01</span>
          <span className="lab-marker-line" />
          <span>OUR CREATIVE SPACE</span>
        </div>

        <div className="lab-introduction-grid">
          <h2>
            Not just what
            <br />
            we <em>see.</em>
          </h2>

          <div className="lab-introduction-copy">
            <p>
              Every frame holds a feeling. Every story begins
              with a point of view. ReelHub Studio is where
              campus life meets creative expression.
            </p>

            <p>
              From photography and film to the unexpected
              details of everyday university life, we explore
              the stories worth sharing.
            </p>

            <div className="lab-introduction-signature">
              <Aperture size={18} strokeWidth={1.3} />
              <span>OBSERVE. CREATE. TELL.</span>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE GALLERY */}
      <section className="lab-archive" id="lab-gallery">
        <div className="lab-section-marker">
          <span>02</span>
          <span className="lab-marker-line" />
          <span>THE VISUAL ARCHIVE</span>
        </div>

        <div className="lab-archive-heading">
          <div>
            <p className="lab-eyebrow">SELECTED MOMENTS</p>
            <h2>
              The art of
              <br />
              <em>paying attention.</em>
            </h2>
          </div>

          <p className="lab-archive-description">
            A collection of frames, places, people, and ideas
            captured through our lens.
          </p>
        </div>

        <div className="lab-filters" aria-label="Filter gallery">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                activeCategory === category ? "active" : ""
              }
              onClick={() => {
                setActiveCategory(category);
                setActiveItem(null);
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="lab-gallery">
          {filteredItems.map((item, index) => (
            <button
              type="button"
              className={`lab-gallery-item ${item.ratio}`}
              key={item.id}
              onClick={() => openItem(item)}
              aria-label={`View ${item.title}`}
            >
              <div className="lab-gallery-image">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                />

                <div className="lab-gallery-overlay">
                  <span className="lab-gallery-number">
                    {item.number}
                  </span>

                  <span className="lab-gallery-open">
                    {item.type === "video" ? (
                      <Play size={18} />
                    ) : (
                      <Maximize2 size={18} />
                    )}
                  </span>
                </div>
              </div>

              <div className="lab-gallery-caption">
                <div>
                  <span className="lab-gallery-category">
                    {item.category}
                  </span>
                  <h3>{item.title}</h3>
                </div>

                <ArrowUpRight
                  size={19}
                  strokeWidth={1.3}
                />
              </div>

              <span className="lab-gallery-index">
                FRAME — {String(index + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>

        <div className="lab-archive-footer">
          <span>
            SHOWING {String(filteredItems.length).padStart(2, "0")}{" "}
            FRAMES
          </span>
          <span>MADE WITH CURIOSITY</span>
        </div>
      </section>

      {/* MOTION FEATURE */}
      <section className="lab-motion">
        <div className="lab-motion-visual">
          <div className="lab-motion-symbol">
            <Clapperboard size={34} strokeWidth={1} />
          </div>

          <span className="lab-motion-side-label">
            REELHUB / MOVING IMAGE
          </span>

          <div className="lab-motion-center">
            <Film size={42} strokeWidth={1} />
            <span>IN MOTION</span>
          </div>

          <span className="lab-motion-frame-label">
            A DIFFERENT WAY TO TELL A STORY
          </span>
        </div>

        <div className="lab-motion-copy">
          <div className="lab-section-marker">
            <span>03</span>
            <span className="lab-marker-line" />
            <span>MOTION STUDIES</span>
          </div>

          <p className="lab-eyebrow">BEYOND THE STILL FRAME</p>

          <h2>
            Some stories
            <br />
            need to <em>move.</em>
          </h2>

          <p>
            Film gives moments a rhythm of their own. We
            experiment with movement, sound, pacing, and
            perspective to bring ideas to life.
          </p>

          <a href="#lab-gallery" className="lab-text-link">
            EXPLORE MOVING STORIES
            <ArrowDownRight size={18} />
          </a>
        </div>
      </section>

      {/* OUR CREATIVE PROCESS */}
      <section className="lab-method">
        <div className="lab-section-marker">
          <span>04</span>
          <span className="lab-marker-line" />
          <span>THE WAY WE WORK</span>
        </div>

        <div className="lab-method-heading">
          <p className="lab-eyebrow">FROM THOUGHT TO FRAME</p>
          <h2>
            A process guided
            <br />
            by <em>curiosity.</em>
          </h2>
        </div>

        <div className="lab-method-grid">
          <article className="lab-method-card">
            <span className="lab-method-number">01</span>
            <div className="lab-method-icon">
              <Aperture size={25} strokeWidth={1.2} />
            </div>
            <h3>Observe</h3>
            <p>
              We look closer, ask questions, and find the
              story hiding in ordinary moments.
            </p>
          </article>

          <article className="lab-method-card">
            <span className="lab-method-number">02</span>
            <div className="lab-method-icon">
              <Camera size={25} strokeWidth={1.2} />
            </div>
            <h3>Create</h3>
            <p>
              We turn ideas into images, films, and visual
              experiences with intention.
            </p>
          </article>

          <article className="lab-method-card">
            <span className="lab-method-number">03</span>
            <div className="lab-method-icon">
              <Clapperboard size={25} strokeWidth={1.2} />
            </div>
            <h3>Connect</h3>
            <p>
              We share work that brings people together and
              gives campus stories a lasting voice.
            </p>
          </article>
        </div>
      </section>

      {/* CLOSING SECTION */}
      <section className="lab-outro">
        <span className="lab-outro-symbol">
          <Aperture size={28} strokeWidth={1} />
        </span>

        <p className="lab-eyebrow">EVERY STORY STARTS SOMEWHERE</p>

        <h2>
          What will you
          <br />
          <em>create next?</em>
        </h2>

        <p className="lab-outro-description">
          A new perspective. A different frame. Another story
          waiting to be told.
        </p>

        <a href="#lab-gallery" className="lab-outro-link">
          FIND YOUR FRAME
          <ArrowUpRight size={18} />
        </a>

        <span className="lab-outro-footnote">
          REELHUB STUDIO — MADE TO SEE DIFFERENTLY
        </span>
      </section>

      {/* IMAGE AND VIDEO LIGHTBOX */}
      {activeItem && (
        <div
          className="lab-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onClick={closeItem}
        >
          <button
            type="button"
            className="lab-lightbox-close"
            onClick={closeItem}
            aria-label="Close gallery"
          >
            <X size={23} />
          </button>

          <button
            type="button"
            className="lab-lightbox-arrow previous"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label="Previous item"
          >
            <ArrowLeft size={23} />
          </button>

          <div
            className="lab-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            {activeItem.type === "video" && activeItem.video ? (
              <video
                src={activeItem.video}
                controls
                autoPlay
                playsInline
                className="lab-lightbox-media"
              />
            ) : (
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="lab-lightbox-media"
              />
            )}

            <div className="lab-lightbox-caption">
              <div>
                <span>{activeItem.category}</span>
                <h2>{activeItem.title}</h2>
                <p>{activeItem.description}</p>
              </div>

              <span className="lab-lightbox-count">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(filteredItems.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="lab-lightbox-arrow next"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Next item"
          >
            <ArrowRight size={23} />
          </button>
        </div>
      )}
    </main>
  );
}

export default Studio;
