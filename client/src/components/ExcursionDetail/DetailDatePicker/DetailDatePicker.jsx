import React, { useEffect, useState } from 'react';
// import DayPickerInput from 'react-day-picker/DayPickerInput';
// import 'react-day-picker/lib/style.css';
import DatePicker, { registerLocale , filterDate} from "react-datepicker";
import { useExcursionsContext } from "../../../context/ExcursionsContext";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
registerLocale('es', es)

const daysCases = (array) => {
  const arr = array.map(day => {
    switch (day.toLowerCase()) {
      case 'lunes':
        return day = 1;
      case 'martes':
        return day = 2;
      case 'miercoles':
        return day = 3;
      case 'jueves':
        return day = 4;
      case 'viernes':
        return day = 5;
      case 'sabado':
        return day = 6;
      default:
        return day = 0;
    }
  });

  return arr;
}
console.log('filterDate', filterDate);



export const DetailDatePicker = ({ excursionDays }) => {
  console.log('excursionsDays', excursionDays);
  // const {
  //   excursionByid,
  //   setExcursionByid
  // } = useExcursionsContext();

  const days = excursionDays? daysCases(excursionDays) : null;
  // console.log('dias :>> ', days);
  const [startDate, setStartDate] = useState(new Date());
  // console.log('excursionByid', excursionByid?.date)
  // const arr = ['lunes', 'miercoles', 'viernes'];

  // useEffect(() => {
  //   return () => {
  //     setExcursionByid();
  //   }
  // }, [setExcursionByid]);


  const isWeekday = (date) => {
    // const days = [1,2,3];
    // let week = [0,1,2,3,4,5,6]
    const day = date.getDay();
    // week.filter(e => !days.includes(e));
    // return week.forEach((e)=> day !== e );
    switch (days.length) {
      case 2:
        return day === days[0] || day === days[1]
      case 3:
        return day === days[0] || day === days[1] || day === days[2]
        case 4:
        return day === days[0] || day === days[1] || day === days[2] || day === days[3]
      case 5:
        return day === days[0] || day === days[1] || day === days[2] || day === days[3] || day === days[4]
      case 6:
        return day === days[0] || day === days[1] || day === days[2] || day === days[3] || day === days[4] || day === days[5]
      case 7:
        return day === days[0] || day === days[1] || day === days[2] || day === days[3] || day === days[4] || day === days[5] || day === days[6]
      default:
        return day === days[0]
    };

  };
  

  return (
    <div>
      <DatePicker className='shadow-md text-center rounded-md h-9 w-72S'
        dateFormat={'dd/MM/yyyy'}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        locale='es'
        filterDate={isWeekday}
      />
    </div>
  )
}