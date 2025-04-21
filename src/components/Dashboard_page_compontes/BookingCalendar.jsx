import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BookingCalendar = () => {
  const [activeDate, setActiveDate] = useState(null); // No active date initially

  const handleDateClick = (selectedDate) => {
    setActiveDate(selectedDate); // Set the clicked date as active
  };

  return (
    <div className='Calendar-Booking'>
      <h2>Recent Booking Schedule</h2>
      <Calendar
        onClickDay={handleDateClick} // Handle date clicks
        tileClassName={({ date, view }) =>
          activeDate &&
            date.toDateString() === activeDate.toDateString()
            ? 'active-date'
            : ''
        }
      />
    </div>
  );
};

export default BookingCalendar;
