import React, { useEffect } from "react";
import { useExcursionsContext } from "../../context/ExcursionsContext";
import Filter from "../Filter/Filter";
import { ExcursionCard } from "../ExcursionCard/ExcursionCard";
import SortByPrice from "../SortByPrice/SortByPrice";
import SearchBar from "../SearchBar/SearchBar";

export const Excursions = () => {
  const {
    // data,
    handleFilter,
    allExcursions,
    getExcursions,
    setAllExcursions,
    // setData,
    setExcursionFiltered,
  } = useExcursionsContext();

  useEffect(() => {
    getExcursions().then((r) => {
      return (setAllExcursions(r), 
      // setData(r), 
      setExcursionFiltered(r));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 block my-2">
        <h1 className="grid place-content-center mt-0 ">Excursiones</h1>

        <div className='search-bar'>
          <SearchBar />
        </div>

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
      </div>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {allExcursions && typeof allExcursions !== "string" ? (
              allExcursions?.map((e) => (
                <ExcursionCard
                  key={e.id}
                  id={e.id}
                  name={e.name}
                  images={e.Images}
                  location={e.location}
                  date={e.date}
                  price={e.price}
                  excursionType={e.excursionType}
                />
              ))
            ) : (
              <div>
                <div className="w-full lg:w-1/2">
                  <img className="hidden lg:block" src="https://i.ibb.co/v30JLYr/Group-192-2.png" alt="" />
                  <img className="hidden md:block lg:hidden" src="https://i.ibb.co/c1ggfn2/Group-193.png" alt="" />
                  <img className="md:hidden" src="https://i.ibb.co/8gTVH2Y/Group-198.png" alt="" />
                </div>
                <div>
                  <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800">No hay contenido para mostrar 😬 </h1>
                  <p className="py-4 text-base text-gray-800">Ponete en contacto con nosotros si pensas que deberíamos agregar un nuevo viaje</p>
                  <p className="py-2 text-base text-gray-800">Podes probar cambiando los filtros nuevamente!</p>
                  <button className="w-full lg:w-auto my-4 border rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Escribinos!</button>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
