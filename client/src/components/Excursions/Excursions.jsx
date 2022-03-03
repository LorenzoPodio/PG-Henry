import React from "react";
import { useExcursionsContext } from "../../context/ExcursionsContext";
import Filter from "../Filter/Filter";

export const Excursions = () => {
  const {
    data,
    handlerFilterByLocation,
    handlerFilterByDate,
    handlerFilterByType,
    allExcursions,
  } = useExcursionsContext();

  return (
    <div>
      <h1>Excursiones</h1>
      <Filter
        items={allExcursions}
        defaultDescription="Locación"
        handleFilter={handlerFilterByLocation}
        filterType="location"
      />

      <Filter
        items={allExcursions}
        defaultDescription="Fechas"
        handleFilter={handlerFilterByDate}
        filterType="date"
      />

      <Filter
        items={allExcursions}
        defaultDescription="Tipo de excursión"
        handleFilter={handlerFilterByType}
        filterType="excursionType"
      />

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
