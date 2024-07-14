export const getDay = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.getDate();
};

export const getDayOfTheWeek = (date: string) => {
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dateObj = new Date(date);
  return daysOfWeek[dateObj.getDay()];
};

export const isLastDay = (dt: string) => {
  const dateObj = new Date(dt);
  return new Date(dateObj.getTime() + 86400000).getDate() === 1;
};

export const formatPrice = (price: number) => {
  return `€${Number(price).toFixed(2)}`;
};

// This pre-discount is calculated based on the price and the discount percentage.
export const calculatePreDiscount = (price: number, discount_percentage: number) => {
  return price / discount_percentage + price;
};
