
import { useEffect, useState } from "react";
import tahaPortrait from "../assets/img/tahasawar/sirtaha.jpeg";
import GlobalPartnershipManager from "../components/GlobalPartnershipManager";
import "./Administration.css";

const proRector = {
  id: 2,
  name: "Taha Jamil Sawar",
  role: "Pro-Rector",
  image: tahaPortrait,
  bio: "Taha Jamil Sawar is a visionary leader, educationist, and technology entrepreneur, serving as the President of Northern University. He is dedicated to transforming higher education through digital innovation, artificial intelligence, sustainable development, and global collaboration. He is also the Founder and CEO of Dione Software, where he promotes technological advancement, entrepreneurship, and impactful growth.",
  category: "UNIVERSITY LEADERSHIP",
};

const starter = [
  {
    id: 1,
    name: "Rector's Name",
    role: "Rector",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=90",
    bio: "Add the Rector's verified biography, academic background, vision and contribution to the university.",
    category: "UNIVERSITY LEADERSHIP",
  },
  proRector,
  {
    id: 3,
    name: "Assistant Manager's Name",
    role: "Assistant Manager",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85",
    bio: "Add verified details about media administration and coordination.",
    category: "MEDIA ADMINISTRATION",
  },
];

const blank = {
  name: "",
  role: "",
  image: "",
  bio: "",
  category: "MEDIA ADMINISTRATION",
};

export default function Administration() {
  const [people, setPeople] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("reelhub-officials"));
      if (!Array.isArray(saved)) return starter;
      if (saved.some((person) => person.id === proRector.id)) {
        return saved.map((person) => person.id === proRector.id ? proRector : person);
      }
      return [...saved, proRector];
    } catch (error) {
      console.error("Could not load saved officials.", error);
      return starter;
    }
  });

  const [manage, setManage] = useState(false);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("reelhub-officials", JSON.stringify(people));
    } catch (error) {
      console.error("Could not save officials.", error);
    }
  }, [people]);

  const rector = people.find((p) => p.id === 1);
  const others = people.filter((p) => p.id !== 1);

  function openForm(person = null) {
    setEditing(person?.id ?? null);
    setForm(person ? { ...blank, ...person } : blank);
    setManage(true);
  }

  function savePerson(e) {
    e.preventDefault();
    const data = { ...form, name: form.name.trim(), role: form.role.trim() };
    if (!data.name || !data.role) return;

    if (editing !== null) {
      setPeople((old) => old.map((p) => p.id === editing ? { ...p, ...data } : p));
    } else {
      setPeople((old) => [...old, { ...data, id: Date.now() }]);
    }

    setForm(blank);
    setEditing(null);
    setManage(false);
  }

  function removePerson(person) {
    if (person.id === 1) return;
    if (window.confirm(`Remove ${person.name} from this directory?`)) {
      setPeople((old) => old.filter((p) => p.id !== person.id));
    }
  }

  return (
    <main className="lead-page">
      <section className="lead-hero">
        <div className="lead-hero-content">
          <span className="lead-eyebrow">OFFICIAL UNIVERSITY DIRECTORY <i /> 2026</span>
          <div className="lead-university-name">Northern University</div>
          <h1>
            University<br />Executive <em>Office.</em>
          </h1>
          <p>
            The verified leadership and administrative offices guiding the
            university's academic, institutional, and media operations.
          </p>
          <a href="#rector" className="lead-discover">
            VIEW EXECUTIVE DIRECTORY <span>↓</span>
          </a>
        </div>
        <aside className="lead-identity-card" aria-label="Official office status">
          <div className="lead-identity-top">
            <strong>NU</strong>
            <span>OFFICIAL<br />DIRECTORY</span>
          </div>
          <div className="lead-identity-seal">NU</div>
          <div className="lead-identity-status"><i /> Leadership Office Verified</div>
        </aside>
        <div className="lead-hero-index">NORTHERN UNIVERSITY / EXECUTIVE DIRECTORY</div>
      </section>

      {rector && (
        <section className="lead-rector" id="rector">
          <div className="lead-rector-image">
            <img src={rector.image} alt={rector.name} />
            <span className="lead-image-caption"> OFFICE OF THE RECTOR</span>
          </div>
          <div className="lead-rector-copy">
            <span className="lead-eyebrow">UNIVERSITY LEADERSHIP</span>
            <h2>{rector.name}</h2>
            <h3>{rector.role}</h3>
            <div className="lead-gold-line" />
            <p>{rector.bio}</p>
            <div className="lead-rector-note">
              <span>01</span>
              <p>Verified executive record · Northern University</p>
            </div>
          </div>
        </section>
      )}

      <section className="lead-directory">
        <div className="lead-section-heading">
          <div>
            <span className="lead-eyebrow">THE LEADERSHIP DIRECTORY</span>
            <h2>Executive <em>Officeholders.</em></h2>
          </div>
            <p>Pro-Rector and administrative leadership records.</p>
        </div>

        <div className="lead-card-grid">
          {others.map((person, index) => (
            <article className="lead-card" key={person.id}>
              <div className="lead-card-image">
                <img src={person.image} alt={person.name} />
                <span className="lead-card-number">
                  {String(index + 2).padStart(2, "0")}
                </span>
              </div>
              <div className="lead-card-copy">
                <span className="lead-eyebrow">{person.category}</span>
                <h3>{person.name}</h3>
                <h4>{person.role}</h4>
                <p>{person.bio}</p>
                {manage && (
                  <div className="lead-card-actions">
                    <button onClick={() => openForm(person)}>Edit</button>
                    <button onClick={() => removePerson(person)}>Remove</button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="lead-closing">
        <span className="lead-eyebrow">THE FOUNDATION OF OUR WORK</span>
        <h2>Leadership with purpose.<br /><em>Creativity with direction.</em></h2>
      </section>

      <section className="lead-management">
        <button
          className="lead-manage-toggle"
          onClick={() => setManage((value) => !value)}
        >
          {manage ? "Close management −" : "Manage officials +"}
        </button>

        {manage && (
          <div className="lead-manage-panel">
            <div>
              <span className="lead-eyebrow">DIRECTORY MANAGEMENT</span>
              <h2>{editing !== null ? "Edit official" : "Add an official"}</h2>
              <p>Update the directory when your team changes.</p>
            </div>

            <form onSubmit={savePerson}>
              <input
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                placeholder="Official designation"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                required
              />
              <input
                placeholder="Portrait image URL"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
              <input
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
              <textarea
                placeholder="Official biography and responsibilities"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
              <div className="lead-form-actions">
                <button type="submit">
                  {editing !== null ? "Save changes" : "Add official"}
                </button>
                <button type="button" onClick={() => openForm()}>
                  Clear form
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
      <section className="lead-management">
        <GlobalPartnershipManager />
      </section>
    </main>
  );
}
