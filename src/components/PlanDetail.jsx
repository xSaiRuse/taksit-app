export default function PlanDetail({ plan, planGuncelle }) {

  const aylikTaksit =
    plan.taksitSayisi > 0
      ? plan.fiyat / plan.taksitSayisi
      : 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl space-y-4">

      <h2 className="text-xl font-bold">
        {plan.planAdi} Detay
      </h2>

      <input
        type="number"
        placeholder="Toplam Fiyat"
        value={plan.fiyat}
        onChange={(e) =>
          planGuncelle({
            ...plan,
            fiyat: Number(e.target.value),
          })
        }
        className="w-full p-3 rounded text-black"
      />

      <input
        type="number"
        placeholder="Taksit Sayısı"
        value={plan.taksitSayisi}
        onChange={(e) =>
          planGuncelle({
            ...plan,
            taksitSayisi: Number(e.target.value),
          })
        }
        className="w-full p-3 rounded text-black"
      />

      <div className="p-4 rounded-xl bg-purple-600 text-white">
        Aylık Taksit: {aylikTaksit.toFixed(2)} ₺
      </div>

    </div>
  );
}
