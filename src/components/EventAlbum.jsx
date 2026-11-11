
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { eventData } from "../data/eventData";
import "./EventAlbum.css";

function EventAlbum() {
  const { slug } = useParams();
  const [activeFilter, setActiveFilter] = useState("all");
  const event = eventData.find((item) => item.slug === slug);

  if (!event) {
    return (
      <section className="event-album-not-found">
        <span className="album-eyebrow">NU Media Archive</span>
        <h2>Event not found</h2>
        <p>The requested album does not exist or may have moved.</p>
        <Link to="/work">← Back to events</Link>
      </section>
    );
  }

  const photographs = event.photographs ?? event.photos ?? [
    
  ];
  const videos = event.videos ?? [];
  const showPhotos = activeFilter !== "videos";
  const showVideos = activeFilter !== "photos";
  const hasPhotos = showPhotos && photographs.length > 0;
  const hasVideos = showVideos && videos.length > 0;

  return (
    <section className="event-album">
      <Link to="/work" className="album-back">← Back to Events</Link>

      <header className="album-header">
        <span className="album-eyebrow">{event.category}</span>
        <h1>{event.title}</h1>
        <p>{event.description}</p>
        <div className="album-stats">
          <span>{photographs.length} Photographs</span>
          <span>{videos.length} Videos</span>
        </div>
      </header>

      <div className="album-filters" aria-label="Album media filters">
        {[['all', 'All Media'], ['photos', 'Photographs'], ['videos', 'Videos']].map(([value, label]) => (
          <button key={value} className={activeFilter === value ? "active" : ""} onClick={() => setActiveFilter(value)}>
            {label}
          </button>
        ))}
      </div>

      {hasPhotos && (
        <div className="album-photo-grid">
          {photographs.map((photo, index) => (
            <article className="album-photo-card" key={photo.id ?? `${event.slug}-photo-${index}`}>
              <div className="album-photo-frame">
                <img src={photo.src} alt={photo.caption || `${event.title} photograph`} loading="lazy" />
                <span className="album-photo-number">{String(index + 1).padStart(2, "0")}</span>
              </div>
              {photo.caption && <p>{photo.caption}</p>}
            </article>
          ))}
        </div>
      )}

      {hasVideos && (
        <section className="album-videos">
          <h2>Event Films</h2>
          <div className="album-video-grid">
            {videos.map((video, index) => (
              <article className="album-video-card" key={video.id ?? `${event.slug}-video-${index}`}>
                <video controls preload="metadata" poster={video.cover || undefined}>
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support video playback.
                </video>
                <h3>{video.title}</h3>
              </article>
            ))}
          </div>
        </section>
      )}

      {!hasPhotos && !hasVideos && (
        <p className="album-empty">No media available in this category yet.</p>
      )}
    </section>
  );
}

export default EventAlbum;
