export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by name or bio…"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
    />
  );
}
