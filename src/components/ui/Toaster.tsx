import React from 'react'
import { ToasterType } from '../types/types'
import { CircleCheck, CirclePlus } from 'lucide-react'

export const Toaster = ({ status, message, showToast }: ToasterType) => {
  return (
    <>
      <div className={`fixed z-30 bottom-5 ${showToast ? "right-5" : "-right-60"} transition-all duration-500`}>
        <div className={`${status ? "bg-green-200" : "bg-red-300 border-b-red-600 border-b-[3px]"} rounded-lg px-3 py-1.5 flex items-center justify-between gap-4`}>
          <p className='text-sm'>
            {message}
          </p>
          {
            status ?
              <>
                <CircleCheck width={16} className="text-green-700" />
              </> :
              <>
                <CirclePlus width={16} className="text-red-700 rotate-45" />
              </>
          }
        </div>
      </div>
    </>
  )
}