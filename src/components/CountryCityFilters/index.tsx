import React, { useEffect, useState } from 'react';
import Select from '../Select';
import { getLocations } from '../../services';
import { LocationResponse, City } from '../../types';
import { SET_CITY, SET_COUNTRY, ActionTypes } from '../../store/reducer';

interface CountryCityFiltersProps {
  dispatch: React.Dispatch<ActionTypes>;
}
const CountryCityFilters = ({ dispatch }: CountryCityFiltersProps) => {
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
        const countriesList = locationsResponse && Object.keys(locationsResponse);
        if (countriesList?.length) {
          setCountries(countriesList);
        }
      }
    } catch (e) {
      console.error('Failed to load Locations:', e);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const handleChange = (selectedValue: string | City, type: string) => {
    if (selectedValue) {
      if (type === 'COUNTRY' && typeof selectedValue === 'string') {
        const cities = locations[selectedValue];
        setCities(cities);
        dispatch({ type: SET_COUNTRY, payload: selectedValue });
      } else if (typeof selectedValue !== 'string') {
        dispatch({ type: SET_CITY, payload: selectedValue });
      }
    }
  };

  return (
    <ul role="listbox" className="grid grid-cols-1 sm:grid-cols-2">
      <Select type="COUNTRY" placeholder="Choose the country" options={countries} onChange={handleChange} />
      <Select type="CITY" placeholder="Choose the city" options={cities} onChange={handleChange} />
    </ul>
  );
};
export default CountryCityFilters;
