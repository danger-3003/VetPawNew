/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { applyCouponApi, fetchCartApi, placeOrderApi } from "@/services/checkout/handler";
import Input from "@/components/ui/Input";
import { userStore } from "@/store/UserStore";
import Button from "./ui/Button/AuthButton";
import Select from "./ui/SelectOption";
import { CartOrder } from "./types/ApiTypes";
import { ArrowLeft, Loader } from "lucide-react";
import { handleNavigate } from "@/utils/Navigate";
import { Toaster } from "./ui/Toaster";

function CheckoutPage() {
  const { user } = userStore();
  const [cartData, setCartData] = useState<CartOrder | null>(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    dNo: "",
    address: "",
    city: "",
    postalCode: "",
    coupon: "",
    paymentMethod: "cod",
  });
  const [message, setMessage] = useState("");
  const [totalAmount, setTotalAmount] = useState({ totalAmount: 0, discount: 0 });
  const [isCoupon, setIsCoupon] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: "", status: false });
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  // --- Fetch Cart ---
  const fetchCartData = async () => {
    try {
      const response = await fetchCartApi();
      setCartData(response?.data?.cart);
      setTotalAmount({ totalAmount: response?.data?.cart.totalAmount, discount: 0 });
    } catch (err) {
      console.log("Fetch Cart Error:", err);
    }
  };

  // --- Place Order ---
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    if (!isCoupon) {
      setAlert({ show: true, message: "Apply Coupon or clear field", status: false });
      setTimeout(() => {
        setAlert({
          show: false,
          status: false,
          message: "",
        });
      }, 3000);
      return;
    }
    try {
      await placeOrderApi(
        userData.paymentMethod,
        {
          name: userData.name,
          email: userData.email,
          phone: userData.mobile,
          doorNo: userData.dNo,
          address: userData.address,
          city: userData.city,
          zipCode: userData.postalCode,
        },
        userData.coupon
      );
      setAlert({ show: true, message: "Order Placed", status: true });
      setTimeout(() => {
        setAlert({
          show: false,
          status: true,
          message: "",
        });
        handleNavigate("");
      }, 3000);
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as { response: unknown }).response === "object" &&
        (err as { response: { data?: { message?: string } } }).response !== null
      ) {
        const message = (err as { response: { data?: { message?: string } } }).response.data?.message;
        setAlert({ show: true, message: message || "Order failed", status: false });
        setTimeout(() => {
          setAlert({
            show: false,
            status: false,
            message: "",
          });
        }, 3000);
      } else {
        setAlert({ show: true, message: "Order failed", status: false });
        setTimeout(() => {
          setAlert({
            show: false,
            status: false,
            message: "",
          });
        }, 3000);
      }
    }
    finally {
      setSubmitLoading(false);
    }
  };

  // --- Apply Coupon ---
  const handleCoupon = async () => {
    try {
      const response = await applyCouponApi(userData.coupon);
      setTotalAmount({ totalAmount: response?.data?.totalAmount, discount: response?.data.discount });
      setMessage(response?.data.message);
      setIsCoupon(true);
    } catch (err: unknown) {
      // Reset coupon input
      setUserData({ ...userData, coupon: "" });

      // Extract message safely
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        "Invalid Coupon";
      setMessage(message);
      setTotalAmount({ ...totalAmount, discount: 0, totalAmount: cartData?.totalAmount ?? 0 });
    }

  };

  // --- Prefill user data if available ---
  useEffect(() => {
    if (user) {
      setUserData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        mobile: user.phone || "",
        address: user.address || "",
        city: "",
        postalCode: "",
      }));
    }
  }, [user]);

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    if (userData.coupon.length > 0) setIsCoupon(false);
    else setIsCoupon(true);
  }, [userData.coupon]);

  return (
    <>
      <Toaster
        status={alert?.status}
        message={alert?.message}
        showToast={alert?.show}
      />
      <div className="w-full flex items-center justify-center flex-col p-5 pt-28 pb-20">
        {/* Alert */}
        {/* {alert.show && (
          <div
            className={`w-full fixed z-20 top-0 text-center py-2 text-white ${alert.status === true ? "bg-green-500" : "bg-red-500"
              }`}
            onClick={() => setAlert({ ...alert, show: false })}
          >
            {alert.message}
          </div>
        )} */}

        <div className="w-full xl:w-[70rem]">
          <form onSubmit={handlePlaceOrder}>
            <div className="flex items-start justify-center flex-col md:flex-row gap-5 w-full font-poppins">
              {/* Left Section - Address Form */}
              <div className="shadow-lg p-3 rounded-lg bg-white dark:bg-zinc-800/20 text-sm w-full md:w-[36rem] lg:w-[40rem]">
                <p className="text-orange-400 font-medium mb-3 text-base">
                  Shopping Cart
                </p>
                <div className="mt-5 flex flex-col gap-4">
                  <div className="flex gap-4 flex-row">
                    <Input
                      required
                      label="Name"
                      type="text"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      className="w-full"
                    />
                    <Input
                      required
                      label="Email"
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <div className="flex gap-4 flex-row">
                    <Input
                      required
                      label="Phone"
                      type="number"
                      value={userData.mobile}
                      onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
                      className="w-full"
                    />
                    <Input
                      required
                      label="D. No."
                      type="text"
                      value={userData.dNo}
                      onChange={(e) => setUserData({ ...userData, dNo: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <Input
                    required
                    label="Address"
                    type="text"
                    value={userData.address}
                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                  />

                  <div className="flex gap-4 flex-row">
                    <Input
                      required
                      label="City"
                      type="text"
                      value={userData.city}
                      onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                      className="w-full"
                    />
                    <Input
                      required
                      label="Postal Code"
                      type="text"
                      value={userData.postalCode}
                      onChange={(e) => setUserData({ ...userData, postalCode: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <Select
                    label="Payment Method"
                    value={userData.paymentMethod}
                    onChange={(e) => setUserData({ ...userData, paymentMethod: e.target.value })}
                    options={[
                      { value: "cod", label: "COD" },
                      { value: "online", label: "Online" },
                    ]}
                  />
                </div>

                <div
                  className="flex items-center gap-2 mt-3 text-gray-800 dark:text-text text-sm w-min cursor-pointer group"
                  onClick={() => {
                    handleNavigate("products")
                  }}
                >
                  <ArrowLeft width={16} />
                  <p className="group-hover:underline">Continue&nbsp;Shopping</p>
                </div>
              </div>

              {/* Right Section - Cart + Payment Summary */}
              <div className="w-full md:w-96 md:sticky md:top-20">
                <div className="shadow-lg p-3 rounded-lg bg-white dark:bg-zinc-800/20 text-sm mb-3">
                  <p className="text-orange-400 font-medium mb-3 text-base">
                    Cart Items
                  </p>
                  <div className="mt-3">
                    <table className="w-full">
                      <tbody>
                        {
                          cartData?.products?.length ?? 0 > 0 ?
                            <>
                              {cartData?.products?.map((item, key: number) => (
                                <tr key={key} className={key + 1 === cartData.products.length ? "" : "border-b border-gray-300 dark:border-zinc-600"}>
                                  <td className="flex gap-2 py-2">
                                    <img src={item.product.images[0]} alt="" className="w-16" />
                                    <div className="flex flex-col">
                                      <p className="font-semibold text-text">{item.product.title}</p>
                                      <p className="text-gray-400">{item?.product?.description}</p>
                                    </div>
                                  </td>
                                  <td className="text-right text-text">{(item?.price * item?.quantity).toFixed(2)}</td>
                                </tr>
                              ))}
                            </> :
                            <>
                              <tr>
                                <td colSpan={2} className="flex items-center justify-center">
                                  <Loader width={16} className="animate-spin text-orange-400" />
                                </td>
                              </tr>
                            </>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="shadow-lg p-3 rounded-lg bg-white dark:bg-zinc-800/20 text-sm">
                  <p className="text-orange-400 font-medium mb-3 text-base">
                    Payment Summary
                  </p>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm text-gray-800 dark:text-gray-400">
                      <span>Sub Total</span>
                      <span>{(cartData?.totalAmount)?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-800 dark:text-gray-400">
                      <span>Discount</span>
                      <span>{totalAmount.discount > 0 ? "-" + (totalAmount?.discount).toFixed(2) : (totalAmount.discount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-800 dark:text-gray-400">
                      <span>GST</span>
                      <span>{(cartData?.totalGstAmount)?.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-2 w-full">
                      <Input
                        label=""
                        type="text"
                        placeholder="Coupon Code"
                        value={userData.coupon}
                        onChange={(e) => setUserData({ ...userData, coupon: e.target.value })}
                        className="border-t border-gray-300 dark:border-zinc-600 rounded-md w-full"
                      />
                      <div className="">
                        <Button type="button" className="flex items-center justify-center text-base mt-1" onClick={handleCoupon}>
                          Apply
                        </Button>
                      </div>
                    </div>
                    <p className="text-red-500 text-xs">{message}</p>

                    <div className="flex justify-between border-t border-gray-300 dark:border-zinc-600 mt-3 pt-2 text-text">
                      <p>Total:</p>
                      <p>{totalAmount?.discount > 0 ? totalAmount?.totalAmount : (totalAmount?.totalAmount + (cartData?.totalGstAmount ?? 0)).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center mt-3">
                  <Button type="submit" className="max-w-40 w-40 flex items-center justify-center">
                    {
                      submitLoading ?
                        <>
                          <Loader width={16} className="animate-spin" />
                        </> :
                        "Place Order"
                    }
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div >
      </div >
    </>
  );
}

export default CheckoutPage;
