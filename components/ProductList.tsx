import { Category, Product } from '@/sanity.types';
import React from 'react'
import Categories from './Categories';
import ProductGrid from './ProductGrid';
interface Props{
    products:Product[];
    categories:Category[];
    title?: boolean;
}
const ProductList = ({products,title,categories}:Props) => {
  return (
    <div className='pb-10'>
      <Categories categories={categories}/>
      {/* Product */}
      {!title && <div className='pb-5'>
  <h2 className='text-2xl font-semibold text-gray-600'>
      Day of the <span className='text-lightBlue'>Deal</span>
  </h2>
  <p className='text-sm text-gray-500'>Don&apos;t wait. The time will never be just right</p>
</div>}
      <ProductGrid products={products}/>
    </div>
  )
}

export default ProductList
