"use client"

import Contact from '@/components/Contact'
import React from 'react'

function ContactPage() {
  return (
    <>
      <div className='bg-background flex items-center justify-center flex-col'>
        <div className='w-full max-w-[80rem]'>
          <Contact />
        </div>
      </div>
    </>
  )
}

export default ContactPage