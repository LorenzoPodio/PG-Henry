// Componente que retorna un select con todas las opciones para filtrar

export default function Filter({
  items,
  defaultDescription,
  handleFilter,
  filterType,
}) {
  // handleFilter: Función que llama a la ruta del back con el filtro correspondiente, recibe como parametro el valor seleccionado
  // items: Opciones para filtrar
  //fitlerType: String --> date, excursionType o location

  const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

  let options = []; //["bariloche"] ["trecking"]
  items?.map((item) => {
    if (!options.includes(item[filterType])) {
      return options.push(item[filterType]);
    }
  });

  return (
    <div >
      <select
        name={filterType}
        onChange={(event) => {
          return handleFilter(event.target.name , event.target.value);
        }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
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
