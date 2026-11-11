
import { useMemo, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronDown,
  Clapperboard,
  Clock3,
  FileText,
  Image as ImageIcon,
  Plus,
  Search,
  Sparkles,
  Tag,
  Upload,
  Video,
  X,
} from "lucide-react";
import "./DailyBlogs.css";

const initialStories = [
  {
    id: 1,
    title: "The campus, after the rush",
    excerpt:
      "Quiet corners, late afternoon light, and the little moments that make university feel like home.",
    category: "Campus Life",
    author: "The Editorial Desk",
    date: "October 12, 2026",
    readTime: "4 min read",
    type: "image",
    media:
      "src/assets/img/NU Clips/dssd.png",
    featured: true,
    tags: ["Campus", "Culture"],
  },
  {
    id: 2,
    title: "A day through our lens",
    excerpt:
      "From first light to the final frame, discover the people and places behind our university stories.",
    category: "Behind the Scenes",
    author: "ReelHub Visuals",
    date: "October 10, 2026",
    readTime: "2 min watch",
    type: "video",
    media:
      "https://videos.pexels.com/video-files/3209298/3209298-hd_1920_1080_25fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85",
    tags: ["Video", "Creative"],
  },
  {
    id: 3,
    title: "Ideas don't stay in notebooks",
    excerpt:
      "Meet the students turning small ideas into creative projects, collaborations, and new possibilities.",
    category: "Student Stories",
    author: "Ayesha Malik",
    date: "October 08, 2026",
    readTime: "5 min read",
    type: "image",
    media:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=85",
    tags: ["Students", "Ideas"],
  },
  {
    id: 4,
    title: "The art of the everyday",
    excerpt:
      "A short visual journal of ordinary university moments worth remembering.",
    category: "Films & Reels",
    author: "ReelHub Studio",
    date: "October 06, 2026",
    readTime: "1 min watch",
    type: "video",
    media:
      "https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=85",
    tags: ["Film", "Moments"],
  },
  {
    id: 5,
    title: "More than a lecture hall",
    excerpt:
      "Friendships, fresh perspectives, and the experiences that happen between classes.",
    category: "Campus Life",
    author: "The Editorial Desk",
    date: "October 03, 2026",
    readTime: "3 min read",
    type: "image",
    media:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1000&q=85",
    tags: ["University", "Life"],
  },
  {
    id: 6,
    title: "Behind every frame",
    excerpt:
      "A glimpse into the process of capturing a story, from the first idea to the final edit.",
    category: "Behind the Scenes",
    author: "ReelHub Visuals",
    date: "September 29, 2026",
    readTime: "2 min watch",
    type: "video",
    media:
      "https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_25fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1000&q=85",
    tags: ["Production", "Video"],
  },
];

const categories = [
  "All Stories",
  "University News",
  "Education",
  "Campus Life",
  "Student Stories",
  "Events",
  "Sports",
  "Culture",
  "Behind the Scenes",
  "Films & Reels",
  "Ideas & Opinions",
  "Announcements",
];

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  category: "Campus Life",
  author: "",
  publishDate: "",
  readTime: "",
  tags: "",
  type: "image",
};

function formatDate() {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(new Date());
}

function MediaView({ story, className = "" }) {
  if (story.type === "video") {
    return (
      <div className={`db-media ${className}`}>
        <video
          src={story.media}
          poster={story.poster || undefined}
          muted
          loop
          playsInline
          preload="metadata"
          controls
        />
        <span className="db-media-badge">
          <Video size={13} /> FILM
        </span>
      </div>
    );
  }

  return (
    <div className={`db-media ${className}`}>
      <img src={story.media} alt={story.title} loading="lazy" />
      <span className="db-media-badge">
        <ImageIcon size={13} /> PHOTO
      </span>
    </div>
  );
}

export default function DailyBlogs() {
  const [stories, setStories] = useState(initialStories);
  const [category, setCategory] = useState("All Stories");
  const [search, setSearch] = useState("");
  const [showComposer, setShowComposer] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [extraFiles, setExtraFiles] = useState([]);
  const [extraPreviews, setExtraPreviews] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [notice, setNotice] = useState("");
  const [savedStories, setSavedStories] = useState([]);
  const coverInputRef = useRef(null);
  const extraInputRef = useRef(null);

  const featuredStory = stories.find((story) => story.featured) || stories[0];

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchesCategory =
        category === "All Stories" || story.category === category;

      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        `${story.title} ${story.excerpt} ${story.category} ${story.author} ${story.tags.join(" ")}`
          .toLowerCase()
          .includes(query);

      return (
        matchesCategory &&
        matchesSearch &&
        story.id !== featuredStory?.id
      );
    });
  }, [stories, category, search, featuredStory]);

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleCoverChange(event) {
    const file = Array.from(event.target.files || []).find(
      (item) => item.type.startsWith("image/") || item.type.startsWith("video/")
    );
    if (!file) return;
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
    updateForm("type", file.type.startsWith("video/") ? "video" : "image");
  }

  function handleExtraImages(event) {
    const files = Array.from(event.target.files || []).filter((file) => file.type.startsWith("image/"));
    extraPreviews.forEach((url) => URL.revokeObjectURL(url));
    setExtraFiles(files);
    setExtraPreviews(files.map((file) => URL.createObjectURL(file)));
  }

  function removeExtraImage(index) {
    URL.revokeObjectURL(extraPreviews[index]);
    setExtraFiles((current) => current.filter((_, itemIndex) => itemIndex !== index));
    setExtraPreviews((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  function publishStory(event) {
    event.preventDefault();

    if (!form.title.trim() || !form.excerpt.trim() || !form.content.trim()) {
      setNotice("Please add a title, short description, and full article.");
      return;
    }

    if (!coverFile) {
      setNotice("Please upload a cover image or video.");
      return;
    }

    const publishedDate = form.publishDate
      ? new Intl.DateTimeFormat("en", { month: "long", day: "2-digit", year: "numeric" })
        .format(new Date(`${form.publishDate}T12:00:00`))
      : formatDate();

    const newStory = {
      id: Date.now(),
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      category: form.category,
      author: form.author.trim() || "ReelHub Contributor",
      date: publishedDate,
      readTime: form.readTime.trim() || "3 min read",
      type: coverFile.type.startsWith("video/") ? "video" : "image",
      media: coverPreview,
      extraImages: extraPreviews,
      featured: false,
      tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      localFile: true,
    };

    setStories((current) => [newStory, ...current]);
    setCategory("All Stories");
    setSearch("");
    setForm(emptyForm);
    setCoverFile(null);
    setCoverPreview("");
    setExtraFiles([]);
    setExtraPreviews([]);
    setShowComposer(false);
    setNotice("Your story has been added to this browser session.");

    if (coverInputRef.current) coverInputRef.current.value = "";
    if (extraInputRef.current) extraInputRef.current.value = "";
    window.setTimeout(() => setNotice(""), 4500);
  }

  function toggleSaved(id) {
    setSavedStories((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id]
    );
  }

  return (
    <main className="daily-blogs">
      {/* CINEMATIC HERO */}
      <section className="db-hero">
        <video
          className="db-hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster=""
        >
          <source
            src="https://videos.pexels.com/video-files/3209298/3209298-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>

        <div className="db-hero-overlay" />

        <div className="db-hero-top">
          <span className="db-eyebrow">
            <span className="db-live-dot" />
            THE REELHUB JOURNAL
          </span>
          <span className="db-hero-edition">CAMPUS CULTURE · VOL. 01</span>
        </div>

        <div className="db-hero-copy">
          <p className="db-kicker">A WINDOW INTO OUR WORLD</p>
          <h1>
            Every day
            <br />
            has a <em>story.</em>
          </h1>
          <p className="db-hero-description">
            Campus voices, creative minds, and the moments that deserve
            more than a passing glance.
          </p>
          <a href="#db-stories" className="db-hero-link">
            EXPLORE THE JOURNAL <ArrowDownRight size={18} />
          </a>
        </div>

        <div className="db-hero-bottom">
          <span>PEOPLE. PLACES. PERSPECTIVES.</span>
          <span>SCROLL TO DISCOVER ↓</span>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="db-intro">
        <div className="db-intro-left">
          <span className="db-section-label">01 / THE JOURNAL</span>
          <h2>
            More than news.
            <br />
            <span>A living archive.</span>
          </h2>
        </div>

        <div className="db-intro-right">
          <p>
            A place for the ideas we exchange, the people we meet, and the
            experiences that shape our university. Written, filmed, and
            photographed by our community.
          </p>
          <div className="db-intro-signature">
            <span className="db-signature-line" />
            THE REELHUB EDITORIAL TEAM
          </div>
        </div>
      </section>

      {/* EDITORIAL SECTIONS */}
      <section className="db-editorial-sections" aria-label="Blog sections">
        <div className="db-editorial-heading">
          <span className="db-section-label">02 / NEWSROOM DESK</span>
          <h2>Explore our university journal.</h2>
        </div>
        <div className="db-section-grid">
          {[
            ["University News", "Official university updates and campus announcements."],
            ["Education", "Academic programmes, research and learning stories."],
            ["Campus Life", "Daily moments and experiences across campus."],
            ["Events", "Ceremonies, conferences, festivals and celebrations."],
            ["Sports", "Matches, achievements and student athletes."],
            ["Culture", "Arts, societies, heritage and creative voices."],
          ].map(([name, description], index) => (
            <button
              className={`db-section-card ${category === name ? "active" : ""}`}
              type="button"
              key={name}
              onClick={() => {
                setCategory(name);
                document.getElementById("db-stories")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>0{index + 1}</span>
              <div>
                <strong>{name}</strong>
                <p>{description}</p>
              </div>
              <ArrowUpRight size={18} />
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED STORY */}
      {featuredStory && (
        <section className="db-featured">
          <div className="db-section-heading">
            <div>
              <span className="db-section-label">02 / EDITOR'S PICK</span>
              <h2>Worth your attention.</h2>
            </div>
            <span className="db-heading-side">SELECTED STORIES</span>
          </div>

          <article className="db-featured-card">
            <button
              type="button"
              className="db-featured-media-button"
              onClick={() => setSelectedStory(featuredStory)}
              aria-label={`Open ${featuredStory.title}`}
            >
              <MediaView story={featuredStory} className="db-featured-media" />
              <span className="db-image-index">RH / 001</span>
              <span className="db-image-open">
                <ArrowUpRight size={23} />
              </span>
            </button>

            <div className="db-featured-copy">
              <div className="db-meta-row">
                <span className="db-category">{featuredStory.category}</span>
                <span>{featuredStory.date}</span>
              </div>

              <h3>{featuredStory.title}</h3>
              <p>{featuredStory.excerpt}</p>

              <div className="db-featured-author">
                <span className="db-author-avatar">RH</span>
                <div>
                  <strong>{featuredStory.author}</strong>
                  <span>{featuredStory.readTime}</span>
                </div>
              </div>

              <button
                className="db-text-link"
                onClick={() => setSelectedStory(featuredStory)}
              >
                READ THE STORY <ArrowRight size={17} />
              </button>
            </div>
          </article>
        </section>
      )}

      {/* STORY COLLECTION */}
      <section className="db-stories" id="db-stories">
        <div className="db-section-heading db-stories-heading">
          <div>
            <span className="db-section-label">03 / THE COLLECTION</span>
            <h2>Stories from here.</h2>
            <p className="db-section-subtitle">
              Fresh perspectives, captured in our own words and frames.
            </p>
          </div>

          <button
            className="db-create-button"
            onClick={() => {
              setShowComposer(true);
              setNotice("");
            }}
          >
            <Plus size={18} /> PUBLISH DAILY BLOG
          </button>
        </div>

        <div className="db-toolbar">
          <div className="db-category-list">
            {categories.map((item) => (
              <button
                key={item}
                className={`db-filter ${category === item ? "active" : ""}`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <label className="db-search">
            <Search size={17} />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Find a story..."
              aria-label="Search stories"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </label>
        </div>

        <div className="db-result-line">
          <span>
            SHOWING <strong>{filteredStories.length}</strong> STORIES
          </span>
          <span>MADE WITHIN OUR COMMUNITY <Sparkles size={13} /></span>
        </div>

        {filteredStories.length > 0 ? (
          <div className="db-grid">
            {filteredStories.map((story, index) => (
              <article className="db-story-card" key={story.id}>
                <button
                  type="button"
                  className="db-story-image-button"
                  onClick={() => setSelectedStory(story)}
                  aria-label={`Read ${story.title}`}
                >
                  <MediaView story={story} />
                  <span className="db-card-number">
                    {String(index + 2).padStart(2, "0")}
                  </span>
                  <span className="db-card-arrow">
                    <ArrowUpRight size={20} />
                  </span>
                </button>

                <div className="db-story-content">
                  <div className="db-meta-row">
                    <span className="db-category">{story.category}</span>
                    <button
                      className={`db-save ${savedStories.includes(story.id) ? "is-saved" : ""}`}
                      onClick={() => toggleSaved(story.id)}
                      aria-label={
                        savedStories.includes(story.id)
                          ? "Remove saved story"
                          : "Save story"
                      }
                      title="Save story"
                    >
                      <Bookmark size={17} />
                    </button>
                  </div>

                  <button
                    className="db-story-title-button"
                    onClick={() => setSelectedStory(story)}
                  >
                    <h3>{story.title}</h3>
                  </button>

                  <p>{story.excerpt}</p>

                  {story.tags.length > 0 && (
                    <div className="db-tags">
                      {story.tags.slice(0, 3).map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                  )}

                  <div className="db-story-footer">
                    <span>{story.author}</span>
                    <span>
                      <Clock3 size={13} /> {story.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="db-empty">
            <Search size={30} />
            <h3>No stories found.</h3>
            <p>Try another category or search for something different.</p>
            <button
              className="db-text-link"
              onClick={() => {
                setCategory("All Stories");
                setSearch("");
              }}
            >
              CLEAR FILTERS <ArrowRight size={16} />
            </button>
          </div>
        )}
      </section>

      {/* CONTRIBUTOR INVITATION */}
      <section className="db-contribute">
        <div className="db-contribute-icon">
          <FileText size={25} />
        </div>
        <div className="db-contribute-copy">
          <span className="db-section-label">YOUR VOICE BELONGS HERE</span>
          <h2>Have something worth sharing?</h2>
          <p>
            A campus memory, a creative idea, an event, or a story only you
            can tell. Give it a place in the journal.
          </p>
        </div>
        <button
          className="db-contribute-button"
          onClick={() => {
            setShowComposer(true);
            setNotice("");
          }}
        >
          CONTRIBUTE <ArrowUpRight size={17} />
        </button>
        <span className="db-contribute-watermark">RH.</span>
      </section>

      {/* CREATE STORY PANEL */}
      {showComposer && (
        <div
          className="db-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowComposer(false);
            }
          }}
        >
          <section
            className="db-composer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="db-composer-title"
          >
            <div className="db-composer-header">
              <div>
                <span className="db-section-label">NORTHERN UNIVERSITY · OFFICIAL EDITORIAL DESK</span>
                <h2 id="db-composer-title">Publish a daily blog.</h2>
                <p>Add the article, cover photograph, publication details, and supporting images.</p>
              </div>
              <button
                className="db-close-button"
                onClick={() => setShowComposer(false)}
                aria-label="Close form"
              >
                <X size={22} />
              </button>
            </div>

            <form className="db-composer-form" onSubmit={publishStory}>
              <div className="db-form-grid">
                <label className="db-field db-field-full">
                  <span>STORY TITLE *</span>
                  <input
                    value={form.title}
                    onChange={(event) => updateForm("title", event.target.value)}
                    placeholder="Give your story a memorable title"
                    maxLength={100}
                    required
                  />
                </label>

                <label className="db-field db-field-full">
                  <span>DESCRIPTION / STORY INTRO *</span>
                  <textarea
                    value={form.excerpt}
                    onChange={(event) => updateForm("excerpt", event.target.value)}
                    placeholder="What is your story about? Give readers a reason to explore..."
                    rows={4}
                    maxLength={600}
                    required
                  />
                  <small>{form.excerpt.length}/600 characters</small>
                </label>

                <label className="db-field">
                  <span>CATEGORY</span>
                  <span className="db-select-wrap">
                    <select
                      value={form.category}
                      onChange={(event) =>
                        updateForm("category", event.target.value)
                      }
                    >
                      {categories
                        .filter((item) => item !== "All Stories")
                        .map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                    </select>
                    <ChevronDown size={16} />
                  </span>
                </label>

                <label className="db-field">
                  <span>YOUR NAME / BYLINE</span>
                  <input
                    value={form.author}
                    onChange={(event) => updateForm("author", event.target.value)}
                    placeholder="Your name or team"
                    maxLength={80}
                  />
                </label>

                <label className="db-field">
                  <span>PUBLISH DATE</span>
                  <input
                    type="date"
                    value={form.publishDate}
                    onChange={(event) => updateForm("publishDate", event.target.value)}
                  />
                </label>

                <label className="db-field">
                  <span>READ TIME</span>
                  <input
                    value={form.readTime}
                    onChange={(event) => updateForm("readTime", event.target.value)}
                    placeholder="e.g. 4 min read"
                    maxLength={30}
                  />
                </label>

                <label className="db-field db-field-full">
                  <span>
                    TAGS <small>(SEPARATE WITH COMMAS)</small>
                  </span>
                  <input
                    value={form.tags}
                    onChange={(event) => updateForm("tags", event.target.value)}
                    placeholder="Campus, Creativity, Student Life"
                  />
                </label>

                <label className="db-field db-field-full">
                  <span>FULL ARTICLE *</span>
                  <textarea
                    value={form.content}
                    onChange={(event) => updateForm("content", event.target.value)}
                    placeholder="Write the complete article here..."
                    rows={8}
                    required
                  />
                </label>
              </div>

              <div className="db-upload-heading">
                <div>
                  <span className="db-section-label">COVER IMAGE / MEDIA *</span>
                  <h3>Choose the main photograph.</h3>
                </div>
                <span>FEATURED VISUAL</span>
              </div>

              <input ref={coverInputRef} className="db-hidden-input" type="file" accept="image/*,video/*" onChange={handleCoverChange} />
              {!coverPreview ? (
                <button type="button" className="db-upload-zone" onClick={() => coverInputRef.current?.click()}>
                  <span className="db-upload-icon"><Upload size={23} /></span>
                  <strong>Upload cover image or video</strong>
                  <span>This photograph appears at the top of the story.</span>
                </button>
              ) : (
                <div className="db-cover-preview">
                  {coverFile?.type.startsWith("video/") ? <video src={coverPreview} controls muted /> : <img src={coverPreview} alt="Cover preview" />}
                  <button type="button" onClick={() => { URL.revokeObjectURL(coverPreview); setCoverPreview(""); setCoverFile(null); }} aria-label="Remove cover"><X size={16} /></button>
                </div>
              )}

              <div className="db-upload-heading db-extra-heading">
                <div>
                  <span className="db-section-label">EXTRA IMAGES</span>
                  <h3>Photographs within the article.</h3>
                </div>
                <span>OPTIONAL</span>
              </div>
              <input ref={extraInputRef} className="db-hidden-input" type="file" accept="image/*" multiple onChange={handleExtraImages} />
              <button type="button" className="db-upload-zone db-upload-zone-small" onClick={() => extraInputRef.current?.click()}>
                <span className="db-upload-icon"><ImageIcon size={20} /></span>
                <strong>Add article photographs</strong>
                <span>Select multiple images</span>
              </button>
              {extraPreviews.length > 0 && (
                <div className="db-preview-grid">
                  {extraPreviews.map((url, index) => (
                    <div className="db-preview-item" key={url}>
                      <img src={url} alt={`Article photograph ${index + 1}`} />
                      <button type="button" onClick={() => removeExtraImage(index)} aria-label="Remove photograph"><X size={14} /></button>
                    </div>
                  ))}
                </div>
              )}

              {notice && (
                <p className="db-form-notice" role="status">
                  {notice}
                </p>
              )}

              <div className="db-form-actions">
                <button
                  type="button"
                  className="db-cancel-button"
                  onClick={() => setShowComposer(false)}
                >
                  CANCEL
                </button>
                <button type="submit" className="db-publish-button">
                  <Check size={17} /> ADD TO JOURNAL
                </button>
              </div>

              <p className="db-privacy-note">
                DEMO MODE · Stories and selected files remain in this browser
                session. This form does not publish to a shared website.
              </p>
            </form>
          </section>
        </div>
      )}

      {/* STORY DETAIL / VIDEO VIEWER */}
      {selectedStory && (
        <div
          className="db-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedStory(null);
          }}
        >
          <article
            className="db-reader"
            role="dialog"
            aria-modal="true"
            aria-labelledby="db-reader-title"
          >
            <button
              className="db-close-button db-reader-close"
              onClick={() => setSelectedStory(null)}
              aria-label="Close story"
            >
              <X size={22} />
            </button>

            <div className="db-reader-media">
              {selectedStory.type === "video" ? (
                <video
                  src={selectedStory.media}
                  poster={selectedStory.poster || undefined}
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img src={selectedStory.media} alt={selectedStory.title} />
              )}
            </div>

            <div className="db-reader-content">
              <span className="db-category">{selectedStory.category}</span>
              <h2 id="db-reader-title">{selectedStory.title}</h2>
              <div className="db-reader-meta">
                <span>BY {selectedStory.author.toUpperCase()}</span>
                <span>{selectedStory.date}</span>
              </div>
              <p className="db-reader-deck">{selectedStory.excerpt}</p>
              <div className="db-article-content">
                {(selectedStory.content || selectedStory.excerpt)
                  .split(/\n+/)
                  .filter(Boolean)
                  .map((paragraph, index) => <p key={`${selectedStory.id}-${index}`}>{paragraph}</p>)}
              </div>

              {selectedStory.extraImages?.length > 0 && (
                <div className="db-reader-gallery">
                  {selectedStory.extraImages.map((image, index) => (
                    <img src={image} alt={`${selectedStory.title} photograph ${index + 1}`} key={image} />
                  ))}
                </div>
              )}

              {selectedStory.tags.length > 0 && (
                <div className="db-tags">
                  {selectedStory.tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
              )}

              <button
                className={`db-text-link ${savedStories.includes(selectedStory.id) ? "db-reader-saved" : ""}`}
                onClick={() => toggleSaved(selectedStory.id)}
              >
                <Bookmark size={16} />
                {savedStories.includes(selectedStory.id)
                  ? "SAVED TO YOUR LIST"
                  : "SAVE THIS STORY"}
              </button>

              {selectedStory.localFile && (
                <p className="db-local-note">
                  This media was selected from your device for this session.
                </p>
              )}
            </div>
          </article>
        </div>
      )}

      {/* FOOTER */}
      <footer className="db-footer">
        <div className="db-footer-brand">
          <span className="db-footer-mark">RH.</span>
          <div>
            <strong>THE REELHUB JOURNAL</strong>
            <span>A UNIVERSITY CULTURE PUBLICATION</span>
          </div>
        </div>
        <p>Made of moments. Told by us.</p>
        <a href="#db-stories">
          BACK TO THE STORIES <ArrowLeft size={15} />
        </a>
      </footer>

      {notice && !showComposer && (
        <div className="db-toast" role="status">
          <Check size={17} /> {notice}
          <button onClick={() => setNotice("")} aria-label="Dismiss">
            <X size={15} />
          </button>
        </div>
      )}
    </main>
  );
}
