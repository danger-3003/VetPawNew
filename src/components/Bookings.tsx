"use client"

import React, { useEffect, useState } from 'react'
import { handleGetUserBookingsApi } from '@/services/user/handler'
import { Order } from './types/ApiTypes';
import DataTable from './ui/DataTable';

function Bookings() {

  const [bookingData, setBookingData] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetBookings = async () => {
    const response = await handleGetUserBookingsApi();
    if (response?.status === 200) {
      setBookingData(response?.data?.orders);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    handleGetBookings();
  }, []);

  return (
    <>
      <div className='pt-32 pb-20 px-5 min-h-screen'>
        <h2 className="text-red-500 dark:text-text text-3xl font-semibold sm:text-4xl md:text-5xl mb-10">
          Bookings
        </h2>
        <DataTable
          tableData={bookingData || []}
          loading={loading}
        />
      </div>
    </>
  )
}

export default Bookings