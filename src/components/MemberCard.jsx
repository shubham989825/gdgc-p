export default function MemberCard({ member }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-xl">
      <img
        src={member.photo}
        alt={member.name}
        className="h-32 w-32 rounded-full mx-auto"
      />

      <h2 className="text-xl font-semibold text-center mt-2">{member.name}</h2>
      <p className="text-center text-blue-600">{member.role}</p>

      <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
        {member.bio}
      </p>

      <div className="mt-2 flex flex-wrap gap-2 justify-center">
        {member.skills.map((skill, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-blue-100 dark:bg-gray-700 rounded-md text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
