import { City } from '@/interfaces/Type';
import Image from 'next/image';
import React from 'react';

interface CityCardProps {
  city: City;
}

const CityCard = ({ city }: CityCardProps) => {
  const base_url_storage = process.env.NEXT_PUBLIC_LARAVEL_STORAGE_BASE_URL;
  return (
    <div>
      <div className="card">
        <div className="relative flex shrink-0 w-[230px] h-[300px] rounded-[20px] overflow-hidden">
          <div className="relative flex flex-col justify-end w-full h-full p-5 gap-[2px] bg-[linear-gradient(180deg,_rgba(0,0,0,0)_49.87%,_rgba(0,0,0,0.8)_100%)] z-10">
            <h3 className="font-bold text-xl leading-[30px] text-white">
              {city.name}
            </h3>
            <p className="text-white">{city.officeSpaces_count} Offices</p>
          </div>
          <Image
            src={`${base_url_storage}/${city.photo}`}
            className="absolute object-cover"
            fill
            alt="thumbnails"
          />
        </div>
      </div>
    </div>
  );
};

export default CityCard;
