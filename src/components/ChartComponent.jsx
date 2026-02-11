import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts"

export default function ChartComponent({ plan }) {

  const toplam = plan.urunler.reduce((t, u) => t + u.fiyat, 0)

  const odenen = plan.urunler.reduce((t, u) => {
    const aylik = u.fiyat / u.ay
    return t + (u.odenenAylar.length * aylik)
  }, 0)

  const kalan = toplam - odenen

  const data = [
    { name: "Ödenen", value: odenen },
    { name: "Kalan", value: kalan }
  ]

  const COLORS = ["#22c55e", "#ef4444"]

  return (
    <div className="bg-white dark:bg-gray-800 
    text-black dark:text-white
    rounded-3xl shadow-2xl p-8 transition">

      <h2 className="text-2xl font-bold mb-6">
        Borç Durumu
      </h2>

      <div className="relative h-72">

        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={5}
              label={({ percent }) =>
                `${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {/* Ortadaki Büyük Kalan Borç */}
        <div className="absolute inset-0 flex 
        items-center justify-center flex-col">
          <div className="text-sm opacity-60">
            Kalan Borç
          </div>
          <div className="text-2xl font-bold text-red-500">
            {kalan.toFixed(2)} ₺
          </div>
        </div>

      </div>

      <div className="mt-6 space-y-2 text-sm">
        <div>Toplam: {toplam.toFixed(2)} ₺</div>
        <div className="text-green-600">
          Ödenen: {odenen.toFixed(2)} ₺
        </div>
        <div className="text-red-500">
          Kalan: {kalan.toFixed(2)} ₺
        </div>
      </div>

    </div>
  )
}
