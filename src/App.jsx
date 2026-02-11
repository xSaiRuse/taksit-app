import { useState, useEffect } from "react";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);

  // 🌙 DARK MODE STATE
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // 🌙 DARK MODE EFFECT
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
      
      {/* TOP BAR */}
      <div className="flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-800 transition-colors duration-300">
        <h1 className="text-xl font-bold">Taksit Dashboard</h1>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition-all"
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors duration-300">
          <h2 className="text-lg font-semibold mb-4">Hoşgeldin 👋</h2>
          <p>Dashboard alanın burası.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
