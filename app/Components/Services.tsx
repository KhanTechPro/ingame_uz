"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; // ✅ Import next/image

interface Service {
  id: number;
  name_uz: string;
  description_uz: string;
  image_urls: string[];
  slug: string;
}

const BASE_URL = "https://ingame.pythonanywhere.com"; // ✅ Define BASE_URL
const API_URL = `${BASE_URL}/service/api/users/services/`;

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch services");
        const data: Service[] = await res.json(); // ✅ Ensure correct type
        console.log("Services Data:", data);
        setServices(data);
      } catch (err) {
        setError("Error fetching services");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="text-white w-full px-10 md:px-20">
      <h1 className="text-3xl font-bold">Услуги</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6">
        {services.map((service) => (
          <div key={service.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            {/* ✅ Use Next.js Image */}
            {service.image_urls[0] ? (
              <Image
                src={`${BASE_URL}${service.image_urls[0]}`}
                alt={service.name_uz}
                width={400} // ✅ Set width & height
                height={160}
                className="w-full h-40 object-cover"
                loading="lazy"
              />
            ) : (
              <Image
                src="/fallback.jpg"
                alt="Fallback Image"
                width={400}
                height={160}
                className="w-full h-40 object-cover"
              />
            )}

            {/* ✅ Service Details */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-pink-500">{service.name_uz}</h2>
              <p className="text-gray-300 mt-2">{service.description_uz.slice(0, 100)}...</p>

              {/* ✅ Button */}
              <a
                href={`/services/${service.slug}`}
                className="block text-center mt-3 bg-pink-600 text-white py-2 px-4 rounded"
              >
                Подробнее
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
