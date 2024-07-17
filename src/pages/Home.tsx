import { useEffect, useReducer, useState } from 'react';
import { reducer, initialState, deleteLocalStorage } from '../store/reducer';
import CountryCityFilters from '../components/CountryCityFilters';
import DatePicker from '../components/DatePicker';
import Products from '../components/Products';
import { Product, ProductsPayload } from '../types';
import { getProducts } from '../services';

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [products, setProducts] = useState<Product[]>([]);
  const [noAvailableProducts, setNoAvailableProducts] = useState<boolean>(false);
  const [enableDatePicker, setEnableDatePicker] = useState<boolean>(false);

  const loadProducts = async ({ date, cityId }: ProductsPayload) => {
    setNoAvailableProducts(false);
    const resProducts = await getProducts({ date, cityId });
    setProducts(resProducts?.length ? resProducts : []);
    setNoAvailableProducts(!resProducts?.length);
  };

  useEffect(() => {
    if (state.country && state.city && state.date) {
      // get products
      loadProducts({ cityId: state.city[0], date: state.date });
    }
    setEnableDatePicker(!!state?.city?.length);
  }, [state.country, state.city, state.date]);

  const handleResetClick = () => {
    deleteLocalStorage(dispatch);
    setProducts([]);
  };

  return (
    <section className="max-w-screen-md m-auto">
      <button className="reset" onClick={handleResetClick}>
        Reset filters
      </button>
      <CountryCityFilters dispatch={dispatch} state={state} />
      <DatePicker active={enableDatePicker} dispatch={dispatch} state={state} />
      <Products products={products} noAvailableProducts={noAvailableProducts} />
    </section>
  );
}

export default Home;
