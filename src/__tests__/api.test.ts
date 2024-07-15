import { getLocations, getAvailableDates, getProducts } from '../services';
import { LocationResponse, AvailableDatesResponse, ProductResponse, ProductsPayload } from '../types';

const API_URL = process.env.REACT_APP_API_URL;

describe('API Tests', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch locations', async () => {
    const mockLocations: LocationResponse = {
      /* mock response */
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockLocations,
    });

    const response = await getLocations();
    expect(response).toEqual(mockLocations);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/locations`);
  });

  it('should fetch available dates', async () => {
    const mockDates: AvailableDatesResponse = [
      '2021-07-30',
      '2021-07-31',
      '2021-08-01',
      '2021-08-02',
      '2021-08-03',
      '2021-08-05',
      '2021-08-06',
      '2021-08-07',
    ];
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockDates,
    });

    const response = await getAvailableDates();
    expect(response).toEqual(mockDates);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/available_dates`);
  });

  it('should fetch products', async () => {
    const mockProducts: ProductResponse = [
      {
        product_url: 'https://www.tiqets.com/en/paris-c66746/disneyland-paris-skip-the-line-p975463',
        image:
          'https://aws-tiqets-cdn.imgix.net/images/content/9da74e3fa6d14469ae8ea2ba6da6117a.png?auto=format&fit=crop&ixlib=python-1.1.2&q=70&s=47c3d176dea82b7293edec297b94e8c4',
        id: 975463,
        title: 'Disneyland Paris: Skip The Line',
        price: 74,
        discount_percentage: 5,
        summary:
          "The Magic Kingdom just got a whole lot more magical! See those lines to get in? This ticket is the sprinkle of fairy dust that'll make them disappear, getting you straight into the action. \r\n\r\nMeet your heroes, soak up the enchanting atmosphere, and feel the thrills on Pirates of the Caribbean, Star Tours, and more! With more than fifty attractions spread across Disneyland Paris and Walt Disney Studios, the '2 Parks' option lets you fully enjoy both Disney universes in one go!",
        city_id: 66746,
        available_dates: ['2021-07-30', '2021-07-31', '2021-08-01', '2021-08-02', '2021-08-06', '2021-08-07'],
      },
    ];
    const payload: ProductsPayload = { date: '2023-10-01', cityId: 1 };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockProducts,
    });

    const response = await getProducts(payload);
    expect(response).toEqual(mockProducts);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/products?date=${payload.date}&city_id=${payload.cityId}`);
  });
});
