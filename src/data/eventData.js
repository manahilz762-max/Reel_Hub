import campusPhoto from "../assets/img/Team Pictures/Team Lead.jpeg";
import teamPhoto from "../assets/img/Team Pictures/team.jpeg";
import productionPhoto from "../assets/img/Team Pictures/production.jpeg";

const photographs = (eventName, category, images) =>
  images.map((src, index) => ({
    id: `${eventName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-photo-${index + 1}`,
    src,
    caption: `${eventName} photograph ${String(index + 1).padStart(2, "0")}`,
    category,
  }));

export const eventData = [
  {
    slug: "convocation",
    title: "Convocation Ceremony",
    category: "Academic Celebrations",
    description: "Celebrating achievements, new beginnings and the memories of a remarkable academic journey.",
    photographs: photographs("Convocation", "Academic Celebrations", [campusPhoto, productionPhoto]),
    videos: [],
  },
  {
    slug: "sports-gala",
    title: "Sports Gala",
    category: "Campus Energy",
    description: "The energy, competition and unforgettable moments that bring our university community together.",
    photographs: photographs("Sports Gala", "Campus Energy", [productionPhoto]),
    videos: [
      
    ],
  },
  {
    slug: "welcome-party",
    title: "Welcome Party",
    category: "Student Life",
    description: "A celebration of new faces, friendships and the beginning of a new university chapter.",
    photographs: photographs("Welcome Party", "Student Life", [teamPhoto]),
    videos: [],
  },
  {
    slug: "seminars",
    title: "Seminars & Workshops",
    category: "Learning & Ideas",
    description: "Capturing ideas, learning experiences and conversations that inspire our community.",
    photographs: photographs("Seminars and Workshops", "Learning & Ideas", [productionPhoto]),
    videos: [],
  },
  {
    slug: "cultural-events",
    title: "Cultural Events",
    category: "Culture & Community",
    description: "A collection of traditions, performances and celebrations from across our campus.",
    photographs: photographs("Cultural Events", "Culture & Community", [teamPhoto]),
    videos: [],
  },
  {
    slug: "official-meetings",
    title: "Official Meetings",
    category: "University Highlights",
    description: "Documenting important university gatherings, visits and institutional moments.",
    photographs: photographs("Official Meetings", "University Highlights", [campusPhoto]),
    videos: [],
  },
];

export default eventData;
