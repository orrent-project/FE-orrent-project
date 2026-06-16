import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
      <nav className="bg-white">
        <div className="flex items-center justify-between w-full max-w-[1130px] py-[22px] mx-auto">
          <a href="index.html">
            <Image src="/assets/images/logos/logo.svg" alt="logo" width={165} height={36} />
          </a>
          <ul className="flex items-center gap-[50px] w-fit">
            <li>
              <Link href="/">Browse</Link>
            </li>
            <li>
              <a href="">Popular</a>
            </li>
            <li>
              <a href="">Categories</a>
            </li>
            <li>
              <a href="">Events</a>
            </li>
            <li>
              <a href="view-booking-details.html">My Booking</a>
            </li>
          </ul>
          <a
            href="#"
            className="flex items-center gap-[10px] rounded-full border border-[#000929] py-3 px-5"
          >
            <Image
              src="/assets/images/icons/call.svg"
              width={24}
              height={24}
              alt="icon"
            />
            <span className="font-semibold">Contact Us</span>
          </a>
        </div>
      </nav>
  )
}

export default Navbar