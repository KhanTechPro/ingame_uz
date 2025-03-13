"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useLanguage } from "../Context/LanguageContext"; // ✅ Import language context

const Catalogs = () => {
  const { language } = useLanguage(); // ✅ Get current language
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // ✅ Ensures this runs only on the client
  }, []);

  const translations: Record<string, Record<string, string>> = {
    ru: {
      title: "КАТАЛОГ INGAME.UZ",
      subtitle: "Выберите себе в каталоге для максимально комфортной игры",
      tables: "Столы",
      chairs: "Кресла",
      armchair: "Кресло",
      keyboard: "Клавиатура",
      components: "Комплектующие",
      headset: "Гарнитура",
      mouse: "Мышки",
      accessories: "Аксессуары",
    },
    uz: {
      title: "KATALOG INGAME.UZ",
      subtitle: "Maksimal qulay o‘yin uchun katalogdan o‘zingizga mosini tanlang",
      tables: "Stollar",
      chairs: "Stullar",
      armchair: "Kreslo",
      keyboard: "Klaviatura",
      components: "Kompyuter qismlari",
      headset: "Garnitura",
      mouse: "Sichqoncha",
      accessories: "Aksessuarlar",
    },
  };

  // ✅ Local category list (No API)
  const categories = [
    { id: 1, name: "tables", img: "/screen.png" },
    { id: 2, name: "chairs", img: "/table.png" },
    { id: 3, name: "armchair", img: "/chair.png" },
    { id: 4, name: "keyboard", img: "/keyboard.png" },
    { id: 5, name: "components", img: "/pc.png" },
    { id: 6, name: "headset", img: "/headphones.png" },
    { id: 7, name: "mouse", img: "/mouse.png" },
    { id: 8, name: "accessories", img: "/microphone.png" },
  ];

  // ✅ Prevents Hydration Mismatch
  if (!isClient) return null;

  return (
    <div className="w-full px-5 md:px-10 flex flex-col justify-center items-center gap-8">
      <div className="text-center">
        <h2 className="text-[28px] md:text-[40px]">{translations[language]?.title}</h2>
        <p className="text-sm md:text-base">{translations[language]?.subtitle}</p>
      </div>

      {/* ✅ Responsive Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href="/#"
            className="flex flex-col items-center p-3 rounded-md hover:bg-pink-600 duration-300 ease-in-out"
          >
            <Image src={category.img} alt={category.name} width={100} height={50} className="object-contain" />
            <h3 className="text-sm md:text-lg">{translations[language]?.[category.name]}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Catalogs;
