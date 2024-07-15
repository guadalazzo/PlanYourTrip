import {
  reducer,
  reducerState,
  SET_COUNTRY,
  SET_CITY,
  SET_DATE,
  RESET_STATE,
  ActionTypes,
  deleteLocalStorage,
} from '../store/reducer';

import { City } from '../types';

describe('Reducer Tests', () => {
  beforeEach(() => {
    // Clear local storage before each test
    localStorage.clear();
  });

  test('should set country and reset city and date', () => {
    const state: reducerState = { country: 'USA', city: null, date: '' };
    const action: ActionTypes = { type: SET_COUNTRY, payload: 'Canada' };
    const newState = reducer(state, action);
    expect(newState).toEqual({ country: 'Canada', city: null, date: '' });
  });

  test('should set city and reset date', () => {
    const city: City = [123, 'Toronto']; // Example city tuple
    const state: reducerState = { country: 'Canada', city: null, date: '' };
    const action: ActionTypes = { type: SET_CITY, payload: city };
    const newState = reducer(state, action);
    expect(newState).toEqual({ country: 'Canada', city: city, date: '' });
  });

  test('should set date', () => {
    const state: reducerState = { country: 'Canada', city: [123, 'Toronto'], date: '' };
    const action: ActionTypes = { type: SET_DATE, payload: '2023-01-01' };
    const newState = reducer(state, action);
    expect(newState).toEqual({ country: 'Canada', city: [123, 'Toronto'], date: '2023-01-01' });
  });

  test('should reset state', () => {
    const state: reducerState = { country: 'Canada', city: [123, 'Toronto'], date: '2023-01-01' };
    const action: ActionTypes = { type: RESET_STATE };
    const newState = reducer(state, action);
    expect(newState).toEqual({ country: '', city: null, date: '' });
  });

  test('should persist state in localStorage', () => {
    const state: reducerState = { country: 'Canada', city: null, date: '' };
    const action: ActionTypes = { type: SET_COUNTRY, payload: 'USA' };
    reducer(state, action);
    const localStorageState = JSON.parse(localStorage.getItem('reducerState')!);
    expect(localStorageState).toEqual({ country: 'USA', city: null, date: '' });
  });

  test('deleteLocalStorage should remove state from localStorage', () => {
    const dispatch = jest.fn();
    const persistedState: reducerState = { country: 'Canada', city: null, date: '2023-01-01' };
    localStorage.setItem('reducerState', JSON.stringify(persistedState));
    deleteLocalStorage(dispatch);
    expect(localStorage.getItem('reducerState')).toBeNull();
    expect(dispatch).toHaveBeenCalledWith({ type: RESET_STATE });
  });
});
