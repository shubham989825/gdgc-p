import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import ThemeToggle from "./components/ThemeToggle";
import Home from "./pages/Home";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;

  return (
    <div className="p-4">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>
      <Home />
    </div>
  );
}


 
