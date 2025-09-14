/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useEffect, useState } from 'react'
import { handleAddToCart, handleGetAllProducts } from '@/services/products/handler'
import { Product, ProductsResponse } from './types/ApiTypes';
import { useCartStore } from '@/store/CartStore';
import { getCookie } from 'cookies-next';
import { handleNavigate } from '@/utils/Navigate';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { Rocket } from 'lucide-react';
import { Toaster } from './ui/Toaster';

function Products() {

  const [products, setProducts] = useState<ProductsResponse | null>(null);
  const token = getCookie('token');

  const [loading, setLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<{ show: boolean; message: string; status: boolean }>({
    show: false,
    message: "",
    status: false,
  });

  const { addToCart } = useCartStore();

  const handleGetProducts = async () => {
    const response = await handleGetAllProducts();
    if (response?.status === 200) {
      setProducts(response?.data);
      setLoading(false);
    }
  }

  const handleAddToCartAction = async ({ productItem }: { productItem: Product }) => {
    if (!token) {
      console.log("login");
      handleNavigate("login");
      return;
    }
    try {
      const payload = { productId: productItem?._id, quantity: 1 };
      const response = await handleAddToCart(payload);

      if (response.status === 200) {
        addToCart();
        setAlert({
          show: true,
          status: true,
          message: "Product added to cart successfully ✅",
        });
      }
    } catch (error: unknown) {
      let message = "Failed to add product to cart";
      if (typeof error === "object" && error !== null && "response" in error) {
        const errObj = error as { response?: { data?: { message?: string } } };
        message = errObj.response?.data?.message || message;
      }
      setAlert({
        show: true,
        status: false,
        message,
      });
    }
    setTimeout(() => {
      setAlert({
        show: false,
        status: false,
        message: "",
      });
    }, 3000);
  };


  useEffect(() => {
    setLoading(true);
    handleGetProducts();
  }, []);

  const ProductCard = ({ productItem }: { productItem: Product }) => {
    return (
      <div className='flex items-start justify-between flex-col h-min border-orange-300 border rounded-2xl overflow-hidden'>
        <div>
          <img src={productItem?.images[0]} alt={productItem?.title} />
        </div>
        <div className='p-5 w-full'>
          <p className='text-orange-600 dark:text-white font-semibold uppercase text-2xl text-center'>{productItem?.title}</p>
          <div className='flex items-end justify-end gap-3'>
            <p className='text-red-400 line-through'>Rs.{productItem?.regularPrice}</p>
            <p className='text-green-600 font-semibold text-xl'>Rs.{productItem?.salePrice}</p>
          </div>
          <div className='grid grid-cols-2 gap-5 mt-5'>
            <div
              className='cursor-pointer border border-orange-400 dark:border-orange-200 text-orange-400 font-semibold dark:text-orange-200 rounded-lg flex items-center justify-center py-1'
              onClick={() => { handleAddToCartAction({ productItem }) }}
            >
              Add
            </div>
            <div className='cursor-pointer bg-orange-400 dark:bg-orange-200 text-white dark:text-[#1e1e1e] font-semibold rounded-lg flex items-center justify-center py-1'>
              Buy
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Toaster
        status={alert?.status}
        message={alert?.message}
        showToast={alert?.show}
      />
      <div className='px-5 pt-40 pb-20'>
        <div className='flex items-center justify-center flex-col'>
          <div className="mb-10 flex items-center gap-2 rounded-full border border-orange-400/60 px-4 py-1 text-sm text-orange-400 shadow-sm w-max">
            <Rocket className="h-4 w-4" />
            <span>New Products Available Now</span>
          </div>
          <h1 className="text-red-500 text-3xl font-semibold sm:text-4xl md:text-5xl mb-10">
            Our Products
          </h1>
          {
            loading ?
              <div className='flex items-center justify-center flex-wrap gap-5 w-full'>
                {
                  Array.from({ length: 4 }).map((_, key) => (
                    <div key={key}>
                      <Skeleton height={100} width={240} />
                      <Skeleton count={1} width={240} />
                      <div className='flex items-center justify-center flex-row w-full gap-5 h-10'>
                        <Skeleton count={1} width={110} />
                        <Skeleton count={1} width={110} />
                      </div>
                    </div>
                  ))
                }
              </div>
              :
              <div className='grid sm:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                  products?.products?.map((item, key) => (
                    <div key={key}>
                      <ProductCard
                        productItem={item}
                      />
                    </div>
                  ))
                }
              </div>
          }
        </div>
      </div>
    </>
  )
}

export default Products