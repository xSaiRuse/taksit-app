export default function SummaryCards({
  maas,
  toplamBorc,
  aylikTaksit,
  kalanPara
}) {
  return (
    <div className="grid grid-cols-4 gap-4">

      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
        <h3 className="text-sm opacity-70">Toplam Maaş</h3>
        <p className="text-xl font-bold">{maas || 0} ₺</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
        <h3 className="text-sm opacity-70">Toplam Borç</h3>
        <p className="text-xl font-bold text-red-500">
          {toplamBorc} ₺
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
        <h3 className="text-sm opacity-70">Aylık Taksit</h3>
        <p className="text-xl font-bold text-yellow-500">
          {aylikTaksit.toFixed(2)} ₺
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
        <h3 className="text-sm opacity-70">Kalan Para</h3>
        <p className={`text-xl font-bold ${kalanPara < 0 ? "text-red-600" : "text-green-500"}`}>
          {kalanPara.toFixed(2)} ₺
        </p>
      </div>

    </div>
  )
}
