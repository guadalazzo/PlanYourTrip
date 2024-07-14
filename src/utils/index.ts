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
