import { useEffect, useState } from "react";
import MemberCard from "../components/MemberCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";

export default function Home() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [skill, setSkill] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://your-backend-url.com/members")
      .then(res => res.json())
      .then(data => {
        setMembers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch members");
        setLoading(false);
      });
  }, []);

  const filtered = members.filter((m) =>
    (m.name.toLowerCase().includes(search.toLowerCase()) ||
     m.bio.toLowerCase().includes(search.toLowerCase())) &&
    (role ? m.role === role : true) &&
    (skill ? m.skills.includes(skill) : true)
  );

  if (loading) return <p className="text-center mt-10">Loading…</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <SearchBar search={search} setSearch={setSearch} />
      <div className="my-4">
        <Filters role={role} setRole={setRole} skill={skill} setSkill={setSkill} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(member => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
