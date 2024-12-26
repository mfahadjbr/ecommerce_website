import React from 'react'
import PriceFormatter from './PriceFormatter'
import { cn } from '@/lib/utils'
interface Props{
    price:number | undefined,
    discount:number | undefined,
    className?: string,
    label?: string
}

const PriceView = ({price,discount,label,className}: Props) => {
  return (
    <div className='flex item-center justify-between gap-5'>
        <div className='flex item-center gap-2'>
        <PriceFormatter amount={price} className={className}/>
        {price && discount && (
            <PriceFormatter amount={price + (discount * price) / 100} className={cn('text-xs font-medium line-through',className)}/>
        )}
        {/* <p>{discount}</p> */}
        </div>
        <p className='text-gray-500'>{label}</p>
    </div>
  )
}

export default PriceView
