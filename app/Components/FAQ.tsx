'use client';

import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
  'Сколько примерно стоит средний ПК для игр?',
  'Сколько примерно стоит средний ПК для игр?',
  'Сколько примерно стоит средний ПК для игр?',
  'Сколько примерно стоит средний ПК для игр?',
  'Сколько примерно стоит средний ПК для игр?',
  'Сколько примерно стоит средний ПК для игр?'
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black text-white py-10 px-4 md:px-10">
      <h2 className="text-center text-2xl md:text-3xl font-semibold mb-6 relative">
        Часто задаваемые вопросы
        <span className="block w-12 h-1 bg-pink-600 mx-auto mt-2"></span>
      </h2>
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((question, index) => (
          <div key={index} className="border-b border-gray-700">
            <button
              className="w-full flex justify-between items-center py-4 text-left hover:text-pink-600"
              onClick={() => toggleFAQ(index)}
            >
              <span>{question}</span>
              <FaChevronDown className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === index && (
              <p className="text-gray-300 py-2 px-2">
                Средний игровой ПК может стоить от $800 до $1500 в зависимости от комплектующих.
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
