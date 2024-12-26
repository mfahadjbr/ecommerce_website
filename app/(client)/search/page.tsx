import Container from '@/components/Container';
import ProductGrid from '@/components/ProductGrid';
import { searchProductsByName } from '@/sanity/helpers';
import React from 'react'
interface Props{
    searchParams:{
        query: string;
    }
}
const Search = async({searchParams}:Props) => {
    const {query} = await searchParams;
    const products = await searchProductsByName(query)
    if(!products?.length){
        return (
            <div className='flex justify-center  min-h-screen bg-gray-100 p-4'>
                <div className='bg-white p-8 h-40 rounded-lg shadow-md w-full max-w-4xl text-center'>
                    <h1 className='text-3xl font-bold mb-3'>
                        No products found for <span className='text-darkBlue'>{query}</span>
                    </h1>
                    <p className='text-gray-600'>Try searching with different keywords</p>
                </div>
            </div>
        )
    }
  return (
    <div className='flex flex-col items-center justify-top min-h-screen bg-gray-100'>
      <Container className='p-8 bg-white rounded-lg shadow-md mt-3'>
      <h1 className='text-3xl font-bold mb-3'>
            Search results for <span className='text-darkBlue'>{query}</span>
</h1>
        <ProductGrid products={products} />
      </Container>
    </div>
  )
}

export default Search
