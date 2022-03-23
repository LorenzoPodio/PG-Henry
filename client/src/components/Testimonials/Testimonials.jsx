import React from "react";
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

export const Testimonials = () => {
  const { getReviews } = useExcursionsContext();

  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg my-32 px-4 py-4 max-w-sm ">
      <div className="mb-1 tracking-wide px-4 py-4">
        <h1 className="text-gray-800 font-semibold mt-1">
          Puntaje de esta excrusion 4.6
        </h1>
        <h3 className="text-gray-800 font-semibold mt-1">67 Users reviews</h3>
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
        <h3 className="font-medium tracking-tight">Review this item</h3>
        <p className="text-gray-700 text-sm py-1">
          give your opinion about this item.
        </p>
        <div>
          <Popover as="div" className="ml-3 relative">
            <div>
              <Popover.Button className=" flex w-full justify-center bg-sky-600 p-1 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <h3>Agrega un comentario</h3>
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
                <Popover.Panel>{({ active }) => <NewReview />}</Popover.Panel>
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
      </div>
      <div>
        {getReviews ? (
          getReviews?.map((e) => <TestimonialCard />)
        ) : (
          <div className="flex justify-center">
            <h1>No hay comentarios para esta excursion</h1>
          </div>
        )}
      </div>
    </div>
  );
};
