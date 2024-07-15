import React, { useEffect, useState } from 'react';
import Select from '../Select';
import { getLocations } from '../../services';
import { LocationResponse, City } from '../../types';
import { SET_CITY, SET_COUNTRY, ActionTypes, reducerState } from '../../store/reducer';

interface CountryCityFiltersProps {
  dispatch: React.Dispatch<ActionTypes>;
  state: reducerState;
}

const CountryCityFilters = ({ dispatch, state }: CountryCityFiltersProps) => {
  const [locations, setLocations] = useState<LocationResponse>({} as LocationResponse);
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<City[]>([] as City[]);

  // Load Locations updates local state
  const loadLocations = async () => {
    try {
      // Get locations list
      const locationsResponse = await getLocations();
      if (locationsResponse && Object.keys(locationsResponse).length) {
        setLocations(locationsResponse);
        setCountries(Object.keys(locationsResponse));
      }
    } catch (e) {
      console.error('Failed to load Locations:', e);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  useEffect(() => {
    if (state.country) {
      setCities(locations[state.country]);
    } else {
      setCities([]);
    }
  }, [state.country, locations]);

  const handleChange = (selectedValue: string | City, type: string) => {
    if (type === 'COUNTRY' && typeof selectedValue === 'string') {
      dispatch({ type: SET_COUNTRY, payload: selectedValue });
    } else if (type === 'CITY' && typeof selectedValue !== 'string') {
      dispatch({ type: SET_CITY, payload: selectedValue });
    }
  };

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2">
      <Select
        selectedValue={state.country}
        type="COUNTRY"
        placeholder="Choose the country"
        options={countries}
        onChange={handleChange}
      />
      <Select
        selectedValue={state.city}
        type="CITY"
        placeholder="Choose the city"
        options={cities}
        onChange={handleChange}
      />
    </ul>
  );
};

export default CountryCityFilters;
