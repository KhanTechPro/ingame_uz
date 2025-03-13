"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface DiscountProduct {
  id: number;
  name: string;
  price: number;
  old_price: number;
  discount_percent: number;
  image: string;
  status: string;
}

const BASE_URL = "https://ingame.pythonanywhere.com";
const API_URL = `${BASE_URL}/discount/user/discounts/`;

const DiscountList = () => {
  const [products, setProducts] = useState<DiscountProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch discounts: ${res.status}`);
        }

        const data: DiscountProduct[] = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid API response format");
        }

        setProducts(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, []);

  return (
    <div className="bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-5">Акции</h1>

      {loading ? (
        <p className="text-center text-gray-400">Загрузка...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((item) => (
              <div key={item.id} className="p-5 bg-gray-900 rounded-lg relative">
                {/* Discount Badge */}
                {item.discount_percent > 0 && (
                  <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs px-2 py-1 rounded">
                    -{item.discount_percent}%
                  </span>
                )}

                {/* Product Image with `next/image` */}
                <div className="relative w-full h-40">
                  <Image
                    src={`${BASE_URL}${item.image}`}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    priority={false}
                  />
                </div>

                {/* Product Name */}
                <h2 className="text-lg font-semibold mt-3">{item.name}</h2>

                {/* Old & New Price */}
                <p className="text-gray-500 line-through">{item.old_price} сум</p>
                <p className="text-lg font-bold text-pink-500">{item.price} сум</p>

                {/* Buy Button */}
                <button className="bg-pink-600 text-white py-2 px-4 mt-3 rounded w-full">
                  Купить
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">Нет доступных скидок</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DiscountList;
