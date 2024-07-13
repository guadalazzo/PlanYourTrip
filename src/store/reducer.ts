import { City } from '../types';

export interface reducerState {
  country: string;
  city: City | null;
}

export const initialState: reducerState = {
  country: '',
  city: null,
};

export const SET_COUNTRY = 'SET_COUNTRY';
export const SET_CITY = 'SET_CITY';

export interface SetCountryAction {
  type: typeof SET_COUNTRY;
  payload: string;
}

export interface SetCityAction {
  type: typeof SET_CITY;
  payload: City;
}

export type ActionTypes = SetCountryAction | SetCityAction;

export const reducer = (state: reducerState, action: ActionTypes) => {
  switch (action.type) {
    case SET_COUNTRY:
      return { ...state, country: action.payload, city: null };
    case SET_CITY:
      return { ...state, city: action.payload };
    default:
      return state;
  }
};
