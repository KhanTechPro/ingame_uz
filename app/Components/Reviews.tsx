"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

interface UserComment {
  id: number;
  name: string;
  country: string;
  profession: string;
  comment: string;
  image: string;
}

const API_URL = "https://ingame.pythonanywhere.com/orderz/api/users/comments/";

const Reviews = () => {
  const [comments, setComments] = useState<UserComment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch comments");
        const data = await res.json();
        console.log("Comments Data:", data);
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="bg-black text-white py-10">
      <h1 className="text-3xl font-bold text-center">Почему стоит выбрать нас?</h1>
      <p className="text-center text-gray-400">Об этом лучше всего расскажут сами наши клиенты!</p>

      <div className="max-w-6xl mx-auto mt-6">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          spaceBetween={20}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="mySwiper"
        >
          {comments.map((user) => (
            <SwiperSlide key={user.id} className="p-5 bg-gray-900 rounded-lg">
              {/* User Image */}
              <img
                src={user.image}
                alt={user.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              
              {/* Comment */}
              <p className="mt-3 text-pink-500 text-sm font-semibold">
                “{user.comment}”
              </p>
              
              {/* User Details */}
              <h2 className="mt-2 text-lg font-semibold">{user.name}</h2>
              <p className="text-gray-400 text-sm">
                {user.country}, {user.profession}
              </p>

              {/* Button */}
              <button className="bg-pink-600 text-white py-2 px-4 mt-3 rounded w-full">
                Play 🎮
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
