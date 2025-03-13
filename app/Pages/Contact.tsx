'use client';

import { useState } from 'react';
import ContactModal from '../Components/ContactModal';
import { BsLightningFill } from 'react-icons/bs';
import Image from 'next/image';

const Contact: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCloseModal = (): void => setIsModalOpen(false);

  return (
    <div className="bg-[#0F0F0F] text-white py-20 px-5 md:px-40 relative flex flex-col items-center text-center">
      <div className="max-w-[350px] md:max-w-[60%] mx-auto">
        <h1 className="font-clash-display font-semibold text-[32px] md:text-[45.7px] leading-[36px] md:leading-[46.46px] tracking-[-0.72px]">
          Одним онлайн-звонком мы изменим ваш <br /> игровой опыт навсегда
        </h1>
        <p className="py-5 font-clash-display font-normal text-[16px] md:text-[18px] leading-[22px] md:leading-[24.3px] tracking-[0.72px]">
          Назначим звонок, узнаем о ваших запросах, предложим подходящую конфигурацию.<br />
          После разбора мы возьмем на себя все заботы по поддержке и <br /> дальнейшей доставке
        </p>
        <div className="flex justify-center md:justify-start">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex justify-center items-center gap-4 bg-[#D3176D] text-white px-10 py-3 cursor-pointer text-[20px] mx-auto"
          >
            <BsLightningFill className="text-black" /> Заказать звонок
          </button>
        </div>
        <ContactModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
      <div className="relative mt-26 flex justify-center md:absolute md:bottom-5 md:right-5 md:w-auto">
        <Image
          src="/contact_image.png"
          alt="Illustration"
          width={397}
          height={397}
          className="w-[250px] md:w-[397px] h-auto"
        />
        <div className="absolute w-[120px] h-[120px] md:w-[160px] md:h-[160px] bg-pink-600 rounded-full blur-[100px] translate-y-[-50%] z-10"></div>
      </div>
    </div>
  );
};

export default Contact;
