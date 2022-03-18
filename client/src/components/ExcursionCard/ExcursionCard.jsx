import React from 'react';
import { NavLink } from 'react-router-dom';


export const ExcursionCard = ({ id, name, images, location, date, price, excursionType }) => {
  return (
    <NavLink key={id} to={`/excursion/detalle/${id}`} className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <img
          src={images[0]}
          alt={`imagen representativa excursión: ${name}`}
          className="w-full h-full object-center object-cover group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-lg text-center font-bold text-gray-700">{name}</h3>
      <h4 className="mt-3 text-sm text-gray-700">{location}</h4>
      <h4 className="mt-3 text-sm text-gray-700">{excursionType}</h4>
      <h4 className="mt-3 text-sm text-gray-700">{date.join(', ')}</h4>
      <p className="mt-1 text-lg font-medium text-gray-900">{'$' + price}</p>
    </NavLink>
  )
}
