"use client"

import Products from '@/components/Products'
import React from 'react'

function ProductsPage() {
  return (
    <>
      <div className='flex items-center justify-center flex-col bg-background'>
        <div className='max-w-[80rem]'>
          <Products />
        </div>
      </div>
    </>
  )
}

export default ProductsPage