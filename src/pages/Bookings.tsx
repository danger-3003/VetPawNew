"use client"

import Bookings from '@/components/Bookings'
import React from 'react'

function BookingsPage() {
  return (
    <>
      <div className='bg-background flex items-center justify-center flex-col'>
        <div className='w-full max-w-[80rem]'>
          <Bookings />
        </div>
      </div>
    </>
  )
}

export default BookingsPage