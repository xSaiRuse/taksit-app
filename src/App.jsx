import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

import Login from "./components/Login";
import PlanList from "./components/PlanList";
import PlanDetail from "./components/PlanDetail";

function App() {
  const [user, setUser] = useState(null);
  const [planlar, setPlanlar] = useState([]);
  const [aktifPlan, setAktifPlan] = useState(null);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // 🔐 Auth kontrol
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // 🌙 Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const planEkle = (planAdi) => {
    const yeniPlan = {
      planAdi,
      taksitler: []
    };
    setPlanlar([...planlar, yeniPlan]);
  };

  const planSil = (index) => {
    const yeniPlanlar = planlar.filter((_, i) => i !== index);
    setPlanlar(yeniPlanlar);
    setAktifPlan(null);
  };

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-all">

      {/* TOP BAR */}
      <div className="flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-800">
        <h1 className="text-xl font-bold">Taksit Dashboard</h1>

        <div className="flex gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? "☀" : "🌙"}
          </button>

          <button
            onClick={() => signOut(auth)}
            className="px-4 py-2 rounded bg-red-500 text-white"
          >
            Çıkış
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="grid md:grid-cols-3 gap-6 p-6">
        <div>
          <PlanList
            planlar={planlar}
            aktifPlan={aktifPlan}
            setAktifPlan={setAktifPlan}
            planEkle={planEkle}
            planSil={planSil}
            darkMode={darkMode}
          />
        </div>

        <div className="md:col-span-2">
          {aktifPlan !== null && (
            <PlanDetail
              plan={planlar[aktifPlan]}
              setPlanlar={setPlanlar}
              planlar={planlar}
              aktifPlan={aktifPlan}
              darkMode={darkMode}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
