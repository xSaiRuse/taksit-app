import { useState, useEffect } from "react"
import Login from "./components/Login"

function App() {
  const [user, setUser] = useState(null)
  const [planlar, setPlanlar] = useState([])
  const [aktifPlan, setAktifPlan] = useState(null)
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  )

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("darkMode", darkMode)
  }, [darkMode])

  if (!user) {
    return <Login setUser={setUser} />
  }

  const planEkle = () => {
    const yeniPlan = {
      planAdi: "Yeni Plan",
      gelir: 0,
      harcamalar: []
    }
    setPlanlar([...planlar, yeniPlan])
    setAktifPlan(planlar.length)
  }

  const harcamaEkle = (isim, tutar) => {
    const guncel = [...planlar]
    guncel[aktifPlan].harcamalar.push({
      isim,
      tutar: Number(tutar),
      odendi: false
    })
    setPlanlar(guncel)
  }

  const odemeToggle = (index) => {
    const guncel = [...planlar]
    guncel[aktifPlan].harcamalar[index].odendi =
      !guncel[aktifPlan].harcamalar[index].odendi
    setPlanlar(guncel)
  }

  const gelirGuncelle = (deger) => {
    const guncel = [...planlar]
    guncel[aktifPlan].gelir = Number(deger)
    setPlanlar(guncel)
  }

  const aktifPlanData = planlar[aktifPlan]

  const toplamGelir = aktifPlanData?.gelir || 0

  const toplamOdenen =
    aktifPlanData?.harcamalar
      ?.filter((h) => h.odendi)
      .reduce((toplam, h) => toplam + h.tutar, 0) || 0

  const kalanPara = toplamGelir - toplamOdenen

  const odemeYuzde =
    toplamGelir > 0 ? (toplamOdenen / toplamGelir) * 100 : 0

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-all">

      {/* TOP BAR */}
      <div className="flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-800">
        <h1 className="text-xl font-bold">Taksit Dashboard</h1>

        <div className="flex gap-3">
          <button
            onClick={planEkle}
            className="bg-purple-600 text-white px-4 py-2 rounded-xl"
          >
            + Plan
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? "☀" : "🌙"}
          </button>
        </div>
      </div>

      {/* PLAN SEÇİM */}
      <div className="flex gap-2 p-4 flex-wrap">
        {planlar.map((plan, index) => (
          <button
            key={index}
            onClick={() => setAktifPlan(index)}
            className={`px-4 py-2 rounded-xl ${
              aktifPlan === index
                ? "bg-purple-600 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {plan.planAdi}
          </button>
        ))}
      </div>

      {/* PLAN DETAY */}
      {aktifPlan !== null && (
        <div className="p-6">

          {/* GELİR INPUT */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">
              Toplam Gelir
            </label>
            <input
              type="number"
              value={toplamGelir}
              onChange={(e) => gelirGuncelle(e.target.value)}
              className="p-2 rounded border w-full text-black"
            />
          </div>

          {/* ÖZET KARTLAR */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

            <div className="p-5 rounded-2xl shadow-lg bg-green-500 text-white">
              <h3 className="text-sm opacity-80">Toplam Gelir</h3>
              <p className="text-2xl font-bold">{toplamGelir} ₺</p>
            </div>

            <div className="p-5 rounded-2xl shadow-lg bg-red-500 text-white">
              <h3 className="text-sm opacity-80">Ödenen</h3>
              <p className="text-2xl font-bold">{toplamOdenen} ₺</p>
            </div>

            <div className="p-5 rounded-2xl shadow-lg bg-blue-600 text-white">
              <h3 className="text-sm opacity-80">Kalan</h3>
              <p className="text-2xl font-bold">{kalanPara} ₺</p>
            </div>
          </div>

          {/* İLERLEME BAR */}
          <div className="mb-8">
            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4">
              <div
                className="bg-purple-600 h-4 rounded-full transition-all"
                style={{ width: `${odemeYuzde}%` }}
              />
            </div>
            <p className="text-sm mt-2">
              %{odemeYuzde.toFixed(1)} harcandı
            </p>
          </div>

          {/* HARCAMA EKLE */}
          <HarcamaBolum
            harcamaEkle={harcamaEkle}
            harcamalar={aktifPlanData.harcamalar}
            odemeToggle={odemeToggle}
          />
        </div>
      )}
    </div>
  )
}

function HarcamaBolum({ harcamaEkle, harcamalar, odemeToggle }) {
  const [isim, setIsim] = useState("")
  const [tutar, setTutar] = useState("")

  const handleEkle = () => {
    if (!isim || !tutar) return
    harcamaEkle(isim, tutar)
    setIsim("")
    setTutar("")
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Harcamalar</h2>

      <div className="flex gap-2 mb-4">
        <input
          placeholder="Harcama adı"
          value={isim}
          onChange={(e) => setIsim(e.target.value)}
          className="p-2 rounded border w-full text-black"
        />
        <input
          type="number"
          placeholder="Tutar"
          value={tutar}
          onChange={(e) => setTutar(e.target.value)}
          className="p-2 rounded border w-32 text-black"
        />
        <button
          onClick={handleEkle}
          className="bg-purple-600 text-white px-4 rounded"
        >
          Ekle
        </button>
      </div>

      {harcamalar.map((h, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 p-3 rounded mb-2"
        >
          <span>
            {h.isim} - {h.tutar} ₺
          </span>
          <button
            onClick={() => odemeToggle(index)}
            className={`px-3 py-1 rounded ${
              h.odendi ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {h.odendi ? "Ödendi" : "Ödenmedi"}
          </button>
        </div>
      ))}
    </div>
  )
}

export default App
