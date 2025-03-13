"use client"; 
import { useState } from "react";

export default function ComputerSelector() {
  const [selectedTab, setSelectedTab] = useState("По цене");
  const [selectedPrices, setSelectedPrices] = useState([]); // Use array to track selections
  const [filters, setFilters] = useState({
    gaming: false,
    compact: false,
    games: false,
  });

  const priceOptions = [
    "5 550 000 сум",
    "5 550 000 сум",
    "5 550 000 сум",
    "5 550 000 сум",
    "5 550 000 сум",
    "5 550 000 сум",
  ];

  const togglePriceSelection = (price, index) => {
    setSelectedPrices((prevSelected) => {
      const newSelection = [...prevSelected];
      if (newSelection.includes(index)) {
        return newSelection.filter((i) => i !== index); // Deselect if already selected
      } else {
        return [...newSelection, index]; // Select if not selected
      }
    });
  };

  return (
    <div className="bg-black text-white flex flex-col justify-between items-center p-6 rounded-lg w-full px-10 md:px-20">
      <h2 className="text-4xl">Подберем компьютер</h2>
      {/* Tabs */}
      <div className="flex justify-between items-center gap-6 text-gray-400 md:gap-12 py-4">
        {["По цене", "По видеокарте", "По процессору"].map((tab, index) => (
          <button
            key={index}
            onClick={() => setSelectedTab(tab)}
            className={`pb-2 ${
              selectedTab === tab ? "text-pink-500 border-b-2 border-pink-500" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Price Options */}
      <div className="grid grid-cols-4 gap-12 mt-4 cursor-pointer">
        {priceOptions.map((price, index) => (
          <button
            key={index}
            onClick={() => togglePriceSelection(price, index)}
            className={`border px-3 py-2 text-sm ${
              selectedPrices.includes(index) ? "bg-pink-500 text-white" : "border-2 border-zinc-900"
            }`}
          >
            от {price}
          </button>
        ))}
      </div>

      {/* Toggles */}
      <div className="flex justify-between items-center gap-12 mt-4 cursor-pointer">
        {[
          { key: "gaming", label: "Игровые" },
          { key: "compact", label: "Компактные" },
          { key: "games", label: "По играм" },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2">
            <div
              onClick={() => setFilters({ ...filters, [key]: !filters[key] })}
              className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors ${
                filters[key] ? "bg-pink-500" : "bg-gray-600"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                  filters[key] ? "right-1" : "left-1"
                }`}
              ></div>
            </div>
            <span>{label}</span>
          </label>
        ))}
      </div>

      {/* Done Button */}
      <button className="bg-pink-600 w-[240px] py-2 rounded-lg mt-4 text-lg cursor-pointer">
        Готово
      </button>
    </div>
  );
}
