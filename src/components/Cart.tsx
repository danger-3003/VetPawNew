/* eslint-disable @next/next/no-img-element */
"use client"

import { decreaseCartItemApi, deleteCartItemApi, fetchCartApi, increaseCartItemApi, updateCartItemApi } from '@/services/cart/handler';
import React, { useEffect, useState } from 'react'
import { CartOrder } from './types/ApiTypes';
import Button from './ui/Button/AuthButton';
import { handleNavigate } from '@/utils/Navigate';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import { ArrowLeft, Trash } from 'lucide-react';
import { Toaster } from './ui/Toaster';
import { useCartStore } from '@/store/CartStore';
import { debounce } from 'lodash';

function Cart() {

  const [cartResponse, setCartResponse] = useState<CartOrder | null>(null);
  const { addToCart, removeFromCart } = useCartStore();
  const [itemsCount, setItemsCount] = useState<{ [key: string]: number }>({});
  const [total, setTotal] = useState(0);
  const [loader, setLoader] = useState(true);
  const [alert, setAlert] = useState<{ show: boolean; message: string; status: boolean }>({
    show: false,
    message: "",
    status: false,
  });
  const [summary, setSummary] = useState({
    subtotal: 0,
    gst: 0,
    grand: 0,
  });


  const handleFetCartData = async () => {
    const response = await fetchCartApi();
    if (response?.status === 200) {
      const cart = response?.data?.cart;
      setCartResponse(cart);
      setSummary({
        subtotal: cart.totalAmount,
        gst: cart.totalGstAmount,
        grand: cart.grandAmount,
      });
    }
    setLoader(false);
  }

  const handleChangeItem = (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
    const value = Number(e.target.value) || 0;
    setItemsCount((prev) => ({ ...prev, [productId]: value }));

    debouncedUpdate(productId, value);
  };

  const debouncedUpdate = debounce(async (productId: string, quantity: number) => {
    const response = await updateCartItemApi({ productId, quantity });
    if (response?.status === 200) {
      setAlert({
        show: true,
        status: true,
        message: response?.data?.message,
      });
      handleFetCartData(); // refresh cart
    }
    setTimeout(() => {
      setAlert({ show: false, status: true, message: "" });
    }, 3000);
  }, 1500);

  const handleDeleteCartItem = async (productId: string) => {
    const response = await deleteCartItemApi(productId)
    if (response?.status === 200) {
      handleFetCartData();
      setAlert({
        show: true,
        status: true,
        message: response?.data?.message,
      });
      setLoader(false);
    }
    setTimeout(() => {
      setAlert({
        show: false,
        status: true,
        message: "",
      });
    }, 3000);
  }

  const handleAddItem = async ({ productId, quantity }: { productId: string; quantity: number }) => {
    // update input value instantly
    setItemsCount((prev) => ({
      ...prev,
      [productId]: (prev[productId] ?? (cartResponse?.products.find(p => p.product._id === productId)?.quantity || 0)) + quantity,
    }));

    const response = await increaseCartItemApi({ productId, quantity });
    if (response?.status === 200) {
      setAlert({
        show: true,
        status: true,
        message: response?.data?.message,
      });
      addToCart(quantity);
      handleFetCartData();
    }
    setTimeout(() => {
      setAlert({ show: false, status: true, message: "" });
    }, 3000);
  };

  const handleRemoveItem = async ({ productId, quantity }: { productId: string; quantity: number }) => {
    setItemsCount((prev) => {
      const current = prev[productId] ?? (cartResponse?.products.find(p => p.product._id === productId)?.quantity || 0);
      return { ...prev, [productId]: Math.max(current - quantity, 1) };
    });

    const response = await decreaseCartItemApi({ productId, quantity });
    if (response?.status === 200) {
      setAlert({
        show: true,
        status: true,
        message: response?.data?.message,
      });
      removeFromCart(quantity);
      handleFetCartData();
    }
    setTimeout(() => {
      setAlert({ show: false, status: true, message: "" });
    }, 3000);
  };

  useEffect(() => {
    setLoader(true);
    handleFetCartData();
  }, []);

  useEffect(() => {
    if (!cartResponse?.products) return;

    const subtotal = cartResponse.products.reduce((acc, item) => {
      const quantity = itemsCount[item.product._id] ?? item.quantity;
      return acc + item.price * quantity;
    }, 0);

    const gstRate = 0.18; // 18% GST
    const gstAmount = subtotal * gstRate;
    const grandTotal = subtotal + gstAmount;

    setTotal(grandTotal);
  }, [cartResponse, itemsCount]);


  return (
    <>
      <Toaster
        status={alert?.status}
        message={alert?.message}
        showToast={alert?.show}
      />
      <div className='pt-24 pb-20 px-5'>
        <div className='bg-orange-200 shadow-custom relative overflow-hidden w-full flex items-center justify-between flex-col sm:flex-row gap-3 py-5 xs:py-10 px-5 md:px-10 rounded-xl h-40'>
          <div className='h-52 w-52 rounded-full bg-orange-500 hidden sm:block absolute -left-14 z-1'></div>
          <div className='h-52 w-52 rounded-full bg-orange-400 absolute -left-24 z-1'></div>
          <div className='h-32 w-32 rounded-full bg-orange-600 absolute -left-16 z-5'></div>
          <div className='relative font-semibold text-xl text-[#1e1e1e] z-10'>
            <p>VetPaw/Cart</p>
          </div>
          <div className='relative z-10'>
            <img src="/LogoTransparent.png" alt="VetPaw Logo" className='h-20 xs:h-20' />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start justify-start gap-5 w-full mt-5">
          {/* Cart Table */}
          <div className="w-full md:basis-[70%] shadow-lg p-3 rounded-lg bg-white dark:bg-zinc-800/20 overflow-x-auto">
            <p className="text-orange-400 font-medium mb-3">
              Shopping Cart{" "}
              <span className="text-gray-400 text-[0.8rem] font-normal">
                ({cartResponse?.products ? cartResponse?.products.length : 0} items)
              </span>
            </p>
            <div className="w-full overflow-x-auto rounded-lg border border-gray-300 dark:border-zinc-600 shadow-sm">
              <table className="w-full min-w-[600px]">
                <thead className="bg-orange-400 text-background text-sm">
                  <tr className="font-medium">
                    <td className="py-3 px-4 w-60 text-sm">Product</td>
                    <td className="py-3 px-4">Quantity</td>
                    <td className="py-3 px-4">Unit&nbsp;price</td>
                    <td className="py-3 px-4">Total&nbsp;price</td>
                    <td className="py-3 px-4">Action</td>
                  </tr>
                </thead>
                <tbody className="font-poppins">
                  {loader ? (
                    Array.from({ length: 3 }).map((_, index) => (
                      <tr key={index}>
                        <td className="flex items-start justify-start flex-row gap-3 p-2 pt-4 w-60">
                          <Skeleton height={56} width={56} />
                          <div>
                            <Skeleton height={24} width={150} />
                            <Skeleton height={16} width={150} />
                          </div>
                        </td>
                        <td className="w-28 p-2 pt-4">
                          <Skeleton height={40} width={80} />
                        </td>
                        <td className="p-2 pt-4 w-16 text-center font-medium">
                          <Skeleton height={24} width={50} />
                        </td>
                        <td className="p-2 pt-4 w-16 text-center font-medium">
                          <Skeleton height={24} width={24} />
                        </td>
                        <td className="p-2 pt-4 w-16 text-center font-medium">
                          <Skeleton height={24} width={24} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <>
                      {
                        (cartResponse?.products?.length ?? 0) > 0 ?
                          <>
                            {
                              cartResponse?.products.map((item, key) => {
                                return (
                                  <tr
                                    key={key}
                                    className="border-t border-gray-300 dark:border-zinc-600 cursor-pointer hover:bg-gray-50 hover:dark:bg-zinc-800/50 dark:bg-zinc-900 bg-background text-text text-sm transition-colors"
                                  >
                                    <td className="flex items-start justify-start flex-row gap-3 px-4 py-3 w-60">
                                      <img src={item.product.images[0]} alt="" className="h-14" />
                                      <div>
                                        <p className="font-semibold text-lg">
                                          {item.product.title || <Skeleton count={1} />}
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                          {item.product.description || <Skeleton count={1} />}
                                        </p>
                                      </div>
                                    </td>
                                    <td className="w-28 px-4 py-3">
                                      <div className="w-28 rounded-md border border-gray-300 dark:border-zinc-600 h-10 flex items-center justify-between flex-row">
                                        <div
                                          className="w-10 h-10 cursor-pointer flex items-center justify-center text-text text-xl"
                                          onClick={() => {
                                            handleRemoveItem({
                                              productId: item?.product?._id,
                                              quantity: 1,
                                            });
                                          }}
                                        >
                                          -
                                        </div>
                                        <input
                                          type="text"
                                          value={itemsCount[item.product._id] ?? item.quantity}
                                          className="border-0 outline-none w-10 text-center bg-transparent"
                                          onChange={(e) =>
                                            handleChangeItem(e, item.product._id)
                                          }
                                        />
                                        <div
                                          className="w-10 h-10 cursor-pointer flex items-center justify-center text-text text-xl"
                                          onClick={() => {
                                            handleAddItem({
                                              productId: item?.product?._id,
                                              quantity: 1,
                                            });
                                          }}
                                        >
                                          +
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 w-16">
                                      {item?.price.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-3 w-16">
                                      Rs.{(item?.quantity * item?.price).toFixed(2)}
                                    </td>
                                    <td className="px-4 py-3 w-16">
                                      <div className="flex items-center justify-center">
                                        <Trash
                                          width={16}
                                          className="text-red-400 hover:text-red-500 cursor-pointer duration-300"
                                          onClick={() => {
                                            handleDeleteCartItem(item?.product?._id);
                                          }}
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })
                            }
                          </> :
                          <>
                            <tr>
                              <td colSpan={5} className="px-4 py-3">
                                <p className='text-center text-text text-sm'>No items found</p>
                              </td>
                            </tr>
                          </>
                      }
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-1 pt-3">
              <div
                className="flex items-center justify-start flex-row gap-2 text-gray-800 dark:text-text text-sm w-min cursor-pointer group"
                onClick={() => {
                  handleNavigate("products");
                }}
              >
                <ArrowLeft width={16} />
                <p className="group-hover:underline">Continue&nbsp;Shopping</p>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="w-full sm:w-72 md:basis-[30%] shadow-lg p-3 rounded-lg bg-white dark:bg-zinc-800/20 text-sm">
            <div className="w-full">
              <p className="text-orange-400 font-medium mb-3 text-base">
                Payment Summary
              </p>
              <div className="w-full">
                <table className="w-full text-sm">
                  <tbody className="w-full">
                    <tr>
                      <td className="text-gray-600 dark:text-gray-300">Subtotal</td>
                      <td className="text-right font-medium text-gray-600 dark:text-gray-300">
                        {summary.subtotal.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray-600 dark:text-gray-300">GST</td>
                      <td className="text-right font-medium text-gray-600 dark:text-gray-300">
                        {summary.gst.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-300 dark:border-zinc-600">
                          <p className="font-semibold text-gray-800 dark:text-text">Total</p>
                          <p className="text-right font-medium text-gray-800 dark:text-text">
                            {summary.grand.toFixed(2)}
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full mt-5 md:mt-2 lg:mt-3 flex items-center justify-center">
              <Button
                className="max-w-60 md:max-w-full w-full normal-case font-normal"
                color="orange"
                onClick={() => {
                  handleNavigate("checkout");
                }}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart