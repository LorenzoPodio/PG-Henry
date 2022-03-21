import React from 'react';
import { NavLink } from 'react-router-dom';


export const ExcursionCard = ({ id, name, images, location, date, price, excursionType }) => {
  return (
    <div className="group rounded-lg shadow-lg shadow-gray-500 hover:shadow-black min-h-min" style={{ backgroundColor: 'white' }}>
      <div className="aspect-w-1 aspect-h-1 rounded-t-lg overflow-hidden md:aspect-w-6 md:aspect-h-5 xl:aspect-w-7 xl:aspect-h-5">
        <img
          src={images[0]}
          alt={`imagen representativa excursión: ${name}`}
          className="object-center object-cover group-hover:opacity-75"
        />
      </div>
      <div className='px-4 h-48'>
        <h3 className="mt-2 text-lg text-center font-bold text-gray-700">{name}</h3>
        <h4 className="mt-2 text-sm font-semibold text-gray-700">{location}</h4>
        <h4 className="mt-1 text-sm font-semibold text-gray-700">{excursionType}</h4>
        <h4 className="mt-1 text-sm font-semibold text-gray-700">{date.join(', ')}</h4>
        <p className="mt-1 text-lg font-medium text-gray-900">{'$' + price}</p>
      </div>
      <div className='m-2 w-11/12 text-right'>
        <NavLink key={id} to={`/excursion/detalle/${id}`}>
          <button
            className="bg-sky-500 hover:bg-sky-600 text-white shadow-lg hover:shadow-md hover:shadow-black font-bold rounded-md px-4 py-1 h-8"
          >
            Ver más
          </button>
        </NavLink>
      </div>
    </div>
  )
}
