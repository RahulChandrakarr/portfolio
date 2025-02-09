import { faAddressBook, faFile, faGear, faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

export default function FlowtingNavbar() {
  return (
    <div className='relative '>
      <div
  className="fixed bottom-10 py-2 px-8 right-1/2 translate-x-1/2 translate-y-1/2 text-white border border-white rounded-2xl max-w-[600px] z-50"
>
   <div>
    <ul className='flex flex-row items-center justify-center gap-10'>
       <Link href={'#home'}> <li> <FontAwesomeIcon icon={faHouse}  className='h-6 w-6'/></li></Link>
        <li> <FontAwesomeIcon icon={faGear}  className='h-6 w-6'/></li>
        <li> <FontAwesomeIcon icon={faFile}  className='h-6 w-6'/></li>
        <li> <FontAwesomeIcon icon={faAddressBook}  className='h-6 w-6'/></li>
        </ul>
   </div>
</div>

    </div>
    
  )
}
