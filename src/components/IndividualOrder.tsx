/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CirclePlus } from "lucide-react";
import ClickOutside from "./ui/ClickOutside";

// ------------------ Types ------------------

type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  product?: {
    images: string[];
  };
};

type Address = {
  name: string;
  email: string;
  phone: string;
  doorNo: string;
  address: string;
  city: string;
};

type Booking = {
  _id: string;
  products: Product[];
  gstAmount: number;
  totalAmount: number;
  grandAmount: number;
  discount: number;
  address: Address;
  status: string;
  paymentMethod: string;
  createdAt: string;
  orderId: string;
};

// ------------------ Component ------------------

interface IndividualProps {
  bookingsData: Booking | null;
  setIndividual: React.Dispatch<React.SetStateAction<boolean>>;
}

const Individual: React.FC<IndividualProps> = ({ bookingsData, setIndividual }) => {
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex items-start gap-3">
            {product.product?.images?.[0] && (
              <img
                src={product.product.images[0]}
                alt={product.name}
                className="h-14"
              />
            )}
            <div>
              <p className="font-semibold text-lg text-text">{product.name}</p>
              <p className="text-gray-500 dark:text-zinc-500 text-sm">{product.name}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: () => <div className="">Quantity</div>,
      cell: ({ getValue }) => (
        <div className="">{getValue<number>()} N</div>
      ),
    },
    {
      accessorKey: "price",
      header: () => <div className="">Unit price</div>,
      cell: ({ getValue }) => (
        <div className="">Rs.{getValue<number>()}</div>
      ),
    },
    {
      accessorKey: "totalAmount",
      header: () => <div className="">Total Price</div>,
      cell: ({ row }) => {
        const { price, quantity } = row.original;
        return (
          <div className="">Rs.{price * quantity}</div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: bookingsData?.products || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-black/50 flex items-center justify-center w-full h-screen fixed top-0 left-0 z-30 px-5 py-10 sm:p-10 font-poppins">
      <ClickOutside onClickOutside={() => setIndividual(false)}>
        <div className="w-full max-w-[80vw] md:max-w-2xl lg:max-w-5xl max-h-[80vh] bg-white dark:bg-background relative overflow-auto flex flex-col gap-3 shadow-custom rounded-xl p-5">
          <div>
            <CirclePlus
              className="cursor-pointer rotate-45 text-red-500"
              onClick={() => setIndividual(false)}
            />
          </div>
          <div className="flex flex-col gap-3 w-full mt-5">
            {/* Product Table */}
            <div className="w-full overflow-x-auto pb-3 pt-1">
              <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-zinc-600 shadow-sm">
                <table className="min-w-full w-[768px] text-sm text-left">
                  <thead className="bg-orange-400 text-background">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr
                        key={headerGroup.id}
                        className="px-4 py-3 font-semibold select-none"
                      >
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="py-3 px-4 text-sm"
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="border-t border-gray-300 dark:border-zinc-600 cursor-pointer hover:bg-gray-50 hover:dark:bg-zinc-800/50 dark:bg-zinc-800/20 bg-background text-text transition-colors"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-4 py-3 font-light">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Delivery Address */}
          <div className="flex items-start justify-between flex-col md:flex-row gap-5 w-full">
            <div className="w-full shadow-lg p-3 rounded-lg bg-white dark:bg-zinc-800/20">
              <p className="text-orange-400 font-medium mb-3">
                Delivery Address
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-3">
                  <div className="w-60">
                    <p className="text-gray-400 text-sm dark:text-zinc-500">Name</p>
                    <p className="font-light text-text text-sm">{bookingsData?.address.name}</p>
                  </div>
                  <div className="w-60 relative">
                    <p className="text-gray-400 text-sm dark:text-zinc-500">Email</p>
                    <div className="group">
                      <p className="font-light text-text text-sm hidden sm:block">{String(bookingsData?.address.email)?.length > 30 ? String(bookingsData?.address.email)?.slice(0, 30) + "..." : String(bookingsData?.address.email)}</p>
                      <p className="font-light text-text text-sm block sm:hidden">{String(bookingsData?.address.email)?.length > 25 ? String(bookingsData?.address.email)?.slice(0, 25) + "..." : String(bookingsData?.address.email)}</p>
                      <p className="absolute left-0 hidden group-hover:block bg-black text-[10px] text-background dark:text-white px-2 py-1 rounded shadow">{bookingsData?.address.email}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="w-60">
                    <p className="text-gray-400 text-sm dark:text-zinc-500">Phone</p>
                    <p className="font-light text-text text-sm">{bookingsData?.address.phone}</p>
                  </div>
                  <div className="w-60">
                    <p className="text-gray-400 text-sm dark:text-zinc-500">D-No.</p>
                    <p className="font-light text-text text-sm">{bookingsData?.address.doorNo}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="w-60">
                    <p className="text-gray-400 text-sm dark:text-zinc-500">City</p>
                    <p className="font-light text-text text-sm">{bookingsData?.address.city}</p>
                  </div>
                  <div className="w-60">
                    <p className="text-gray-400 text-sm dark:text-zinc-500">Address</p>
                    <p className="font-light text-text text-sm">{bookingsData?.address.address}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full sm:max-w-60 md:w-max shadow-lg p-3 rounded-lg bg-white dark:bg-zinc-800/20 text-sm">
              <p className="text-orange-400 font-semibold mb-3">Payment&nbsp;Summary</p>
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="text-gray-400 text-sm dark:text-zinc-500">Subtotal</td>
                    <td className="text-right font-medium text-gray-400 text-sm dark:text-zinc-500">
                      {bookingsData?.totalAmount}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-400 text-sm dark:text-zinc-500">Discount</td>
                    <td className="text-right font-medium text-gray-400 text-sm dark:text-zinc-500">
                      {bookingsData?.discount}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-400 text-sm dark:text-zinc-500">GST</td>
                    <td className="text-right font-medium text-gray-400 text-sm dark:text-zinc-500">
                      {bookingsData?.gstAmount}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-300 dark:border-zinc-600">
                        <p className="text-text dark:text-zinc-200">Total</p>
                        <p className="text-right text-text dark:text-zinc-200">
                          Rs.{bookingsData?.grandAmount}
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </ClickOutside>
    </div>
  );
};

export default Individual;
