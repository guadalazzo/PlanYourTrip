import { useReducer } from 'react';
import { reducer, initialState } from '../store/reducer';
import CountryCityFilters from '../components/CountryCityFilters';
import DatePicker from '../components/DatePicker';
import Products from '../components/Products';

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enableDatePicker = state.city && state.city.length > 0 ? true : false;

  return (
    <article>
      <CountryCityFilters dispatch={dispatch} />
      <DatePicker active={enableDatePicker} />
      <Products />
    </article>
  );
}

export default Home;
