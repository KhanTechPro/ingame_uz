"use client";

import Image from "next/image";
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { category as categoryApi } from "../Api/Api";
import { useLanguage } from "../Context/LanguageContext"; // ✅ Import language context

const Catalogs = () => {
    const { language } = useLanguage(); // ✅ Get current language
    const [categories, setCategories] = useState([]);

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

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(categoryApi);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const data = await response.json();
                console.log("Fetched categories:", data); // Debugging

                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="w-full px-10 md:px-10 flex flex-col justify-center items-center gap-12">
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-[40px]">{translations[language]?.title}</h2>
                <p>{translations[language]?.subtitle}</p>
            </div>

            <div className="flex justify-between items-center gap-12">
                <Link href="/#" className="flex flex-col items-center hover:bg-pink-600 duration-300 ease-in-out rounded-md">
                    <Image src="/screen.png" alt="logo" width={120} height={50} className='object-contain' />
                    <h3>{translations[language]?.tables}</h3>
                </Link>

                <Link href="/#" className="flex flex-col items-center hover:bg-pink-600 duration-300 ease-in-out rounded-md">
                    <Image src="/table.png" alt="logo" width={120} height={50} className='object-contain' />
                    <h3>{translations[language]?.chairs}</h3>
                </Link>

                <Link href="/#" className="flex flex-col items-center hover:bg-pink-600 duration-300 ease-in-out rounded-md">
                    <Image src="/chair.png" alt="logo" width={120} height={50} className='object-contain' />
                    <h3>{translations[language]?.armchair}</h3>
                </Link>

                <Link href="/#" className="flex flex-col items-center hover:bg-pink-600 duration-300 ease-in-out rounded-md">
                    <Image src="/keyboard.png" alt="logo" width={120} height={50} className='object-contain' />
                    <h3>{translations[language]?.keyboard}</h3>
                </Link>
            </div>

            <div className="flex justify-between items-center gap-12">
                <Link href="/#" className="flex flex-col items-center hover:bg-pink-600 duration-300 ease-in-out rounded-md">
                    <Image src="/pc.png" alt="logo" width={120} height={50} className='object-contain' />
                    <h3>{translations[language]?.components}</h3>
                </Link>

                <Link href="/#" className="flex flex-col items-center hover:bg-pink-600 duration-300 ease-in-out rounded-md">
                    <Image src="/headphones.png" alt="logo" width={100} height={50} className='object-contain' />
                    <h3>{translations[language]?.headset}</h3>
                </Link>

                <Link href="/#" className="flex flex-col items-center hover:bg-pink-600 duration-300 ease-in-out rounded-md">
                    <Image src="/mouse.png" alt="logo" width={120} height={50} className='object-contain' />
                    <h3>{translations[language]?.mouse}</h3>
                </Link>

                <Link href="/#" className="flex flex-col items-center hover:bg-pink-600 duration-300 ease-in-out rounded-md">
                    <Image src="/microphone.png" alt="logo" width={120} height={50} className='object-contain' />
                    <h3>{translations[language]?.accessories}</h3>
                </Link>
            </div>
        </div>
    );
};

export default Catalogs;
