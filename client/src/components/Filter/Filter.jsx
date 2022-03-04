// Componente que retorna un select con todas las opciones para filtrar

export default function Filter({
  items,
  defaultDescription,
  handleFilter,
  filterType,
}) {

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
        onChange={(e) => handleFilter(e.target.value)}
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
