import { useState, useEffect } from "react"
import Login from "./components/Login"

function App() {
  const [user, setUser] = useState(null)
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  )

  const [harcamalar, setHarcamalar] = useState([])

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

  const harcamaEkle = (harcama) => {
    setHarcamalar([...harcamalar, harcama])
  }

  const odemeToggle = (index) => {
    const guncel = [...harcamalar]
    guncel[index].odendi = !guncel[index].odendi
    setHarcamalar(guncel)
  }

  const aylikToplam = harcamalar.reduce(
    (toplam, h) => toplam + (h.aylik || h.tutar),
    0
  )

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

      <div className="p-6 max-w-4xl mx-auto">

        {/* AYLIK TOPLAM */}
        <div className="mb-6 p-4 bg-indigo-600 text-white rounded-xl shadow">
          <h3 className="text-sm opacity-80">Toplam Aylık Taksit</h3>
          <p className="text-2xl font-bold">
            {aylikToplam.toFixed(2)} ₺
          </p>
        </div>

        {/* HARCAMA EKLE */}
        <HarcamaBolum
          harcamaEkle={harcamaEkle}
          harcamalar={harcamalar}
          odemeToggle={odemeToggle}
        />

      </div>
    </div>
  )
}

function HarcamaBolum({ harcamaEkle, harcamalar, odemeToggle }) {
  const [isim, setIsim] = useState("")
  const [tutar, setTutar] = useState("")
  const [taksit, setTaksit] = useState(1)

  const handleEkle = () => {
    if (!isim || !tutar) return

    harcamaEkle({
      isim,
      tutar: Number(tutar),
      taksit: Number(taksit),
      aylik: Number(tutar) / Number(taksit),
      odendi: false
    })

    setIsim("")
    setTutar("")
    setTaksit(1)
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow space-y-4">

      <h2 className="text-lg font-bold">Harcamalar</h2>

      <div className="flex gap-2 flex-wrap">
        <input
          placeholder="Harcama adı"
          value={isim}
          onChange={(e) => setIsim(e.target.value)}
          className="p-2 rounded border text-black"
        />

        <input
          type="number"
          placeholder="Toplam Tutar"
          value={tutar}
          onChange={(e) => setTutar(e.target.value)}
          className="p-2 rounded border w-32 text-black"
        />

        <input
          type="number"
          placeholder="Taksit"
          value={taksit}
          min="1"
          onChange={(e) => setTaksit(e.target.value)}
          className="p-2 rounded border w-24 text-black"
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
          className="bg-gray-200 dark:bg-gray-700 p-4 rounded"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{h.isim}</p>
              <p className="text-sm">
                Toplam: {h.tutar} ₺
              </p>
              <p className="text-sm">
                {h.taksit} taksit • Aylık: {h.aylik.toFixed(2)} ₺
              </p>
            </div>

            <button
              onClick={() => odemeToggle(index)}
              className={`px-3 py-1 rounded ${
                h.odendi
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {h.odendi ? "Ödendi" : "Ödenmedi"}
            </button>
          </div>
        </div>
      ))}

    </div>
  )
}

export default App
