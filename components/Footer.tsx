import React from 'react'
import Container from './Container'
import Image from 'next/image'
import payment from '@/images/payment.jpg'
const Footer = () => {
  return (
    <footer className='bg-lightBg text-sm'>
      <Container className='flex  py-5 items-center justify-between '>
        <p className='text-gray-500'>Copyright © 2024 <span className='text-darkBlue font-semibold'>Blue Berry</span> all rights reserved</p>
        <Image src={payment} alt='payment' className='w-64 object-cover' />
      </Container>
    </footer>
  )
}

export default Footer;
