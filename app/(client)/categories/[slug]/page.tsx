import Container from '@/components/Container';
import ProductList from '@/components/ProductList';
import { getAllCategories, getProductByCategory } from '@/sanity/helpers';
import React from 'react'
interface Props {
    params:Promise<{slug:string}>; 
}
const categoriesPage = async({params}:Props) => {
    const {slug} =await params;
    const categories = await getAllCategories();
    const products = await getProductByCategory(slug);
    
  return (
    <div className='flex flex-col items-center bg-gray-100'>
      <Container className='p-8 bg-white rounded-lg shadow-md mt-3 w-full'>
        <h1 className='text-2xl md:text-3xl font-bold'>
            Search results for <span className='text-darkBlue'>
                {slug.split("-").map((word)=>word.charAt(0).toUpperCase() + word.slice(1)).join(" ")} collection
            </span>
        </h1>

        <ProductList products={products} title={true} categories={categories} />
      </Container>
    </div>
  )
}

export default categoriesPage
