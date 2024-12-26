import React from 'react'
import loaderImage from '@/images/loaderImage1.png';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { SignInButton } from '@clerk/nextjs';
import { Button } from './ui/button';

const NoAccessToCart = () => {
  return (
    <div className='flex items-center justify-center py-12 md:py-32 bg-gray-100 p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
            <div className='flex justify-center'>
                <Image src={loaderImage} alt='loaderImage' className='mb-4' width={80} height={80} />
            </div>
            <CardTitle className='text-2xl font-bold text-center'>Welcome Back!</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
            <p className='text-muted-foreground text-center'>
                Log in to view your cart items and checkout. Don&apos;t miss out on your favorite products!
            </p>
            <SignInButton mode='modal'>
                <Button variant={'outline'} className='w-full' size={'lg'}>
                    Create an account
                </Button>
            </SignInButton>
        </CardContent>
      </Card>
    </div>
  )
}

export default NoAccessToCart
