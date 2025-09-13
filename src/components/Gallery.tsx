/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client"

import React from 'react'
import { Image } from 'lucide-react'
import { GalleryData } from './constants/Gallery'

function Gallery() {
  return (
    <>
      <div id='gallerySection' className='flex items-center justify-center flex-col pt-24 pb-16 px-5'>
        <h2 data-aos="fade-up" className="text-red-500 dark:text-text text-3xl font-semibold sm:text-4xl md:text-5xl mb-10">
          Our Gallery
        </h2>
        <div data-aos="fade-up" data-aos-delay="100" className="mb-10 flex items-center gap-2 rounded-full border border-orange-300/60 px-4 py-1 text-sm text-orange-600 shadow-sm">
          <Image className="h-4 w-4" />
          <span>Explore Our Gallery</span>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-7 lg:gap-10'>
          {
            GalleryData?.map((item, key) => (
              <div data-aos="fade-up" data-aos-delay={(key + 1) * 50} key={key}>
                <img src={item?.img} alt={item?.title} className='rounded-2xl hover:shadow-lg hover:shadow-orange-100/10' />
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Gallery