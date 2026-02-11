import { useState } from "react"

export default function PlanList({
  planlar,
  aktifPlan,
  setAktifPlan,
  planEkle,
  planSil,
  darkMode
}) {

  const [yeniPlanAdi, setYeniPlanAdi] = useState("")

  const handleEkle = () => {
    if (!yeniPlanAdi.trim()) return
    planEkle(yeniPlanAdi)
    setYeniPlanAdi("")
  }

  return (
    <div className={`rounded-2xl shadow-xl p-6 space-y-4 ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>

      <h2 className="text-xl font-bold">Planlar</h2>

      <div className="space-y-2">
        {planlar.map((plan, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-3 rounded cursor-pointer transition
              ${aktifPlan === index
                ? "bg-purple-600 text-white"
                : darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"}`}
          >
            <span onClick={() => setAktifPlan(index)}>
              {plan.planAdi}
            </span>

            <button
              onClick={() => planSil(index)}
              className="text-red-400 hover:text-red-600"
            >
              🗑
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          placeholder="Yeni Plan Adı"
          value={yeniPlanAdi}
          onChange={(e) => setYeniPlanAdi(e.target.value)}
          className="border p-2 rounded w-full text-black"
        />
        <button
          onClick={handleEkle}
          className="bg-purple-600 text-white px-4 rounded"
        >
          Ekle
        </button>
      </div>

    </div>
  )
}
