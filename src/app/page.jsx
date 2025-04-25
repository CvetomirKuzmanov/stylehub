import Home from './components/HomePage/HomeList';
import ProductsProvider from './components/HomePage/ProductProvider';
import { ProductService } from './services/productService';
// import ProductProvider from './components/products/ProductProvider.jsx';  

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {

  let initialProducts = [];
  
  try {
    initialProducts = await ProductService.getAllProducts();
    console.log (initialProducts)
  } catch (error) {
    console.error('Failed to fetch initial products:', error);
  }

  return (
    <>

      <ProductsProvider initialProducts={initialProducts} />
    </>
  );
}
