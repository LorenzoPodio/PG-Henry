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

  const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

  return (
    <div>
      <select
        name={{ defaultDescription }}
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="allItems">{defaultDescription}</option>
        {defaultDescription !== "Fechas" ? (
          items?.map((item) => {
            return (
              <option key={item.id} value={item[filterType]}>
                {item[filterType]}
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
