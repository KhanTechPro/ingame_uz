"use client";

import { useState, useEffect } from "react";
import { FaTelegram } from "react-icons/fa";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("+998 ");

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setFullName("");
        setPhoneNumber("+998 ");
      }, 100);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanedPhone = phoneNumber.replace(/\D/g, "");
    const formData = { name: fullName, phone: cleanedPhone };

    try {
      console.log("Yuboriladigan ma'lumotlar:", formData);
      const response = await fetch("https://ingame.pythonanywhere.com/orderz/api/users/zayafka/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch {
        responseData = { message: "Noma'lum xatolik" };
      }

      if (response.ok) {
        alert("✅ Muvaffaqiyatli yuborildi!");
        setFullName("");
        setPhoneNumber("+998 ");
        onClose();
      } else {
        console.error("Xatolik:", responseData);
        alert(`❌ Xatolik: ${responseData.message || "Noma'lum xatolik"}`);
      }
    } catch (error) {
      console.error("Xatolik:", error);
      alert(`❗️ Server bilan ulanishda xatolik: ${(error as Error).message}`);
    }
  };

  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned.startsWith("998")) return "+998 ";
    return `+998 ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10, 12)}`.trim();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(formatPhoneNumber(e.target.value));
  };

  if (!isOpen) return null;

  return (
    <div className="z-10 fixed inset-0 bg-black/50 bg-opacity-30 flex items-center justify-center translate-y-[-50px]" onClick={onClose}>
      <div className="bg-[#131212] p-6 rounded-lg shadow-lg w-80" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-[20px]">
          <span className="text-[#D3176D]">Оставьте заявку</span> и наш менеджер свяжется <br /> с Вами
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="w-full text-left mb-1">Как зовут?</label>
          <input
            type="text"
            placeholder="Ф.И.О."
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 mb-2 outline-none bg-white text-[#4d4d4f]"
            required
          />
          <label className="w-full text-left mb-1">Номер телефона</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            className="w-full p-2 mb-2 outline-none bg-white text-[#59595a]"
            required
          />
          <div className="flex justify-between">
            <button type="submit" className="w-full bg-[#D3176D] text-white py-3 text-center">
              Отправить
            </button>
          </div>
        </form>
        <p>
          <span className="text-[#D3176D]">Либо свяжитесь с нами</span>
          <br />
          <span className="flex items-center justify-center gap-1 text-[#D3176D]">
            в
            <a href="https://t.me/" className="text-white flex items-center gap-1 underline font-inter">
              <FaTelegram /> Telegram
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default ContactModal;
