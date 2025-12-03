import { useState } from "react";
import SplashScreen from "../../frontend/components/SplashScreen";
import ThemeToggle from "../../frontend/components/ThemeToggle";
import Home from "../../frontend/pages/Home";

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


 
