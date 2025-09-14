"use client"

import React from 'react'
import Checkout from '@/components/Checkout'

function CheckoutPage() {
  return (
    <>
      <div className="bg-background w-full flex items-center justify-center flex-col">
        <div className="w-full max-w-[80rem]">
          <Checkout />
        </div>
      </div>
    </>
  )
}

export default CheckoutPage