"use client"; 
import React from "react";
import { FaInstagram, FaTelegram } from "react-icons/fa";
import { FiSmartphone } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";

const Footer = () => {
    return (
        <footer className="bg-[#131212] text-white py-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-center items-center">
                <div className="flex flex-row md:flex-row justify-center items-center">
                    <div className="w-full md:w-1/3 mr-26">
                        <h3 className="text-lg font-[Clash Display]">Контакты</h3>
                        <ul className="font-[Clash Display]">
                            <li>
                                <a href="number" className="flex items-center hover:text-[#D3176D]">
                                    <FiSmartphone className="mr-2" />номер
                                </a>
                            </li>
                            <li>
                                <a href="work" className="flex items-center hover:text-[#D3176D]">
                                    <GoClock className="mr-2" />время работы
                                </a>
                            </li>
                            <li>
                                <a href="address" className="flex items-center hover:text-[#D3176D]">
                                    <IoLocationOutline className="mr-2" />локация
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 mr-6">
                        <h3 className="text-lg font-[Clash Display]">Наши соц. сети</h3>
                        <ul className="font-[Clash Display]">
                            <li>
                                <a
                                    href="https://instagram.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center hover:text-[#D3176D]"
                                >
                                    <FaInstagram className="mr-2" />
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://t.me/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center hover:text-[#D3176D]"
                                >
                                    <FaTelegram className="mr-2" />
                                    Telegram
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-full md:w-1/3">
                    <div className="w-full h-40 md:h-48">
                        {/* Google Map section (Commented out for now) */}
                        {/* 
                        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                            <GoogleMap mapContainerStyle={{ height: "200px", width: "100%" }} zoom={13} center={{ lat: 41.2995, lng: 69.2401 }}>
                                <Marker position={{ lat: 41.2995, lng: 69.2401 }} />
                            </GoogleMap>
                        </LoadScript> 
                        */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
