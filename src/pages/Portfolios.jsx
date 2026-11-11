
import { useMemo, useState } from "react";
import groupPhoto from "../assets/img/Team Pictures/team.jpeg";
import aimanPhoto from "../assets/img/Team Pictures/Aiman Arif.jpeg";

import "./Portfolios.css";

const initialMembers = [
  {
    name: "  Syed Alyan u Din",
    role: "Assistant Director",
    bio: "Assists in team coordination, media operations, and overseeing event coverage and production activities.",
    skills: ["make sure the team put creative ideas on table and make them work for the organization in which team work also required"],
    image:
      "src/assets/img/Team Pictures/Alyaan.jpeg",
    email: "alyan@northern.edu.pk",
    instagram: "https://www.instagram.com/syedalyanuddinkakakhel?vrfl=bXM3Z2JhaHFuemxs&utm_source=qr",
    linkedin: "https://www.linkedin.com/in/syed-alyan-uddin-53a19631b?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
  {
    name: "Haseebullah",
    role: "Advirtisement Manager",
    bio: "Captures campus life, university events, and the moments that tell our story.",
    skills: ["Photography", "Portraits", "Photo Editing"],
    image:
      "src/assets/img/Team Pictures/haseeb.jpeg",
    email: "haseebullah0.2.com@gmail.com",
    instagram: "https://www.instagram.com/hellzel___/",
    linkedin: "",
  },

  {
    name: "Anees Khan",
    role: "Model",
    bio: "Transforms ideas into engaging films, event highlights, and visual stories.",
    skills: ["Posing & Expression", "Camera Confidence", "Creative Collaboration"],
    image:
      "src/assets/img/Team Pictures/Anees.jpeg",
    email: "aneeskhan9110552@gmail.com",
    instagram: "https://www.instagram.com/_aneeskhan_01?mdxt=MW1haGhjZ2ljbnkxYQ==",
    linkedin: "https://www.linkedin.com/in/anees-khan-2444b0326?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },



  {

    name: "Manahil",
    role: " Media Website Developer",
    bio: "creative Media Web Developer and Content Writer passionate about blending technology with storytelling to build engaging digital experiences and meaningful content.",
    skills: ["Frontend Development,React.js,UI Design,Content Writing"],
    image:
      "src/assets/img/Team Pictures/Manahil.jpeg",
    email: "manahilz762@gmail.com",
    instagram: "mina____hell",
    linkedin: "",
  },
  {
    name: "Hamza Danial ",
    role: "Model",
    bio: "Puts life in raw Clips",
    skills: ["Modelling "],
    image:
      "src/assets/img/Team Pictures/Hamza.jpeg",
    email: "hamzadanial163634@gmail.com",
    instagram: " https://www.instagram.com/inside_the_matrix19?xtok=MWI5ZzZpdmhkOXc3Yw==",
    linkedin: " https://www.linkedin.com/in/hamza-danial-b67101285?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },

  {
    name: "Kashaf Tawab",
    role: "Photographer & Videographer",
    bio: "A creative visual storyteller passionate about capturing meaningful moments through photography and videography, bringing ideas to life with a unique artistic perspective.",
    skills: ["Professional Photography & Videography", "Copywriting"],
    image:
      "src/assets/img/Team Pictures/kashaf-tawab.png",
    email: "kashaftawab@gmail.com",
    instagram: "https://www.instagram.com/kshf_here_?dlrf=MWJzamt0NW12b29kcA==",
    linkedin: "https://www.linkedin.com/public-profile/settings/",
  },
  {
    name: "Sarwat Gull",
    role: "Model",
    bio: "Develops captions, interviews, campaign concepts, and stories for our audience.",
    skills: ["Modeling"],
    image:
      "src/assets/img/Team Pictures/sarwat.jpeg",
    email: "sarwatgul41@gmail.com",
    instagram: "https://www.instagram.com/sarwa_saru?utm_source=qr&exln=MXJzMjR2aWhtaHV1eQ==",
    linkedin: "",
  },
  {
    name: "Rab Nawaz ",
    role: "Videographer & VideoEditor",
    bio: "Coordinates event coverage and helps every production run smoothly.",
    skills: [" Turning raw clips into cinematic masterpieces"],
    image:
      "src/assets/img/Team Pictures/Rabnawaz.jpeg",
    email: " rabnawazkhanonline1@gmail.com",
    instagram: " nawazay_",
    linkedin: "",
  },
  {
    name: "Maria Hussain ",
    role: "Videographer & VideoEditor",
    bio: "Coordinates event coverage and helps every production run smoothly.",
    skills: [" Turning raw clips into cinematic masterpieces"],
    image:
      "src/assets/img/Team Pictures/Maria Hussain.jpeg",
    email: "Hussainmaria708@gmail.com",
    instagram: "https://www.instagram.com/riya.05354?psln=MW5rcTA0cmsxZHgzZw%3D%3D&utm_source=qr",
    linkedin: "",
  },
  {
    name: "Hseeb Khattak",
    role: "Modeling,Videograghing,Vidoeediting",
    department: "Photography",
    bio: "Visual Storyteller • Creative Lens • Cinematic Eye",
    skills: ["Events Photography"],
    image: "src/assets/img/Team Pictures/HaseebKhattak.jpeg",
    email: "hk7343877@gmail.com",
    instagram: "m_haseeb5540",
    linkedin: ""
  },
  {
    name: "Muhammad Maaz",
    role: "Content Creator",
    department: "Photography",
    year: "Team Member",
    bio: "Documents student experiences and finds meaningful stories across campus.",
    skills: ["Content Creation", "Photography", "Interviews"],
    image:
      "src/assets/img/Team Pictures/maaz.png",
    email: "muhammadmaaz56000@gmail.com",
    instagram: " Maazkhan563",
    linkedin: "",
  },

  {
    name: "Umar",
    role: "Photography Team Lead",
    department: "Photography",
    bio: "A passionate photographer with an eye for detail and storytelling, dedicated to capturing meaningful moments through creative composition, visual perspective, and compelling imagery.",
    skills: ["Events Photography"],
    image: "src/assets/img/Team Pictures/Umar.jpeg",
    email: "zachjason777@gmail.com",
    instagram: "https://www.instagram.com/zachjason_?cplk=ZzN2MWhxNzRuYnlr",
    linkedin: ""
  },

  {
    name: "Aiman Arif",
    role: "videographer , editor ",
    department: "Photography",
    bio: "Professional video model: confident on-camera presence, natural expressions, polished delivery",
    skills: [
      "videographer , editor ,Content Creator"
    ],
    image: aimanPhoto,
    email: " aimanarifhussain@gmail.com",
    instagram: "https://www.instagram.com/emiiesticcc_?psln=ajRhZTF0aDIydmpr&utm_source=qr",
    linkedin: ""
  },

];

const departments = [
  "All Departments",
  "Leadership",
  "Photography",
  "Videography",
  "Post-Production",
  "Design",
  "Marketing",
  "Events",
];

const emptyMember = {
  name: "",
  role: "",
  department: "Photography",
  year: "Team Member",
  bio: "",
  skills: [],
  image: "",
  featured: false,
  email: "",
  instagram: "",
  linkedin: "",
};

function readMembers() {
  try {
    const saved = localStorage.getItem("reelhub-portfolio-members");
    if (!saved) return initialMembers;

    return JSON.parse(saved).map((member) => {
      if (member.name?.trim() !== "Umar") return member;
      return {
        ...member,
        image: "src/assets/img/Team Pictures/Umar.jpeg",
        skills: Array.isArray(member.skills) ? member.skills : [member.skills || "Events Photography"],
      };
    });
  } catch {
    return initialMembers;
  }
}

function MemberCard({ member, onOpen }) {
  return (
    <article className="rh-member-card">
      <button
        className="rh-member-photo-button"
        type="button"
        onClick={() => onOpen(member)}
        aria-label={`View ${member.name}'s profile`}
      >
        <img
          className="rh-member-photo"
          src={member.image || "https://placehold.co/700x850/24221d/f0d49b?text=ReelHub"}
          alt={member.name}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src =
              "https://placehold.co/700x850/24221d/f0d49b?text=ReelHub";
          }}
        />
        <span className="rh-photo-view">View profile ↗</span>
      </button>

      <div className="rh-member-info">
        <div className="rh-member-topline">
          <span className="rh-member-department">{member.department}</span>
          {member.featured && <span className="rh-featured-label">FEATURED</span>}
        </div>

        <h3>{member.name}</h3>
        <p className="rh-member-role">{member.role}</p>
        <p className="rh-member-bio">{member.bio}</p>

        <button
          className="rh-text-link"
          type="button"
          onClick={() => onOpen(member)}
        >
          Discover profile <span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
  );
}

function MemberModal({ member, onClose }) {
  if (!member) return null;

  return (
    <div
      className="rh-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="rh-profile-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rh-modal-name"
      >
        <button
          type="button"
          className="rh-modal-close"
          onClick={onClose}
          aria-label="Close profile"
        >
          <span>Close</span>
          <b aria-hidden="true">×</b>
        </button>

        <div className="rh-modal-image-wrap">
          <img
            src={member.image}
            alt={member.name}
            onError={(event) => {
              event.currentTarget.src =
                "https://placehold.co/700x850/24221d/f0d49b?text=ReelHub";
            }}
          />
        </div>

        <div className="rh-modal-details">
          <div className="rh-modal-official-tag">NORTHERN UNIVERSITY · OFFICIAL TEAM</div>
          <span className="rh-eyebrow">{member.department}</span>
          <h2 id="rh-modal-name">{member.name}</h2>
          <p className="rh-modal-role">{member.role}</p>

          <div className="rh-profile-facts">
            <div>
              <span>Team</span>
              <strong>{member.department}</strong>
            </div>
            <div>
              <span>Position</span>
              <strong>{member.year || "Team Member"}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>Official member</strong>
            </div>
          </div>

          <div className="rh-profile-about">
            <span>About & responsibility</span>
            <p>{member.bio}</p>
          </div>

          <h3 className="rh-modal-subtitle">Areas of expertise</h3>
          <div className="rh-skill-list">
            {(member.skills || []).map((skill) => (
              <span className="rh-skill" key={skill}>{skill}</span>
            ))}
          </div>

          <div className="rh-profile-contact">
            {member.email && (
              <a href={`mailto:${member.email}`}>Email ↗</a>
            )}
            {member.instagram && (
              <a href={member.instagram} target="_blank" rel="noreferrer">
                Instagram ↗
              </a>
            )}
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function AdminWorkspace({ members, onSave, onDelete, onToggleFeatured }) {
  const [form, setForm] = useState(emptyMember);
  const [editingId, setEditingId] = useState(null);
  const [notice, setNotice] = useState("");

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function startEdit(member) {
    setEditingId(member.id);
    setForm({
      ...member,
      skills: member.skills || [],
    });
    setNotice("");
    document.getElementById("rh-admin-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function resetForm() {
    setForm(emptyMember);
    setEditingId(null);
    setNotice("");
  }

  function handleImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setNotice("Please choose an image file.");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setNotice("Please use an image smaller than 3 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((current) => ({
        ...current,
        image: String(reader.result),
      }));
      setNotice("Image selected. Save the profile to apply it.");
    };

    reader.onerror = () => setNotice("Could not read this image.");
    reader.readAsDataURL(file);
  }

  function submitForm(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.role.trim()) {
      setNotice("Please enter the member's name and role.");
      return;
    }

    const member = {
      ...form,
      id: editingId ?? Date.now(),
      name: form.name.trim(),
      role: form.role.trim(),
      bio: form.bio.trim(),
      skills: typeof form.skills === "string"
        ? form.skills.split(",").map((skill) => skill.trim()).filter(Boolean)
        : form.skills,
    };

    const success = onSave(member);

    if (success) {
      setNotice(editingId ? "Profile updated." : "Profile added.");
      resetForm();
    } else {
      setNotice("Could not save. Browser storage may be full.");
    }
  }

  function deleteMember(id) {
    const confirmed = window.confirm(
      "Remove this profile from the local portfolio directory?"
    );
    if (!confirmed) return;

    onDelete(id);

    if (editingId === id) resetForm();
  }

  return (
    <section className="rh-admin-workspace" id="rh-admin">
      <div className="rh-section-heading">
        <div>
          <span className="rh-eyebrow">TEAM MANAGEMENT</span>
          <h2>Portfolio workspace</h2>
          <p>Manage the member profiles displayed on this page.</p>
        </div>
        <span className="rh-admin-local-note">Browser demo</span>
      </div>

      <div className="rh-admin-layout">
        <form
          id="rh-admin-form"
          className="rh-admin-form"
          onSubmit={submitForm}
        >
          <h3>{editingId ? "Edit member" : "Add a team member"}</h3>

          <label>
            Full name *
            <input
              name="name"
              value={form.name}
              onChange={updateField}
              placeholder="Enter full name"
              required
            />
          </label>

          <label>
            Professional role *
            <input
              name="role"
              value={form.role}
              onChange={updateField}
              placeholder="e.g. Lead Photographer"
              required
            />
          </label>

          <div className="rh-form-row">
            <label>
              Department
              <select
                name="department"
                value={form.department}
                onChange={updateField}
              >
                {departments.filter((item) => item !== "All Departments").map(
                  (department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  )
                )}
              </select>
            </label>

            <label>
              Team level
              <select name="year" value={form.year} onChange={updateField}>
                <option>Senior Team</option>
                <option>Team Member</option>
                <option>Junior Team</option>
                <option>Alumni</option>
              </select>
            </label>
          </div>

          <label>
            Short biography
            <textarea
              name="bio"
              value={form.bio}
              onChange={updateField}
              rows="4"
              placeholder="Describe their contribution to the team..."
            />
          </label>

          <label>
            Skills (separate with commas)
            <input
              name="skills"
              value={Array.isArray(form.skills) ? form.skills.join(", ") : form.skills}
              onChange={(event) => {
                setForm((current) => ({
                  ...current,
                  skills: event.target.value,
                }));
              }}
              placeholder="Photography, Editing, Design"
            />
          </label>

          <label>
            Email address
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={updateField}
              placeholder="member@example.com"
            />
          </label>

          <label>
            Instagram profile URL
            <input
              name="instagram"
              type="url"
              value={form.instagram}
              onChange={updateField}
              placeholder="https://www.instagram.com/..."
            />
          </label>

          <label>
            LinkedIn profile URL
            <input
              name="linkedin"
              type="url"
              value={form.linkedin}
              onChange={updateField}
              placeholder="https://www.linkedin.com/in/..."
            />
          </label>

          <label>
            Profile picture
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />
          </label>

          {form.image && (
            <div className="rh-upload-preview">
              <img src={form.image} alt="Selected profile preview" />
              <span>Profile image preview</span>
            </div>
          )}

          <label className="rh-checkbox-label">
            <input
              type="checkbox"
              name="featured"
              checked={Boolean(form.featured)}
              onChange={updateField}
            />
            Feature this member on the page
          </label>

          {notice && <p className="rh-admin-notice" role="status">{notice}</p>}

          <div className="rh-admin-form-actions">
            <button className="rh-button rh-button-gold" type="submit">
              {editingId ? "Save changes" : "Add member"}
            </button>
            <button
              className="rh-button rh-button-outline"
              type="button"
              onClick={resetForm}
            >
              Clear form
            </button>
          </div>
        </form>

        <div className="rh-admin-list">
          <div className="rh-admin-list-heading">
            <h3>Current directory</h3>
            <span>{members.length} profiles</span>
          </div>

          {members.map((member) => (
            <article className="rh-admin-member" key={member.id}>
              <img src={member.image} alt="" />
              <div className="rh-admin-member-details">
                <h4>{member.name}</h4>
                <p>{member.role}</p>
                <span>{member.department}</span>
              </div>

              <div className="rh-admin-member-actions">
                <button
                  type="button"
                  onClick={() => onToggleFeatured(member.id)}
                  title={member.featured ? "Remove featured status" : "Feature this member"}
                >
                  {member.featured ? "★" : "☆"}
                </button>
                <button type="button" onClick={() => startEdit(member)}>
                  Edit
                </button>
                <button
                  className="rh-delete-button"
                  type="button"
                  onClick={() => deleteMember(member.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <p className="rh-admin-disclaimer">
        This workspace is a front-end demonstration, not a secure administrator
        system. Changes are saved only in this browser. Use a protected backend
        and authenticated admin accounts before publishing real team management.
      </p>
    </section>
  );
}

export default function Portfolios() {
  const [members, setMembers] = useState(readMembers);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [selectedMember, setSelectedMember] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  function persistMembers(nextMembers) {
    try {
      localStorage.setItem(
        "reelhub-portfolio-members",
        JSON.stringify(nextMembers)
      );
      setMembers(nextMembers);
      return true;
    } catch {
      return false;
    }
  }

  function saveMember(member) {
    const exists = members.some((item) => item.id === member.id);
    const nextMembers = exists
      ? members.map((item) => (item.id === member.id ? member : item))
      : [...members, member];

    return persistMembers(nextMembers);
  }

  function deleteMember(id) {
    persistMembers(members.filter((member) => member.id !== id));
  }

  function toggleFeatured(id) {
    persistMembers(
      members.map((member) =>
        member.id === id ? { ...member, featured: !member.featured } : member
      )
    );
  }

  const featuredMembers = useMemo(
    () => members.filter((member) => member.featured),
    [members]
  );

  const filteredMembers = useMemo(() => {
    const term = search.trim().toLowerCase();

    return members.filter((member) => {
      const matchesDepartment =
        department === "All Departments" || member.department === department;

      const searchableText = [
        member.name,
        member.role,
        member.department,
        member.bio,
        ...(member.skills || []),
      ].join(" ").toLowerCase();

      return matchesDepartment && searchableText.includes(term);
    });
  }, [members, search, department]);

  return (
    <main className="rh-portfolios">
      {/* Cinematic opening */}
      <section className="rh-portfolio-hero">
        <div className="rh-hero-grain" aria-hidden="true" />

        <div className="rh-hero-inner">
          <div className="rh-hero-copy">
            <span className="rh-eyebrow">
              OFFICIAL UNIVERSITY OFFICE
            </span>

            <div className="rh-official-kicker">
              <span>Northern University</span>
              <span>Media Directorate</span>
            </div>

            <h1>
              Master <em>Minds</em>
              <br />
              behind the <em>frame.</em>
            </h1>

            <p className="rh-hero-description">
              Meet the official media team responsible for documenting university
              life, university publications, and institutional communications.
            </p>

            <div className="rh-hero-actions">
              <a href="#rh-team" className="rh-button rh-button-gold">
                View the team <span aria-hidden="true">↘</span>
              </a>
              <a href="#rh-about-team" className="rh-button rh-button-outline">
                About the office
              </a>
            </div>

            <div className="rh-hero-footnote">
              <span className="rh-status-dot" />
              <span>VERIFIED UNIVERSITY MEDIA OFFICE</span>
            </div>
          </div>

          <div className="rh-team-photo-stage" aria-label="Northern University media team group photograph">
            <span className="rh-team-monogram" aria-hidden="true">RH</span>
            <div className="rh-team-photo-frame">
              <img src={groupPhoto} alt="Northern University media team" />
              <span className="rh-photo-caption">Northern University Media Team</span>
            </div>
          </div>
        </div>

        <div className="rh-hero-bottom">
          <div className="rh-hero-bottom-item">
            <span>01</span>
            <strong>Our purpose</strong>
            <p>Documenting university life with integrity.</p>
          </div>
          <div className="rh-hero-bottom-item">
            <span>02</span>
            <strong>Our team</strong>
            <p>Creative minds working as one official office.</p>
          </div>
          <div className="rh-hero-bottom-item">
            <span>03</span>
            <strong>Explore profiles</strong>
            <p>Meet the people behind every published story.</p>
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="rh-portfolio-intro" id="rh-about-team">
        <div className="rh-intro-copy">
          <span className="rh-eyebrow">A TEAM BUILT ON IDEAS</span>
          <h2>
            Different talents.
            <br />
            <em>One creative vision.</em>
          </h2>
        </div>

        <div className="rh-intro-description">
          <p>
            ReelHub brings together students with different perspectives and a
            shared passion for meaningful media. From the first concept to the
            final frame, we collaborate to create work that represents our
            campus with care and character.
          </p>

          <div className="rh-intro-stats">
            <div>
              <strong>{String(members.length).padStart(2, "0")}</strong>
              <span>TEAM PROFILES</span>
            </div>
            <div>
              <strong>{String(new Set(members.map((member) => member.department)).size).padStart(2, "0")}</strong>
              <span>DISCIPLINES</span>
            </div>
            <div>
              <strong>01</strong>
              <span>SHARED VISION</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured members */}
      {featuredMembers.length > 0 && (
        <section className="rh-featured-section">
          <div className="rh-section-heading">
            <div>
              <span className="rh-eyebrow">THE PEOPLE TO KNOW</span>
              <h2>Meet our <em>featured team.</em></h2>
            </div>
            <span className="rh-section-index">01 — FEATURED</span>
          </div>

          <div className="rh-featured-grid">
            {featuredMembers.slice(0, 1).map((member, index) => (
              <div className="rh-featured-card-wrap" key={member.id}>
                <article className="rh-featured-card">
                  <button
                    className="rh-featured-image-button"
                    type="button"
                    onClick={() => setSelectedMember(member)}
                    aria-label={`View ${member.name}'s profile`}
                  >
                    <img src={member.image} alt={member.name} />
                    <span className="rh-featured-number">
                      0{index + 1}
                    </span>
                    <span className="rh-featured-open" aria-hidden="true">↗</span>
                  </button>

                  <div className="rh-featured-content">
                    <span className="rh-member-department">{member.department}</span>
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                  </div>
                </article>
                <aside className="rh-featured-profile" aria-label={`Profile details for ${member.name}`}>
                  <span className="rh-featured-profile-tag">NORTHERN UNIVERSITY · OFFICIAL TEAM</span>
                  <span className="rh-featured-profile-department">{member.department}</span>
                  <h3>{member.name}</h3>
                  <p className="rh-featured-profile-role">{member.role}</p>

                  <div className="rh-featured-profile-facts">
                    <div><span>Team</span><strong>{member.department}</strong></div>
                    <div><span>Position</span><strong>{member.year || "Team Member"}</strong></div>
                    <div><span>Status</span><strong>Official member</strong></div>
                  </div>

                  <div className="rh-featured-profile-about">
                    <span>About & responsibility</span>
                    <p>{member.bio}</p>
                  </div>

                  <div className="rh-featured-profile-expertise">
                    <span>Areas of expertise</span>
                    <div>
                      {(member.skills || []).map((skill) => <span className="rh-featured-skill" key={skill}>{skill}</span>)}
                    </div>
                  </div>

                  {member.email && (
                    <a className="rh-featured-profile-email" href={`mailto:${member.email}`}>Email <span aria-hidden="true">↗</span></a>
                  )}
                </aside>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Full team directory */}
      <section className="rh-team-section" id="rh-team">
        <div className="rh-section-heading rh-team-heading">
          <div>
            <span className="rh-eyebrow">OUR CREATIVE COLLECTIVE</span>
            <h2>The team <em>directory.</em></h2>
            <p>Explore the people and skills behind every production.</p>
          </div>

          <span className="rh-section-index">02 — THE DIRECTORY</span>
        </div>

        <div className="rh-directory-controls">
          <label className="rh-search-field">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search names, roles, or skills..."
              aria-label="Search team members"
            />
          </label>

          <label className="rh-department-select">
            <span>DEPARTMENT</span>
            <select
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
            >
              {departments.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="rh-results-line">
          <span>
            SHOWING <strong>{String(filteredMembers.length).padStart(2, "0")}</strong> MEMBERS
          </span>
          {(search || department !== "All Departments") && (
            <button
              type="button"
              className="rh-reset-filters"
              onClick={() => {
                setSearch("");
                setDepartment("All Departments");
              }}
            >
              Clear filters ×
            </button>
          )}
        </div>

        {filteredMembers.length > 0 ? (
          <div className="rh-members-grid">
            {filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onOpen={setSelectedMember}
              />
            ))}
          </div>
        ) : (
          <div className="rh-no-results">
            <span className="rh-eyebrow">NO MATCHES FOUND</span>
            <h3>Try a different search.</h3>
            <p>We couldn't find a team member matching those filters.</p>
            <button
              type="button"
              className="rh-button rh-button-outline"
              onClick={() => {
                setSearch("");
                setDepartment("All Departments");
              }}
            >
              View all members
            </button>
          </div>
        )}
      </section>

      {/* Values */}
      <section className="rh-values-section">
        <div className="rh-values-heading">
          <span className="rh-eyebrow">WHAT GUIDES OUR WORK</span>
          <h2>
            Good stories begin
            <br />
            with <em>good people.</em>
          </h2>
        </div>

        <div className="rh-values-grid">
          <article>
            <span className="rh-value-number">01</span>
            <h3>Creative integrity</h3>
            <p>We approach every project with intention, originality, and care.</p>
          </article>
          <article>
            <span className="rh-value-number">02</span>
            <h3>Shared perspective</h3>
            <p>Different skills and ideas make our stories more meaningful.</p>
          </article>
          <article>
            <span className="rh-value-number">03</span>
            <h3>Community first</h3>
            <p>We create media that celebrates people and campus life.</p>
          </article>
        </div>
      </section>

      {/* Contact call to action */}
      <section className="rh-portfolio-cta">
        <span className="rh-eyebrow">HAVE AN IDEA IN MIND?</span>
        <h2>Let's make something <em>meaningful.</em></h2>
        <p>
          Have a story, event, or creative project worth sharing? We'd love to
          hear about it.
        </p>
        <a className="rh-button rh-button-gold" href="/contact">
          Start a conversation <span aria-hidden="true">↗</span>
        </a>
      </section>

      {/* Optional front-end admin workspace */}
      <section className="rh-admin-entry">
        <button
          type="button"
          className="rh-admin-toggle"
          onClick={() => setShowAdmin((visible) => !visible)}
          aria-expanded={showAdmin}
          aria-controls="rh-admin"
        >
          {showAdmin ? "Close portfolio workspace −" : "Portfolio workspace +"}
        </button>
        {showAdmin && (
          <AdminWorkspace
            members={members}
            onSave={saveMember}
            onDelete={deleteMember}
            onToggleFeatured={toggleFeatured}
          />
        )}
      </section>

      <MemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </main>
  );
}
