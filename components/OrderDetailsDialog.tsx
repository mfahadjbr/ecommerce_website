import { MY_ORDERS_QUERYResult } from '@/sanity.types'
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import PriceFormatter from './PriceFormatter';
interface Props {
    order:MY_ORDERS_QUERYResult[number] | null;
    isOpen:boolean;
    onClose: () => void;
}
const OrderDetailsDialog = ({order, isOpen, onClose}: Props) => {
    if(!order) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='max-w-3xl'>
            <DialogHeader>
                <DialogTitle>
                    Orders Details - {order.orderNumber}
                </DialogTitle>
            </DialogHeader>
            <div>
                <p>
                    <strong>Customer:</strong> {order?.customerName}
                </p>
                <p>
                    <strong>Email:</strong> {order?.email}
                </p>
                <p>
                    <strong>Date:</strong> {order?.orderDate && new Date(order?.orderDate).toLocaleDateString()}
                </p>
                <p>
                    <strong>Status:</strong> {order?.status}
                </p>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {order?.products?.map((product,index)=>(
                        <TableRow>
                            <TableCell className='flex items-center gap-2 '>
                                {product?.product?.image &&
                                (
                                <Link href={'product/${product?.product?.slug?.current}'}>
                                <Image  src={urlFor(product?.product?.image).url()}
                                width={50} height={50} alt="productImage" 
                                className='border rounded-sm hover:scale-105 hoverEffect'  />
                                </Link>)}
                                {product?.product && product?.product?.name}
                            </TableCell>
                            <TableCell>{product?.quantity}</TableCell>
                            <TableCell><PriceFormatter amount={product?.product?.price} className='text-black font-medium'/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
            <div className='mt-4 text-right'>
                <strong>Total:</strong>
                <PriceFormatter amount={order?.totalPrice} className='text-black font-bold'/>
            </div>
        </DialogContent>
    </Dialog>

  )
}

export default OrderDetailsDialog
