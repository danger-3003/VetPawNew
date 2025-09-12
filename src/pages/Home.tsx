"use client"


import About from '@/components/About'
import Hero from '@/components/Hero'
import React from 'react'

function Home() {
  return (
    <>
      <div className='w-full max-w-[80rem]'>
        <Hero />
        <About />
      </div>
    </>
  )
}

export default Home