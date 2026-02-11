import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function InstallmentChart({ aylikTaksit }) {

  const data = [
    { name: "Aylık Taksit", value: aylikTaksit }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">Aylık Ödeme Grafiği</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
