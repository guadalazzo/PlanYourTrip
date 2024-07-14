import { City } from '../types';

export interface reducerState {
  country: string;
  city: City | null;
  date: string;
}

// Persist state in local storage
const storeStateInLocalStorage = (state: reducerState) => {
  try {
    const stateStringify = JSON.stringify(state);
    localStorage.setItem('reducerState', stateStringify);
  } catch (error) {
    console.error('Error reducer state was not store: ', error);
  }
};

// Get persisted state from local storage
const getStateLocalStorage = (): reducerState | null => {
  try {
    const stateStringify = localStorage.getItem('reducerState');
    if (stateStringify === null) {
      return null;
    }
    return JSON.parse(stateStringify) as reducerState;
  } catch (error) {
    console.error('Error getting state from local storage', error);
    return null;
  }
};

// Delete state from local storage
export const deleteLocalStorage = (dispatch: React.Dispatch<ActionTypes>) => {
  try {
    localStorage.removeItem('reducerState');
    dispatch(resetState());
  } catch (error) {
    console.error('Error deleting state from local storage', error);
    return null;
  }
};

export const initialState: reducerState = getStateLocalStorage() || {
  country: '',
  city: null,
  date: '',
};

export const SET_COUNTRY = 'SET_COUNTRY';
export const SET_CITY = 'SET_CITY';
export const SET_DATE = 'SET_DATE';
export const RESET_STATE = 'RESET_STATE';

export interface ResetStateAction {
  type: typeof RESET_STATE;
}
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

export type ActionTypes = SetCountryAction | SetCityAction | SetDateAction | ResetStateAction;

export const resetState = (): ResetStateAction => ({
  type: RESET_STATE,
});

export const reducer = (state: reducerState, action: ActionTypes): reducerState => {
  let newState;

  switch (action.type) {
    case SET_COUNTRY:
      newState = { ...state, country: action.payload, city: null, date: '' };
      break;
    case SET_CITY:
      newState = { ...state, city: action.payload, date: '' };
      break;
    case SET_DATE:
      newState = { ...state, date: action.payload };
      break;
    case RESET_STATE:
      newState = {
        country: '',
        city: null,
        date: '',
      };
      break;
    default:
      newState = state;
  }

  storeStateInLocalStorage(newState);
  return newState;
};
