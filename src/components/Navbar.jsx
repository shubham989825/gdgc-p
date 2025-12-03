// src/components/Navbar.jsx
import { useState, useEffect } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <nav className="p-4 flex justify-end">
      <button 
        onClick={() => setDarkMode(!darkMode)} 
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
}

