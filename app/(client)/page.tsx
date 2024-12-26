import { getAllCategories, getALLproducts, getSale } from "@/sanity/helpers";
import DiscountBanner from "@/components/DiscountBanner";
import ProductList from "@/components/ProductList";
import Container from "@/components/Container";

export default async function Home() {
  const products = await getALLproducts()
  const sales = await getSale();
  const categories = await getAllCategories();
  console.log(categories)
  return (
    <div>
      <Container>
      <DiscountBanner sales={sales} />
      <ProductList products={products} title={true} categories={categories} />
      </Container>
    </div>
  )
}
