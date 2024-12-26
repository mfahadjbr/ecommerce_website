'use client'
import React, { useEffect, useState } from 'react'
import { Product } from '@/sanity.types';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import QuantityButton from './QuantityButton';
import PriceFormatter from './PriceFormatter';
import userCartStore from '@/store';
interface Props{
    product: Product;
}
const AddToCartButton = ({product}: Props) => {
    const [isClient,setIsClient] = useState(false);
    const {addItem, getItemCount}=userCartStore();
    useEffect(()=>{
        setIsClient(true);
    },[])
    if(!isClient){
        return null;
    }
    const itemCount = getItemCount(product?._id);
    const isOutOfStock = product?.stock === 0;
    const handleAddToCart=()=>{
        addItem(product)
        toast.success(`${product?.name?.substring(0,12)}... added successfully`)
    }
    
  return (
    <div>
        {itemCount? (<div className='text-sm'>
            <div className='flex items-center justify-between'>
                <span className='text-xs text-muted-foreground'>Quantity</span>
                <QuantityButton  product={product}/>
            </div>
            <div className='flex items-center justify-between border-t pt-1'>
                <span>Subtotal</span>
                <PriceFormatter amount={product?.price  ?product?.price * itemCount:0} />
            </div>
        </div>):(
    <Button
    onClick={handleAddToCart}
    disabled={isOutOfStock}
    className={cn("bg-darkBlue/10 text-black border-darkBlue border py-2 mt-2 w-full rounded-md font-medium hover:bg-darkBlue hover:text-white hoverEffect disabled:hover:cursor-not-allowed disabled:bg-darkBlue/10 disabled:text-gray-400 disabled:hover:text-gray-400 disabled:border-darkBlue/10")}>
        Add to cart
    </Button>
)}
</div>
  )
}

export default AddToCartButton
