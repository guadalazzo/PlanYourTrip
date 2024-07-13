import { useEffect, useState } from 'react';
import { getAvailableDates } from '../../services';
import { AvailableDatesResponse } from '../../types';
interface DatePickerProps {
  active: boolean;
}
const DatePicker = ({ active }: DatePickerProps) => {
  const [dates, setDates] = useState<AvailableDatesResponse>([] as AvailableDatesResponse);

  const loadAvailableDates = async () => {
    try {
      // Get Available Dates
      const availableDates = await getAvailableDates();
      if (availableDates) {
        setDates(availableDates);
        console.log(availableDates);
      }
    } catch (e) {
      console.error('Failed to load Available Dates:', e);
    }
  };
  useEffect(() => {
    loadAvailableDates();
  }, []);

  const getDay = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.getDate();
  };

  const getDayOfTheWeek = (date: string) => {
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const dateObj = new Date(date);
    return daysOfWeek[dateObj.getDay()];
  };

  const hideThisDate = (index: number) => {
    switch (true) {
      case index === 4:
        return 'hidden xs:flex';
      case index === 5:
        return 'hidden sm:flex';
      case index === 6:
        return 'hidden md:flex';
      case index === 7:
        return 'hidden lg:flex';
      default:
        return '';
    }
  };

  return (
    <div className={`filter ${active ? '' : 'opacity-10'}`}>
      <p className="font-medium">DATE</p>
      <ul className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-2 mt-2">
        {dates &&
          dates.map((date, index) => (
            <li
              key={`${date}-${index}`}
              className={`border border-black rounded-lg h-[72px] flex flex-col justify-center items-center ${hideThisDate(index)} `}
            >
              <button>
                {/* TODO: add click functionality */}
                {/* TODO: add END of month separator */}

                <p>{getDayOfTheWeek(date)}</p>
                <h3 className="text-large">{getDay(date)}</h3>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default DatePicker;
