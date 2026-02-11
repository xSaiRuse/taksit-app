import { useState, useEffect } from "react";
import Login from "./components/Login";
import PlanList from "./components/PlanList";

function App() {
  const [user, setUser] = useState(null);

  const [planlar, setPlanlar] = useState([]);
  const [aktifPlan, setAktifPlan] = useState(null);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const planEkle = (planAdi) => {
    setPlanlar([...planlar, { planAdi }]);
  };

  const planSil = (index) => {
    const yeniPlanlar = [...planlar];
    yeniPlanlar.splice(index, 1);
    setPlanlar(yeniPlanlar);
  };

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
      
      {/* TOP BAR */}
      <div className="flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-800">
        <h1 className="text-xl font-bold">Taksit Dashboard</h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <PlanList
          planlar={planlar}
          aktifPlan={aktifPlan}
          setAktifPlan={setAktifPlan}
          planEkle={planEkle}
          planSil={planSil}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}

export default App;
