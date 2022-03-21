import React, { useEffect } from "react";
import { useExcursionsContext } from "../../context/ExcursionsContext";
import Filter from "../Filter/Filter";
import { ExcursionCard } from "../ExcursionCard/ExcursionCard";
import SortByPrice from "../SortByPrice/SortByPrice";
import SearchBar from "../SearchBar/SearchBar";
import { useCartContext } from "../../context/CartContext";

export const Excursions = () => {
  const {
    data,
    handleFilter,
    allExcursions,
    getExcursions,
    setAllExcursions,
    setData,
    setExcursionFiltered,
  } = useExcursionsContext();
  const { loading } = useCartContext();

  useEffect(() => {
    getExcursions().then((r) => {
      return (setAllExcursions(r), setData(r), setExcursionFiltered(r));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (

      <div className="h-screen w-full inline-flex items-center justify-center"


      

   

        style={{ backgroundColor: '#D8D2CB' }}
      >

        <img
          src="https://images-ext-2.discordapp.net/external/S7R7Qin6kKgo0g7H0nWwPt_d14InMHmmfDpGpMnh27M/https/res.cloudinary.com/dkdioyppw/image/upload/v1647458886/trekking-adventure-himachal_vp0rka.gif"
          alt="loading"
        />
      </div>
    );
  } else {
    return (
      <div style={{ backgroundColor: '#EEEEEE' }}>
        <div className="z-10 sticky top-0 md:inline-flex lg:inline-flex sm:block items-center text-center justify-between w-full mb-2 py-1 px-10" style={{ backgroundColor: '#D8D2CB' }}>
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
          <SortByPrice />
          <SearchBar />
        </div>
        <div style={{ backgroundColor: '#EEEEEE' }}>
          <div className="lg:mx-32 lg:py-9 lg:px-11 md:mx-32 md:py-8 md:px-9 sm:mx-24 sm:py-8 sm:px-9 mx-10 py-8 px-9">
            <h2 className="sr-only">Products</h2>
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-1 md:grid-cols-2 gap-x-6 lg:grid-cols-3 2xl:grid-cols-4 xl:gap-x-8">
              {data && typeof data !== "string" ? (
                data?.map((e) => (
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
                    <img
                      className="hidden lg:block"
                      src="https://i.ibb.co/v30JLYr/Group-192-2.png"
                      alt=""
                    />
                    <img
                      className="hidden md:block lg:hidden"
                      src="https://i.ibb.co/c1ggfn2/Group-193.png"
                      alt=""
                    />
                    <img
                      className="md:hidden"
                      src="https://i.ibb.co/8gTVH2Y/Group-198.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800">
                      No hay contenido para mostrar 😬{" "}
                    </h1>
                    <p className="py-4 text-base text-gray-800">
                      Ponete en contacto con nosotros si pensas que deberíamos
                      agregar un nuevo viaje
                    </p>
                    <p className="py-2 text-base text-gray-800">
                      Podes probar cambiando los filtros nuevamente!
                    </p>
                    <button className="w-full lg:w-auto my-4 border rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                      Escribinos!
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
