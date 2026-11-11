
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowUpRight, CalendarDays, Camera, Play, ShieldCheck, Trash2, Upload, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import "./Events.css";

import gathering from "../assets/img/NU Clips/campuscelebrations.jpeg";
import ceremony from "../assets/img/NU Clips/university.jpeg";
import academic from "../assets/img/NU Clips/academicgathering.jpeg";
import culture from "../assets/img/NU Clips/ideas&exchange.jpeg";
import meeting from "../assets/img/NU Clips/officialmeeting.jpeg";
import campus from "../assets/img/NU Clips/campuspic.jpg";
import celebration from "../assets/img/NU Clips/WhatsApp Image 2026-10-16 at 8.12.03 AM.jpeg";
import students from "../assets/img/NU Clips/WhatsApp Image 2026-10-16 at 8.12.05 AM.jpeg";

const pcufFiles = import.meta.glob("../assets/img/PCUF/*", { eager: true, query: "?url", import: "default" });
const pcufEntries = Object.entries(pcufFiles).sort(([firstPath], [secondPath]) =>
  firstPath.localeCompare(secondPath, undefined, { numeric: true })
);

const pcufMedia = pcufEntries
  .filter(([path]) => /\.(jpe?g|png|webp|avif)$/i.test(path))
  .map(([, url], index) => ({
    id: `pcuf-photo-${index + 1}`,
    kind: "unofficial",
    type: "photo",
    title: "PCUF Forum",
    category: "PCUF Events",
    date: "27 FEB 2026",
    image: url,
    size: index % 4 === 0 ? "wide" : "standard",
  }))
  .concat(pcufEntries
    .filter(([path]) => /\.mov$/i.test(path))
    .map(([, url], index) => ({
      id: `pcuf-video-${index + 1}`,
      kind: "unofficial",
      type: "video",
      title: "PCUF Forum",
      category: "PCUF Events",
      date: "27 FEB 2026",
      image: culture,
      video: url,
      size: "tall",
    })));

const gallery = [
  { id: 1, kind: "official", type: "photo", title: "Programming Society Showcase", category: "Programming Society", date: "16 MAY 2026", image: ceremony, size: "tall" },
  { id: 2, kind: "official", type: "photo", title: "Code & Innovation Week", category: "Programming Society", date: "22 APR 2026", image: gathering, size: "wide" },
  { id: 3, kind: "unofficial", type: "photo", title: "Cultural Day", category: "Cultural Day", date: "08 MAR 2026", image: academic, size: "standard" },
  { id: 5, kind: "official", type: "photo", title: "Database Society Seminar", category: "Database Society", date: "19 FEB 2026", image: meeting, size: "wide" },
  { id: 6, kind: "unofficial", type: "photo", title: "Sports Gala", category: "Sports", date: "12 FEB 2026", image: campus, size: "standard" },
  { id: 7, kind: "unofficial", type: "video", title: "Campus Games", category: "Games", date: "30 JAN 2026", image: students, size: "tall", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
  { id: 8, kind: "official", type: "photo", title: "Media Society Exhibition", category: "Media Society", date: "18 JAN 2026", image: celebration, size: "standard" },
  ...pcufMedia,
];

const reveal = { hidden: { opacity: 0, y: 42 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.2, 0.8, 0.2, 1] } } };

export default function Events() {
  const { kind: routeKind, slug: routeSlug } = useParams();
  const [items, setItems] = useState(gallery);
  const [selected, setSelected] = useState(null);
  const [officialCategory, setOfficialCategory] = useState("All Official Events");
  const [unofficialCategory, setUnofficialCategory] = useState("All Community Events");
  const allOfficial = items.filter((item) => item.kind === "official");
  const allUnofficial = items.filter((item) => item.kind === "unofficial");
  const officialItems = officialCategory === "All Official Events" ? allOfficial : allOfficial.filter((item) => item.category === officialCategory || item.title === officialCategory);
  const unofficialItems = unofficialCategory === "All Community Events" ? allUnofficial : allUnofficial.filter((item) => item.category === unofficialCategory || item.title === unofficialCategory);

  const openEventCategory = (category, kind) => {
    if (kind === "official") setOfficialCategory(category);
    else setUnofficialCategory(category);
    document.getElementById(kind === "official" ? "official-events" : "unofficial-events")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const officialCategories = [
    { name: "PCUF(International Conference of Artificial", description: "Coding, innovation and technology showcases" },
    { name: "ICAMI ", description: "Data engineering, seminars and practical sessions" },
    { name: "ACADEMIC COUNCIL", description: "Film, photography and university storytelling" },
    { name: "STUDENT WEEK", description: "Research, learning and academic activities" },
    { name: "MOU", description: "Global university partnerships and international collaboration" },
  ];
  const unofficialCategories = [
    { name: "Cultural Day", description: "Traditions, performances and student creativity" },
    { name: "Sports", description: "Matches, tournaments and sports achievements" },
    { name: "Games", description: "Campus competitions and recreational activities" },
    { name: "PCUF Events", description: "Student festivals and community celebrations" },
  ];

  const uploadFiles = (event, kind) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    const newItems = files.map((file, index) => {
      const isVideo = file.type.startsWith("video/");
      const url = URL.createObjectURL(file);
      const cleanName = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
      const selectedFolder = kind === "official" ? officialCategory : unofficialCategory;
      const folderItem = gallery.find((item) => item.kind === kind && item.title === selectedFolder);
      const eventTitle = folderItem?.title || cleanName || `New ${kind} event`;
      return {
        id: `upload-${Date.now()}-${index}`,
        kind,
        type: isVideo ? "video" : "photo",
        title: eventTitle,
        category: folderItem?.category || (kind === "official" ? "Official University Event" : "Community & Student Event"),
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase(),
        image: isVideo ? undefined : url,
        video: isVideo ? url : undefined,
        size: index % 3 === 0 ? "wide" : "standard",
        uploaded: true,
      };
    });
    setItems((current) => [...newItems, ...current]);
    event.target.value = "";
  };

  const deleteItem = (id, title) => {
    if (window.confirm(`Remove “${title}” from this archive?`)) {
      setItems((current) => current.filter((item) => item.id !== id));
    }
  };

  const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const eventCategories = [...officialCategories, ...unofficialCategories];
  const eventFolder = items.find((item) => item.kind === routeKind && slugify(item.title) === routeSlug);
  const detailCategory = eventCategories.find((category) => slugify(category.name) === routeSlug);
  const detailItems = eventFolder
    ? items.filter((item) => item.kind === routeKind && item.title === eventFolder.title)
    : detailCategory
      ? items.filter((item) => item.kind === routeKind && item.category === detailCategory.name)
      : [];
  const detailCover = detailItems.find((item) => item.image)?.image || null;
  const detailName = eventFolder?.title || detailCategory?.name || "Event archive";
  const detailDescription = detailCategory?.description || "Photos and videos collected in this individual event archive.";

  useEffect(() => {
    if (!selected) return undefined;
    const closeOnEscape = (event) => event.key === "Escape" && setSelected(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selected]);

  if (routeSlug) {
    return (
      <main className="nu-events event-detail-page">
        <section className={`event-detail-hero ${detailCover ? "has-cover" : ""}`}>
          <Link className="event-detail-back" to="/events"><ArrowLeft size={16} /> Back to event archive</Link>
          <div className="event-detail-copy">
            <span className="events-section-label">{routeKind === "official" ? "OFFICIAL UNIVERSITY SOCIETY" : "COMMUNITY EVENT ARCHIVE"}</span>
            <h1>{detailName}</h1>
            <p>{detailDescription}</p>
          </div>
          {detailCover && (
            <motion.div className="event-detail-cover" initial={{ opacity: 0, x: 45 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .85 }}>
              <img src={detailCover} alt={`${detailCategory?.name || "Event"} cover`} />
              <span>FEATURED MOMENT · NU MEDIA ARCHIVE</span>
            </motion.div>
          )}
        </section>
        <section className="event-detail-gallery">
          <div className="event-detail-heading"><span>{detailItems.length} media {detailItems.length === 1 ? "item" : "items"}</span><h2>Captured moments</h2></div>
          {detailItems.length ? (
            <div className="events-grid event-detail-grid">
              {detailItems.map((item, index) => (
                <motion.article key={item.id} className={`events-card ${item.size}`} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: (index % 3) * .08 }}>
                  <button className="events-card-open" onClick={() => setSelected(item)}>
                    {item.image ? <img src={item.image} alt={item.caption || item.title} /> : <div className="events-video-placeholder"><Play size={34} /></div>}
                    {item.type === "video" && <span className="events-play"><Play fill="currentColor" size={22} /></span>}
                    <span className="events-card-shade" />
                    <span className="events-card-meta"><small>{item.date}</small><strong>{item.caption || item.title}</strong></span>
                  </button>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="event-detail-empty"><Camera size={28} /><h3>No media added yet</h3><p>Upload photos or videos to this category from the main event archive.</p></div>
          )}
        </section>
        <AnimatePresence>{selected && (
          <motion.div className="events-modal" role="dialog" aria-modal="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
            <motion.div className="events-modal-panel" initial={{ scale: .94, y: 25 }} animate={{ scale: 1, y: 0 }}>
              <button className="events-modal-close" onClick={() => setSelected(null)}><X size={24} /><span>Close</span></button>
              {selected.type === "video" ? <video src={selected.video} poster={selected.image} controls autoPlay /> : <img src={selected.image} alt={selected.title} />}
              <div className="events-modal-caption"><span>{selected.category}</span><h3>{selected.caption || selected.title}</h3><small>{selected.date}</small></div>
            </motion.div>
          </motion.div>
        )}</AnimatePresence>
      </main>
    );
  }

  return (
    <main className="nu-events">
      <section className="events-hero">
        <div className="events-hero-top">
          <span>NORTHERN UNIVERSITY · OFFICE OF MEDIA & COMMUNICATIONS</span><span>OFFICIAL EVENTS ARCHIVE</span>
        </div>
        <div className="events-hero-content">
          <motion.div className="events-hero-copy" initial="hidden" animate="visible" variants={reveal}>
            <div className="events-eyebrow"><ShieldCheck size={16} /><span>OFFICIAL NORTHERN UNIVERSITY PORTAL</span></div>
            <h1>Events at<br /><em>Northern University.</em></h1>
            <p>The official archive of university ceremonies, academic milestones, campus gatherings and approved media from the Northern University community.</p>
            <div className="events-hero-actions">
              <a href="#official-events" className="events-explore">VIEW OFFICIAL EVENTS <ArrowUpRight size={17} /></a>
              <span className="events-hero-note"><Camera size={15} /> UNIVERSITY MEDIA ARCHIVE</span>
            </div>
          </motion.div>

          <motion.div className="events-hero-design" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.15 }}>
            <div className="events-design-grid" />
            <motion.div className="events-design-year" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .65 }}><span>NORTHERN UNIVERSITY</span><b>EST. 2026</b></motion.div>
            <motion.div className="events-design-ring" initial={{ opacity: 0, scale: .4, rotate: -20 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: .45, duration: .8, type: "spring" }}>
              <span className="events-ring-star">✦</span><strong>NU</strong><small>MEDIA</small>
            </motion.div>
            <motion.div className="events-design-copy" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .75, duration: .7 }}>
              <span>OFFICIAL EVENTS & MEDIA</span>
              <strong>University Life,<br /><em>Preserved.</em></strong>
            </motion.div>
            <motion.div className="events-design-stat events-design-stat-one" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}><b>04</b><span>EVENT<br />ARCHIVES</span></motion.div>
            <motion.div className="events-design-stat events-design-stat-two" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.12 }}><b>01</b><span>UNIVERSITY<br />PORTAL</span></motion.div>
            <motion.div className="events-design-index" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .85 }}><b>2026</b><span /><small>MEDIA ARCHIVE</small></motion.div>
          </motion.div>
        </div>
        <div className="events-hero-bottom">
          <div><CalendarDays size={16} /><span>A COLLECTION OF UNIVERSITY MOMENTS</span></div>
          <a href="#event-collections">SCROLL TO DISCOVER <ArrowDown size={16} /></a>
        </div>
      </section>

      <motion.section className="events-collection-intro" id="event-collections" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={reveal}>
        <span className="events-section-label">UNIVERSITY MEDIA ARCHIVE</span>
        <h2>Documenting our <em>university story.</em></h2>
        <p>Official university records are verified by the Media & Communications Office. Community submissions are kept separately and clearly identified.</p>
        <div className="event-directory">
          <motion.article className="event-directory-card official-directory-card" initial={{ opacity: 0, y: 55, rotateX: -8 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .75, ease: [0.2, 0.8, 0.2, 1] }} whileHover={{ y: -10 }}>
            <div className="event-directory-header"><span><ShieldCheck size={16} /> OFFICIAL ARCHIVE</span><b>01</b></div>
            <h3>Official Events</h3>
            <p>Institutionally approved university ceremonies and gatherings.</p>
            <div className="event-directory-links">
              {officialCategories.map((category) => <Link key={category.name} to={category.name === "MOU" ? "/mou" : `/events/official/${slugify(category.name)}`}><span><b>{category.name}</b><small>{category.description}</small></span><ArrowUpRight size={15} /></Link>) }
            </div>
            <button className="event-directory-all" onClick={() => openEventCategory("All Official Events", "official")}>View all official events <ArrowUpRight size={17} /></button>
          </motion.article>

          <motion.article className="event-directory-card unofficial-directory-card" initial={{ opacity: 0, y: 55, rotateX: -8 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .75, delay: .12, ease: [0.2, 0.8, 0.2, 1] }} whileHover={{ y: -10 }}>
            <div className="event-directory-header"><span>COMMUNITY ARCHIVE</span><b>02</b></div>
            <h3>Unofficial Events</h3>
            <p>Student-led activities, celebrations and campus community moments.</p>
            <div className="event-directory-links">
              {unofficialCategories.map((category) => <Link key={category.name} to={`/events/unofficial/${slugify(category.name)}`}><span><b>{category.name}</b><small>{category.description}</small></span><ArrowUpRight size={15} /></Link>) }
            </div>
            <button className="event-directory-all" onClick={() => openEventCategory("All Community Events", "unofficial")}>View all community events <ArrowUpRight size={17} /></button>
          </motion.article>
        </div>
      </motion.section>

      <motion.section className="event-folder-section" aria-label="Individual event folders">
        <div className="event-folder-heading">
          <div><span className="events-section-label">INDIVIDUAL EVENT ARCHIVES</span><h2>Choose an <em>event folder.</em></h2></div>
          <p>Each folder contains only the photos and videos recorded for that specific university event.</p>
        </div>
        <div className="event-folder-grid">
          {[{ kind: "official", label: "Official", items: [...new Map(items.filter((item) => item.kind === "official").map((item) => [item.title, item])).values()] }, { kind: "unofficial", label: "Unofficial", items: [...new Map(items.filter((item) => item.kind === "unofficial").map((item) => [item.title, item])).values()] }].map((group) => (
            <div className={`event-folder-group event-folder-${group.kind}`} key={group.kind}>
              <div className="event-folder-group-title"><span>{group.label}</span><b>{String(group.items.length).padStart(2, "0")}</b></div>
              {group.items.map((folder) => {
                const mediaCount = items.filter((item) => item.kind === group.kind && item.title === folder.title).length;
                const cover = items.find((item) => item.kind === group.kind && item.title === folder.title && item.image)?.image;
                return (
                  <Link className="event-folder-card" key={folder.id} to={`/events/${group.kind}/${slugify(folder.title)}`}>
                    <div className="event-folder-cover">{cover && <img src={cover} alt={folder.title} />}<span>{String(mediaCount).padStart(2, "0")}</span></div>
                    <div className="event-folder-copy"><small>{folder.category}</small><strong>{folder.title}</strong><span>{mediaCount} media {mediaCount === 1 ? "item" : "items"}</span></div>
                    <ArrowUpRight size={18} />
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </motion.section>

      <section className="events-gallery-section official-events-section" id="official-events">
        <motion.div className="events-gallery-heading" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
          <div>
            <span className="events-section-label">VERIFIED UNIVERSITY CONTENT</span>
            <h2>Official <em>events.</em></h2>
            <div className="official-status"><ShieldCheck size={18} /> {officialCategory}</div>
          </div>
          <label className="events-upload-button" title="Add official archive media">
            <Upload size={14} /> <span>Add media</span>
            <input type="file" accept="image/*,video/*" multiple onChange={(event) => uploadFiles(event, "official")} />
          </label>
        </motion.div>

        <motion.div className="events-grid" layout>
          <AnimatePresence mode="popLayout">
            {officialItems.map((item, index) => (
              <motion.article layout key={item.id} className={`events-card ${item.size}`} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}>
                <button className="events-card-open" onClick={() => setSelected(item)} aria-label={`Open ${item.title}`}>
                  {item.image ? <img src={item.image} alt={item.title} /> : <div className="events-video-placeholder"><Play size={34} /></div>}
                  {item.type === "video" && <span className="events-play"><Play fill="currentColor" size={22} /></span>}
                  {item.kind === "official" && <span className="official-card-badge"><ShieldCheck size={13} /> VERIFIED OFFICIAL</span>}
                  <span className="events-card-shade" />
                  <span className="events-card-meta"><small>{item.category}{item.date ? ` · ${item.date}` : ""}</small><strong>{item.caption || item.title}</strong></span>
                  <span className="events-card-arrow"><ArrowUpRight size={19} /></span>
                </button>
                <button className="events-delete-button" onClick={() => deleteItem(item.id, item.title)} aria-label={`Remove ${item.title}`} title="Remove media"><Trash2 size={15} /></button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="events-gallery-section unofficial-events-section" id="unofficial-events">
        <motion.div className="events-gallery-heading" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
          <div>
            <span className="events-section-label">COMMUNITY ARCHIVE</span>
            <h2>Unofficial <em>events.</em></h2>
            <p className="unofficial-note">Showing: {unofficialCategory}. Community activities are not presented as official university announcements.</p>
          </div>
          <label className="events-upload-button" title="Add community archive media">
            <Upload size={14} /> <span>Add media</span>
            <input type="file" accept="image/*,video/*" multiple onChange={(event) => uploadFiles(event, "unofficial")} />
          </label>
        </motion.div>

        <motion.div className="events-grid" layout>
          <AnimatePresence mode="popLayout">
            {unofficialItems.map((item, index) => (
              <motion.article layout key={item.id} className={`events-card ${item.size}`} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}>
                <button className="events-card-open" onClick={() => setSelected(item)} aria-label={`Open ${item.title}`}>
                  {item.image ? <img src={item.image} alt={item.title} /> : <div className="events-video-placeholder"><Play size={34} /></div>}
                  {item.type === "video" && <span className="events-play"><Play fill="currentColor" size={22} /></span>}
                  <span className="events-card-shade" />
                  <span className="events-card-meta"><small>{item.category} · {item.date}</small><strong>{item.title}</strong></span>
                  <span className="events-card-arrow"><ArrowUpRight size={19} /></span>
                </button>
                <button className="events-delete-button" onClick={() => deleteItem(item.id, item.title)} aria-label={`Remove ${item.title}`} title="Remove media"><Trash2 size={15} /></button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div className="events-modal" role="dialog" aria-modal="true" aria-label={selected.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
            <motion.div className="events-modal-panel" initial={{ opacity: 0, scale: 0.94, y: 25 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }}>
              <button className="events-modal-close" onClick={() => setSelected(null)} aria-label="Close and return to events"><X size={24} /><span>Close</span></button>
              {selected.type === "video" ? <video src={selected.video} poster={selected.image} controls autoPlay /> : <img src={selected.image} alt={selected.title} />}
              <div className="events-modal-caption"><span>{selected.category}</span><h3>{selected.caption || selected.title}</h3><small>{selected.date}</small></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
