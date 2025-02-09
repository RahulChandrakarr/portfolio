import Image from 'next/image'
import React from 'react'

export default function WelcomeForPhone() {
  return (
    <div className='h-screen flex items-center '>
        <div className="image">
        <Image
      src="/profile.png"
      width={500}
      height={500}
      alt="Picture of the author"
    />
        </div>
    </div>
  )
}
