"use client"

import Cart from '@/components/Cart'
import React from 'react'

function CartPage() {
  return (
    <>
      <div className="bg-background w-full flex items-center justify-center flex-col">
        <div className="w-full max-w-[80rem]">
          <Cart />
        </div>
      </div>
    </>
  )
}

export default CartPage