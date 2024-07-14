import React, { useEffect, useState } from 'react';
import { getAvailableDates } from '../../services';
import { AvailableDatesResponse } from '../../types';
import { getDay, getDayOfTheWeek, isLastDay } from '../../utils';
import { SET_DATE, ActionTypes, reducerState } from '../../store/reducer';

interface DatePickerProps {
  active: boolean;
  state: reducerState;
  dispatch: React.Dispatch<ActionTypes>;
}
const DatePicker = ({ active, dispatch, state }: DatePickerProps) => {
  const [dates, setDates] = useState<AvailableDatesResponse>([] as AvailableDatesResponse);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const loadAvailableDates = async () => {
    try {
      // Get Available Dates
      const availableDates = await getAvailableDates();
      if (availableDates) {
        setDates(availableDates);
      }
    } catch (e) {
      console.error('Failed to load Available Dates:', e);
    }
  };
  useEffect(() => {
    loadAvailableDates();
  }, []);

  useEffect(() => {
    setSelectedDate(state.date);
  }, [state.date]);
  /**
   * If date card is not fitting in the screen, hidde it.
   */
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

  const handleBtnSelection = (dateValue: string) => {
    // Store selected date
    setSelectedDate(dateValue);
    dispatch({ type: SET_DATE, payload: dateValue });
  };

  return (
    <div className={`filter ${active ? '' : 'opacity-10'}`}>
      <p key="main" className="font-medium">
        DATE
      </p>
      <ul className="dates-cards">
        {dates &&
          dates.map((date, index) => (
            <>
              <li key={`${date}-a`} className={isLastDay(date) ? 'flex items-center' : ''}>
                <button
                  className={`date-btn middle-center ${hideThisDate(index)} ${selectedDate === date ? 'selected' : ''}`}
                  disabled={!active}
                  onClick={() => handleBtnSelection(date)}
                >
                  <p>{getDayOfTheWeek(date)}</p>
                  <h3 className="text-large">{getDay(date)}</h3>
                </button>
                {isLastDay(date) && <span className="end-of-month"></span>}
              </li>
            </>
          ))}
      </ul>
    </div>
  );
};
export default DatePicker;
