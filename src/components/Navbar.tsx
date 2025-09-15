/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Text } from './ui/Texts/WebTexts';
import { Moon, ShoppingCart, Sun, User } from 'lucide-react';
import { useThemeStore } from '@/store/ThemeStore';
import { useNavbarUrls } from './constants/NavbarConstants';
import IconButton from './ui/Button/IconButton';
import ClickOutside from './ui/ClickOutside';
import { useProfileUrls } from './constants/ProfileConstants';
import { getCookie } from 'cookies-next';
import { handleNavigate } from '@/utils/Navigate';
import { handleGetCartCountApi } from '@/services/products/handler';
import { useCartStore } from '@/store/CartStore';
import { Toaster } from './ui/Toaster';
import { usePathname } from 'next/navigation';
import { userStore } from '@/store/UserStore';

function Navbar({ scrollProgress }: { scrollProgress: number }) {

  const { theme, setTheme } = useThemeStore();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const pathname = usePathname();
  const navbarURL = useNavbarUrls();
  const profileURL = useProfileUrls();
  const { cartCount, initialCart } = useCartStore();
  const { removeUser } = userStore();
  const [alert, setAlert] = useState<{ show: boolean; message: string; status: boolean }>({
    show: false,
    message: "",
    status: false,
  });
  const token = getCookie("token");

  const handleSetTheme = () => {
    setTheme();
  }

  const handleOpenMenu = () => {
    setOpenMenu((prev) => (prev === false ? true : false));
    setShowProfile(false);
  }

  const handleCloseMenu = () => {
    setOpenMenu(false);
  }

  const handleCloseProfile = () => {
    setShowProfile(false);
  }

  const handleOpenProfile = () => {
    setShowProfile((prev) => (prev === false ? true : false));
    setOpenMenu(false);
  }

  const handleLogOut = () => {
    removeUser();
    setAlert({ message: "Logout successfull", show: true, status: true });
    setTimeout(() => {
      setAlert({ message: "", show: false, status: true });
    }, 1500);
  }

  useEffect(() => {
    const token = getCookie("token") as string | undefined;
    if (token) {
      handleGetCartCountApi()
        .then((res) => {
          initialCart(res.data.totalCart);
        })
        .catch((err) => {
          setAlert({ message: err.response?.data || "Error fetching cart count", show: true, status: false });
        })
        .finally(() => {
          setTimeout(() => {
            setAlert({
              show: false,
              status: false,
              message: "",
            });
          }, 1500);
        })
    }
  }, [pathname]);

  return (
    <>
      <Toaster
        message={alert?.message}
        showToast={alert?.show}
        status={alert?.status}
      />
      <ClickOutside onClickOutside={handleCloseMenu}>
        <div className='fixed top-0 z-20 flex items-center justify-center flex-col w-full bg-gradient-to-l from-white dark:from-[#191919] dark:to-[#191919] to-white backdrop-blur-xl shadow-customShadow duration-500 transition-colors'>
          <nav className='h-16 max-w-[80rem] w-full px-5 relative flex items-center justify-center flex-row'>
            <img src={"/LogoTransparent.png"} alt="Vetpaw Logo" className='aspect-video h-16 absolute left-5 sm:left-8' />
            <div className={`hidden md:flex items-center w-full justify-center flex-row gap-7 sm:gap-5 lg:gap-7`}>
              {
                navbarURL.map((item, key) => (
                  <div key={key} className='group'>
                    <button onClick={() => (item.click(), handleOpenMenu())} >
                      <Text className={`px-0.5 lg:px-1 -mb-0.5 text-text transition-all duration-500`}>
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
                  onClick={() => { handleOpenProfile() }}
                >
                  <User className='size-[60%] text-primary-300 group-hover:text-background dark:group-hover:text-black dark:text-white custom-transition' />
                </IconButton>
                <IconButton
                  className="flex items-center justify-center size-8 group hover:bg-primary-300 dark:hover:bg-primary-400 rounded-lg custom-transition relative"
                  onClick={() => { handleNavigate("cart") }}
                >
                  <ShoppingCart className='size-[60%] text-primary-300 group-hover:text-background dark:group-hover:text-black dark:text-white custom-transition' />
                  {
                    token &&
                    <div className='bg-orange-400 group-hover:bg-orange-600 rounded-full size-4 absolute -top-1 left-4 flex items-center justify-center custom-transition'>
                      <p className='text-background text-[8px]'>{cartCount > 99 ? "99+" : cartCount}</p>
                    </div>
                  }
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
                <div className={`w-[18px] h-[2.4px] bg-primary-300 dark:bg-text rounded-md absolute ${openMenu ? "rotate-45 top-[6.5px] dark:bg-primary-400" : "rotate-0 top-0 "} custom-transition`}></div>
                <div className={`w-[18px] h-[2.4px] bg-primary-300 dark:bg-text rounded-md absolute ${openMenu ? "opacity-0" : "opacity-100"} custom-transition`}></div>
                <div className={`w-[18px] h-[2.4px] bg-primary-300 dark:bg-text rounded-md absolute ${openMenu ? "-rotate-45 bottom-[6.5px] dark:bg-primary-400" : "rotate-0 bottom-0 "} custom-transition`}></div>
              </div>
            </div>
          </nav >
          <div className='w-full'>
            <div className={`h-[1.5px] bg-orange-400 dark:bg-white duraiton-500`} style={{ width: `${scrollProgress}%` }}></div>
          </div>
        </div >
        <div className={`flex md:hidden fixed z-[19] h-48 sm:h-52 left-0 items-center ${openMenu ? "top-16" : "-top-72"} w-full justify-center flex-col gap-4 bg-gradient-to-l from-white dark:from-[#191919] dark:to-[#191919] to-white backdrop-blur-lg shadow-customShadow custom-transition`}>
          {
            navbarURL.map((item, key) => (
              <div key={key} className='group'>
                <Text onClick={() => (item.click(), handleOpenMenu())} className={`cursor-pointer px-1 -mb-0.5 text-text custom-transition`}>
                  {item.title}
                </Text>
              </div>
            ))
          }
        </div >
        <div className='w-full h-12 z-20 fixed sm:hidden bottom-3 px-5 flex items-center justify-center flex-row'>
          <div className='flex items-center justify-evenly gap-2 w-full max-w-40 border-text border bg-gradient-to-l from-white dark:from-[#191919] dark:to-[#191919] to-white backdrop-blur-lg shadow-customShadow h-full rounded-xl'>
            <IconButton
              className="flex items-center justify-center size-8 group hover:bg-primary-300 dark:hover:bg-primary-400 rounded-lg custom-transition"
              onClick={() => { handleOpenProfile() }}
            >
              <User className='size-[60%] text-primary-300 group-hover:text-background dark:group-hover:text-black dark:text-white custom-transition' />
            </IconButton>
            <IconButton
              className="flex items-center justify-center size-8 group hover:bg-primary-300 dark:hover:bg-primary-400 rounded-lg custom-transition relative"
              onClick={() => { handleNavigate("cart") }}
            >
              <ShoppingCart className='size-[60%] text-primary-300 group-hover:text-background dark:group-hover:text-black dark:text-white custom-transition' />
              {
                token &&
                <div className='bg-orange-400 group-hover:bg-orange-600 rounded-full size-4 absolute -top-1 left-4 flex items-center justify-center custom-transition'>
                  <p className='text-background text-[8px]'>{cartCount > 99 ? "99+" : cartCount}</p>
                </div>
              }
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

      <ClickOutside onClickOutside={handleCloseProfile}>
        {
          showProfile &&
          <div className='w-full flex items-center justify-center'>
            <div className='max-w-[80rem] w-full relative flex items-end justify-end'>
              <div
                className={`bg-background h-max w-48 fixed top-[70px] z-20 rounded-xl flex items-center justify-between flex-col gap-1 ${token ? "p-1" : "p-2"} shadow-md shadow-text/20`}
                onClick={(e) => e.stopPropagation()}
              >
                {
                  token ?
                    <>
                      {
                        profileURL?.map((item, key) => (
                          <div key={key} onClick={() => {
                            handleCloseProfile();
                            if (profileURL.length - 1 === key) {
                              item?.click();
                              handleLogOut();
                            } else {
                              item?.click();
                            }
                          }} className={`text-sm cursor-pointer w-full text-center text-text ${profileURL.length - 1 === key ? "bg-orange-400 text-background" : "hover:bg-slate-100 hover:dark:bg-zinc-800/50"} transition-all duration-300 rounded-lg py-[4px]`}>
                            <p>{item?.title}</p>
                          </div>
                        ))
                      }
                    </> :
                    <>
                      <div onClick={() => {
                        handleNavigate("login")
                      }} className={`text-sm cursor-pointer w-full text-center text-text bg-orange-400 transition-all duration-300 rounded-lg py-[4px]`}>
                        <p>Login</p>
                      </div>
                    </>
                }
              </div>
            </div>
          </div>
        }
      </ClickOutside>
    </>
  )
}

export default Navbar