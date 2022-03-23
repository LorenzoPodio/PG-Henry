import React, { useEffect, useState } from "react";
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
  console.log("id", id);
  const { getReviews, reviews } = useExcursionsContext();
  const [stars, setStars] = useState({});

  useEffect(() => {
    setStars((prevState) => {
      return {
        ...prevState,
        oneStar:
          (reviews?.filter((e) => e.rating === "1").length * 100) /
            (reviews?.length === 0 ? 1 : reviews?.length) +
          "%",
      };
    });
    setStars((prevState) => {
      return {
        ...prevState,
        twoStar:
          (reviews?.filter((e) => e.rating === "2").length * 100) /
            (reviews?.length === 0 ? 1 : reviews?.length) +
          "%",
      };
    });
    setStars((prevState) => {
      return {
        ...prevState,
        threeStar:
          (reviews?.filter((e) => e.rating === "3").length * 100) /
            (reviews?.length === 0 ? 1 : reviews?.length) +
          "%",
      };
    });
    setStars((prevState) => {
      return {
        ...prevState,
        fourStar:
          (reviews?.filter((e) => e.rating === "4").length * 100) /
            (reviews?.length === 0 ? 1 : reviews?.length) +
          "%",
      };
    });
    setStars((prevState) => {
      return {
        ...prevState,
        fiveStar:
          (reviews?.filter((e) => e.rating === "5").length * 100) /
            (reviews?.length === 0 ? 1 : reviews?.length) +
          "%",
      };
    });
  }, [reviews]);

  useEffect(() => {
    if (typeof id !== "undefined") {
      getReviews(id);
    }
    // eslint-disable-next-line
  }, []);

  console.log("reviews", reviews);

  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg flex py-6">
      <div className="flex flex-col text-center">
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
                  <div
                    className=" bg-sky-600 rounded-lg h-2"
                    style={{ width: stars.fiveStar }}
                  ></div>
                </div>
              </div>
              <div className="w-1/5 text-gray-700 pl-3">
                <span className="text-sm">
                  {(reviews?.filter((e) => e.rating === "5").length * 100) /
                    (reviews?.length === 0 ? 1 : reviews?.length)}
                  %
                </span>
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
                  <div
                    className="bg-sky-600 rounded-lg h-2"
                    style={{ width: stars.fourStar }}
                  ></div>
                </div>
              </div>
              <div className="w-1/5 text-gray-700 pl-3">
                <span className="text-sm">
                  {(reviews?.filter((e) => e.rating === "4").length * 100) /
                    (reviews?.length === 0 ? 1 : reviews?.length)}
                  %
                </span>
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
                  <div
                    className="  bg-sky-600 rounded-lg h-2 "
                    style={{ width: stars.threeStar }}
                  ></div>
                </div>
              </div>
              <div className="w-1/5 text-gray-700 pl-3">
                <span className="text-sm">
                  {(reviews?.filter((e) => e.rating === "3").length * 100) /
                    (reviews?.length === 0 ? 1 : reviews?.length)}
                  %
                </span>
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
                  <div
                    className="  bg-sky-600 rounded-lg h-2"
                    style={{ width: stars.twoStar }}
                  ></div>
                </div>
              </div>
              <div className="w-1/5 text-gray-700 pl-3">
                <span className="text-sm">
                  {(reviews?.filter((e) => e.rating === "2").length * 100) /
                    (reviews?.length === 0 ? 1 : reviews?.length)}
                  %
                </span>
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
                  <div
                    className=" bg-sky-600 rounded-lg h-2"
                    style={{ width: stars.oneStar }}
                  ></div>
                </div>
              </div>
              <div className="w-1/5 text-gray-700 pl-3">
                <span className="text-sm">
                  {(reviews?.filter((e) => e.rating === "1").length * 100) /
                    (reviews?.length === 0 ? 1 : reviews?.length)}
                  %
                </span>
                {/* aca hay que poner logica para porcentajes */}
              </div>
            </div>
            {/* <!-- 5th --> */}
          </div>
        </div>
        <div className="w-full px-4">
          <h4 className="font-medium tracking-tight mb-2">
            Danos tu opinión sobre la excursión
          </h4>
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
      </div>
      <div className="flex justify-between p-2 self">
        <div
          className="flex flex-col justify-center items-center bg-slate-100 rounded-lg overflow-auto"
          style={{ width: "700px", height: "100px" }}
        >
          {reviews ? (
            reviews?.map((e, i) => <TestimonialCard props={e} key={i} />)
          ) : (
            <div>
              <div>
                <h3 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800">
                  No hay contenido para mostrar 😬{" "}
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
