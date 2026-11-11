import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Play, X, Camera, Film } from "lucide-react";
import { Link } from "react-router-dom";
import "./Work.css";

import campus from "../assets/img/Team Pictures/Team Lead.jpeg";
import team from "../assets/img/Team Pictures/team.jpeg";
import production from "../assets/img/Team Pictures/production.jpeg";

// ========================================
// EVENT DETAILS
// ========================================

const eventDetails = [
  {
    slug: "convocation",
    title: "Convocation",
    italic: "Ceremony.",
    description:
      "Celebrating achievements, new beginnings and the memories of a remarkable academic journey.",
    label: "ACADEMIC CELEBRATIONS",
    number: "01",
  },
  {
    slug: "sports-gala",
    title: "Sports",
    italic: "Gala.",
    description:
      "The energy, competition and unforgettable moments that bring our university community together.",
    label: "CAMPUS ENERGY",
    number: "02",
  },
  {
    slug: "welcome-party",
    title: "Welcome",
    italic: "Party.",
    description:
      "A celebration of new faces, friendships and the beginning of a new university chapter.",
    label: "STUDENT LIFE",
    number: "03",
  },
  {
    slug: "seminars",
    title: "Seminars &",
    italic: "Workshops.",
    description:
      "Capturing ideas, learning experiences and conversations that inspire our community.",
    label: "LEARNING & IDEAS",
    number: "04",
  },
  {
    slug: "cultural-events",
    title: "Cultural",
    italic: "Events.",
    description:
      "A collection of traditions, performances and celebrations from across our campus.",
    label: "CULTURE & COMMUNITY",
    number: "05",
  },
  {
    slug: "official-meetings",
    title: "Official",
    italic: "Meetings.",
    description:
      "Documenting important university gatherings, visits and institutional moments.",
    label: "UNIVERSITY HIGHLIGHTS",
    number: "06",
  },
];

// ========================================
// EVENT-WISE PHOTOGRAPH LINKS
// Add, remove or replace links inside only the related event array.
// ========================================

// Example photo array: ["https://example.com/photo-1.jpg", "https://example.com/photo-2.jpg"]
const convocationPhotos = [];
const sportsGalaPhotos = [];
const welcomePartyPhotos = [];
const seminarPhotos = [];
const culturalEventPhotos = [];
const officialMeetingPhotos = [];

// Example video array: [{ title: "Convocation Highlights", cover: "https://example.com/cover.jpg", video: "https://example.com/video.mp4" }]
const convocationVideos = [];
const sportsGalaVideos = [];
const welcomePartyVideos = [];
const seminarVideos = [];
const culturalEventVideos = [];
const officialMeetingVideos = [];

const eventPhotos = {
  convocation: convocationPhotos,
  "sports-gala": sportsGalaPhotos,
  "welcome-party": welcomePartyPhotos,
  seminars: seminarPhotos,
  "cultural-events": culturalEventPhotos,
  "official-meetings": officialMeetingPhotos,
};

const eventVideos = {
  convocation: convocationVideos,
  "sports-gala": sportsGalaVideos,
  "welcome-party": welcomePartyVideos,
  seminars: seminarVideos,
  "cultural-events": culturalEventVideos,
  "official-meetings": officialMeetingVideos,
};

// ========================================
// EVENT COLLECTIONS
// Photos and videos stay separate per event.
// ========================================

const eventCollections = eventDetails.map((event) => {
  const images = eventPhotos[event.slug] || [];
  const videos = eventVideos[event.slug] || [];

  return {
    ...event,

    photos: images.map((image, index) => ({
      image,
      title: `${event.title.replace("&", "and")} Photograph ${index + 1}`,
      caption: event.description,
      category: event.label,
      year: "2026",
    })),

    videos: videos.map((video, index) => ({
      title: video.title || `${event.title.replace("&", "and")} Film ${index + 1}`,
      caption: video.caption || event.description,
      category: video.category || event.label,
      cover: video.cover || images[index] || images[0],
      video: video.video,
    })),
  };
});

const bestPhotographs = [
  {
    title: "Life at Northern",
    caption: "A glimpse of everyday university life.",
    category: "CAMPUS LIFE",
    image: campus,
    year: "2026",
  },
  {
    title: "The Faces Behind the Stories",
    caption: "The creative people behind NU Media.",
    category: "OUR PEOPLE",
    image: team,
    year: "2026",
  },
  {
    title: "Behind the Lens",
    caption: "The process behind every frame.",
    category: "PRODUCTION",
    image: production,
    year: "2026",
  },
];

const revealUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const bestVideos = [
  {
    title: "University Highlights",
    caption: "A collection of memorable university moments.",
    category: "CAMPUS STORIES",
    cover: campus,
    video: "/videos/best-university-highlights.mp4",
  },
  {
    title: "Stories Behind the Lens",
    caption: "Discover the creativity behind our work.",
    category: "MEDIA PRODUCTION",
    cover: production,
    video: "/videos/best-behind-the-lens.mp4",
  },
  {
    title: "Our People, Our Stories",
    caption: "The people who make NU Media what it is.",
    category: "TEAM STORIES",
    cover: team,
    video: "/videos/best-team-stories.mp4",
  },
];

function Work() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedMedia, setSelectedMedia] = useState(null);

  const visibleEvents =
    activeFilter === "All"
      ? eventCollections
      : eventCollections.filter(
        (event) => event.slug === activeFilter
      );

  const openPhoto = (photo) => {
    setSelectedMedia({ ...photo, type: "photo" });
  };

  const openVideo = (video) => {
    setSelectedMedia({ ...video, type: "video" });
  };

  return (
    <main className="work-page">

      {/* ==================================
          EXISTING COLLAGE HEADER
          DESIGN PRESERVED
      ================================== */}

      <section className="work-hero">
        <div className="work-hero-inner">

          <motion.div
            className="work-hero-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="portfolio-brand">
              <span>NU MEDIA</span>
              <span className="portfolio-line">━━━━━━</span>
            </div>

            <h1>
              Moments
              <br />
              That <em>Matter.</em>
            </h1>

            <p className="work-description">
              From campus celebrations to stories behind the lens,
              explore the photographs, films, and creative work
              that capture life at Northern University.
            </p>

            <a href="#work-events" className="work-cta">
              <span>Explore Our Work</span>
              <ArrowRight size={17} />
            </a>

            <div className="work-caption">
              <span className="caption-dot" />
              PEOPLE. STORIES. PERSPECTIVES.
            </div>
          </motion.div>

          <div className="work-collage">

            <motion.div
              className="collage-image collage-campus"
              initial={{ opacity: 0, y: 25, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: -4 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <img src={campus} alt="Northern University campus" />
            </motion.div>

            <motion.div
              className="collage-image collage-team"
              initial={{ opacity: 0, y: 30, rotate: 4 }}
              animate={{ opacity: 1, y: 0, rotate: 2 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img src={team} alt="NU Media team" />
            </motion.div>

            <motion.div
              className="collage-image collage-production"
              initial={{ opacity: 0, y: 25, rotate: 5 }}
              animate={{ opacity: 1, y: 0, rotate: 5 }}
              transition={{ duration: 0.8, delay: 0.45 }}
            >
              <img
                src={production}
                alt="Media production and editing"
              />
            </motion.div>

            <div className="collage-note">
              <span>Capture.</span>
              <span>Create.</span>
              <span>Tell Stories.</span>
              <ArrowUpRight size={20} />
            </div>

            <div className="collage-decoration" />
          </div>
        </div>

        <div className="work-hero-bottom">
          <span>NU MEDIA — NORTHERN UNIVERSITY</span>
          <span>EVERY FRAME HAS A STORY</span>
        </div>
      </section>

      {/* ==================================
          INTRODUCTION
      ================================== */}

      <motion.section
        className="work-intro"
        variants={revealUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <span className="work-section-label">
          THE NU MEDIA COLLECTION
        </span>

        <h2>
          Stories in frames.
          <br />
          <em>Memories that stay.</em>
        </h2>

        <p>
          Every photograph has a story. Explore the people,
          celebrations and moments that make Northern University
          special.
        </p>
      </motion.section>

      {/* ==================================
          EVENT COLLECTIONS
      ================================== */}

      <section className="event-collections" id="work-events">

        <motion.div
          className="event-main-heading"
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div>
            <span className="work-section-label">
              MOMENTS WORTH REMEMBERING
            </span>

            <h2>
              Every event.
              <br />
              <em>Its own story.</em>
            </h2>

            <p>
              Explore our university events through photographs
              and films captured by NU Media.
            </p>
          </div>

          <span className="event-heading-note">
            06 COLLECTIONS
            <br />
            NORTHERN UNIVERSITY
          </span>
        </motion.div>

        {/* EVENT FILTERS */}

        <div className="event-filters">
          {[
            { label: "All Events", value: "All" },
            ...eventCollections.map((event) => ({
              label: event.title.replace("&", "and").replace(".", ""),
              value: event.slug,
            })),
          ].map((filter) => (
            <button
              key={filter.value}
              className={
                activeFilter === filter.value ? "active" : ""
              }
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* INDIVIDUAL EVENT SECTIONS */}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="event-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {visibleEvents.map((event, eventIndex) => (
              <motion.section
                className={`event-block ${eventIndex % 2 === 1 ? "event-block-dark" : ""
                  }`}
                key={event.slug}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.65 }}
              >

                <div className="event-block-heading">

                  <div className="event-title-area">
                    <span className="event-label">
                      {event.label}
                    </span>

                    <h2>
                      <Link to={`/work/${event.slug}`}>
                        {event.title}
                        <br />
                        <em>{event.italic}</em>
                      </Link>
                    </h2>

                    <p>{event.description}</p>
                  </div>

                  <div className="event-number-area">
                    <span>{event.number}</span>
                    <small>EVENT COLLECTION</small>
                  </div>

                </div>

                {/* EVENT PHOTOGRAPHS */}

                <div className="event-subheading">
                  <span>01 / PHOTOGRAPHY</span>
                  <span>SELECTED MOMENTS</span>
                </div>

                <motion.div
                  className="event-photo-grid"
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  {event.photos.map((photo, index) => (
                    <motion.article
                      className="event-photo-card"
                      key={`${event.slug}-photo-${index}`}
                      variants={cardReveal}
                      whileHover={{
                        y: -7,
                        transition: { duration: 0.3 },
                      }}
                      onClick={() => openPhoto(photo)}
                    >
                      <div className="event-photo-image">
                        <img src={photo.image} alt={photo.title} />

                        <span className="event-photo-count">
                          0{index + 1}
                        </span>

                        <span className="event-photo-action">
                          VIEW PHOTO <ArrowUpRight size={14} />
                        </span>
                      </div>

                      <div className="event-photo-caption">
                        <span>{photo.category}</span>
                        <h3>{photo.title}</h3>
                        <p>{photo.caption}</p>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>

                {/* EVENT VIDEOS */}

                <div className="event-subheading event-video-heading">
                  <span>02 / VIDEOGRAPHY</span>
                  <span>STORIES IN MOTION</span>
                </div>

                <motion.div
                  className="event-video-grid"
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  {event.videos.map((video, index) => (
                    <motion.article
                      className="event-video-card"
                      key={`${event.slug}-video-${index}`}
                      variants={cardReveal}
                      whileHover={{ y: -6 }}
                      onClick={() => openVideo(video)}
                    >
                      <div className="event-video-cover">
                        <img src={video.cover} alt={video.title} />

                        <span className="event-video-play">
                          <Play size={17} fill="currentColor" />
                        </span>

                        <span className="event-video-count">
                          FILM 0{index + 1}
                        </span>
                      </div>

                      <div className="event-video-caption">
                        <span>{video.category}</span>
                        <h3>{video.title}</h3>
                        <p>{video.caption}</p>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>

              </motion.section>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ==================================
          BEST PHOTOGRAPHS
      ================================== */}

      <section className="best-photos-section">

        <motion.div
          className="best-section-heading"
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div>
            <span className="work-section-label">
              THE ART OF A SINGLE FRAME
            </span>

            <h2>
              Selected <em>Frames.</em>
            </h2>

            <p>
              A selection of our favourite photographs,
              chosen for the stories they tell.
            </p>
          </div>

          <Camera size={34} strokeWidth={1} />
        </motion.div>

        <motion.div
          className="best-photo-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {bestPhotographs.map((photo, index) => (
            <motion.article
              className="best-photo-card"
              key={photo.title}
              variants={cardReveal}
              whileHover={{ y: -8 }}
              onClick={() => openPhoto(photo)}
            >
              <div className="best-photo-image">
                <img src={photo.image} alt={photo.title} />
                <span>0{index + 1}</span>
                <div className="best-photo-overlay">
                  <ArrowUpRight size={23} />
                </div>
              </div>

              <div className="best-photo-info">
                <span>{photo.category}</span>
                <h3>{photo.title}</h3>
                <p>{photo.caption}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </section>

      {/* ==================================
          FEATURED VIDEOS
      ================================== */}

      <section className="best-videos-section">

        <motion.div
          className="best-section-heading best-video-heading"
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div>
            <span className="work-section-label">
              BEYOND THE STILL IMAGE
            </span>

            <h2>
              Stories in <em>Motion.</em>
            </h2>

            <p>
              Films and highlights that bring the spirit
              of Northern University to life.
            </p>
          </div>

          <Film size={34} strokeWidth={1} />
        </motion.div>

        <motion.div
          className="best-video-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {bestVideos.map((video, index) => (
            <motion.article
              className="best-video-card"
              key={video.title}
              variants={cardReveal}
              whileHover={{ y: -7 }}
              onClick={() => openVideo(video)}
            >
              <div className="best-video-cover">
                <img src={video.cover} alt={video.title} />

                <span className="best-video-play">
                  <Play size={18} fill="currentColor" />
                </span>

                <span className="best-video-index">
                  FEATURED FILM 0{index + 1}
                </span>
              </div>

              <div className="best-video-info">
                <span>{video.category}</span>
                <h3>{video.title}</h3>
                <p>{video.caption}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </section>

      {/* ==================================
          PHOTO / VIDEO LIGHTBOX
      ================================== */}

      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            className="work-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
          >
            <button
              className="work-lightbox-close"
              onClick={() => setSelectedMedia(null)}
              aria-label="Close media viewer"
            >
              <X size={24} />
            </button>

            <motion.div
              className="work-lightbox-content"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.35 }}
              onClick={(event) => event.stopPropagation()}
            >
              {selectedMedia.type === "video" ? (
                <video
                  src={selectedMedia.video}
                  controls
                  autoPlay
                />
              ) : (
                <img
                  src={selectedMedia.image}
                  alt={selectedMedia.title}
                />
              )}

              <div className="work-lightbox-caption">
                <span>{selectedMedia.category}</span>
                <h3>{selectedMedia.title}</h3>
                <p>{selectedMedia.caption}</p>
                {selectedMedia.year && (
                  <small>{selectedMedia.year}</small>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================================
          CLOSING SECTION
      ================================== */}

      <motion.section
        className="work-closing"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span>NU MEDIA — NORTHERN UNIVERSITY</span>

        <h2>
          Every frame.
          <br />
          <em>A story worth telling.</em>
        </h2>

        <p>
          We capture moments. We preserve stories.
        </p>

        <a href="#work-events">
          EXPLORE THE COLLECTION
          <ArrowUpRight size={16} />
        </a>
      </motion.section>

    </main>
  );
}

export default Work;
