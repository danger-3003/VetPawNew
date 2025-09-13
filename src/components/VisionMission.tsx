"use client"

import React from 'react'

function VisionMission() {
  return (
    <>
      <div className='flex items-center justify-center pt-24 pb-16 px-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          <div className='flex items-center justify-start flex-col'>
            <h2 data-aos="fade-up" className="text-red-500 text-3xl font-semibold sm:text-4xl md:text-5xl mb-5 sm:mb-10">
              Mission
            </h2>
            <p data-aos="fade-up" className='text-center text-orange-700 lg:w-[90%]'>
              To advance animal health by providing cutting-edge veterinary products that
              enhance quality of life. We are committed to supporting veterinarians, farmers,
              and pet owners with trusted solutions and compassionate care.
            </p>
          </div>
          <div className='flex items-center justify-start flex-col'>
            <h2 data-aos="fade-up" className="text-red-500 text-3xl font-semibold sm:text-4xl md:text-5xl mb-5 sm:mb-10">
              Vision
            </h2>
            <p data-aos="fade-up" className='text-center text-orange-700 lg:w-[90%]'>
              To become a global leader in veterinary pharmaceuticals by delivering safe,
              innovative, and reliable solutions. We aim to ensure healthier animals, stronger
              communities, and a brighter future for all.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default VisionMission