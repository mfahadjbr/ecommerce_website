import { Product } from '@/sanity.types';
import React from 'react'
import { Button } from './ui/button';
import { HiMinus, HiPlus } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import userCartStore from '@/store';
interface Props{
    product:Product;
    className?:string;
}
const QuantityButton = ({product,className}:Props) => {
  const {addItem, removeItem , getItemCount}=userCartStore();
    const handleRemoveProduct=()=>{
        removeItem(product?._id)
        if(itemcount > 1){
          toast.success("Quantity Decreased successfully")
        }else{
          toast.success(`${product?.name?.substring(0,12)}... removed successfully`)
        }
    }
    const handleAddProduct=()=>{
        addItem(product);
        toast.success("Quantity increased successfully")
    } 
    const itemcount=getItemCount(product?._id);
    // const isOutOfStock = product?.stock === 0;
  return (
    <div className={cn("flex items-center gap-1 pb-1 text-base",className)}>
      <Button variant="outline" size="icon" className='w-6 h-6' onClick={handleRemoveProduct}>
        <HiMinus />
        </Button>
        <span className='font-semibold w-8 text-center text-darkBlue'>{itemcount}</span>
        <Button variant="outline" size="icon" className='w-6 h-6' onClick={handleAddProduct}>
   <HiPlus />
   </Button>
    </div>
  )
}

export default QuantityButton
