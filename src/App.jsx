import { useState, useEffect } from "react"
import PlanList from "./components/PlanList"
import PlanDetail from "./components/PlanDetail"
import ChartComponent from "./components/ChartComponent"

export default function App() {

  // PLANLAR
  const [planlar, setPlanlar] = useState(() => {
    const kayitli = localStorage.getItem("planlar")
    return kayitli ? JSON.parse(kayitli) : []
  })

  const [aktifPlan, setAktifPlan] = useState(0)

  // DARK MODE
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark"
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  // PLANLARI KAYDET
  useEffect(() => {
    localStorage.setItem("planlar", JSON.stringify(planlar))
  }, [planlar])

  // AKTİF PLAN
  const plan = planlar.length > 0
    ? planlar[Math.min(aktifPlan, planlar.length - 1)]
    : null

  // PLAN EKLE
  const planEkle = (isim) => {
    const yeniPlan = {
      planAdi: isim,
      urunler: []
    }
    setPlanlar([...planlar, yeniPlan])
    setAktifPlan(planlar.length)
  }

  // PLAN SİL
  const planSil = (index) => {
    const yeniPlanlar = planlar.filter((_, i) => i !== index)
    setPlanlar(yeniPlanlar)
    setAktifPlan(0)
  }

  // ÜRÜN EKLE
  const urunEkle = (urun) => {
    const yeniPlanlar = [...planlar]
    yeniPlanlar[aktifPlan].urunler.push(urun)
    setPlanlar(yeniPlanlar)
  }

  // PLAN GÜNCELLE
  const planGuncelle = (guncelPlan) => {
    const yeniPlanlar = [...planlar]
    yeniPlanlar[aktifPlan] = guncelPlan
    setPlanlar(yeniPlanlar)
  }

  return (
    <div className="min-h-screen 
      bg-gradient-to-br from-purple-500 to-indigo-600 
      dark:from-gray-900 dark:to-black 
      p-6 transition-colors duration-300">

      <div className="max-w-3xl mx-auto space-y-4">

        {/* DARK MODE BUTTON */}
        <div className="flex justify-end">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-white dark:bg-gray-800 
            text-black dark:text-white 
            px-4 py-2 rounded-xl shadow-lg transition"
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* PLAN LIST HER ZAMAN GÖRÜNÜR */}
        <PlanList
          planlar={planlar}
          aktifPlan={aktifPlan}
          setAktifPlan={setAktifPlan}
          planEkle={planEkle}
          planSil={planSil}
        />

        {/* PLAN VARSA DETAY VE GRAFİK */}
        {plan ? (
          <>
            <PlanDetail
              plan={plan}
              urunEkle={urunEkle}
              urunGuncelle={planGuncelle}
            />

            <ChartComponent
              plan={plan}
            />
          </>
        ) : (
          <div className="bg-white dark:bg-gray-800 
            text-black dark:text-white
            rounded-2xl shadow-xl p-6 text-center">
            Henüz plan yok. Yukarıdan yeni plan ekleyin.
          </div>
        )}

      </div>
    </div>
  )
}
