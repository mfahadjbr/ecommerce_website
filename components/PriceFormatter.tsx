import { cn } from '@/lib/utils';
import React from 'react'
interface Props{
    amount:number | undefined,
    className?:string
}
const PriceFormatter = ({amount,className}:Props) => {
  const formattedAmount = new Number(amount).toLocaleString('en-US', {
      currency:"USD",
      style: "currency",
      minimumFractionDigits: 2,
  });
  return (
    <div>
      <span className={cn('text-sm font-semibold text-darkText',className)}>{formattedAmount}</span>
    </div>
  )
}

export default PriceFormatter
