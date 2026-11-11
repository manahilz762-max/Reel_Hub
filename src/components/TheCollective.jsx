
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const members = [
  { name: "Team Member One", role: "Creative Direction", image: "/images/team-01.jpg" },
  { name: "Team Member Two", role: "Photography & Film", image: "/images/team-02.jpg" },
  { name: "Team Member Three", role: "Design & Content", image: "/images/team-03.jpg" },
];

export default function TheCollective() {
  return (
    <section className="collective-section section-pad">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE PEOPLE BEHIND THE STORIES</p>
          <h2>The <em>Collective.</em></h2>
        </div>
        <Link to="/portfolios" className="text-link">
          Meet everyone <ArrowUpRight size={16} />
        </Link>
      </div>

      <p className="collective-intro">
        Different talents. Different perspectives. One creative vision.
      </p>

      <div className="team-grid">
        {members.map((member, index) => (
          <article className="team-card" key={member.name}>
            <div className="team-image">
              <img src={member.image} alt={member.name} loading="lazy" />
            </div>
            <p className="eyebrow">MEMBER 0{index + 1}</p>
            <h3>{member.name}</h3>
            <p className="team-role">{member.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
