import { City } from '../types';

export interface reducerState {
  country: string;
  city: City | null;
  date: string;
}

export const initialState: reducerState = {
  country: '',
  city: null,
  date: '',
};

export const SET_COUNTRY = 'SET_COUNTRY';
export const SET_CITY = 'SET_CITY';
export const SET_DATE = 'SET_DATE';

export interface SetCountryAction {
  type: typeof SET_COUNTRY;
  payload: string;
}

export interface SetCityAction {
  type: typeof SET_CITY;
  payload: City;
}

export interface SetDateAction {
  type: typeof SET_DATE;
  payload: string;
}
export type ActionTypes = SetCountryAction | SetCityAction | SetDateAction;

export const reducer = (state: reducerState, action: ActionTypes) => {
  switch (action.type) {
    case SET_COUNTRY:
      return { ...state, country: action.payload, city: null, date: '' };
    case SET_CITY:
      return { ...state, city: action.payload, date: '' };
    case SET_DATE:
      return { ...state, date: action.payload };
    default:
      return state;
  }
};
