import { Product } from '../../types';
import Image from '../Image';
import { formatPrice, calculatePreDiscount } from '../../utils';
import { useEffect, useState } from 'react';

const ProductCard = ({ product_url, image, id, title, price, discount_percentage, summary }: Product) => {
  const [hasDiscount, setHasDiscount] = useState<boolean>(false);
  const [preDiscount, setPreDiscount] = useState<number | null>(null);

  useEffect(() => {
    if (discount_percentage > 0) {
      setHasDiscount(true);
      setPreDiscount(calculatePreDiscount(price, discount_percentage));
    }
  }, []); // on mount

  // Some products include a discount percentage.
  // In this case, a pre-discount price should be shown in the card.

  return (
    <article className="product-card" id={`${id}`}>
      <a href={product_url} className="flex sm:flex-col h-[136px] sm:h-full">
        <Image src={image} alt={title} />
        <div className="p-2 sm:p-4 flex flex-col justify-between h-full">
          <h4 className="text-regular font-medium sm:text-title line-clamp-2">{title}</h4>
          <p className="text-medium line-clamp-2">{summary}</p>

          {hasDiscount ? (
            <div>
              <span className="text-price font-medium sm:text-regular text-red">{formatPrice(price)}</span>
              {preDiscount && (
                <span className="text-preprice line-through text-price sm:text-regula">{formatPrice(preDiscount)}</span>
              )}
            </div>
          ) : (
            <span className="text-price font-medium sm:text-regular">{formatPrice(price)}</span>
          )}
        </div>
      </a>
    </article>
  );
};
export default ProductCard;
