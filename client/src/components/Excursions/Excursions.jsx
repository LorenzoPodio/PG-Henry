import React from "react";
import { useExcursionsContext } from "../../context/ExcursionsContext";
import Filter from "../Filter/Filter";
import { ExcursionCard } from "../ExcursionCard/ExcursionCard";
import SortByPrice from "../SortByPrice/SortByPrice";

export const Excursions = () => {
  const { data, handleFilter, allExcursions } = useExcursionsContext();

  return (
    <div>
      <h1>Excursiones</h1>
      <div className="inline-flex">
        <Filter
          items={allExcursions}
          defaultDescription="Locación"
          handleFilter={handleFilter}
          filterType="location"
        />
        <Filter
          items={allExcursions}
          defaultDescription="Fechas"
          handleFilter={handleFilter}
          filterType="date"
        />
        <Filter
          items={allExcursions}
          defaultDescription="Tipo de excursión"
          handleFilter={handleFilter}
          filterType="excursionType"
        />
      </div>
      <SortByPrice />
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data && typeof data !== "string" ? (
              data?.map((e) => (
                <ExcursionCard
                  key={e.id}
                  id={e.id}
                  name={e.name}
                  primaryImage={e.Images[0]}
                  location={e.location}
                  date={e.date.join(", ")}
                  price={e.price}
                  excursionType={e.excursionType}
                />
              ))
            ) : (
              <p>No se encontró la excursión</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
