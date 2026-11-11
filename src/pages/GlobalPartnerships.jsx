import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Globe2, Handshake, X } from "lucide-react";
import { readPartnershipGallery, readPartnerships } from "../data/globalPartnerships";
import { partnershipUniversities } from "../data/partnershipUniversities";
import { studentInspirationPhotos } from "../data/studentInspiration";
import "./GlobalPartnerships.css";

const collaborationAreas = [
  { title: "Academic Collaboration", text: "Sharing academic knowledge and institutional expertise.", mark: "01" },
  { title: "Research & Innovation", text: "Encouraging research collaboration and innovation.", mark: "02" },
  { title: "Global Exposure", text: "Building international academic connections and perspectives.", mark: "03" },
  { title: "Knowledge Exchange", text: "Promoting the exchange of ideas, experiences and expertise.", mark: "04" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.2, 0.8, 0.2, 1] } },
};

function countryFlag(code) {
  if (!/^[A-Z]{2}$/.test(code || "")) return "◎";
  return String.fromCodePoint(...[...code].map((letter) => letter.charCodeAt(0) + 127397));
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

function normalizeUniversityName(name) {
  return (name || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
}

function projectGlobeLocation(latitude, longitude) {
  const radians = Math.PI / 180;
  const centerLatitude = 20 * radians;
  const longitudeDifference = (longitude - 78) * radians;
  const latitudeRadians = latitude * radians;
  const radius = 246;
  return {
    x: 300 + radius * Math.cos(latitudeRadians) * Math.sin(longitudeDifference),
    y: 300 - radius * (
      Math.cos(centerLatitude) * Math.sin(latitudeRadians)
      - Math.sin(centerLatitude) * Math.cos(latitudeRadians) * Math.cos(longitudeDifference)
    ),
  };
}

function GlobeMarker({ university, selected, active, onSelect, onHover, onBlur }) {
  const [offsetX, offsetY] = university.markerOffset;
  const markerStyle = {
    left: `${((university.location.x + offsetX) / 600) * 100}%`,
    top: `${((university.location.y + offsetY) / 600) * 100}%`,
    "--marker-primary": university.brandColours[0],
    "--marker-accent": university.brandColours[1] || university.brandColours[0],
  };
  return (
    <button
      type="button"
      className={`mou-globe-marker${active ? " is-active" : ""}${university.isHome ? " is-home" : ""}`}
      style={markerStyle}
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onBlur}
      onFocus={onHover}
      onBlur={onBlur}
      aria-label={`${university.universityName}, ${university.city}, ${university.country}`}
      aria-pressed={selected}
      title={university.universityName}
    >
      <span>{university.markerLabel}</span>
    </button>
  );
}

function WorldMap({ partners, onSelectCountry, selectedUniversityId, onSelectUniversity, onSelectPartnership, reducedMotion }) {
  const positionedUniversities = useMemo(() => partnershipUniversities.map((university) => {
    const location = projectGlobeLocation(university.latitude, university.longitude);
    const aliases = new Set([university.universityName, ...university.aliases].map(normalizeUniversityName));
    const partnership = partners.find((partner) => aliases.has(normalizeUniversityName(partner.universityName)));
    return {
      ...university,
      location,
      partnership,
      displayLogo: partnership?.partnerUniversityLogo || university.logo,
      introduction: partnership?.description || university.shortIntroduction,
    };
  }), [partners]);
  const [hoveredUniversityId, setHoveredUniversityId] = useState("");
  const activeId = hoveredUniversityId || selectedUniversityId;
  const activeUniversity = positionedUniversities.find((university) => university.id === activeId);
  const home = positionedUniversities.find((university) => university.isHome);
  const activeLocation = activeUniversity?.location || home?.location || { x: 300, y: 300 };
  const cityConnections = [...new Map(
    positionedUniversities
      .filter((university) => !university.isHome)
      .map((university) => [`${university.city.toLowerCase()}-${university.country.toLowerCase()}`, university]),
  ).values()];

  useEffect(() => {
    if (!activeId) return undefined;
    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setHoveredUniversityId("");
        onSelectUniversity("");
        onSelectCountry("");
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activeId, onSelectCountry, onSelectUniversity]);

  function closeDetails() {
    setHoveredUniversityId("");
    onSelectUniversity("");
    onSelectCountry("");
  }

  return (
    <div className="mou-globe-frame">
      <div className="mou-globe-stage">
        <div
          className={`mou-globe-art${activeUniversity ? " is-zoomed" : ""}${reducedMotion ? " is-static" : ""}`}
          style={{
            "--focus-x": `${(activeLocation.x / 600) * 100}%`,
            "--focus-y": `${(activeLocation.y / 600) * 100}%`,
            "--globe-scale": activeUniversity && !reducedMotion ? 1.12 : 1,
          }}
        >
          <div className="mou-globe-orbit">
            <svg className="mou-globe-svg" viewBox="0 0 600 600" role="img" aria-label="Illustrative globe centered on Asia, with city-level university locations">
              <defs>
                <radialGradient id="mou-globe-ocean" cx="38%" cy="35%" r="70%">
                  <stop offset="0%" stopColor="#294555" />
                  <stop offset="68%" stopColor="#172a36" />
                  <stop offset="100%" stopColor="#0d171f" />
                </radialGradient>
                <linearGradient id="mou-globe-land" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ceb98c" stopOpacity=".84" />
                  <stop offset="100%" stopColor="#7f8e78" stopOpacity=".76" />
                </linearGradient>
                <radialGradient id="mou-globe-shade" cx="35%" cy="35%" r="75%">
                  <stop offset="55%" stopColor="#071016" stopOpacity="0" />
                  <stop offset="100%" stopColor="#061017" stopOpacity=".62" />
                </radialGradient>
                <clipPath id="mou-globe-clip"><circle cx="300" cy="300" r="246" /></clipPath>
              </defs>
              <circle className="mou-globe-halo" cx="300" cy="300" r="270" />
              <circle className="mou-globe-sphere" cx="300" cy="300" r="246" fill="url(#mou-globe-ocean)" />
              <g clipPath="url(#mou-globe-clip)">
                <g className="mou-globe-grid">
                  <ellipse cx="300" cy="300" rx="244" ry="76" />
                  <ellipse cx="300" cy="300" rx="244" ry="151" />
                  <ellipse cx="300" cy="300" rx="87" ry="244" />
                  <ellipse cx="300" cy="300" rx="164" ry="244" />
                  <path d="M56 300h488M300 56v488" />
                </g>
                <g className="mou-globe-continents" fill="url(#mou-globe-land)">
                  <path d="M88 188 101 172 106 151 123 143 136 125 153 126 163 143 180 141 190 153 207 150 220 161 238 160 248 171 269 170 283 181 304 178 319 190 343 189 356 202 375 201 389 212 409 211 421 223 439 225 452 238 468 240 476 254 492 260 500 277 516 284 519 300 510 309 493 305 482 316 465 312 450 323 432 319 422 332 404 328 393 339 378 333 367 321 348 321 335 308 319 309 307 294 289 297 277 284 261 287 250 274 233 277 220 263 203 265 190 250 174 253 163 237 148 236 139 221 123 220 113 205 98 204z" />
                  <path d="M211 264 227 267 241 280 255 283 262 298 275 307 282 321 276 336 268 351 260 370 250 384 242 400 229 408 224 394 215 383 211 368 202 357 203 340 194 328 197 312 188 300 193 285 202 276z" />
                  <path d="M278 282 297 279 313 285 326 297 331 311 328 328 321 343 316 360 307 377 300 396 289 390 284 373 276 358 276 342 268 327 273 312 267 299z" />
                  <path d="M236 258 251 254 267 258 279 269 276 284 263 291 249 286 238 276z" />
                  <path d="M330 342 344 341 353 349 358 362 369 369 374 381 388 387 399 400 414 404 425 418 438 422 444 436 434 444 421 437 408 433 400 421 385 420 375 410 362 407 354 395 343 391 336 379 325 374 320 362z" />
                  <path d="M410 378 430 373 449 379 465 390 479 402 491 416 487 430 474 435 461 428 447 427 437 417 424 411 415 399 403 392z" />
                  <path d="M425 252 437 248 447 254 451 264 445 274 436 270zM452 238 460 234 468 239 469 247 463 252 456 248z" />
                  <path d="M181 175 190 169 199 172 204 179 198 186 188 184zM128 238 138 235 146 240 145 248 137 251 130 247z" />
                </g>
                <ellipse className="mou-globe-spin" cx="300" cy="300" rx="244" ry="122" />
                <g className="mou-globe-routes">
                  {cityConnections.map((university) => {
                    const middleX = (home.location.x + university.location.x) / 2;
                    const middleY = (home.location.y + university.location.y) / 2 - 18;
                    return <path key={university.id} d={`M ${home.location.x} ${home.location.y} Q ${middleX} ${middleY} ${university.location.x} ${university.location.y}`} />;
                  })}
                </g>
                <g className="mou-globe-city-points">
                  {cityConnections.map((university) => (
                    <circle key={university.id} cx={university.location.x} cy={university.location.y} r="3" />
                  ))}
                  <circle cx={home.location.x} cy={home.location.y} r="4" />
                </g>
                <circle cx="300" cy="300" r="246" fill="url(#mou-globe-shade)" />
              </g>
              <circle className="mou-globe-outline" cx="300" cy="300" r="246" />
            </svg>
            <svg className="mou-globe-offsets" viewBox="0 0 600 600" aria-hidden="true">
              {positionedUniversities.filter(({ markerOffset }) => markerOffset[0] || markerOffset[1]).map((university) => (
                <line
                  key={university.id}
                  x1={university.location.x}
                  y1={university.location.y}
                  x2={university.location.x + university.markerOffset[0]}
                  y2={university.location.y + university.markerOffset[1]}
                />
              ))}
            </svg>
            {positionedUniversities.map((university) => (
              <GlobeMarker
                key={university.id}
                university={university}
                selected={selectedUniversityId === university.id}
                active={activeId === university.id}
                onSelect={() => {
                  const nextId = selectedUniversityId === university.id ? "" : university.id;
                  onSelectUniversity(nextId);
                  onSelectCountry(nextId ? university.country : "");
                }}
                onHover={() => setHoveredUniversityId(university.id)}
                onBlur={() => setHoveredUniversityId((current) => current === university.id ? "" : current)}
              />
            ))}
          </div>
        </div>
        <div className="mou-globe-caption"><span>{partnershipUniversities.length} institutions</span><span>City-level locations · offset clusters retain geographic anchors</span></div>
      </div>
      <aside className="mou-globe-info" aria-live="polite">
        {activeUniversity ? (
          <>
            <button type="button" className="mou-globe-close" onClick={closeDetails} aria-label="Close university details"><X size={17} /></button>
            <div className="mou-globe-profile">
              <div className="mou-globe-logo"><img src={activeUniversity.displayLogo} alt={`${activeUniversity.universityName} official logo`} /></div>
              <span className="mou-globe-country">{countryFlag(activeUniversity.countryCode)} {activeUniversity.country}</span>
              <h3>{activeUniversity.universityName}</h3>
              <p>{activeUniversity.introduction || `Located in ${activeUniversity.city}, ${activeUniversity.country}. An institutional introduction will be added when verified details are available.`}</p>
              <div className="mou-globe-location"><span>LOCATION</span><strong>{activeUniversity.city}, {activeUniversity.country}</strong><small>{Math.abs(activeUniversity.latitude).toFixed(2)}°{activeUniversity.latitude < 0 ? "S" : "N"} · {Math.abs(activeUniversity.longitude).toFixed(2)}°{activeUniversity.longitude < 0 ? "W" : "E"}</small></div>
              <div className="mou-globe-brand"><span>BRAND PALETTE</span><div>{activeUniversity.brandColours.map((colour) => <i key={colour} style={{ backgroundColor: colour }} aria-label={`Brand colour ${colour}`} />)}</div></div>
              {activeUniversity.partnership && <button type="button" className="mou-globe-details-link" onClick={() => onSelectPartnership(activeUniversity.partnership)}>View published agreement details <ArrowUpRight size={14} /></button>}
            </div>
          </>
        ) : (
          <div className="mou-globe-prompt"><Globe2 size={26} /><span>THE PARTNERSHIP NETWORK</span><p>Hover, focus or tap a glowing marker to explore an institution.</p><small>Use Tab to move between all 11 locations.</small></div>
        )}
      </aside>
      <p className="mou-globe-attribution">City coordinates: <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap contributors</a>. Institutional profiles and logos are displayed from verified project assets or published administrator records.</p>
    </div>
  );
}

export default function GlobalPartnerships() {
  const [records, setRecords] = useState([]);
  const [galleryRecords, setGalleryRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedUniversityId, setSelectedUniversityId] = useState("");
  const [selectedPartnership, setSelectedPartnership] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const reducedMotion = useReducedMotion();
  const published = useMemo(() => records.filter((record) => record.status === "published"), [records]);
  const countryCount = new Set(published.map((record) => record.country.toLowerCase())).size;
  const mouCount = published.reduce((total, record) => total + (record.agreements?.length || 0), 0);
  const visiblePartners = selectedCountry
    ? published.filter((record) => record.country.toLowerCase() === selectedCountry.toLowerCase())
    : published;

  useEffect(() => {
    function load() {
      try {
        setRecords(readPartnerships());
        setGalleryRecords(readPartnershipGallery());
        setError("");
      } catch (loadError) {
        setError(`Partnership information could not be loaded: ${loadError.message}`);
      } finally {
        setLoading(false);
      }
    }

    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  useEffect(() => {
    if (!selectedPartnership && !selectedPhoto) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedPartnership(null);
        setSelectedPhoto(null);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedPartnership, selectedPhoto]);

  const gallery = [
    ...galleryRecords.filter((photo) => photo.status === "published"),
    ...published.flatMap((partner) => (partner.signingGallery || []).map((photo) => ({
      image: photo.image,
      caption: photo.caption || `${partner.universityName} partnership signing`,
      date: photo.date,
    }))),
  ];

  return (
    <main className="global-partnerships">
      <section className="mou-hero">
        <div className="mou-hero-top"><span>NORTHERN UNIVERSITY</span><span>GLOBAL PARTNERSHIPS · MOU</span></div>
        <div className="mou-hero-content">
          <motion.div className="mou-hero-copy" initial={reducedMotion ? false : "hidden"} animate="visible" variants={fadeUp}>
            <span className="mou-eyebrow"><Globe2 size={15} /> INTERNATIONAL PARTNERSHIPS</span>
            <h1>Beyond Borders.<br /><em>Building Global Connections.</em></h1>
            <p>Northern University is expanding its international presence through academic partnerships, institutional collaboration and shared opportunities for global development.</p>
            <a className="mou-hero-cta" href="#partnerships">EXPLORE PARTNERSHIPS <ArrowDown size={16} /></a>
          </motion.div>
          <div className="mou-hero-art" aria-hidden="true">
            <div className="mou-orbit mou-orbit-one" />
            <div className="mou-orbit mou-orbit-two" />
            <div className="mou-globe"><Globe2 strokeWidth={0.65} /></div>
            <span className="mou-hero-coordinate">34°01′N<br />71°58′E</span>
            <span className="mou-hero-stamp">NU<br /><small>GLOBAL</small></span>
          </div>
        </div>
        <div className="mou-hero-stats" aria-label="Partnership statistics">
          {[
            { value: loading ? "—" : mouCount, label: "MOUs" },
            { value: loading ? "—" : countryCount, label: "PARTNER COUNTRIES" },
            { value: loading ? "—" : published.length, label: "PARTNER UNIVERSITIES" },
          ].map((stat, index) => (
            <motion.div key={stat.label} initial={reducedMotion ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .45, delay: index * .1 }}>
              <strong>{stat.value}</strong><span>{stat.label}</span>
            </motion.div>
          ))}
          <small>Based on published records</small>
        </div>
      </section>

      <section className="mou-partnerships section-pad" id="partnerships">
        <div className="mou-section-heading">
          <div><span className="mou-eyebrow">OUR INTERNATIONAL NETWORK</span><h2>Our Global<br /><em>University Network.</em></h2></div>
          <p>Each published profile shares verified partnership information entered by the university. Agreements are managed separately, so a partner may have more than one MOU.</p>
        </div>
        {error && <div className="mou-state mou-error" role="alert">{error}</div>}
        {loading ? <div className="mou-state" role="status">Loading published partnerships…</div>
          : published.length === 0 ? (
            <div className="mou-state mou-empty"><Handshake size={26} /><h3>Global partnerships are growing.</h3><p>Verified partner university profiles will appear here when published by the university.</p></div>
          ) : (
            <div className="mou-partner-grid">
              {visiblePartners.map((partner, index) => (
                <motion.article className={`mou-partner-card${partner.featured ? " is-featured" : ""}`} key={partner.id} initial={reducedMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp} transition={{ delay: Math.min(index * 0.06, 0.24) }}>
                  {partner.coverImage && <div className="mou-partner-cover"><img src={partner.coverImage} alt={`${partner.universityName} partnership`} loading="lazy" /></div>}
                  <div className="mou-partner-logos">
                    <div className="mou-logo-lockup">
                      {partner.northernUniversityLogo ? <img src={partner.northernUniversityLogo} alt="Northern University logo" loading="lazy" /> : <span className="mou-logo-monogram" aria-label="Northern University">NU</span>}
                      <i aria-hidden="true">×</i>
                      {partner.partnerUniversityLogo ? <img src={partner.partnerUniversityLogo} alt={`${partner.universityName} logo`} loading="lazy" /> : <span className="mou-logo-monogram partner-monogram" aria-label={`${partner.universityName} logo unavailable`}>{partner.universityName.slice(0, 2).toUpperCase()}</span>}
                    </div>
                    <span className="mou-country-label">{countryFlag(partner.countryCode)} {partner.country}</span>
                  </div>
                  <div className="mou-partner-copy">
                    {partner.featured && <span className="mou-featured-label">FEATURED PARTNER</span>}
                    <h3>{partner.universityName}</h3>
                    <p>{partner.description || "Partnership information will be shared here."}</p>
                    <div className="mou-agreement-preview">
                      <span>{partner.agreements?.length || 0} {partner.agreements?.length === 1 ? "AGREEMENT" : "AGREEMENTS"}</span>
                      {partner.agreements?.slice(0, 2).map((agreement) => (
                        <small key={agreement.id || agreement.title}>{agreement.title || "Memorandum of Understanding"}{agreement.signingDate ? ` · ${formatDate(agreement.signingDate)}` : ""}</small>
                      ))}
                    </div>
                    {partner.collaborationAreas?.length > 0 && <ul className="mou-area-tags">{partner.collaborationAreas.map((area) => <li key={area}>{area}</li>)}</ul>}
                    <button className="mou-read-more" onClick={() => setSelectedPartnership(partner)}>READ ABOUT PARTNERSHIP <ArrowUpRight size={15} /></button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
      </section>

      <section className="mou-map-section">
        <div className="mou-section-heading">
          <div><span className="mou-eyebrow">INSTITUTIONS · IDEAS · OPPORTUNITY</span><h2>Connected<br /><em>Across Borders.</em></h2></div>
          <p>Explore Northern University’s international academic network. Each marker represents a named institution; closely located universities are individually selectable.</p>
        </div>
        <WorldMap
          partners={published}
          onSelectCountry={setSelectedCountry}
          selectedUniversityId={selectedUniversityId}
          onSelectUniversity={setSelectedUniversityId}
          onSelectPartnership={setSelectedPartnership}
          reducedMotion={reducedMotion}
        />
        {selectedCountry && (
          <div className="mou-map-results">
            <div><strong>{selectedCountry}</strong><span>{visiblePartners.length} {visiblePartners.length === 1 ? "partner university" : "partner universities"}</span></div>
            {visiblePartners.map((partner) => <button key={partner.id} onClick={() => setSelectedPartnership(partner)}>{partner.universityName}<ArrowRight size={14} /></button>)}
          </div>
        )}
      </section>

      <section className="mou-opportunities section-pad">
        <div className="mou-opportunities-heading"><span className="mou-eyebrow">FOR OUR STUDENTS</span><h2>Beyond Agreements.<br /><em>Creating Opportunities.</em></h2><p>International partnerships help create a connected academic community. The specific activities depend on each agreement.</p></div>
        <div className="mou-benefit-grid">{collaborationAreas.map((area, index) => (
          <motion.article key={area.mark} initial={reducedMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ delay: index * 0.07 }}>
            <span>{area.mark}</span><h3>{area.title}</h3><p>{area.text}</p>
          </motion.article>
        ))}</div>
        <p className="mou-qualification">Specific student activities or benefits are not implied unless confirmed in a published agreement.</p>
      </section>

      <section className="mou-inspiration-section">
        <div className="mou-section-heading">
          <div><span className="mou-eyebrow">YOUR FUTURE IS A JOURNEY</span><h2>Be curious.<br /><em>Go further.</em></h2></div>
          <p>Every lecture, conversation, project and achievement can open a new door. Let these moments inspire you to explore ideas, connect with others and imagine what you could make possible.</p>
        </div>
        <div className="mou-inspiration-grid">
          {studentInspirationPhotos.map((photo, index) => (
            <button
              type="button"
              className={`mou-inspiration-photo mou-inspiration-photo-${index % 6}`}
              key={photo.image}
              onClick={() => setSelectedPhoto(photo)}
              aria-label={`View photo: ${photo.caption}`}
            >
              <img src={photo.image} alt={photo.alt} loading="lazy" />
              <span>{photo.caption}</span>
            </button>
          ))}
        </div>
        <p className="mou-inspiration-note">These images celebrate learning, community and academic collaboration. They do not imply a specific exchange program or student benefit.</p>
      </section>

      <section className="mou-gallery-section">
        <div className="mou-section-heading">
          <div><span className="mou-eyebrow">INSTITUTIONAL MOMENTS</span><h2>Moments of Global<br /><em>Collaboration.</em></h2></div>
          <p>Photographs from university delegation visits, meetings and agreement signings.</p>
        </div>
        <div className="mou-gallery">
          {gallery.map((photo, index) => (
            <button type="button" className={`mou-gallery-photo mou-gallery-photo-${index % 5}`} key={`${photo.image}-${index}`} onClick={() => setSelectedPhoto(photo)}>
              <img src={photo.image} alt={photo.caption} loading="lazy" />
              <span>{photo.caption}{photo.date ? ` · ${formatDate(photo.date)}` : ""}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mou-closing">
        <span className="mou-eyebrow">A SHARED FUTURE</span>
        <h2>Our Vision<br /><em>Has No Borders.</em></h2>
        <p>Connecting institutions, sharing knowledge and building a future through global collaboration.</p>
      </section>

      <AnimatePresence>
        {(selectedPartnership || selectedPhoto) && (
          <motion.div className="mou-lightbox" role="dialog" aria-modal="true" aria-label={selectedPartnership ? `${selectedPartnership.universityName} partnership details` : "Partnership photograph"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && (setSelectedPartnership(null), setSelectedPhoto(null))}>
            <button className="mou-lightbox-close" onClick={() => { setSelectedPartnership(null); setSelectedPhoto(null); }} aria-label="Close"><X size={22} /></button>
            {selectedPartnership ? (
              <article className="mou-detail-panel">
                <span className="mou-eyebrow">{countryFlag(selectedPartnership.countryCode)} {selectedPartnership.country} · GLOBAL PARTNER</span>
                <h2>{selectedPartnership.universityName}</h2>
                <p>{selectedPartnership.description || "Partnership information will be shared here."}</p>
                {selectedPartnership.collaborationAreas?.length > 0 && <><h3>Areas of collaboration</h3><ul>{selectedPartnership.collaborationAreas.map((area) => <li key={area}>{area}</li>)}</ul></>}
                <h3>Agreements</h3>
                {selectedPartnership.agreements?.length ? selectedPartnership.agreements.map((agreement, index) => (
                  <div className="mou-detail-agreement" key={agreement.id || `${agreement.title}-${index}`}>
                    <span>{agreement.title || "Memorandum of Understanding"}</span>
                    {agreement.signingDate && <small>{formatDate(agreement.signingDate)}</small>}
                    {agreement.mouDocument && <a href={agreement.mouDocument} target="_blank" rel="noreferrer">View MOU document <ArrowUpRight size={14} /></a>}
                  </div>
                )) : <p>No agreement details have been published.</p>}
                {selectedPartnership.signingGallery?.length > 0 && <div className="mou-detail-photos">{selectedPartnership.signingGallery.map((photo, index) => <img src={photo.image} alt={photo.caption || `${selectedPartnership.universityName} signing ${index + 1}`} key={`${photo.image}-${index}`} />)}</div>}
              </article>
            ) : (
              <figure className="mou-lightbox-photo"><img src={selectedPhoto.image} alt={selectedPhoto.alt || selectedPhoto.caption} /><figcaption>{selectedPhoto.caption}{selectedPhoto.date ? ` · ${formatDate(selectedPhoto.date)}` : ""}</figcaption></figure>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
