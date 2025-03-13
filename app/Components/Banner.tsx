"use client";

import Image from "next/image";
import { Orbitron } from "next/font/google";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { banners as bannersApi } from "../Api/Api";
import { useLanguage } from "../Context/LanguageContext";

// ✅ Define a type for banners
interface BannerType {
  id: number;
  name_uz: string;
  name_ru?: string;
  description_uz: string;
  description_ru?: string;
  image_urls: string[];
}

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const Banner = () => {
  const [banners, setBanners] = useState<BannerType[]>([]);
  const { language } = useLanguage();
  const fallbackImage = "/banner_default_image.jpg";

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(bannersApi);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data: BannerType[] = await response.json(); // ✅ Explicitly define type
        const filteredBanners = data.filter((banner) => banner.image_urls.length > 0);
        setBanners(filteredBanners);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <div className="w-full relative px-5 md:px-10">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="w-full h-auto relative"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-between overflow-hidden">
              
              {/* ✅ First Image (Common Image at Bottom) */}
              <div className="absolute top-0 right-0 w-1/2 h-full flex items-center justify-center">
                <Image
                  src="/bg.png"
                  alt="Background"
                  width={700}
                  height={700}
                  className="object-cover"
                  priority
                />
              </div>

              {/* ✅ Text Content (Always Above) */}
              <div className="relative z-10 flex flex-col justify-center items-start text-white p-6 md:p-10 lg:p-14 
                              max-w-[90%] sm:max-w-[80%] md:max-w-[700px] lg:max-w-[800px] rounded-lg">
                <h1 className={`text-[32px] sm:text-[40px] md:text-[40px] lg:text-[50px] uppercase font-bold ${orbitron.className}`}>
                  {language === "ru" ? banner.name_ru || banner.name_uz : banner.name_uz}
                </h1>
                <p className="text-[16px] sm:text-[18px] md:text-[20px] font-light my-3 sm:my-4">
                  {language === "ru" ? banner.description_ru || banner.description_uz : banner.description_uz}
                </p>
                <button className="relative px-8 sm:px-10 py-2 border border-pink-600 text-white uppercase font-medium 
                    hover:bg-pink-600 duration-300 ease-in-out text-sm sm:text-base">
                  Batafsil
                  <span className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-pink-600"></span>
                </button>
              </div>

              {/* ✅ Second Image (Above Common Image) */}
              <div className="absolute top-0 right-0 w-1/2 h-full flex items-center justify-center z-20">
                <Image
                  src={banner.image_urls.length > 0 
                    ? new URL(banner.image_urls[0], "https://ingame.pythonanywhere.com").href
                    : fallbackImage
                  }
                  alt={banner.name_uz}
                  width={500}
                  height={500}
                  className="object-contain"
                  priority
                />
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
