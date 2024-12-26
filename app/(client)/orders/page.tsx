import React from 'react'
import Container from '@/components/Container'
import { getMyOrders } from '@/sanity/helpers'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { FileX } from 'lucide-react'
import { orderType } from '../../../sanity/schemaTypes/orderType';
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import OrderComponent from '@/components/OrderComponent'
import { Order } from '../../../sanity.types';

const OrdersPage = async() => {
  const {userId}=await auth()
  if(!userId){
    return redirect("/")
  }
  const orders = await getMyOrders(userId);
  console.log(orders)
  return (
    <div>
      <Container>
        {orders?.length ?
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>
              order List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className='w-full'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[100px] md:w-auto'>
                      Order Number
                    </TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Date
                    </TableHead>
                    <TableHead >
                      Customer
                    </TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Email
                    </TableHead>
                    <TableHead>
                      Total
                    </TableHead>
                    <TableHead>
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <OrderComponent orders={orders}/>
              </Table>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>
          </CardContent>
        </Card> : <div className='flex flex-col items-center justify-center py-12 px-4'>
          <FileX className='h-24 w-24 text-gray-400 mb-4'/>
          <h3 className='text-2xl font-semibold text-gray-900'>No orders found</h3>
          <p className='mt-2 text-sm text-gray-600 text-center max-w-md'>
            It looks like you haven&apos;t places any orders yet. Start shopping to see your orders here!
            </p>
            <Button asChild className='mt-6'>
              <Link href={"/"}>Browse Products</Link></Button></div>}
      </Container>
    </div>
  )
}

export default OrdersPage
