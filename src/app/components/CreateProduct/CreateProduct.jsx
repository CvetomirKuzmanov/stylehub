import { useNavigate, useParams, Link } from 'react-router';
import { useCreateProduct, useDeleteProduct, useProduct } from '../../api/productApi';
import useAuth from "../../hooks/useAuth";
import { useStore } from '../../contexts/StoreContext';
import { toast } from 'react-toastify';
import styles from './productDetails.module.css';

export default function ProductDetails() {
  const navigate = useNavigate()
  const { addToCart } = useStore();
  const { isAuthenticated, email, userId } = useAuth();
  const { deleteProduct } = useDeleteProduct();
  const { productId } = useParams();
  const { product } = useProduct(productId);
  const isOwner = userId === product._ownerId;
  
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    addToCart(product._id);
  };
  
  const handleDeleteItem = async () => {
    const hasConfirm = confirm(`Are you sure you want to remove ${product.name} from the store?`)
    if (!hasConfirm) {
      return
    }
    await deleteProduct(productId)
    navigate('/catalog')
  }
  
  return (
    <section id="product-details">
      <div className={styles.productContainer}>
        <div className={styles.productCard} key={product._id}>
          <div className={styles.productImage}>
            <img src={product.image} alt={product.name} />
          </div>
          <div className={styles.productDetails}>
            <h3 className={styles.productTitle}>{product.name}</h3>
            <div className={styles.productPricing}>
              <span className={styles.productCurrentPrice}>${product.price}</span>
            </div>
            <div>
              <p className={styles.productDescription}>{product.description}</p>
              <div className={styles.productActions}>
                <div className={styles.productActionButton} onClick={handleAddToCart}>❤️ Add To Favourites</div>
              </div>
            </div>
            {isOwner && (
              <div className={styles.productAdminButtons}>
                <Link to={`/products/${productId}/edit`} className={`${styles.productAdminBtn} ${styles.editButton}`}>Edit</Link>
                <button onClick={handleDeleteItem} className={`${styles.productAdminBtn} ${styles.deleteButton}`}>Delete</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}