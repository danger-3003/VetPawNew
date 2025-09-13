/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client"

import React from 'react'
import { OurValuesData } from './constants/Values'
import CircularText from './ui/Texts/CircularText'
import { handleNavigate } from '@/utils/Navigate'
import { ShieldCheck } from 'lucide-react'

function OurValues() {

  return (
    <>
      <div className='flex items-center justify-center flex-col pt-24 px-5 relative'>
        <div className='absolute -top-16 right-5 rounded-full overflow-hidden'>
          <CircularText
            text='VetPaw * Manufacturers * '
            className='size-32 text-orange-600 font-semibold uppercase'
            spinDuration={10}
            onClick={() => { handleNavigate("products") }}
          />
        </div>
        <h2 data-aos="fade-up" className="text-red-500 dark:text-text text-3xl font-semibold sm:text-4xl md:text-5xl mb-10">
          Our Values
        </h2>
        <div className='flex items-center justify-center gap-7 flex-wrap'>
          {
            OurValuesData?.map((item, key) => (
              <div data-aos="fade-up" data-aos-delay={(key + 1) * 100} key={key} className='flex items-center justify-center flex-col gap-3'>
                <div className='size-40 p-5 bg-orange-50/40 dark:bg-zinc-900 border-orange-300 border rounded-2xl hover:shadow-orange-200/30 hover:dark:shadow-orange-100/10 hover:shadow-lg transition-all duration-300'>
                  <img src={item?.img} alt={item?.title} />
                </div>
                <p className='text-orange-700 dark:text-orange-200'>{item?.title}</p>
              </div>
            ))
          }
        </div>
      </div>
      <div className='flex items-center justify-center flex-col pt-24 pb-20 px-5'>
        <h2 data-aos="fade-up" className="text-red-500 dark:text-text text-3xl font-semibold sm:text-4xl md:text-5xl mb-10">
          Our Commitment
        </h2>
        <div data-aos="fade-up" className="mb-5 flex items-center gap-2 rounded-full border border-green-400 px-4 py-1 text-sm text-green-700 dark:text-green-400 shadow-sm w-max">
          <ShieldCheck className="h-4 w-4" />
          <span>Committed to Animal Health & Care</span>
        </div>
        <p data-aos="fade-up" className='text-orange-700 dark:text-orange-200 max-w-4xl text-center'>
          We are more than manufacturers - we are partners in animal care.
          At VetPaw, we believe that healthy animals are the foundation of a healthier world.
          That's why we work hand in hand with veterinarians, farmers, and pet owners,
          offering safe and reliable products that make a real difference.
        </p>
      </div>
      <div className='flex items-center justify-center w-full'>
        <h2 data-aos="fade-up" className='text-center text-text dark:text-text text-2xl font-medium sm:text-3xl mb-10 px-5 max-w-2xl'>
          Let's build a <span className='bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent text-3xl sm:text-4xl'>healthier, happier</span> world for <span className='bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent text-3xl sm:text-4xl'>animals</span> together!
        </h2>
      </div>
    </>
  )
}

export default OurValues