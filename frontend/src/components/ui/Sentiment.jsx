import React from "react";

export default function Sentiment({ otherUser, percentages }) {
  const total =
    percentages.positive + percentages.neutral + percentages.negative;

  return (
    <>
      <div className="sm:hidden bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-3 flex items-center justify-between shadow-md w-full">
        <span className="font-medium text-sm">Sohbet Duygu Analizi</span>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1">
            😊 {percentages.positive}%
          </span>
          <span className="flex items-center gap-1">
            😐 {percentages.neutral}%
          </span>
          <span className="flex items-center gap-1">
            😞 {percentages.negative}%
          </span>
        </div>
      </div>

      <div className="hidden sm:flex w-1/4 border-l border-gray-200 p-4 bg-gray-50 flex-col fixed top-0 right-0 z-40 ">
        <div className="font-semibold mb-2">{otherUser}’in Duygu Analizi</div>
        <div className="text-xs text-gray-500 mb-4">
          Gerçek zamanlı AI analiz
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-4 p-3">
          <div className="font-medium text-green-600">Genel Ruh Hali</div>
          <div className="text-sm mt-1">
            <span className="font-semibold">
              {percentages.positive >= percentages.negative
                ? "Pozitif"
                : "Negatif"}
            </span>{" "}
            <span className="text-gray-500">
              %{percentages.positive} olumlu
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="font-medium mb-1">Duygu Dağılımı</div>

          <div className="text-sm text-gray-600 mb-1">
            Mutlu <span className="float-right">{percentages.positive}%</span>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full mb-2 overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-green-400 rounded-full transition-all duration-500"
              style={{ width: `${percentages.positive}%` }}
            ></div>
          </div>

          <div className="text-sm text-gray-600 mb-1">
            Nötr <span className="float-right">{percentages.neutral}%</span>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full mb-2 overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-yellow-400 rounded-full transition-all duration-500"
              style={{ width: `${percentages.neutral}%` }}
            ></div>
          </div>

          <div className="text-sm text-gray-600 mb-1">
            Üzgün <span className="float-right">{percentages.negative}%</span>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-red-400 rounded-full transition-all duration-500"
              style={{ width: `${percentages.negative}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 text-sm text-gray-700">
          <div className="text-blue-600 font-medium mb-1">AI Önerisi</div> <p> {percentages.positive > percentages.negative ? "Karşındaki kişi oldukça pozitif görünüyor. Önemli konuşmalar için uygun bir zaman :)" : percentages.negative > 40 ? "Karşındaki kişi biraz üzgün ya da stresli görünüyor. Daha nazik ve anlayışlı bir dille yaklaşmak iyi olur." : "Karşındaki kişi nötr bir ruh halinde . Hafif ve rahat bir konu açarak iletişimi sürdürebilirsin."} </p> </div>

      </div>
    </>
  );
}
