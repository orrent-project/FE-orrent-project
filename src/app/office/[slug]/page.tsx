'use client';
import Navbar from '@/components/Navbar';
import { Office } from '@/interfaces/Type';
import { fetchOfficeDetails } from '@/services/office';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const Details = () => {
  const { slug } = useParams() as { slug: string };

  const [office, setOffice] = useState<Office>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const base_url_image = process.env.NEXT_PUBLIC_LARAVEL_STORAGE_BASE_URL;

  useEffect(() => {
     const loadOffices = async () => {
    try {
      const res = await fetchOfficeDetails(String(slug));
      setOffice(res.data);
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
    loadOffices();
  }, [slug]);

  if (loading || !office) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  return (
    <>
      <Navbar />
      <section id="Gallery" className="-mb-[50px]">
        <div className="swiper w-full">
          <Swiper
            className="swiper-wrapper"
            direction="horizontal"
            spaceBetween={10}
            slidesPerView={'auto'}
            slidesOffsetAfter={10}
            slidesOffsetBefore={10}
          >
            <SwiperSlide className="swiper-slide !w-fit">
              <div className="w-[700px] h-[550px] overflow-hidden">
                <Image
                  src={`${base_url_image}/${office.thumbnail}`}
                  className="object-cover"
                  alt="thumbnail"
                  width={700}
                  height={550}
                  unoptimized
                />
              </div>
            </SwiperSlide>
            {office.photos.map((photo) => {
              return (
                <SwiperSlide key={photo.id} className="swiper-slide !w-fit">
                  <div className="w-[700px] h-[550px] overflow-hidden">
                    <Image
                      src={`${base_url_image}/${photo.photo}`}
                      className="object-cover"
                      alt="thumbnail"
                      width={700}
                      height={550}
                      unoptimized
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
      <section
        id="Details"
        className="relative flex max-w-[1130px] mx-auto gap-[30px] mb-20 z-10"
      >
        <div className="flex flex-col w-full rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
          <p className="w-fit rounded-full p-[6px_16px] bg-[#0D903A] font-bold text-sm leading-[21px] text-[#F7F7FD]">
            Popular
          </p>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-extrabold text-[32px] leading-[44px]">
                {office.name}
              </h1>
              <div className="flex items-center gap-[6px] mt-[10px]">
                <Image
                  src="/assets/images/icons/location.svg"
                  alt="icon"
                  width={24}
                  height={24}
                />
                <p className="font-semibold">{office.city.name}</p>
              </div>
            </div>
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center gap-1">
                <Image
                  src="/assets/images/icons/Star 1.svg"
                  alt="star"
                  width={20}
                  height={20}
                />
                <Image
                  src="/assets/images/icons/Star 1.svg"
                  alt="star"
                  width={20}
                  height={20}
                />
                <Image
                  src="/assets/images/icons/Star 1.svg"
                  alt="star"
                  width={20}
                  height={20}
                />
                <Image
                  src="/assets/images/icons/Star 1.svg"
                  alt="star"
                  width={20}
                  height={20}
                />
                <Image
                  src="/assets/images/icons/Star 5.svg"
                  alt="star"
                  width={20}
                  height={20}
                />
              </div>
              <p className="font-semibold text-right">4.5/5 (19,384)</p>
            </div>
          </div>
          <p className="leading-[30px]">{office.about}</p>
          <hr className="border-[#F6F5FD]" />
          <h2 className="font-bold">You Get What You Need Most</h2>
          <div className="grid grid-cols-3 gap-x-5 gap-y-[30px]">
            <div className="flex items-center gap-4">
              <Image
                src="/assets/images/icons/security-user.svg"
                alt="icon"
                width={34}
                height={34}
              />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">Privacy</p>
                <p className="text-sm leading-[21px]">For Yourself</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src="/assets/images/icons/cup.svg"
                alt="icon"
                width={34}
                height={34}
              />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">Global Event</p>
                <p className="text-sm leading-[21px]">Startup Contest</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src="/assets/images/icons/home-trend-up.svg"
                alt="icon"
                width={34}
                height={34}
              />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">
                  Sustainbility
                </p>
                <p className="text-sm leading-[21px]">Long-term Goals</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src="/assets/images/icons/coffee.svg"
                alt="icon"
                width={34}
                height={34}
              />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">Extra Snacks</p>
                <p className="text-sm leading-[21px]">Work-Life Balance</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src="/assets/images/icons/3dcube.svg"
                alt="icon"
                width={34}
                height={34}
              />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">Compact</p>
                <p className="text-sm leading-[21px]">Good for Focus</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src="/assets/images/icons/group.svg"
                alt="icon"
                width={34}
                height={34}
              />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">Free Move</p>
                <p className="text-sm leading-[21px]">Anytime 24/7</p>
              </div>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex flex-col gap-[6px]">
            <h2 className="font-bold">Office Address</h2>
            <p>{office.name}</p>
            <p>{office.address}</p>
          </div>
          <div className="overflow-hidden w-full h-[280px]">
            <div
              id="my-map-display"
              className="h-full w-full max-w-[none] bg-none"
            >
              <iframe
                className="h-full w-full border-0"
                frameBorder={0}
                src={`https://www.google.com/maps/embed/v1/place?q=${office.name}-${office.city.name},&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
              />
            </div>
            <a
              className="from-embedmap-code"
              href="https://www.bootstrapskins.com/themes"
              id="enable-map-data"
            >
              premium bootstrap themes
            </a>
          </div>
        </div>
        <div className="w-[392px] flex flex-col shrink-0 gap-[30px]">
          <div className="flex flex-col rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
            <div>
              <p className="font-extrabold text-[32px] leading-[48px] text-[#0D903A]">
                Rp {office.price.toLocaleString('id-ID')}
              </p>
              <p className="font-semibold mt-1">
                For {office.duration} days working
              </p>
            </div>
            <hr className="border-[#F6F5FD]" />
            <div className="flex flex-col gap-5">
              {office.benefits.map((benefit) => {
                return (
                  <div key={benefit.id} className="flex items-center gap-3">
                    <Image
                      src="/assets/images/icons/verify.svg"
                      alt="icon"
                      width={30}
                      height={30}
                    />
                    <p className="font-semibold leading-[28px]">
                      {benefit.name}
                    </p>
                  </div>
                );
              })}
            </div>
            <hr className="border-[#F6F5FD]" />
            <div className="flex flex-col gap-[14px]">
              <Link href={`/office/${office.slug}/book`}>
                <div
                  className="flex items-center justify-center w-full rounded-full p-[16px_26px] gap-3 bg-[#0D903A] font-bold text-[#F7F7FD]"
                >
                  <Image
                    src="/assets/images/icons/slider-horizontal-white.svg"
                    alt="icon"
                    width={24}
                    height={24}
                  />
                  <span>Book This Office</span>
                </div>
              </Link>
              <button className="flex items-center justify-center w-full rounded-full border border-[#000929] p-[16px_26px] gap-3 bg-white font-semibold">
                <Image
                  src="/assets/images/icons/save-add.svg"
                  alt="icon"
                  width={24}
                  height={24}
                />
                <span>Save for Later</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[20px] bg-white">
            <h2 className="font-bold">Contact Our Sales</h2>
            <div className="flex flex-col gap-[30px]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                    <Image
                      src="/assets/images/photos/photo-1.png"
                      className="object-cover"
                      alt="photo"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-bold">Masayoshi</p>
                    <p className="text-sm leading-[21px]">Sales Manager</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a href="#">
                    <Image
                      src="/assets/images/icons/call-green.svg"
                      alt="icon"
                      width={40}
                      height={40}
                    />
                  </a>
                  <a href="#">
                    <Image
                      src="/assets/images/icons/chat-green.svg"
                      alt="icon"
                      width={40}
                      height={40}
                    />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                    <Image
                      src="/assets/images/photos/photo-2.png"
                      className="object-cover"
                      alt="photo"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-bold">Fuji Ovina</p>
                    <p className="text-sm leading-[21px]">Sales Manager</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a href="#">
                    <Image
                      src="/assets/images/icons/call-green.svg"
                      alt="icon"
                      width={40}
                      height={40}
                    />
                  </a>
                  <a href="#">
                    <Image
                      src="/assets/images/icons/chat-green.svg"
                      alt="icon"
                      width={40}
                      height={40}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Details;
