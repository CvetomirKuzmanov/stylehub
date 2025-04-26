import ProductsProvider from './components/HomePage/ProductProvider';
import { UserProvider } from './contexts/UserContext'; 
import { ProductService } from './services/productService';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {

  let initialProducts = [];

  try {
    initialProducts = await ProductService.getAllProducts();
  } catch (error) {
    console.error('Failed to fetch initial products:', error);
  }

  return (
    <>
      <UserProvider> 
        <ProductsProvider initialProducts={initialProducts} />
      </UserProvider>
    </>
  );
}
