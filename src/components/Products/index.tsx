import { Product } from '../../types';
import ProductCard from '../ProductCard';
interface ProductProps {
  products: Product[];
  noAvailableProducts: boolean;
}

const Products = ({ products, noAvailableProducts }: ProductProps) => {
  if (noAvailableProducts) {
    return (
      <div className="products middle-center min-h-40 sm:min-h-80">Nothing found, please try a different date</div>
    );
  }
  if (!products.length) {
    return <div className="products middle-center min-h-40 sm:min-h-80">Select filter first</div>;
  }

  return (
    <div className="products grid-products">
      {products.map((product) => {
        return <ProductCard {...product} key={product.id} />;
      })}
    </div>
  );
};
export default Products;
