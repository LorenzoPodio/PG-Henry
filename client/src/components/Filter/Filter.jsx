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
  // eslint-disable-next-line
  items?.map((item) => {
    if (!options.includes(item[filterType])) {
      return options.push(item[filterType]);
    }
  });

  return (
    <div className="mx-1 my-2">
      <select
        name={filterType}
        onChange={(event) => {
          return handleFilter(event.target.name , event.target.value);
        }}
        className="shadow-lg hover:shadow-md shadow-gray-400 text-sm font-semibold hover:shadow-black hover:bg-sky-500 hover:text-white text-center rounded-md h-9 w-full mx-1"
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
