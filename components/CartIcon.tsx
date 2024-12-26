'use client'
import userCartStore from '@/store'
import { ShoppingBagIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const CartIcon = ()=> {
  const [isClient ,setIsClient]= useState(false)
  const groupedItems = userCartStore((state)=>state.getGroupItems())
  useEffect(()=>{
    setIsClient(true)
  },[]);
  if(!isClient){
    return null;
  }
  return (
    <div>
    <Link href={'/cart'} className='flex item-center text-xs md:text-sm gap-1 md:gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect'>
      <ShoppingBagIcon className='text-darkBlue w-5 h-5 md:w-6 '/>
      <div className='flex flex-col'>
        <p className='text-xs'>
            <span className='font-semibold'>{groupedItems?.length ? groupedItems?.length : 0}</span> items
        </p>
        <p className='font-semibold'>Cart</p>
      </div>
    </Link>
    </div>
  )
}

export default CartIcon
