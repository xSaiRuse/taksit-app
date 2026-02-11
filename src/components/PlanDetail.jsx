import { useState } from "react"

export default function PlanDetail({ plan, urunEkle, urunGuncelle }) {

  const [ad, setAd] = useState("")
  const [fiyat, setFiyat] = useState("")
  const [ay, setAy] = useState("")

  const handleEkle = () => {
    if (!ad || !fiyat || !ay) return

    const yeniUrun = {
      ad,
      fiyat: Number(fiyat),
      ay: Number(ay),
      odenenAylar: []
    }

    urunEkle(yeniUrun)
    setAd("")
    setFiyat("")
    setAy("")
  }

  const ayOde = (urunIndex, ayIndex) => {
    const yeniPlan = { ...plan }
    const urun = yeniPlan.urunler[urunIndex]

    if (urun.odenenAylar.includes(ayIndex)) {
      urun.odenenAylar = urun.odenenAylar.filter(a => a !== ayIndex)
    } else {
      urun.odenenAylar.push(ayIndex)
    }

    urunGuncelle(yeniPlan)
  }

  return (
    <div className="bg-white dark:bg-gray-800 
    text-black dark:text-white
    rounded-3xl shadow-2xl p-8 space-y-6 transition">

      <h2 className="text-2xl font-bold tracking-wide">
        {plan.planAdi}
      </h2>

      <div className="grid grid-cols-3 gap-3">
        <input
          placeholder="Ürün"
          value={ad}
          onChange={e => setAd(e.target.value)}
          className="border dark:border-gray-600 bg-transparent p-3 rounded-xl"
        />
        <input
          type="number"
          placeholder="Fiyat"
          value={fiyat}
          onChange={e => setFiyat(e.target.value)}
          className="border dark:border-gray-600 bg-transparent p-3 rounded-xl"
        />
        <input
          type="number"
          placeholder="Ay"
          value={ay}
          onChange={e => setAy(e.target.value)}
          className="border dark:border-gray-600 bg-transparent p-3 rounded-xl"
        />
      </div>

      <button
        onClick={handleEkle}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 
        hover:scale-105 transition-transform text-white py-3 rounded-xl shadow-lg"
      >
        Ürün Ekle
      </button>

      <div className="space-y-5">

        {plan.urunler.map((urun, index) => {

          const aylik = urun.fiyat / urun.ay

          return (
            <div key={index} 
            className="bg-gray-100 dark:bg-gray-700 
            rounded-2xl p-5 space-y-3 shadow-inner">

              <div className="flex justify-between items-center">
                <div className="font-semibold text-lg">
                  {urun.ad}
                </div>
                <div className="text-sm opacity-70">
                  {urun.fiyat.toFixed(2)} ₺ / {urun.ay} Ay
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {[...Array(urun.ay)].map((_, i) => {

                  const odenmisMi = urun.odenenAylar.includes(i)

                  return (
                    <div
                      key={i}
                      onClick={() => ayOde(index, i)}
                      className={`w-9 h-9 rounded-full cursor-pointer 
                      flex items-center justify-center text-xs font-bold
                      transition
                      ${odenmisMi 
                        ? "bg-green-500 scale-110" 
                        : "bg-red-500 hover:scale-110"}`}
                    >
                      {i + 1}
                    </div>
                  )
                })}
              </div>

              <div className="text-sm opacity-70">
                Aylık: {aylik.toFixed(2)} ₺
              </div>

            </div>
          )
        })}

      </div>
    </div>
  )
}
