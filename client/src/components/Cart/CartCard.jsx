import React from "react";
import { NavLink } from "react-router-dom";

export const CartCard = ({
  id,
  name,
  images,
  location,
  date,
  price,
  excursionType,
}) => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "rgb(229 231 235 / var(--tw-bg-opacity))",
        alignContent: "center",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: "0.5rem",
      }}
    >
      <NavLink
        key={id}
        to={`/excursion/detalle/${id}`}
        className="group w-1/5 h-50"
      >
        <div
          style={{
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={images[0]}
            alt={`imagen representativa excursión: ${name}`}
            className="w-20 h-20 object-center object-cover group-hover:opacity-75"
            style={{ borderRadius: "0.5rem" }}
          />
        </div>
      </NavLink>
      <div
        className="w-3/5 h-max"
        style={{
          textAlign: "center",
        }}
      >
        <div>
          <NavLink key={id} to={`/excursion/detalle/${id}`} className="group">
            <h3 className="mt-4 text-lg text-center font-bold text-gray-700">
              {name}
            </h3>
          </NavLink>
        </div>
        <h4 className="mt-3 text-sm text-gray-700">{location}</h4>
        <h4 className="mt-3 text-sm text-gray-700">{excursionType}</h4>
        <h4 className="mt-3 text-sm text-gray-700">{date.join(", ")}</h4>
      </div>
      <div className="w-1/5 h-50">
        <input
          type="number"
          placeholder="Cupos"
          style={{ display: "flex", width: "4rem" }}
        />
        <p className="mt-1 text-sm font-medium text-gray-900">
          {"Total a pagar $" + price}
        </p>

        <button class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
      <br />
    </div>
  );
};
