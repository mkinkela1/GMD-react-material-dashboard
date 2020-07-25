import React, {useState} from 'react';
import {addMonths, subMonths, startOfWeek, format, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay} from 'date-fns';

import './calendar.css';

const Calendar = () => {

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDateClick = day => setSelectedDate(day);
  const nextMonth = () => setCurrentMonth(tmpMonth => addMonths(tmpMonth, 1));
  const prevMonth = () => setCurrentMonth(tmpMonth => subMonths(tmpMonth, 1));

  const dateFormat = 'MMMM yyyy';

  const translateDay = {
    monday: 'Ponedjeljak',
    tuesday: 'Utorak',
    wednesday: 'Srijeda',
    thursday: 'Četvrtak',
    friday: 'Petak',
    saturday: 'Subota',
    sunday: 'Nedjelja',
  }

  const translateMonth = {
    JANUARY: 'Siječanj',
    FEBRUARY: 'Veljača',
    MARCH: 'Ožujak',
    APRIL: 'Travanj',
    MAY: 'Svibanj',
    JUNE: 'Lipanj',
    JULY: 'Srpanj',
    AUGUST: 'Kolovoz',
    SEPTEMBER: 'Rujan',
    OCTOBER: 'Listopad',
    NOVEMBER: 'Studeni',
    DECEMBER: 'Prosinac'
  }


  const renderDays = () => {
    const dayFormat = 'EEEE';
    const days = [];

    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="calendar-col calendar-col-center" key={i}>
          {translateDay[format(addDays(startDate, i), dayFormat).toLowerCase()]}
        </div>
      );
    }

    return days;
  }

  const renderCells = () => {

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`calendar-col calendar-cell ${
              !isSameMonth(day, monthStart)
                ? 'calendar-disabled'
                : isSameDay(day, selectedDate) ? 'calendar-selected' : ''
            }`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="calendar-number">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="calendar-row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return rows;
  }

  return (
    <div className="calendar-calendar">
      <div className="calendar-header calendar-row calendar-flex-middle">
        <div className="calendar-col calendar-col-start">
          <div className="calendar-icon" onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="calendar-col calendar-col-center">
          <span>{translateMonth[format(currentMonth, dateFormat).toUpperCase().split(' ')[0]]} {format(currentMonth, dateFormat).split(' ')[1]}</span>
        </div>
        <div className="calendar-col calendar-col-end" onClick={nextMonth}>
          <div className="calendar-icon">chevron_right</div>
        </div>
      </div>

      <div className="calendar-days calendar-row">{renderDays()}</div>
      <div className="calendar-body">{renderCells()}</div>
    </div>
  );
};

export default Calendar;
