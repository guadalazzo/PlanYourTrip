import { useEffect, useReducer, useState } from 'react';
import { reducer, initialState } from '../store/reducer';
import CountryCityFilters from '../components/CountryCityFilters';
import DatePicker from '../components/DatePicker';
import Products from '../components/Products';
import { Product, ProductsPayload } from '../types';
import { getProducts } from '../services';

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [products, setProducts] = useState<Product[]>([]);
  const [noAvailableProducts, setNoAvailableProducts] = useState<boolean>(false);
  const enableDatePicker = state.city && state.city.length > 0 ? true : false;

  const loadProducts = async ({ date, cityId }: ProductsPayload) => {
    setNoAvailableProducts(false);
    const resProducts = await getProducts({ date, cityId });
    if (resProducts?.length) {
      setProducts(resProducts);
    } else {
      setProducts([]);
      setNoAvailableProducts(true);
    }
  };

  useEffect(() => {
    if (state.country && state.city && state.date) {
      // get products
      loadProducts({ cityId: state.city[0], date: state.date });
    }
  }, [state.country, state.city, state.date]);

  return (
    <section className="max-w-screen-lg m-auto">
      <CountryCityFilters dispatch={dispatch} />
      <DatePicker active={enableDatePicker} dispatch={dispatch} state={state} />
      <Products products={products} noAvailableProducts={noAvailableProducts} />
    </section>
  );
}

export default Home;
