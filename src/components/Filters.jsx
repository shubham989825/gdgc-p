export default function Filters({ role, setRole, skill, setSkill }) {
  return (
    <div className="flex gap-4">
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
      >
        <option value="">All Roles</option>
        <option value="Lead">Lead</option>
        <option value="Co-Lead">Co-Lead</option>
        <option value="Member">Member</option>
      </select>

      <select
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        className="p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
      >
        <option value="">All Skills</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
        <option value="UI/UX">UI/UX</option>
      </select>
    </div>
  );
}
