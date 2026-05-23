'use client';
import React, { useEffect, useState } from 'react';
import CityCard from '@/components/CityCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { City } from '@/interfaces/Type';
import { fetchAllCities } from '@/services/city';
import Link from 'next/link';

const BrowseCityWrapper = () => {
  const [cities, setCities] = useState<City[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCities = async () => {
    try {
      const res = await fetchAllCities();
      setCities(res.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error({ message: error.message, type: 'danger' });
        setError(error.message);
      } else {
        console.error({ message: 'Terjadi Kesalahan', type: 'danger' });
        setError('Terjadi Kesalahan');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCities();
  }, []);

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  return (
    <div>
      <section id="Cities" className="flex flex-col gap-[30px] mt-[100px]">
        <div className="w-full max-w-[1130px] mx-auto flex items-center justify-between">
          <h2 className="font-bold text-[32px] leading-[48px] text-nowrap">
            You Can Choose <br />
            Our Favorite Cities
          </h2>
          <a href="#" className="rounded-full py-3 px-5 bg-white font-bold">
            Explore All City
          </a>
        </div>
        <div className="swiper w-full">
          <div className="swiper-wrapper">
            <Swiper
              direction="horizontal"
              spaceBetween={16}
              slidesPerView={'auto'}
              slidesOffsetAfter={30}
              slidesOffsetBefore={30}
            >
              {cities.map((city) => (
                <SwiperSlide key={city.id} className="!w-fit first-of-type:pl-[calc((100%-1130px-60px)/2)] last-of-type:pr-[calc((100%-1130px-60px)/2)]">
                  <Link href={`city/${city.slug}`}>
                    <CityCard city={city} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrowseCityWrapper;
