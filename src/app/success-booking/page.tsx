'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Office, BookingDetails } from '@/interfaces/Type'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Image from 'next/image'

type BookingData = {
  office: Office
  booking: BookingDetails
}

const SuccessBooking = () => {
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const saved = sessionStorage.getItem('bookingData')
    if (!saved) {
      router.replace('/')
      return
    }

    try {
      const parsed = JSON.parse(saved) as BookingData
      setBookingData({ office: parsed.office, booking: parsed.booking })
    } catch (error) {
      console.error('Failed to parse booking data', error)
      router.replace('/')
    } finally {
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return <p className="text-center py-10">Loading...</p>
  }

  if (!bookingData) {
    return null
  }

  const { office, booking } = bookingData
  console.log(bookingData)
  const base_url_storage = process.env.NEXT_PUBLIC_LARAVEL_STORAGE_BASE_URL;

  return (
    <>
      <Navbar />
      <section className="flex flex-1 py-10">
        <div className="flex flex-col w-[450px] m-auto rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
          <div className="flex items-center gap-4">
            <Image
              src="/assets/images/icons/verify.svg"
              className="flex shrink-0"
              alt="icon"
              width={50}
              height={50}
            />
            <h1 className="font-extrabold text-[28px] leading-[38px]">
              Booking Finished
            </h1>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex items-center gap-4">
            <div className="flex shrink-0 w-[140px] h-[100px] rounded-[20px] overflow-hidden">
              <Image
                src={`${base_url_storage}/${office.thumbnail}`}
                className="object-cover"
                alt="thumbnail"
                width={140}
                height={100}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl leading-[30px]">
                {office.name}
              </p>
              <div className="flex items-center gap-[6px]">
                <Image
                  src="/assets/images/icons/location.svg"
                  alt="icon"
                  width={24}
                height={24}
                />
                <p className="font-semibold">{office.address}</p>
              </div>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex items-center gap-4">
            <Image
              src="/assets/images/icons/receipt-text.svg"
              alt="icon"
              width={34}
                height={34}
            />
            <div>

              <p className="font-bold">{booking.booking_trx_id || 'FO1893009'}</p>
              <p className="text-sm leading-[21px] mt-[2px]">
                Save your booking ID securely
              </p>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <p className="font-semibold leading-[28px] text-center">
            Pesanan Anda sedang kami proses, kami akan menginformasikan status Anda
            melalui SMS
          </p>
          <Link href={"/check-booking"}>
            <div
              className="flex items-center justify-center w-full rounded-full p-[16px_26px] gap-3 bg-[#0D903A] font-bold text-[#F7F7FD]"
            >
              <span>View Booking Details</span>
            </div>
          </Link>
        </div>
      </section>
    </>

  )
}

export default SuccessBooking