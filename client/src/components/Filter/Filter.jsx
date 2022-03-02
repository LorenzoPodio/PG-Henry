// Componente que retorna un select con todas las opciones para filtrar

export default function Filter({ items, defaultDescription, handleFilter, filterType }) {
  // handleFilter: Función que llama a la ruta del back con el filtro correspondiente, recibe como parametro el valor seleccionado
  // items: Opciones para filtrar
  //fitlerType: String --> date, excursionType o location

  return (
    <div>
      <select
        name={{ defaultDescription }}
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="default">{defaultDescription}</option>
        {items?.map((item) => {
          return (
            <option key={item.id} value={item[filterType]}>
              {item[filterType]}
            </option>
          );
        })}
      </select>
    </div>
  );
}
