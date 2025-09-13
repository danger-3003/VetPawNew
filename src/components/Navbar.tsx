/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useState } from 'react';
import { Text } from './ui/Texts/WebTexts';
import { Moon, ShoppingCart, Sun, User } from 'lucide-react';
import { useThemeStore } from '@/store/ThemeStore';
import { useNavbarUrls } from './constants/NavbarConstants';
import IconButton from './ui/Button/IconButton';
import ClickOutside from './ui/ClickOutside';

function Navbar({ scrollProgress }: { scrollProgress: number }) {

  const { theme, setTheme } = useThemeStore();
  const [openMenu, setOpenMenu] = useState(false);
  const navbarURL = useNavbarUrls();

  const handleSetTheme = () => {
    setTheme();
  }

  const handleOpenMenu = () => {
    setOpenMenu((prev) => (prev === false ? true : false));
  }

  const handleCloseMenu = () => {
    setOpenMenu(false);
  }

  return (
    <>
      <ClickOutside onClickOutside={handleCloseMenu}>
        <div className='fixed top-0 z-20 flex items-center justify-center flex-col w-full bg-gradient-to-l from-white/80 dark:from-[#191919] dark:to-[#191919] to-white/80 backdrop-blur-xl shadow-customShadow duration-500 transition-colors'>
          <nav className='h-16 max-w-[80rem] w-full px-5 relative flex items-center justify-center flex-row'>
            <img src={"/LogoTransparent.png"} alt="Vetpaw Logo" className='aspect-video h-16 absolute left-5 sm:left-8' />
            <div className={`hidden md:flex items-center w-full justify-center flex-row gap-7 sm:gap-5 lg:gap-7 text-primary-400`}>
              {
                navbarURL.map((item, key) => (
                  <div key={key} className='group'>
                    <button onClick={() => (item.click(), handleOpenMenu())} >
                      <Text className={`px-0.5 lg:px-1 -mb-0.5 text-primary-400 hover:font-medium dark:text-slate-300 hover:text-primary-400 transition-all duration-500`}>
                        {item.title}
                      </Text>
                    </button>
                  </div>
                ))
              }
            </div>
            <div className='absolute right-5 sm:right-8 flex items-center justify-start gap-2'>
              <div className='hidden sm:flex items-start justify-center gap-2'>
                <IconButton
                  className="flex items-center justify-center size-8 group hover:bg-primary-300 dark:hover:bg-primary-400 rounded-lg custom-transition"
                  onClick={() => { window.open("/", "_blank") }}
                >
                  <User className='size-[60%] text-primary-300 group-hover:text-background dark:group-hover:text-black dark:text-white custom-transition' />
                </IconButton>
                <IconButton
                  className="flex items-center justify-center size-8 group hover:bg-primary-300 dark:hover:bg-primary-400 rounded-lg custom-transition"
                  onClick={() => { console.log("Linkedin") }}
                >
                  <ShoppingCart className='size-[60%] text-primary-300 group-hover:text-background dark:group-hover:text-black dark:text-white custom-transition' />
                </IconButton>
                <IconButton
                  className="flex items-center justify-center size-8 group hover:bg-primary-300 dark:hover:bg-primary-400 rounded-lg custom-transition relative"
                  onClick={() => { handleSetTheme() }}
                >
                  <Sun className={`size-[60%] text-primary-300 group-hover:text-background dark:group-hover:text-black dark:text-white absolute ${theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 rotate-90"} custom-transition`} />
                  <Moon className={`size-[60%] text-primary-300 group-hover:text-background dark:group-hover:text-black dark:text-white absolute ${theme === "light" ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"} custom-transition`} />
                </IconButton>
              </div>
              <div className='relative h-4 w-[20px] md:hidden flex items-center justify-center gap-0.5 flex-col cursor-pointer'
                onClick={() => { handleOpenMenu() }}
              >
                <div className={`w-[18px] h-[2.4px] bg-primary-400 dark:bg-text rounded-md absolute ${openMenu ? "rotate-45 top-[6.5px] dark:bg-primary-400" : "rotate-0 top-0 "} custom-transition`}></div>
                <div className={`w-[18px] h-[2.4px] bg-primary-400 dark:bg-text rounded-md absolute ${openMenu ? "opacity-0" : "opacity-100"} custom-transition`}></div>
                <div className={`w-[18px] h-[2.4px] bg-primary-400 dark:bg-text rounded-md absolute ${openMenu ? "-rotate-45 bottom-[6.5px] dark:bg-primary-400" : "rotate-0 bottom-0 "} custom-transition`}></div>
              </div>
            </div>
          </nav >
          <div className='w-full'>
            <div className={`h-[1.5px] bg-orange-400 dark:bg-white duraiton-500`} style={{ width: `${scrollProgress}%` }}></div>
          </div>
        </div >
        <div className={`flex md:hidden fixed z-[19] h-48 sm:h-52 left-0 items-center ${openMenu ? "top-16" : "-top-72"} w-full justify-center flex-col gap-4 text-primary-400 bg-gradient-to-l from-white/80 dark:from-[#191919] dark:to-[#191919] to-white/80 backdrop-blur-lg shadow-customShadow custom-transition`}>
          {
            navbarURL.map((item, key) => (
              <div key={key} className='group'>
                <Text onClick={() => (item.click(), handleOpenMenu())} className={`cursor-pointer px-1 -mb-0.5 text-primary-400 hover:font-bold dark:text-slate-300 hover:text-primary-400"} custom-transition mix-blend-multiply`}>
                  {item.title}
                </Text>
              </div>
            ))
          }
        </div >
        <div className='w-full h-12 z-20 fixed bottom-3 px-5 flex items-center justify-center flex-row'>
          <div className='flex sm:hidden items-center justify-evenly gap-2 w-full max-w-40 border-text border bg-gradient-to-l from-white/80 dark:from-[#191919] dark:to-[#191919] to-white/80 backdrop-blur-lg shadow-customShadow h-full rounded-xl'>
            <IconButton
              className="flex items-center justify-center size-8 group hover:bg-primary-300 dark:hover:bg-primary-400 rounded-lg custom-transition"
              onClick={() => { window.open("/", "_blank") }}
            >
              <User className='size-[60%] text-primary-300 group-hover:text-background dark:group-hover:text-black dark:text-white custom-transition' />
            </IconButton>
            <IconButton
              className="flex items-center justify-center size-8 group hover:bg-primary-300 dark:hover:bg-primary-400 rounded-lg custom-transition"
              onClick={() => { console.log("Linkedin") }}
            >
              <ShoppingCart className='size-[60%] text-primary-300 group-hover:text-background dark:group-hover:text-black dark:text-white custom-transition' />
            </IconButton>
            <IconButton
              className="flex items-center justify-center size-8 group hover:bg-primary-300 dark:hover:bg-primary-400 rounded-lg custom-transition relative"
              onClick={() => { handleSetTheme() }}
            >
              <Sun className={`size-[60%] text-primary-300 group-hover:text-background dark:group-hover:text-black dark:text-white absolute ${theme === "dark" ? "opacity-100" : "opacity-0"} custom-transition`} />
              <Moon className={`size-[60%] text-primary-300 group-hover:text-background dark:group-hover:text-black dark:text-white absolute ${theme === "light" ? "opacity-100" : "opacity-0"} custom-transition`} />
            </IconButton>
          </div>
        </div>
      </ClickOutside >
    </>
  )
}

export default Navbar