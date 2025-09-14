"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import Input from "./Input";
import { Order } from "../types/ApiTypes";
import { Loader } from 'lucide-react';
import Individual from "../IndividualOrder";

// ✅ Columns
const columns: ColumnDef<Order>[] = [
  { header: "S.No", cell: ({ row }) => row.index + 1 },
  { accessorKey: "orderId", header: "Order No." },
  { accessorKey: "totalQuantity", header: "Quantity" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "paymentMethod", header: "Payment Mode" },
  { accessorKey: "grandAmount", header: "Amount", cell: ({ getValue }) => `₹${getValue<number>().toFixed(2)}` },
];

export default function OrdersTable({ tableData, loading }: { tableData: Order[], loading: boolean }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 5 });
  const [individualRecord, setIndividualRecord] = React.useState<Order | null>(null);
  const [individual, setIndividual] = React.useState<boolean>(false);

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="">
        <div className="mb-4 flex justify-between items-end">
          <Input
            type="text"
            placeholder="Search Orders..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="border px-3 py-1 rounded max-w-40 sm:max-w-64"
            label=""
          />
          <div className="flex items-center justify-center gap-2">
            <p className="text-text text-sm">Items</p>
            <select
              value={pagination.pageSize}
              onChange={(e) =>
                setPagination((prev) => ({
                  ...prev,
                  pageSize: Number(e.target.value),
                  pageIndex: 0,
                }))
              }
              className="border border-gray-300 dark:border-zinc-600 px-2 py-1 rounded bg-background dark:bg-zinc-900 text-text"
            >
              {[5, 10, 15].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-zinc-600 shadow-sm">
          <table className="min-w-full w-[768px] text-sm text-left">
            <thead className="bg-orange-400 text-background">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 font-semibold cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {
                loading ?
                  <tr>
                    <td colSpan={6} className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center">
                        <Loader className="text-orange-500 animate-spin" />
                      </div>
                    </td>
                  </tr>
                  :
                  <>
                    {
                      !(table.getRowModel().rows?.length < 1) ?
                        <>
                          {
                            table.getRowModel().rows.map((row) => (
                              <tr
                                key={row.id}
                                className="border-t border-gray-300 dark:border-zinc-600 cursor-pointer hover:bg-gray-50 hover:dark:bg-zinc-800/50 dark:bg-zinc-900 bg-background text-text transition-colors"
                                onClick={() => { setIndividualRecord(row?.original); setIndividual(true) }}
                              >
                                {row.getVisibleCells().map((cell) => (
                                  <td key={cell.id} className="px-4 py-3 font-light">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                  </td>
                                ))}
                              </tr>
                            ))
                          }
                        </> :
                        <>
                          <tr>
                            <td colSpan={6} className="px-4 py-3 text-center">
                              <div className="flex items-center justify-center">
                                <p>No records found</p>
                              </div>
                            </td>
                          </tr>
                        </>
                    }
                  </>
              }
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="text-sm text-text">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="space-x-2">
            <button
              className="px-3 py-1 border border-gray-300 dark:border-zinc-600 rounded disabled:opacity-50 hover:bg-gray-50 hover:dark:bg-zinc-800/50 dark:bg-zinc-900 bg-background text-text"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {`<<`}
            </button>
            <button
              className="px-3 py-1 border border-gray-300 dark:border-zinc-600 rounded disabled:opacity-50 hover:bg-gray-50 hover:dark:bg-zinc-800/50 dark:bg-zinc-900 bg-background text-text"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {`>>`}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full">
        {
          individual &&
          <Individual
            bookingsData={individualRecord}
            setIndividual={setIndividual}
          />
        }
      </div>
    </>
  );
}
