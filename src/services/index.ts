import { LocationResponse, AvailableDatesResponse, ProductResponse, ProductsPayload } from '../types';
const API_URL = process.env.REACT_APP_API_URL;

/**
 *  list of all locations
 */
export const getLocations = async () => {
  try {
    const locations = await fetch(`${API_URL}/locations`).then((res) => res.json() as Promise<LocationResponse>);
    return locations;
  } catch (e) {
    console.error('Error getting locations:', e);
  }
};
/**
 *  list of available Dates
 */
export const getAvailableDates = async () => {
  try {
    const availableDates = await fetch(`${API_URL}/available_dates`).then(
      (res) => res.json() as Promise<AvailableDatesResponse>,
    );
    return availableDates;
  } catch (e) {
    console.error('Error getting availableDates:', e);
  }
};

/**
 *  list of products
 */
export const getProducts = async ({ date, cityId }: ProductsPayload) => {
  try {
    const products = await fetch(`${API_URL}/products?date=${date}&city_id=${cityId}`).then(
      (res) => res.json() as Promise<ProductResponse>,
    );
    return products;
  } catch (e) {
    console.error('Error getting products:', e);
  }
};
