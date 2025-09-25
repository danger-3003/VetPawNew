import Profile from '@/components/Profile'
import React from 'react'

function ProfilePage() {
  return (
    <div className='flex items-center justify-center flex-col bg-background'>
      <div className='max-w-[80rem] w-full flex items-center justify-center flex-col'>
        <Profile />
      </div>
    </div>
  )
}

export default ProfilePage