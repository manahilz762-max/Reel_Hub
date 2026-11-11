import { useState } from "react";
import {
  PARTNERSHIPS_STORAGE_KEY,
  PARTNERSHIP_GALLERY_STORAGE_KEY,
  readPartnershipGallery,
  readPartnerships,
  savePartnershipGallery,
  savePartnerships,
} from "../data/globalPartnerships";
import "./GlobalPartnershipManager.css";

const emptyAgreement = () => ({
  id: `agreement-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  title: "",
  signingDate: "",
  mouDocument: "",
});

const emptyPartnership = () => ({
  id: "",
  universityName: "",
  country: "",
  countryCode: "",
  latitude: "",
  longitude: "",
  northernUniversityLogo: "",
  partnerUniversityLogo: "",
  coverImage: "",
  description: "",
  collaborationAreas: [],
  featured: false,
  status: "draft",
  agreements: [emptyAgreement()],
  signingGallery: [],
});

function loadInitialRecords() {
  const result = { records: [], gallery: [], errors: [] };
  try {
    result.records = readPartnerships();
  } catch (loadError) {
    result.errors.push(`Could not load partnerships: ${loadError.message}`);
  }
  try {
    result.gallery = readPartnershipGallery();
  } catch (loadError) {
    result.errors.push(`Could not load partnership gallery: ${loadError.message}`);
  }
  return { ...result, error: result.errors.join(" ") };
}

function readFile(file, acceptedType, setError, onLoad) {
  if (!file) return;
  if (!acceptedType(file)) {
    setError("Choose a supported file type.");
    return;
  }
  if (file.size > 1024 * 1024) {
    setError("Please choose a file smaller than 1 MB to fit browser storage limits.");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => onLoad(String(reader.result));
  reader.onerror = () => setError(`Could not read ${file.name}.`);
  reader.readAsDataURL(file);
}

export default function GlobalPartnershipManager() {
  const [initialState] = useState(loadInitialRecords);
  const [records, setRecords] = useState(initialState.records);
  const [galleryItems, setGalleryItems] = useState(initialState.gallery);
  const [form, setForm] = useState(emptyPartnership);
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState(false);
  const [galleryForm, setGalleryForm] = useState({ id: "", image: "", caption: "", date: "", status: "draft" });
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState(initialState.error);

  function persist(nextRecords) {
    try {
      savePartnerships(nextRecords);
      setRecords(nextRecords);
      setError("");
      return true;
    } catch (saveError) {
      setError(`Could not save partnerships in this browser: ${saveError.message}`);
      return false;
    }
  }

  function persistGallery(nextGallery) {
    try {
      savePartnershipGallery(nextGallery);
      setGalleryItems(nextGallery);
      setError("");
      return true;
    } catch (saveError) {
      setError(`Could not save gallery in this browser: ${saveError.message}`);
      return false;
    }
  }

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateAgreement(index, field, value) {
    setForm((current) => ({
      ...current,
      agreements: current.agreements.map((agreement, agreementIndex) =>
        agreementIndex === index ? { ...agreement, [field]: value } : agreement
      ),
    }));
  }

  function updateGallery(index, field, value) {
    setForm((current) => ({
      ...current,
      signingGallery: current.signingGallery.map((photo, photoIndex) =>
        photoIndex === index ? { ...photo, [field]: value } : photo
      ),
    }));
  }

  function handleUpload(event, onLoad, acceptedType) {
    const file = event.target.files?.[0];
    readFile(file, acceptedType, setError, (value) => {
      onLoad(value);
      setError("");
    });
    event.target.value = "";
  }

  function editRecord(record) {
    setForm({
      ...emptyPartnership(),
      ...record,
      collaborationAreas: record.collaborationAreas || [],
      agreements: record.agreements?.length ? record.agreements : [emptyAgreement()],
      signingGallery: record.signingGallery || [],
    });
    setEditingId(record.id);
    setNotice("");
    setError("");
    document.getElementById("global-partnership-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function clearForm() {
    setForm(emptyPartnership());
    setEditingId(null);
    setPreview(false);
    setNotice("");
  }

  function submitForm(event) {
    event.preventDefault();
    const universityName = form.universityName.trim();
    const country = form.country.trim();
    if (!universityName || !country) {
      setError("Enter the partner university and country.");
      return;
    }

    const now = new Date().toISOString();
    const record = {
      ...form,
      id: editingId || `partner-${Date.now()}`,
      universityName,
      country,
      countryCode: form.countryCode.trim().toUpperCase(),
      description: form.description.trim(),
      collaborationAreas: Array.isArray(form.collaborationAreas)
        ? form.collaborationAreas
        : form.collaborationAreas.split(",").map((area) => area.trim()).filter(Boolean),
      agreements: form.agreements
        .filter((agreement) => agreement.title.trim() || agreement.signingDate || agreement.mouDocument)
        .map((agreement) => ({ ...agreement, title: agreement.title.trim() })),
      signingGallery: form.signingGallery.filter((photo) => photo.image),
      latitude: form.latitude === "" ? "" : Number(form.latitude),
      longitude: form.longitude === "" ? "" : Number(form.longitude),
      createdAt: editingId
        ? records.find((item) => item.id === editingId)?.createdAt || now
        : now,
      updatedAt: now,
    };
    const nextRecords = editingId
      ? records.map((item) => item.id === editingId ? record : item)
      : [...records, record];

    if (persist(nextRecords)) {
      setNotice(editingId ? "Partnership updated." : "Partnership saved.");
      clearForm();
    }
  }

  function changeStatus(record, status) {
    const nextRecords = records.map((item) =>
      item.id === record.id ? { ...item, status, updatedAt: new Date().toISOString() } : item
    );
    if (persist(nextRecords)) setNotice(`${record.universityName} is now ${status}.`);
  }

  function deleteRecord(record) {
    if (!window.confirm(`Delete the partnership with ${record.universityName}?`)) return;
    if (persist(records.filter((item) => item.id !== record.id))) {
      if (editingId === record.id) clearForm();
      setNotice("Partnership deleted.");
    }
  }

  function saveGalleryPhoto(event) {
    event.preventDefault();
    if (!galleryForm.image || !galleryForm.caption.trim()) {
      setError("Choose a gallery image and add a caption.");
      return;
    }
    const photo = {
      ...galleryForm,
      id: editingGalleryId || `gallery-${Date.now()}`,
      caption: galleryForm.caption.trim(),
      updatedAt: new Date().toISOString(),
    };
    const nextGallery = editingGalleryId
      ? galleryItems.map((item) => item.id === editingGalleryId ? photo : item)
      : [...galleryItems, photo];
    if (persistGallery(nextGallery)) {
      setGalleryForm({ id: "", image: "", caption: "", date: "", status: "draft" });
      setEditingGalleryId(null);
      setNotice(editingGalleryId ? "Gallery photo updated." : "Gallery photo saved as a draft.");
    }
  }

  function editGalleryPhoto(photo) {
    setGalleryForm({ ...photo });
    setEditingGalleryId(photo.id);
    setError("");
  }

  function changeGalleryStatus(photo, status) {
    const nextGallery = galleryItems.map((item) => item.id === photo.id ? { ...item, status } : item);
    if (persistGallery(nextGallery)) setNotice(`Gallery photo ${status}.`);
  }

  function deleteGalleryPhoto(photo) {
    if (!window.confirm(`Delete the gallery photo “${photo.caption}”?`)) return;
    if (persistGallery(galleryItems.filter((item) => item.id !== photo.id))) {
      if (editingGalleryId === photo.id) {
        setEditingGalleryId(null);
        setGalleryForm({ id: "", image: "", caption: "", date: "", status: "draft" });
      }
      setNotice("Gallery photo deleted.");
    }
  }

  return (
    <section className="partnership-manager" aria-labelledby="partnership-manager-title">
      <header className="partnership-manager-heading">
        <div>
          <span className="partnership-manager-kicker">GLOBAL PARTNERSHIPS</span>
          <h2 id="partnership-manager-title">MOU management</h2>
          <p>Manage partner university profiles and their individual agreements.</p>
        </div>
        <span className="partnership-manager-count">{records.length} {records.length === 1 ? "partner" : "partners"}</span>
      </header>

      <p className="partnership-manager-storage-note">
        This project currently saves records in this browser only. This is not a shared database or an authenticated admin system.
        Keep uploads under 1 MB; large or frequent uploads may exceed browser storage.
      </p>
      {error && <p className="partnership-manager-message is-error" role="alert">{error}</p>}
      {notice && <p className="partnership-manager-message" role="status">{notice}</p>}

      <div className="partnership-manager-list">
        {records.length === 0 ? (
          <p className="partnership-manager-empty">No partnership records yet. Add verified information below; unpublished drafts stay off the public page.</p>
        ) : records.map((record) => (
          <article className="partnership-manager-record" key={record.id}>
            {record.partnerUniversityLogo && <img src={record.partnerUniversityLogo} alt="" />}
            <div className="partnership-manager-record-copy">
              <strong>{record.universityName}</strong>
              <span>{record.country} · {record.agreements?.length || 0} agreements · {record.status}</span>
            </div>
            <div className="partnership-manager-record-actions">
              <button type="button" onClick={() => editRecord(record)}>Edit</button>
              <button type="button" onClick={() => changeStatus(record, record.status === "published" ? "draft" : "published")}>
                {record.status === "published" ? "Unpublish" : "Publish"}
              </button>
              <button type="button" onClick={() => deleteRecord(record)}>Delete</button>
            </div>
          </article>
        ))}
      </div>

      <section className="partnership-gallery-manager" aria-labelledby="partnership-gallery-manager-title">
        <div className="partnership-manager-subheading">
          <div>
            <span className="partnership-manager-kicker">SIGNING PHOTOGRAPHS</span>
            <h3 id="partnership-gallery-manager-title">Manage public gallery</h3>
          </div>
          <span className="partnership-manager-count">{galleryItems.length} photos</span>
        </div>
        <div className="partnership-gallery-list">
          {galleryItems.map((photo) => (
            <article className="partnership-gallery-record" key={photo.id}>
              <img src={photo.image} alt="" />
              <div><strong>{photo.caption}</strong><span>{photo.date || "Date not provided"} · {photo.status}</span></div>
              <div className="partnership-manager-record-actions">
                <button type="button" onClick={() => editGalleryPhoto(photo)}>Edit</button>
                <button type="button" onClick={() => changeGalleryStatus(photo, photo.status === "published" ? "draft" : "published")}>{photo.status === "published" ? "Unpublish" : "Publish"}</button>
                <button type="button" onClick={() => deleteGalleryPhoto(photo)}>Delete</button>
              </div>
            </article>
          ))}
        </div>
        <form className="partnership-gallery-form" onSubmit={saveGalleryPhoto}>
          <h4>{editingGalleryId ? "Edit gallery photo" : "Add a gallery photo"}</h4>
          <div className="partnership-manager-fields">
            <label>Image URL
              <input value={galleryForm.image.startsWith("data:") ? "" : galleryForm.image} onChange={(event) => setGalleryForm((current) => ({ ...current, image: event.target.value }))} placeholder="Optional" />
            </label>
            <label>Image upload (max 1 MB)
              <input type="file" accept="image/*" onChange={(event) => handleUpload(event, (image) => setGalleryForm((current) => ({ ...current, image })), (file) => file.type.startsWith("image/"))} />
            </label>
            <label>Caption
              <input value={galleryForm.caption} onChange={(event) => setGalleryForm((current) => ({ ...current, caption: event.target.value }))} required />
            </label>
            <label>Photo date
              <input type="date" value={galleryForm.date} onChange={(event) => setGalleryForm((current) => ({ ...current, date: event.target.value }))} />
            </label>
          </div>
          <div className="partnership-manager-form-actions">
            <button type="submit">{editingGalleryId ? "Save gallery photo" : "Save as draft"}</button>
            {editingGalleryId && <button type="button" onClick={() => { setEditingGalleryId(null); setGalleryForm({ id: "", image: "", caption: "", date: "", status: "draft" }); }}>Cancel editing</button>}
          </div>
        </form>
      </section>

      <form className="partnership-manager-form" id="global-partnership-form" onSubmit={submitForm}>
        <div className="partnership-manager-form-title">
          <span className="partnership-manager-kicker">{editingId ? "UPDATE PARTNER" : "ADD PARTNER"}</span>
          <h3>{editingId ? "Edit university profile" : "Create a university profile"}</h3>
        </div>

        <div className="partnership-manager-fields">
          <label>Partner university name
            <input value={form.universityName} onChange={(event) => updateForm("universityName", event.target.value)} required />
          </label>
          <label>Country
            <input value={form.country} onChange={(event) => updateForm("country", event.target.value)} required />
          </label>
          <label>Country code
            <input value={form.countryCode} onChange={(event) => updateForm("countryCode", event.target.value)} maxLength={3} placeholder="Optional" />
          </label>
          <label>Map latitude
            <input type="number" min="-90" max="90" step="any" value={form.latitude} onChange={(event) => updateForm("latitude", event.target.value)} placeholder="Optional" />
          </label>
          <label>Map longitude
            <input type="number" min="-180" max="180" step="any" value={form.longitude} onChange={(event) => updateForm("longitude", event.target.value)} placeholder="Optional" />
          </label>
          <label>Northern University logo URL
            <input value={form.northernUniversityLogo} onChange={(event) => updateForm("northernUniversityLogo", event.target.value)} placeholder="Optional" />
          </label>
          <label>Northern University logo upload (max 1 MB)
            <input type="file" accept="image/*" onChange={(event) => handleUpload(event, (image) => updateForm("northernUniversityLogo", image), (file) => file.type.startsWith("image/"))} />
          </label>
          <label>Partner logo URL
            <input value={form.partnerUniversityLogo} onChange={(event) => updateForm("partnerUniversityLogo", event.target.value)} placeholder="Optional" />
          </label>
          <label>Partner logo upload (max 1 MB)
            <input type="file" accept="image/*" onChange={(event) => handleUpload(event, (image) => updateForm("partnerUniversityLogo", image), (file) => file.type.startsWith("image/"))} />
          </label>
          <label>Cover image URL
            <input value={form.coverImage} onChange={(event) => updateForm("coverImage", event.target.value)} placeholder="Optional" />
          </label>
          <label>Cover image upload (max 1 MB)
            <input type="file" accept="image/*" onChange={(event) => handleUpload(event, (image) => updateForm("coverImage", image), (file) => file.type.startsWith("image/"))} />
          </label>
          <label className="partnership-manager-wide">Description
            <textarea value={form.description} onChange={(event) => updateForm("description", event.target.value)} rows="4" />
          </label>
          <label className="partnership-manager-wide">Collaboration areas (comma-separated)
            <input value={Array.isArray(form.collaborationAreas) ? form.collaborationAreas.join(", ") : form.collaborationAreas} onChange={(event) => updateForm("collaborationAreas", event.target.value)} placeholder="Academic collaboration, research..." />
          </label>
          <label className="partnership-manager-checkbox">
            <input type="checkbox" checked={form.featured} onChange={(event) => updateForm("featured", event.target.checked)} />
            Feature this partner on the public page
          </label>
        </div>

        <div className="partnership-manager-subsection">
          <div className="partnership-manager-subheading">
            <h4>Individual MOU agreements</h4>
            <button type="button" onClick={() => setForm((current) => ({ ...current, agreements: [...current.agreements, emptyAgreement()] }))}>Add agreement</button>
          </div>
          {form.agreements.map((agreement, index) => (
            <div className="partnership-manager-agreement" key={agreement.id}>
              <label>Agreement title
                <input value={agreement.title} onChange={(event) => updateAgreement(index, "title", event.target.value)} placeholder="Optional title" />
              </label>
              <label>Signing date
                <input type="date" value={agreement.signingDate} onChange={(event) => updateAgreement(index, "signingDate", event.target.value)} />
              </label>
              <label>MOU document URL
                <input value={agreement.mouDocument} onChange={(event) => updateAgreement(index, "mouDocument", event.target.value)} placeholder="Optional" />
              </label>
              <label>MOU PDF upload (max 1 MB)
                <input type="file" accept="application/pdf" onChange={(event) => handleUpload(event, (documentUrl) => updateAgreement(index, "mouDocument", documentUrl), (file) => file.type === "application/pdf")} />
              </label>
              {form.agreements.length > 1 && <button className="partnership-manager-remove" type="button" onClick={() => setForm((current) => ({ ...current, agreements: current.agreements.filter((_, agreementIndex) => agreementIndex !== index) }))}>Remove agreement</button>}
            </div>
          ))}
        </div>

        <div className="partnership-manager-subsection">
          <div className="partnership-manager-subheading">
            <h4>Signing gallery</h4>
            <button type="button" onClick={() => setForm((current) => ({ ...current, signingGallery: [...current.signingGallery, { id: `photo-${Date.now()}`, image: "", caption: "", date: "" }] }))}>Add photo</button>
          </div>
          {form.signingGallery.map((photo, index) => (
            <div className="partnership-manager-agreement" key={photo.id}>
              <label>Photo URL
                <input value={photo.image} onChange={(event) => updateGallery(index, "image", event.target.value)} placeholder="Optional" />
              </label>
              <label>Photo upload (max 1 MB)
                <input type="file" accept="image/*" onChange={(event) => handleUpload(event, (image) => updateGallery(index, "image", image), (file) => file.type.startsWith("image/"))} />
              </label>
              <label>Caption
                <input value={photo.caption} onChange={(event) => updateGallery(index, "caption", event.target.value)} />
              </label>
              <label>Photo date
                <input type="date" value={photo.date} onChange={(event) => updateGallery(index, "date", event.target.value)} />
              </label>
              <button className="partnership-manager-remove" type="button" onClick={() => setForm((current) => ({ ...current, signingGallery: current.signingGallery.filter((_, photoIndex) => photoIndex !== index) }))}>Remove photo</button>
            </div>
          ))}
        </div>

        <div className="partnership-manager-form-actions">
          <button type="submit">{editingId ? "Save changes" : "Save as draft"}</button>
          <button type="button" onClick={clearForm}>Clear form</button>
          <button type="button" onClick={() => setPreview((current) => !current)}>{preview ? "Hide preview" : "Preview"}</button>
        </div>
        {preview && (
          <article className="partnership-manager-preview" aria-label="Partnership preview">
            <span className="partnership-manager-kicker">PREVIEW · NOT PUBLISHED</span>
            <div className="partnership-manager-preview-logos">
              {form.northernUniversityLogo && <img src={form.northernUniversityLogo} alt="Northern University logo preview" />}
              {form.partnerUniversityLogo && <img src={form.partnerUniversityLogo} alt={`${form.universityName || "Partner"} logo preview`} />}
            </div>
            <h4>{form.universityName || "Partner university name"}</h4>
            <p>{form.country ? `${countryFlagPreview(form.countryCode)} ${form.country}` : "Country not provided"}</p>
            <p>{form.description || "Partnership description preview."}</p>
            {form.collaborationAreas?.length > 0 && <p>Collaboration areas: {Array.isArray(form.collaborationAreas) ? form.collaborationAreas.join(", ") : form.collaborationAreas}</p>}
            <ul>{form.agreements.filter((agreement) => agreement.title || agreement.signingDate).map((agreement) => (
              <li key={agreement.id}>{agreement.title || "Memorandum of Understanding"}{agreement.signingDate ? ` · ${agreement.signingDate}` : ""}</li>
            ))}</ul>
          </article>
        )}
      </form>

      <small className="partnership-manager-key-note">Storage key: {PARTNERSHIPS_STORAGE_KEY}</small>
      <small className="partnership-manager-key-note">Gallery storage key: {PARTNERSHIP_GALLERY_STORAGE_KEY}</small>
    </section>
  );
}

function countryFlagPreview(code) {
  if (!/^[A-Z]{2}$/.test(code || "")) return "";
  return String.fromCodePoint(...[...code.toUpperCase()].map((letter) => letter.charCodeAt(0) + 127397));
}
