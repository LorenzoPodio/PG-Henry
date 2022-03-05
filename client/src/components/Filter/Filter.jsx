// Componente que retorna un select con todas las opciones para filtrar
import { useState } from "react";

export default function Filter({
  items,
  defaultDescription,
  handleFilter,
  filterType,
}) {
  // handleFilter: Función que llama a la ruta del back con el filtro correspondiente, recibe como parametro el valor seleccionado
  // items: Opciones para filtrar
  //fitlerType: String --> date, excursionType o location
  const [objFilter, setObjFilter] = useState({}); //{location: bariloche, date: miercoles, excursionType: trekking}

  const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

  let options = []; //["bariloche"] ["trecking"]
  items?.map((item) => {
    if (!options.includes(item[filterType])) {
      return options.push(item[filterType]);
    }
  });
  
  return (
    <div>
      <select
        name={{ defaultDescription }}
        onChange={(event) => {
          setObjFilter((prevState) => {
            return { ...prevState, [event.target.name]: [event.target.value] };
          });
          console.log("objeto en filter >>" , objFilter);
          return handleFilter(objFilter);
        }}
      >
        <option value="allItems">{defaultDescription}</option>
        {defaultDescription !== "Fechas" ? (
          options?.map((option, i) => {
            return (
              <option key={i} value={option}>
                {option}
              </option>
            );
          })
        ) : (
          <>
            {days?.map((day, i) => {
              return (
                <option key={i} value={day}>
                  {day}
                </option>
              );
            })}
          </>
        )}
      </select>
    </div>
  );
}
