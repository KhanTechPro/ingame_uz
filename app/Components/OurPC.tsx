"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const API_URL = "https://ingame.pythonanywhere.com/desktop/users/desktop/";

interface PC {
  id: number;
  name_uz: string;
  description_uz: string;
  price: string;
  status: string;
  images: string[];
  type_detail: { name: string };
  attributes: { key: string; value: string }[];
}

const OurPC = () => {
  const [pcs, setPcs] = useState<PC[]>([]);

  useEffect(() => {
    const fetchPCs = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setPcs(data);
      } catch (error) {
        console.error("Error fetching gaming PCs:", error);
      }
      
    };

    fetchPCs();
  }, []);

  return (
    <section className="w-full px-10 md:px-20 my-[120px]">
      <h2 className="text-white text-[40px] font-bold mb-8">Наши ПК</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pcs.map((pc) => (
          <div key={pc.id} className="bg-black text-white p-6 rounded-lg shadow-lg relative">
            {/* IMAGE */}
            <div className="relative w-full h-[200px]">
              <Image
                src={`https://ingame.pythonanywhere.com${pc.images[0]}`}
                alt={pc.name_uz}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>

            {/* LABEL */}
            <span className="absolute top-3 left-3 bg-pink-600 text-white px-3 py-1 text-sm rounded-md">
              {pc.status}
            </span>

            {/* PRICE */}
            <div className="mt-4">
              <span className="bg-pink-600 text-white px-3 py-1 rounded-md text-sm">12 КОМПЛЕКТАЦИЙ</span>
              <p className="text-pink-400 text-2xl font-bold mt-2">от {pc.price} сум</p>
              <p className="text-gray-400 text-sm">≈ 480 000 сум/месяц</p>
            </div>

            {/* TITLE & SPECS */}
            <div className="mt-4">
              <h3 className="text-xl font-bold text-pink-400">{pc.type_detail.name}</h3>
              <p className="text-gray-300">{pc.description_uz}</p>

              <ul className="mt-3 text-gray-300">
                {pc.attributes.slice(0, 4).map((attr, index) => (
                  <li key={index} className="text-sm">{attr.key}: {attr.value}</li>
                ))}
              </ul>
            </div>

            {/* PERFORMANCE */}
            <div className="mt-4">
              <p className="text-white font-bold">Производительность</p>
              <div className="flex justify-between border border-white p-2 mt-2 text-gray-300">
                <span>Игры/FPS</span>
                <span>1080p</span>
                <span>1440p</span>
              </div>
              <div className="flex justify-between border border-white p-2 mt-1 text-gray-300">
                <span>GTA V</span>
                <span>180</span>
                <span>40</span>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-between mt-6">
              <Link href="#" className="px-4 py-2 border border-pink-600 text-white rounded-md hover:bg-pink-600">
                Подробнее
              </Link>
              <Link href="#" className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700">
                Купить
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurPC;
