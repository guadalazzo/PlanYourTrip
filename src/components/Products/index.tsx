import { Product } from '../../types';
import Image from '../Image';
interface ProductProps {
  products: Product[];
  noAvailableProducts: boolean;
}
const formatPrice = (price: number) => {
  return `€${Number(price).toFixed(2)}`;
};

const ProductCard = ({
  product_url,
  image,
  id,
  title,
  price,
  discount_percentage,
  summary,
  city_id,
  available_dates,
}: Product) => {
  console.log(discount_percentage, city_id, available_dates);
  return (
    <article className="product-card" id={`${id}`}>
      <a href={product_url} className="flex sm:flex-col h-[136px] sm:h-auto">
        <Image src={image} alt={title} />
        <div className="p-4">
          <h4 className="text-regular sm:text-title line-clamp-2">{title}</h4>
          <p className="text-medium line-clamp-2">{summary}</p>
          <span className="text-price sm:text-regular">{formatPrice(price)}</span>
        </div>
      </a>
    </article>
  );
};

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
