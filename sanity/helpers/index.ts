import { sanityFetch } from "../lib/live";
import { CATEGORIES_QUERY, MY_ORDERS_QUERY, PRODUCT_BY_CATEGORY_QUERY, PRODUCT_BY_SLUG, PRODUCT_QUERY, PRODUCT_SEARCH_QUERY, SALE_QUERY } from "./queries";

export const getSale = async()=>{
    try{
        const products = await sanityFetch({
            query:SALE_QUERY
        });
        return products?.data || [];
    } catch(error){
        console.log("Error fetching Sale data",error);
        return [];
    }
}

export const getALLproducts=async()=>{
    try{
        const products=await sanityFetch({
            query:PRODUCT_QUERY
        })
        return products.data || [];
    }catch(error){
        console.log("ALL Product Error fetching Sale data",error);
        return [];
    }
}

export const getAllCategories = async()=>{
    try{
        const categories = await sanityFetch({
            query:CATEGORIES_QUERY
        })
        return categories.data || [];
    } catch(error){
        console.error("All categories fetching Error:",error);
        return [];
    }
}

export const getProductBySlug=async(slug:string)=>{
    try{
        const product=await sanityFetch({
            query:PRODUCT_BY_SLUG,
            params:{
                slug,
            }
        })
        return product.data || null;
    } catch(error){
        console.log("Product Fetching Error:",error)
        return null;
    }
}

export const searchProductsByName=async(searchParam:string)=>{
    try{
        const products = await sanityFetch({
            query:PRODUCT_SEARCH_QUERY,
            params:{
                searchParam: searchParam,
            }
        })
        return products?.data || [];
        
    } catch(error){
        console.error("Fetching product by name Error:",error);
        return [];
    }
}

export const getProductByCategory=async(categorySlug:string)=>{
    try{
        const products = await sanityFetch({
            query:PRODUCT_BY_CATEGORY_QUERY,
            params:{
                categorySlug,
            }
        })
        return products?.data || [];
        
    } catch(error){
        console.error("Fetching product by category Error:",error);
        return [];
    }
}

export const getMyOrders = async(userId:string)=>{
    if(!userId){
        throw new Error("User ID is required!")
    }
    try{
        const orders = await sanityFetch({
            query: MY_ORDERS_QUERY,
            params:{ userId }
        })
        return orders?.data || [];
    } catch(error){
        console.error("Error fetching orders:",error)
        return [];
    }
}