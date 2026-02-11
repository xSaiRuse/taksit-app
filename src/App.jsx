import { useState, useEffect } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "./firebase"

import PlanList from "./components/PlanList"
import PlanDetail from "./components/PlanDetail"
import ChartComponent from "./components/ChartComponent"
import Login from "./components/Login"

export default function App() {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const [planlar, setPlanlar] = useState(() => {
    const kayitli = localStorage.getItem("planlar")
    return kayitli
      ? JSON.parse(kayitli)
      : [{ planAdi: "İlk Plan", urunler: [] }]
  })

  const [aktifPlan, setAktifPlan] = useState(0)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    localStorage.setItem("planlar", JSON.stringify(planlar))
  }, [planlar])

  const plan = planlar[aktifPlan]

  const planEkle = (isim) => {
    const yeniPlan = {
      planAdi: isim,
      urunler: []
    }
    setPlanlar([...planlar, yeniPlan])
  }

  const planSil = (index) => {
    const yeniPlanlar = planlar.filter((_, i) => i !== index)
    setPlanlar(yeniPlanlar)
    setAktifPlan(0)
  }

  const urunEkle = (urun) => {
    const yeniPlanlar = [...planlar]
    yeniPlanlar[aktifPlan].urunler.push(urun)
    setPlanlar(yeniPlanlar)
  }

  const planGuncelle = (guncelPlan) => {
    const yeniPlanlar = [...planlar]
    yeniPlanlar[aktifPlan] = guncelPlan
    setPlanlar(yeniPlanlar)
  }

  if (loading) return null
  if (!user) return <Login />

  if (!plan) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        Henüz plan yok. Yeni plan ekleyin.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-purple-600 p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Üst Bar */}
        <div className="flex justify-between items-center text-white">
          <h1 className="text-2xl font-bold">Taksit Takip</h1>
          <button
            onClick={() => signOut(auth)}
            className="bg-white text-purple-600 px-4 py-2 rounded-lg shadow"
          >
            Çıkış Yap
          </button>
        </div>

        <PlanList
          planlar={planlar}
          aktifPlan={aktifPlan}
          setAktifPlan={setAktifPlan}
          planEkle={planEkle}
          planSil={planSil}
        />

        <PlanDetail
          plan={plan}
          urunEkle={urunEkle}
          urunGuncelle={planGuncelle}
        />

        <ChartComponent plan={plan} />

      </div>
    </div>
  )
}
