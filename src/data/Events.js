
import { useParams, Link } from "react-router-dom";
import { eventData } from "../data/eventData";
import "./EventAlbum.css";

export default function EventAlbum() {
  const { slug } = useParams();

  const event = eventData.find((item) => item.slug === slug);

  if (!event) {
    return (
      <section className="event-album-not-found">
        <h2>Event Not Found</h2>
        <Link to="/work">Back to Events</Link>
      </section>
    );
  }

  return (
    <section className="event-album">
      <Link to="/work" className="album-back">
        ← Back to Events
      </Link>

      <header className="album-header">
        <span>{event.category}</span>
        <h1>{event.title}</h1>
        <p>{event.description}</p>
      </header>

      <div className="album-photo-grid">
        {event.photos.map((photo) => (
          <article className="album-photo-card" key={photo.id}>
            <img src={photo.src} alt={photo.caption} />
            <p>{photo.caption}</p>
          </article>
        ))}
      </div>

      {event.videos.length > 0 && (
        <section className="album-videos">
          <h2>Event Films</h2>

          {event.videos.map((video) => (
            <article key={video.id} className="album-video-card">
              <h3>{video.title}</h3>
              <video controls poster={video.cover}>
                <source src={video.src} type="video/mp4" />
              </video>
            </article>
          ))}
        </section>
      )}
    </section>
  );
}

