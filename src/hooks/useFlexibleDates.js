
import { useState, useEffect, useMemo } from 'react';
import {
  generatePriceDataForRange,
  getFlexibleDatesAroundDate,
} from '@/components/ui/flexible-dates-calendar/calendarUtils';

export const useFlexibleDates = () => {
  const [selectedFlexibleDate, setSelectedFlexibleDate] = useState(1);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [flexibleDates, setFlexibleDates] = useState([]);

  const priceData = useMemo(() => {
    return generatePriceDataForRange(new Date(), 90);
  }, []);

  useEffect(() => {
    const dates = getFlexibleDatesAroundDate(selectedDate, priceData, 3);
    setFlexibleDates(dates);
    if (dates.length > 0) {
      const middleIndex = Math.floor(dates.length / 2);
      setSelectedFlexibleDate(dates[middleIndex].id);
    }
  }, [selectedDate, priceData]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
    const dates = getFlexibleDatesAroundDate(date, priceData, 3);
    setFlexibleDates(dates);
    if (dates.length > 0) {
      const middleIndex = Math.floor(dates.length / 2);
      setSelectedFlexibleDate(dates[middleIndex].id);
    }
  };

  const handleFlexibleDateClick = (dateId) => {
    setSelectedFlexibleDate(dateId);
    const selectedFlexible = flexibleDates.find((d) => d.id === dateId);
    if (selectedFlexible) {
      setSelectedDate(selectedFlexible.fullDate);
    }
  };

  return {
    selectedFlexibleDate,
    isCalendarOpen,
    selectedDate,
    flexibleDates,
    priceData,
    setIsCalendarOpen,
    handleDateSelect,
    handleFlexibleDateClick,
  };
};
