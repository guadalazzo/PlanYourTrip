export type City = [number, string];

export interface LocationResponse {
  [country: string]: City[];
}

export type AvailableDatesResponse = string[];

export interface Product {
  product_url: string;
  image: string;
  id: number;
  title: string;
  price: number;
  discount_percentage: number;
  summary: string;
  city_id: number;
  available_dates: string[];
}
export type ProductResponse = Product[];

export interface ProductsPayload {
  date: string;
  cityId: number;
}
