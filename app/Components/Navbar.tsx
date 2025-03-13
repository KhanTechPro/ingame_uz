"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSortDown, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import ContactModal from "../Components/ContactModal";
import { useLanguage } from "../Context/LanguageContext";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const { language, setLanguage } = useLanguage();

  // Translations
  const translations: Record<string, Record<string, string>> = {
    ru: {
      products: "Продукция",
      services: "Услуги",
      configurator: "Конфигуратор",
      about: "О бренде",
      contact: "Связаться",
    },
    uz: {
      products: "Mahsulotlar",
      services: "Xizmatlar",
      configurator: "Konfigurator",
      about: "Brend haqida",
      contact: "Bog‘lanish",
    },
  };

  return (
    <>
      {/* ✅ Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-zinc-900 shadow-md">
        <div className="flex justify-between items-center h-[60px] px-6 md:px-10 lg:px-20">
          {/* ✅ Logo */}
          <div className=" md:flex gap-6">
            <Link href="/main">
              <Image src="/logo.png" alt="logo" width={120} height={50} className="object-contain" />
            </Link>

          {/* ✅ Desktop Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/products" className="hover:text-pink-600 transition">{translations[language]?.products}</Link>
              <Link href="/services" className="hover:text-pink-600 transition">{translations[language]?.services}</Link>
              <Link href="/about" className="hover:text-pink-600 transition">{translations[language]?.about}</Link>
            </div>
          </div>
          {/* ✅ Right Section */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => setIsModalOpen(true)} className="border px-4 py-2 rounded hover:border-pink-600 hover:text-pink-600 transition">
              {translations[language]?.contact}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)} className="flex items-center cursor-pointer hover:text-pink-600 transition">
                {language.toUpperCase()} <FaSortDown className="ml-1 text-pink-600" />
              </button>
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-20 bg-white shadow-md rounded-md">
                  <button onClick={() => setLanguage("ru")} className="block w-full px-4 py-2 bg-zinc-800 hover:bg-pink-500 transition">RU</button>
                  <button onClick={() => setLanguage("uz")} className="block w-full px-4 py-2 bg-zinc-800 hover:bg-pink-500 transition">UZ</button>
                </div>
              )}
            </div>
          </div>

          {/* ✅ Mobile Menu Button */}
          <button className="md:hidden text-white text-2xl" onClick={() => setIsMobileMenuOpen(true)}>
            <FaBars />
          </button>
        </div>

        {/* ✅ Mobile Menu (Sliding from Left) */}
        <div className={`fixed top-0 left-0 h-full w-3/4 sm:w-1/2 bg-black text-white transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex justify-between items-center p-4">
            <Link href="/main">
              <Image src="/logo.png" alt="logo" width={100} height={40} className="object-contain" />
            </Link>
            <button className="text-2xl" onClick={() => setIsMobileMenuOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <nav className="flex flex-col gap-2 p-4">
            {["products", "services", "configurator", "about"].map((item) => (
              <div key={item}>
                <button onClick={() => setDropdownOpen(dropdownOpen === item ? null : item)} className="w-full flex justify-between items-center py-2 border-b border-gray-600">
                  {translations[language][item]}
                  <FaChevronDown className={`transition-transform duration-300 ${dropdownOpen === item ? "rotate-180" : ""}`} />
                </button>
                {dropdownOpen === item && (
                  <div className="pl-4 py-2 text-gray-400">
                    <Link href={`/${item}/option1`} className="block py-1">Option 1</Link>
                    <Link href={`/${item}/option2`} className="block py-1">Option 2</Link>
                  </div>
                )}
              </div>
            ))}

            {/* Language Selector */}
            <div className="flex justify-center gap-2 mt-4">
              <button onClick={() => setLanguage("ru")} className={`px-4 py-2 rounded ${language === "ru" ? "bg-pink-600" : "bg-zinc-800"} hover:bg-pink-500 transition`}>
                Ru
              </button>
              <button onClick={() => setLanguage("uz")} className={`px-4 py-2 rounded ${language === "uz" ? "bg-pink-600" : "bg-zinc-800"} hover:bg-pink-500 transition`}>
                Uz
              </button>
            </div>

            {/* Contact Button */}
            <button onClick={() => setIsModalOpen(true)} className="w-full mt-4 border px-4 py-2 rounded hover:border-pink-600 hover:text-pink-600 transition">
              {translations[language]?.contact}
            </button>
          </nav>
        </div>
      </nav>

      {/* ✅ Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;
