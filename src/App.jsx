import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import MemberDetail from "./pages/MemberDetail";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/members" element={<Home />} />
          <Route path="/members/:id" element={<MemberDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
