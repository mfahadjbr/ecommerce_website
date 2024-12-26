'use client'
import { MY_ORDERS_QUERYResult } from '@/sanity.types'
import React, { useState } from 'react'
import { TableBody, TableCell } from './ui/table'
import { Tooltip, TooltipContent, TooltipProvider } from './ui/tooltip'
import { TooltipTrigger } from '@radix-ui/react-tooltip'
import { TableRow } from '@/components/ui/table';
import PriceFormatter from './PriceFormatter'
import OrderDetailsDialog from './OrderDetailsDialog'

const OrderComponent = ({orders} : {orders: MY_ORDERS_QUERYResult}) => {
    const [selectorOrder,setSelectedOrder] = useState<MY_ORDERS_QUERYResult[number] | null>(null)
    const handleOrderClicked = (order: MY_ORDERS_QUERYResult[number]) => {
        setSelectedOrder(order)
    }
  return (
    <>
      <TableBody>
        <TooltipProvider>
            {orders?. map((order)=>(
                <Tooltip key={order?.orderNumber}>
                    <TooltipTrigger asChild>
                        <TableRow onClick={() => handleOrderClicked(order)} className='cursor-pointer hover:bg-gray-100 h-12'>
                            <TableCell className='font-medium'>
                                {order?.orderNumber?.slice(-10) ?? 'N/A'}...
                            </TableCell>
                            <TableCell className='hidden md:table-cell'>
                                {order?.orderDate && 
                                new Date(order?.orderDate).toLocaleDateString() }
                            </TableCell>
                            <TableCell>
                                {order?.customerName}
                            </TableCell>
                            <TableCell className='hidden sm:table-cell'>
                                {order?.email}
                            </TableCell>
                            <TableCell>
                                <PriceFormatter amount={order?.totalPrice}
                                className='text-black font-medium'
                                />
                            </TableCell>
                            <TableCell>
                                {order?.status && <span 
                                className={`capitalize px-2 py-1 rounded-full 
                                    text-xs font-semibold ${order?.status == 'paid'?"bg-green-100 text-green-600":
                                    "bg-yellow-100 text-yellow-800"
                                }`}>{order?.status}</span>}
                            </TableCell>
                        </TableRow>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Click to see order details</p>
                    </TooltipContent>
                </Tooltip>
            ))}
        </TooltipProvider>
      </TableBody>
      <OrderDetailsDialog order={selectorOrder} isOpen={!!selectorOrder} onClose={() => setSelectedOrder(null)}/>
    </>
  )
}

export default OrderComponent