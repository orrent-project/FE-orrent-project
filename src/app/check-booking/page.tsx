'use client'
import { BookingDetails, CheckBookingFormData } from '@/interfaces/Type'
import { viewBookingSchema } from '@/interfaces/ValidationBooking'
import { fetchBookingDetails } from '@/services/office'
import React, { useState } from 'react'
import z from 'zod'
import { formatRupiah } from '@/utils/formatRupiah'
import { formatDate } from '@/utils/formatDate'
import Image from 'next/image'
import Navbar from '@/components/Navbar'

const CheckBooking = () => {
  const [formData, setFormData] = useState<CheckBookingFormData>({
    booking_trx_id: "",
    phone_number: ""
  })

  const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null)
  const [error, setError] = useState<string | null>(null);
  const base_url_storage = process.env.NEXT_PUBLIC_LARAVEL_STORAGE_BASE_URL;

  const getFieldError = (field: string) =>
    formErrors.find((error) => error.path.includes(field))?.message;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  setError(null)
  setFormErrors([])
  setBookingDetails(null)

  const validation = viewBookingSchema.safeParse(formData)

  if (!validation.success) {
    setFormErrors(validation.error.issues)
    return
  }

  setIsLoading(true)

  try {
    const bookingResponse = await fetchBookingDetails(formData)

    sessionStorage.setItem(
      'bookingData',
      JSON.stringify({
        office: bookingResponse.office,
        booking: bookingResponse,
      })
    )

    setBookingDetails(bookingResponse)
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message)
    } else {
      setError('An unexpected error occurred')
    }
  } finally {
    setIsLoading(false)
  }
}

  return (
    <>
      <Navbar />
      <div
        id="Banner"
        className="relative w-full h-[240px] flex items-center shrink-0 overflow-hidden -mb-[50px]"
      >
        <h1 className="text-center mx-auto font-extrabold text-[40px] leading-[60px] text-white mb-5 z-20">
          View Your Booking Details
        </h1>
        <div className="absolute w-full h-full bg-[linear-gradient(180deg,_rgba(0,0,0,0)_0%,#000000_91.83%)] z-10" />
        <Image
          src="/assets/images/thumbnails/thumbnail-details-5.png"
          className="object-cover object-top"
          alt=""
          fill
        />
      </div>
      <section
        id="Check-Booking"
        className="relative flex flex-col w-[930px] shrink-0 gap-[30px] mx-auto mb-[100px] z-20"
      >
        {error && (
          <div className="rounded-[20px] border border-red-300 bg-red-50 p-4 text-red-600 font-semibold">
            {error}
          </div>
        )}
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex items-end rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[16px] bg-white"
        >
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="name" className="font-semibold">
              Booking TRX ID
            </label>
            <div className="flex items-center rounded-full border border-[#000929] px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0D903A]">
              <Image
                src="/assets/images/icons/receipt-text-black.svg"
                alt="icon"
                width={24}
                height={24}
              />
              <input
                type="text"
                name="booking_trx_id"
                onChange={handleChange}
                value={formData.booking_trx_id}
                id="name"
                className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#000929]"
                placeholder="Write your booking trx id"
              />
            </div>
            {getFieldError("booking_trx_id") && (
              <p className="text-red-500 text-sm">
                {getFieldError("booking_trx_id")}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="phone" className="font-semibold">
              Phone Number
            </label>
            <div className="flex items-center rounded-full border border-[#000929] px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0D903A]">
              <Image
                src="/assets/images/icons/call-black.svg"
                alt="icon"
                width={24}
                height={24}
              />
              <input
                type="tel"
                name="phone_number"
                onChange={handleChange}
                value={formData.phone_number}
                id="phone"
                className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#000929]"
                placeholder="Write your valid number"
              />
            </div>
            {getFieldError("phone_number") && (
              <p className="text-red-500 text-sm">
                {getFieldError("phone_number")}
              </p>
            )}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="flex items-center justify-center rounded-full p-[12px_30px] gap-3 bg-[#0D903A] font-bold text-[#F7F7FD]"
          >
            <span className="text-nowrap">{isLoading ? "Loading..." : "Check Booking"}</span>
          </button>
        </form>
        {bookingDetails && (

          <div id="Result" className="grid grid-cols-2 gap-[30px]">
            <div className="flex flex-col h-fit shrink-0 rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
              <div className="flex items-center gap-4">
                <div className="flex shrink-0 w-[140px] h-[100px] rounded-[20px] overflow-hidden">
                  <Image
                    src={`${base_url_storage}/${bookingDetails.office.thumbnail}`}
                    className="w-full h-full object-cover"
                    alt="thumbnail"
                    width={140}
                    height={100}
                    unoptimized
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-xl leading-[30px]">
                    {bookingDetails.office.name}
                  </p>
                  <div className="flex items-center gap-[6px]">
                    <Image
                      src="/assets/images/icons/location.svg"
                      alt="icon"
                      width={24}
                      height={24}
                    />
                    <p className="font-semibold">{bookingDetails.office.city.name}</p>
                  </div>
                </div>
              </div>
              <hr className="border-[#F6F5FD]" />
              <div className="flex flex-col gap-4">
                <h2 className="font-bold">Customer Details</h2>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Full Name</h3>
                  <div className="flex items-center rounded-full px-5 py-3 gap-[10px] bg-[#F7F7FD]">
                    <Image
                      src="/assets/images/icons/security-user-black.svg"
                      alt="icon"
                      width={24}
                      height={24}
                    />
                    <p className="font-semibold">{bookingDetails.name}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">
                    Phone Number
                  </h3>
                  <div className="flex items-center rounded-full px-5 py-3 gap-[10px] bg-[#F7F7FD]">
                    <Image
                      src="/assets/images/icons/call-black.svg"
                      alt="icon"
                      width={24}
                      height={24}
                    />
                    <p className="font-semibold">{bookingDetails.phone_number}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">
                    Started At
                  </h3>
                  <div className="flex items-center rounded-full px-5 py-3 gap-[10px] bg-[#F7F7FD]">
                    <Image
                      src="/assets/images/icons/calendar-black.svg"
                      className="w-6 h-6"
                      alt="Calendar Icon"
                      width={24}
                      height={24}
                    />
                    <p className="font-semibold">{formatDate(bookingDetails.started_at)}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">
                    Ended At
                  </h3>
                  <div className="flex items-center rounded-full px-5 py-3 gap-[10px] bg-[#F7F7FD]">
                    <Image
                      src="/assets/images/icons/calendar-black.svg"
                      alt="icon"
                      width={24}
                      height={24}
                    />
                    <p className="font-semibold">{formatDate(bookingDetails.ended_at)}</p>
                  </div>
                </div>
              </div>
              <hr className="border-[#F6F5FD]" />
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/images/icons/shield-tick.svg"
                  alt="icon"
                  width={30}
                  height={30}
                />
                <p className="font-semibold leading-[28px]">
                  Privasi Anda aman bersama kami.
                </p>
              </div>
            </div>
            <div className="flex flex-col h-fit shrink-0 rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
              <h2 className="font-bold">Order Details</h2>
              <div className="flex flex-col gap-5">
                {bookingDetails.is_paid ? (
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">Status Pembayaran</p>
                    <p className="rounded-full w-fit p-[6px_16px] bg-[#0D903A] font-bold text-sm leading-[21px] text-[#F7F7FD]">
                      SUCCESS
                    </p>
                  </div>
                ) : (<div className="flex items-center justify-between">
                  <p className="font-semibold">Status Pembayaran</p>
                  <p className="rounded-full w-fit p-[6px_16px] bg-[#FF852D] font-bold text-sm leading-[21px] text-[#F7F7FD]">
                    PENDING
                  </p>
                </div>)}

                <div className="flex items-center justify-between">
                  <p className="font-semibold">Booking TRX ID</p>
                  <p className="font-bold">{bookingDetails.booking_trx_id}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Duration</p>
                  <p className="font-bold">{bookingDetails.duration}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Total Amount</p>
                  <p className="font-bold text-[22px] leading-[33px] text-[#0D903A]">
                    {formatRupiah(bookingDetails.total_amount)}
                  </p>
                </div>
              </div>
              <hr className="border-[#F6F5FD]" />
              <h2 className="font-bold">Bonus Packages For You</h2>
              <div className="flex justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src="/assets/images/icons/coffee.svg"
                    alt="icon"
                    width={34}
                    height={34}
                  />
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-bold">Extra Snacks</p>
                    <p className="text-sm leading-[21px]">Work-Life Balance</p>
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
                    <p className="font-bold">Free Move</p>
                    <p className="text-sm leading-[21px]">Anytime 24/7</p>
                  </div>
                </div>
              </div>
              <hr className="border-[#F6F5FD]" />
              <a
                href=""
                className="flex items-center justify-center w-full rounded-full border border-[#000929] p-[12px_20px] gap-3 bg-white font-semibold"
              >
                <Image
                  src="/assets/images/icons/call-black.svg"
                  alt="icon"
                  width={24}
                  height={24}
                />
                <span>Call Customer Service</span>
              </a>
            </div>
          </div>
        )}
      </section>
    </>

  )
}

export default CheckBooking