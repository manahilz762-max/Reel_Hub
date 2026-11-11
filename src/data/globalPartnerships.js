import mouPhoto1 from "../assets/img/mou/WhatsApp Image 2026-11-06 at 9.35.26 PM.jpeg";
import mouPhoto2 from "../assets/img/mou/WhatsApp Image 2026-11-06 at 9.35.27 PM.jpeg";
import mouPhoto3 from "../assets/img/mou/WhatsApp Image 2026-11-06 at 9.35.27 PM (1).jpeg";
import mouPhoto4 from "../assets/img/mou/WhatsApp Image 2026-11-06 at 9.35.27 PM (2).jpeg";
import mouPhoto5 from "../assets/img/mou/WhatsApp Image 2026-11-06 at 9.35.28 PM.jpeg";
import mouPhoto6 from "../assets/img/mou/convo2.webp";
import newMouPhoto1 from "../assets/img/mou/mou-delegation-meeting.jpeg";
import newMouPhoto2 from "../assets/img/mou/mou-international-conference.jpeg";
import newMouPhoto3 from "../assets/img/mou/mou-azerbaijan-university-signing.jpeg";
import newMouPhoto4 from "../assets/img/mou/mou-agreement-exchange.jpeg";
import newMouPhoto5 from "../assets/img/mou/mou-global-sustainability-panel.jpeg";
import newMouPhoto6 from "../assets/img/mou/mou-institutional-meeting.jpeg";

export const PARTNERSHIPS_STORAGE_KEY = "reelhub-global-partnerships";
export const PARTNERSHIP_GALLERY_STORAGE_KEY = "reelhub-partnership-gallery";
const PARTNERSHIP_GALLERY_MIGRATION_KEY = "reelhub-partnership-gallery-seeded-v2";

export const initialPartnershipGallery = [
  { id: "mou-archive-1", image: mouPhoto2, caption: "University representatives exchange a memorandum.", date: "", status: "published" },
  { id: "mou-archive-2", image: mouPhoto4, caption: "A meeting with an international university delegation.", date: "", status: "published" },
  { id: "mou-archive-3", image: mouPhoto3, caption: "Institutional representatives meet during a university visit.", date: "", status: "published" },
  { id: "mou-archive-4", image: mouPhoto5, caption: "University leaders mark an international collaboration.", date: "", status: "published" },
  { id: "mou-archive-5", image: mouPhoto1, caption: "A visiting delegation arrives at the university.", date: "", status: "published" },
  { id: "mou-archive-6", image: mouPhoto6, caption: "Representatives meet for an international partnership discussion.", date: "", status: "published" },
  { id: "mou-submitted-1", image: newMouPhoto1, caption: "Delegates meet for a formal partnership discussion.", date: "", status: "published" },
  { id: "mou-submitted-2", image: newMouPhoto2, caption: "University leaders and guests gather at an international conference.", date: "", status: "published" },
  { id: "mou-submitted-3", image: newMouPhoto3, caption: "Northern University representatives at Baku Eurasia University.", date: "", status: "published" },
  { id: "mou-submitted-4", image: newMouPhoto4, caption: "Representatives exchange a signed agreement.", date: "", status: "published" },
  { id: "mou-submitted-5", image: newMouPhoto5, caption: "Northern University participates in a global sustainability panel.", date: "", status: "published" },
  { id: "mou-submitted-6", image: newMouPhoto6, caption: "An institutional meeting with representatives from Azerbaijan.", date: "", status: "published" },
];

export function readPartnerships() {
  const saved = localStorage.getItem(PARTNERSHIPS_STORAGE_KEY);
  if (!saved) return [];

  const parsed = JSON.parse(saved);
  if (!Array.isArray(parsed)) {
    throw new Error("Saved partnerships have an invalid format.");
  }
  return parsed;
}

export function savePartnerships(partnerships) {
  localStorage.setItem(PARTNERSHIPS_STORAGE_KEY, JSON.stringify(partnerships));
}

export function readPartnershipGallery() {
  const saved = localStorage.getItem(PARTNERSHIP_GALLERY_STORAGE_KEY);
  if (!saved) return initialPartnershipGallery;

  const parsed = JSON.parse(saved);
  if (!Array.isArray(parsed)) {
    throw new Error("Saved partnership gallery has an invalid format.");
  }
  if (localStorage.getItem(PARTNERSHIP_GALLERY_MIGRATION_KEY) === "complete") return parsed;

  const savedIds = new Set(parsed.map((photo) => photo.id));
  const migrated = [...parsed, ...initialPartnershipGallery.filter((photo) => !savedIds.has(photo.id))];
  localStorage.setItem(PARTNERSHIP_GALLERY_STORAGE_KEY, JSON.stringify(migrated));
  localStorage.setItem(PARTNERSHIP_GALLERY_MIGRATION_KEY, "complete");
  return migrated;
}

export function savePartnershipGallery(photos) {
  localStorage.setItem(PARTNERSHIP_GALLERY_STORAGE_KEY, JSON.stringify(photos));
  localStorage.setItem(PARTNERSHIP_GALLERY_MIGRATION_KEY, "complete");
}
