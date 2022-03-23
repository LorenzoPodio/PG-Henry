import React, { useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import NewReview from "./NewReview";
import { Fragment } from "react";
import { TestimonialCard } from "./TestimonialCard";
import { useExcursionsContext } from "../../context/ExcursionsContext";

const star = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export const Testimonials = ({ id }) => {
  const { getReviews, reviews } = useExcursionsContext();

  useEffect(() => {
    if (typeof id !== "undefined") {
      getReviews(id);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg my-32 px-4 py-4 max-w-sm ">
      <div className="mb-1 tracking-wide px-4 py-4">
        {reviews.length !== 0 ? (
          <h3 className="text-gray-800 font-semibold mt-1">
            Puntaje de esta excrusion{" "}
            {reviews?.reduce(
              (previousValue, currentObj) =>
                parseInt(previousValue) + parseInt(currentObj.rating),
              0
            ) / reviews?.length}
          </h3>
        ) : (
          <h3 className="text-gray-800 font-semibold mt-1">Sin puntaje</h3>
        )}
        <h4 className="text-gray-800 font-semibold mt-1">
          ¡{reviews.length}{" "}
          {reviews.length !== 1 ? <>personas opinaron</> : <>persona opinó</>}{" "}
          sobre esta excursión!{" "}
        </h4>
        <div className="border-b -mx-8 px-8 pb-3">
          <div className="flex items-center mt-1">
            <div className=" w-2/5 text-sky-500 tracking-tighter">
              <div className="flex mx-2">
                {star}
                {star}
                {star}
                {star}
                {star}
              </div>
            </div>
            <div className="w-2/5">
              <div className="bg-gray-300 w-full rounded-lg h-2">
                <div className=" w-7/12 bg-sky-600 rounded-lg h-2"></div>
              </div>
            </div>
            <div className="w-1/5 text-gray-700 pl-3">
              <span className="text-sm">51%</span>
              {/* aca hay que poner logica para porcentajes */}
            </div>
          </div>
          {/* <!-- first --> */}
          <div className="flex items-center mt-1">
            <div className=" w-2/5 text-sky-500 tracking-tighter">
              <div className="flex mx-2">
                {star}
                {star}
                {star}
                {star}
              </div>
            </div>
            <div className="w-2/5">
              <div className="bg-gray-300 w-full rounded-lg h-2">
                <div className="w-1/5 bg-sky-600 rounded-lg h-2"></div>
              </div>
            </div>
            <div className="w-1/5 text-gray-700 pl-3">
              <span className="text-sm">17%</span>

              {/* aca hay que poner logica para porcentajes */}
            </div>
          </div>
          {/* <!-- second --> */}
          <div className="flex items-center mt-1">
            <div className=" w-2/5 text-sky-500 tracking-tighter">
              <div className="flex mx-2">
                {star}
                {star}
                {star}
              </div>
            </div>
            <div className="w-2/5">
              <div className="bg-gray-300 w-full rounded-lg h-2">
                <div className=" w-3/12 bg-sky-600 rounded-lg h-2"></div>
              </div>
            </div>
            <div className="w-1/5 text-gray-700 pl-3">
              <span className="text-sm">19%</span>

              {/* aca hay que poner logica para porcentajes */}
            </div>
          </div>
          {/* <!-- thierd --> */}
          <div className="flex items-center mt-1">
            <div className=" w-2/5 text-sky-500 tracking-tighter">
              <div className="flex mx-2">
                {star}
                {star}
              </div>
            </div>
            <div className="w-2/5">
              <div className="bg-gray-300 w-full rounded-lg h-2">
                <div className=" w-1/5 bg-sky-600 rounded-lg h-2"></div>
              </div>
            </div>
            <div className="w-1/5 text-gray-700 pl-3">
              <span className="text-sm">8%</span>

              {/* aca hay que poner logica para porcentajes */}
            </div>
          </div>
          {/* <!-- 4th --> */}
          <div className="flex items-center mt-1">
            <div className=" w-2/5 text-sky-500 tracking-tighter">
              <div className="flex mx-2">{star}</div>
            </div>
            <div className="w-2/5">
              <div className="bg-gray-300 w-full rounded-lg h-2">
                <div className=" w-2/12 bg-sky-600 rounded-lg h-2"></div>
              </div>
            </div>
            <div className="w-1/5 text-gray-700 pl-3">
              <span className="text-sm">5%</span>

              {/* aca hay que poner logica para porcentajes */}
            </div>
          </div>
          {/* <!-- 5th --> */}
        </div>
      </div>
      <div className="w-full px-4">
        <h4 className="font-medium tracking-tight mb-2">Danos tu opinión sobre la excursión</h4>
        <div>
          <Popover as="div" className="ml-3 relative mb-2">
            <div>
              <Popover.Button className=" flex w-full justify-center bg-sky-600 p-1 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <h4>Agrega un comentario</h4>
              </Popover.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Popover.Panel
                className=" origin-top-right absolute bottom-10 right-0 mt-0 w-auto rounded-md shadow-lg  bg-sky-600 ring-1 ring-black ring-opacity-5 focus:outline-none justify-center flex"
                style={{ zIndex: "1" }}
              >
                <Popover.Panel>
                  {({ active }) => <NewReview id={id} />}
                </Popover.Panel>
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
      </div>
      <div>
        {reviews ? (
          reviews?.map((e,i) => <TestimonialCard props={e} key={i}/>)
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
              <h3 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800">
                No hay contenido para mostrar 😬{" "}
              </h3>
              <p className="py-4 text-base text-gray-800">
                Ponete en contacto con nosotros si pensas que deberíamos agregar
                un nuevo viaje
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
  );
};
