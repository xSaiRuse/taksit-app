import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const [maas, setMaas] = useState(0);
  const [planlar, setPlanlar] = useState([]);
  const [aktifPlan, setAktifPlan] = useState(null);
  const [yeniPlanAdi, setYeniPlanAdi] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const planEkle = () => {
    if (!yeniPlanAdi.trim()) return;

    setPlanlar([
      ...planlar,
      {
        ad: yeniPlanAdi,
        fiyat: 0,
        taksit: 1,
        odenenList: [],
      },
    ]);
    setYeniPlanAdi("");
  };

  const planGuncelle = (index, alan, deger) => {
    const guncel = [...planlar];
    guncel[index][alan] = Number(deger);
    setPlanlar(guncel);
  };

  const taksitToggle = (planIndex, taksitNo) => {
    const guncel = [...planlar];
    const liste = guncel[planIndex].odenenList;

    if (liste.includes(taksitNo)) {
      guncel[planIndex].odenenList = liste.filter((x) => x !== taksitNo);
    } else {
      guncel[planIndex].odenenList = [...liste, taksitNo];
    }

    setPlanlar(guncel);
  };

  const toplamBorc = planlar.reduce((acc, p) => acc + p.fiyat, 0);
  const aylikTaksit = planlar.reduce(
    (acc, p) => acc + p.fiyat / p.taksit,
    0
  );
  const kalanPara = maas - aylikTaksit;

  let grafikData = [];
  let toplamTaksit = 0;
  let toplamOdenen = 0;

  planlar.forEach((plan, pIndex) => {
    const aylik = plan.fiyat / plan.taksit;

    for (let i = 1; i <= plan.taksit; i++) {
      grafikData.push({
        name: `${plan.ad} ${i}`,
        tutar: aylik,
        odenmis: plan.odenenList.includes(i),
        planIndex: pIndex,
        taksitNo: i,
      });

      toplamTaksit++;
      if (plan.odenenList.includes(i)) toplamOdenen++;
    }
  });

  const yuzde =
    toplamTaksit === 0
      ? 0
      : ((toplamOdenen / toplamTaksit) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-4 md:p-8 transition-all">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold">
          Taksit Dashboard
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded"
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* MAAS */}
      <input
        type="number"
        placeholder="Toplam Maaş"
        value={maas}
        onChange={(e) => setMaas(Number(e.target.value))}
        className="w-full p-3 rounded text-black mb-6"
      />

      {/* PLAN EKLE */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6">
        <div className="flex flex-col md:flex-row gap-2">
          <input
            placeholder="Yeni Plan Adı"
            value={yeniPlanAdi}
            onChange={(e) => setYeniPlanAdi(e.target.value)}
            className="w-full p-2 rounded text-black"
          />
          <button
            onClick={planEkle}
            className="bg-purple-600 text-white px-4 rounded"
          >
            Ekle
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {planlar.map((plan, index) => (
            <div
              key={index}
              onClick={() => setAktifPlan(index)}
              className={`p-3 rounded cursor-pointer ${
                aktifPlan === index
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {plan.ad}
            </div>
          ))}
        </div>
      </div>

      {/* PLAN DETAY */}
      {aktifPlan !== null && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6">
          <h3 className="mb-4 font-semibold">
            {planlar[aktifPlan].ad} Detay
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Toplam Fiyat"
              value={planlar[aktifPlan].fiyat}
              onChange={(e) =>
                planGuncelle(aktifPlan, "fiyat", e.target.value)
              }
              className="p-2 rounded text-black"
            />

            <input
              type="number"
              placeholder="Taksit Sayısı"
              value={planlar[aktifPlan].taksit}
              onChange={(e) =>
                planGuncelle(aktifPlan, "taksit", e.target.value)
              }
              className="p-2 rounded text-black"
            />
          </div>
        </div>
      )}

      {/* ÖZET */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card title="Toplam Maaş" value={`${maas} ₺`} />
        <Card title="Toplam Borç" value={`${toplamBorc} ₺`} red />
        <Card title="Aylık Taksit" value={`${aylikTaksit.toFixed(2)} ₺`} yellow />
        <Card title="Kalan Para" value={`${kalanPara.toFixed(2)} ₺`} green />
      </div>

      {/* İLERLEME */}
      {toplamTaksit > 0 && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6">
          <h3 className="mb-2 font-semibold">
            Ödeme İlerlemesi (%{yuzde})
          </h3>

          <div className="w-full bg-gray-300 dark:bg-gray-700 h-4 rounded-full overflow-hidden">
            <div
              className="h-4 bg-green-500 transition-all duration-700"
              style={{ width: `${yuzde}%` }}
            />
          </div>
        </div>
      )}

      {/* GRAFİK */}
      {grafikData.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow">
          <h3 className="mb-4 font-semibold">
            Taksit Takip Grafiği
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={grafikData}>
              <XAxis hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tutar">
                {grafikData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.odenen ? "#22c55e" : "#ef4444"}
                    onClick={() =>
                      taksitToggle(
                        entry.planIndex,
                        entry.taksitNo
                      )
                    }
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="flex gap-6 mt-4 text-sm">
            <span className="text-green-500">● Ödenmiş</span>
            <span className="text-red-500">● Ödenmemiş</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Card({ title, value, red, green, yellow }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h4>{title}</h4>
      <p
        className={`font-bold ${
          red
            ? "text-red-500"
            : green
            ? "text-green-500"
            : yellow
            ? "text-yellow-500"
            : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default App;
