"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; // ✅ Import next/image

interface ImageType {
  id: number;
  image: string;
}

interface NewsItem {
  id: number;
  name_uz: string;
  description_uz: string;
  status: string;
  slug: string;
  images: ImageType[];
  price: string;
}

const BASE_URL = "https://ingame.pythonanywhere.com"; // Base API URL

const NewsList = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const apiUrl = `${BASE_URL}/news/users/news/`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Failed to fetch news");
        const data: NewsItem[] = await res.json(); // ✅ Ensure correct type
        console.log("News Data:", data);
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [apiUrl]); // ✅ Fix: Add `apiUrl` to dependency array

  return (
    <div className="bg-black text-white px-10 md:px-20 pt-5">
      <h1 className="text-3xl font-bold mb-5">Новинки</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {news.map((item) => (
          <div key={item.id} className="p-5 bg-zinc-900 rounded-lg">
            {item.images.length > 0 && (
              <Image
                src={`${BASE_URL}${item.images[0].image}`} // ✅ Use next/image
                alt={item.name_uz}
                width={300} // ✅ Set width & height
                height={320}
                className="w-full h-80 object-cover rounded-lg"
                loading="lazy"
              />
            )}
            <h2 className="text-lg font-semibold mt-3">{item.name_uz}</h2>
            <p className="text-sm text-gray-400">{item.description_uz.slice(0, 100)}...</p>
            <p className="text-lg font-bold text-pink-500">{item.price} UZS</p>
            <button className="bg-pink-600 text-white py-2 px-4 mt-3 rounded hover:bg-pink-700 duration-500 ease-in-out cursor-pointer">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
