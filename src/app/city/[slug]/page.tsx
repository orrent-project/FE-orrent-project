'use client';
import React, { useEffect, useState } from 'react';
import OfficeCard from '@/components/OfficeCard';
import { City } from '@/interfaces/Type';
import { useParams } from 'next/navigation';
import { fetchCityDetails } from '@/services/city';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

const CityDetails = () => {
  const { slug } = useParams() as { slug: string };

  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const base_url_storage = process.env.NEXT_PUBLIC_LARAVEL_STORAGE_BASE_URL;



  useEffect(() => {
    const loadCity = async () => {
      try {
        const res = await fetchCityDetails(String(slug));
        setCity(res.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Terjadi Kesalahan");
        }
      } finally {
        setLoading(false);
      }
    };

    loadCity();
  }, [slug]);

  if (loading || !city) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }
  return (
    <>
      <Navbar />
      <header className="flex flex-col w-full">
        <section id="Hero-Banner" className="relative flex h-[434px]">
          <div
            id="Hero-Text"
            className="relative flex flex-col w-full max-w-[650px] h-fit rounded-[30px] border border-[#E0DEF7] p-10 gap-[30px] bg-white mt-[70px] ml-[calc((100%-1130px)/2)] z-10"
          >
            <h1 className="font-extrabold text-[50px] leading-[60px]">
              Great Office in <br />{' '}
              <span className="text-[#0D903A]">{city.name} City</span>
            </h1>
            <p className="text-lg leading-8 text-[#000929]">
              Kantor yang tepat dapat memberikan impact pekerjaan menjadi lebih
              baik dan sehat dalam tumbuhkan karir.
            </p>
          </div>
          <div
            id="Hero-Image"
            className="absolute right-0 w-[calc(100%-((100%-1130px)/2)-305px)] h-[434px] rounded-bl-[40px] overflow-hidden"
          >
            <div className="relative w-full h-full">
              <Image
                src={`${base_url_storage}/${city.photo}`}
                className="object-cover"
                fill
                alt="hero background"
              />
            </div>
          </div>
        </section>
      </header>
      <section
        id="Fresh-Space"
        className="flex flex-col gap-[30px] w-full max-w-[1130px] mx-auto mt-[70px] mb-[120px]"
      >
        <h2 className="font-bold text-[32px] leading-[48px] text-nowrap">
          Browse Offices
        </h2>
        <div className="grid grid-cols-3 gap-[30px]">
          {city.officeSpaces.map((office) => {
            return (
              <Link href={`/office/${office.slug}`} key={office.id}>
                <OfficeCard office={office} />
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default CityDetails;
