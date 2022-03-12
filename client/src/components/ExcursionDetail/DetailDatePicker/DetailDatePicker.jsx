import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
registerLocale("es", es);

const daysCases = (array) => {
  const arr = array.map((day) => {
    switch (day.toLowerCase()) {
      case "lunes":
        return (day = 1);
      case "martes":
        return (day = 2);
      case "miercoles":
        return (day = 3);
      case "jueves":
        return (day = 4);
      case "viernes":
        return (day = 5);
      case "sabado":
        return (day = 6);
      default:
        return (day = 0);
    }
  });

  return arr;
};

export const DetailDatePicker = ({ excursionDays, handleDate }) => {
  const days = excursionDays ? daysCases(excursionDays) : null;
  const [startDate, setStartDate] = useState();

  useEffect(() => {
    handleDate(startDate); //  //Definida en ExcursionDetail para construir el item que sera agregado al cart
  }, [startDate]);

  const isWeekday = (date) => {
    const day = date.getDay();
    switch (days.length) {
      case 2:
        return day === days[0] || day === days[1];
      case 3:
        return day === days[0] || day === days[1] || day === days[2];
      case 4:
        return (
          day === days[0] ||
          day === days[1] ||
          day === days[2] ||
          day === days[3]
        );
      case 5:
        return (
          day === days[0] ||
          day === days[1] ||
          day === days[2] ||
          day === days[3] ||
          day === days[4]
        );
      case 6:
        return (
          day === days[0] ||
          day === days[1] ||
          day === days[2] ||
          day === days[3] ||
          day === days[4] ||
          day === days[5]
        );
      case 7:
        return (
          day === days[0] ||
          day === days[1] ||
          day === days[2] ||
          day === days[3] ||
          day === days[4] ||
          day === days[5] ||
          day === days[6]
        );
      default:
        return day === days[0];
    }
  };

  return (
    <div>
      <DatePicker
        className="shadow-md text-center rounded-md h-9 w-48"
        dateFormat={"dd/MM/yyyy"}
        placeholderText={"seleccione una fecha"}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        locale="es"
        filterDate={isWeekday}
        minDate={new Date()}
        maxDate={new Date().setMonth(new Date().getMonth() + 2)}
      />
    </div>
  );
};
