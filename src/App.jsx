import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

import Login from "./components/Login";
import PlanList from "./components/PlanList";
import PlanDetail from "./components/PlanDetail";
import ChartComponent from "./components/ChartComponent";

export default function App() {
  const [user, setUser] = useState(null);

  // 🔐 Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 🌙 DARK MODE
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

  // 📦 PLAN STATE
  const [planlar, setPlanlar] = useState(() => {
    const kayitli = localStorage.getItem("planlar");
    return kayitli ? JSON.parse(kayitli) : [];
  });

  const [aktifPlan, setAktifPlan] = useState(0);

  const plan = planlar[aktifPlan];

  useEffect(() => {
    localStorage.setItem("planlar", JSON.stringify(planlar));
  }, [planlar]);

  // ➕ PLAN EKLE
  const planEkle = (isim) => {
    const yeniPlan = {
      planAdi: isim,
      urunler: [],
    };
    setPlanlar([...planlar, yeniPlan]);
  };

  // ❌ PLAN SİL
  const planSil = (index) => {
    const yeniPlanlar = planlar.filter((_, i) => i !== index);
    setPlanlar(yeniPlanlar);
    setAktifPlan(0);
  };

  // ➕ ÜRÜN EKLE
  const urunEkle = (urun) => {
    const yeniPlanlar = [...planlar];
    yeniPlanlar[aktifPlan].urunler.push(urun);
    setPlanlar(yeniPlanlar);
  };

  // 🔄 PLAN GÜNCELLE
  const planGuncelle = (guncelPlan) => {
    const yeniPlanlar = [...planlar];
    yeniPlanlar[aktifPlan] = guncelPlan;
    setPlanlar(yeniPlanlar);
  };

  // 🔐 Login ekranı
  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">

      {/* TOP BAR */}
      <div className="flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-800">
        <h1 className="text-xl font-bold">Taksit Dashboard</h1>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition-all"
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>

          <button
            onClick={() => signOut(auth)}
            className="px-4 py-2 rounded bg-red-500 text-white hover:opacity-80"
          >
            Çıkış
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto p-6 space-y-6">

        <PlanList
          planlar={planlar}
          aktifPlan={aktifPlan}
          setAktifPlan={setAktifPlan}
          planEkle={planEkle}
          planSil={planSil}
          darkMode={darkMode}
        />

        {plan && (
          <>
            <PlanDetail
              plan={plan}
              urunEkle={urunEkle}
              urunGuncelle={planGuncelle}
              darkMode={darkMode}
            />

            <ChartComponent
              plan={plan}
              darkMode={darkMode}
            />
          </>
        )}

      </div>
    </div>
  );
}
