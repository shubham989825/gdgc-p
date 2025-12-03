import { useEffect } from "react";
import logo from "../assets/gdgc.png"; // your imported logo

export default function SplashScreen({ onFinish }) {
  
  useEffect(() => {
    const timer = setTimeout(onFinish, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center 
      bg-blue-500 dark:bg-gray-900 transition-all duration-300">

      {/* Logo */}
      <img
        src={logo}
        alt="GDGC Logo"
        className="w-[300px] md:w-[450px] mb-6 rounded-lg shadow-lg"
      />

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-gray-200">
        Google Developer Groups
      </h1>

      <p className="text-lg opacity-90 text-white dark:text-gray-400 mt-2">
        Member Directory
      </p>
    </div>
  );
}
