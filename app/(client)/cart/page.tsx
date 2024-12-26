'use client'
import Loader from '@/components/Loader';
import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/nextjs';
import NoAccessToCart from '@/components/NoAccessToCart';
import userCartStore from '@/store';
import Container from '@/components/Container';
import { ShoppingBag, Trash2 } from 'lucide-react';
import PriceFormatter from '@/components/PriceFormatter';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import QuantityButton from '@/components/QuantityButton';
import EmptyCard from '@/components/EmptyCard';
import { createCheckoutSession, Metadata } from '@/actions/CreateCheckoutSession';

const Cartpage = () => {
    const {
        deleteCartProduct,
        getTotalPrice,
        getItemCount,
        getSubTotalPrice,
        resetCart,
    } = userCartStore();
    const [isclient, setIsclient] = useState(false);
    const [loading, setloading] = useState(false);
    const groupedItems = userCartStore((state)=> state.getGroupItems())
    const {user} = useUser();
    const {isSignedIn}=useAuth();
    useEffect(()=>{
        setIsclient(true);
    },[])
    if(!isclient){
        return <Loader/>
    }
    const handleCheckout = async()=>{
        setloading(true);
        try{
            const metadata:Metadata={
                orderNumber:crypto.randomUUID(),
                customerName:user?.firstName ?? "unknown",
                customerEmail:user?.emailAddresses[0]?.emailAddress ?? "unknown",
                clerkUserId: user?.id ?? "unknown",
            }
            const checkoutUrl = await createCheckoutSession(groupedItems,metadata);
            if(checkoutUrl){
                window.location.href = checkoutUrl;
            }
        }catch (error){
            console.error('Error creating checkout session:',error)
        } finally{
            setloading(false);
        }
    }
    const handleDeleteProduct = (id:string)=>{
        deleteCartProduct(id);
        toast.success('Product deleted successfull')
    }
    const handleResetCard =()=>{
        const confirmed = window.confirm('Are you sure to reset your Cart?');
        if(confirmed){
            resetCart()
            toast.success('Your cart reset successfully!')
        }
    }
  return (
    <div>
      {isSignedIn ? 
      <Container>
        {groupedItems?.length ? <>
        <div className='flex items-center gap-2 py-5'>
            <ShoppingBag className='h-6 w-6 text-primary'/>
            <h1 className='text-2xl font-semibold'>Shopping Cart</h1>
        </div>
        <div className='grid lg:grid-cols-3 md:gap-8 pb-60'>
            <div className='lg:col-span-1'>
                <div className='hidden md:inline-block w-full bg-white p-6 rounded-lg border'>
                    <h2 className='text-xl font-semibold mb-4'>
                        Order summary
                    </h2>
                    <div className='space-y-4 w-full'>
                        <div className='flex items-center justify-between'>
                            <span>SubTotal</span>
                            <PriceFormatter amount={getSubTotalPrice()}/>
                        </div>
                        <div className='flex items-center justify-between'>
                            <span>Discount</span>
                            <PriceFormatter amount={getSubTotalPrice() - getTotalPrice()}/>
                        </div>
                        <Separator />
                        <div className='flex items-center justify-between'>
                            <span>Total</span>
                            <PriceFormatter amount={getTotalPrice()}/>
                        </div>
                        <div className='flex flex-col gap-2 '>
                        <Button onClick={handleCheckout} disabled={loading}>{loading ? "Processing" : "Proceed to Checkout"}</Button>
                        <Link href={"/"} className='text-center text-sm text-primary hover:underline hoverEffect hover:text-darkBlue'>Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='lg:col-span-2'>
                <div className='grid grid-cols-5 md:grid-cols-6 border rounded-tr-lg rounded-tl-lg bg-white p-2.5 text-base font-semibold'>
                    <h2 className='col-span-2 md:col-span-3'>Product</h2>
                    <h2>Price</h2>
                    <h2>Quantity</h2>
                    <h2>Total</h2>
                </div>
                <div className='bg-white border border-t-0  rounded-br-lg rounded-bl-lg'>
                    {groupedItems?.map(({product})=>{
                        const itemCount=getItemCount(product?._id)
                        return (<div key={product?._id} className='grid grid-cols-5 md:grid-cols-6 border-b p-2.5 last:border-b-0 '>
                            <div className='col-span-2 md:col-span-3 flex items-center'>
                                <Trash2 onClick={()=>handleDeleteProduct(product?._id)} className='w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect'/>
                                {product?.image&& <Link href={`/product/${product?.slug?.current}`} className='border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group'>
                                <Image src={urlFor(product?.image).url()} alt='productImage' width={300} height={300} className='w-10 h-10 md:w-full md:h-14 object-cover group-hover:scale-105 overflow-hidden hoverEffect'/>
                                </Link>}
                                <h2 className='text-sm'>{product?.name}</h2>
                            </div> 
                            <div className='flex items-center'>
                                <PriceFormatter amount={product?.price }/>
                            </div>
                            <QuantityButton  product={product} className='text-sm gap-0 md:gap-1'/>
                            <div className='flex items-center'>
                                <PriceFormatter amount={product?.price ? product?.price * itemCount : 0}/>
                            </div>
                        </div>)
                    })}
                    <Button onClick={handleResetCard} variant={'destructive'} className='m-5 font-semibold'>Reset Cart</Button>



                </div>
            </div>
        </div>
        <div className='md:hidden fixed bottom-0 left-0 w-full bg-lightBg'>
            <div className='bg-white p-4 rounded-lg border mx-4 mb-2'>
                <h2 className='text-lg font-semibold mb-2'>Order Summary</h2>
                <div className='space-y-2'>
                    <div className='flex justify-between'>
                        <span>SubTotal</span>
                        <PriceFormatter amount={getSubTotalPrice()}/>
                    </div>
                    <div className='flex justify-between'>
                        <span>Discount</span>
                        <PriceFormatter amount={getSubTotalPrice() - getTotalPrice()}/>
                    </div>
                    <Separator />
                    <div className='flex justify-between font-semibold text-lg'>
                        <span>Total</span>
                        <PriceFormatter amount={getTotalPrice()} className='text-lg font-bold text-black'/>
                    </div>
                    <Button onClick={handleCheckout} className='w-full' size={'lg'}>Proceeed to Checkout</Button>
                    <Link href={"/"} className='block text-center text-sm text-primary hover:underline '>Continue Shopping</Link>

                </div>
            </div>
        </div>
        </> : <EmptyCard/>}
      </Container> : <NoAccessToCart/>}
    </div>
  )
}

export default Cartpage
