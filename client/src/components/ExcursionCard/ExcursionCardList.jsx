import React from 'react';
import { NavLink } from 'react-router-dom';


export const ExcursionCardList = ({ id, name, images, location, date, price, excursionType }) => {
  return (
    <div className="shadow-gray-500 rounded-lg grid grid-cols-3 mx-10 hover:shadow-black min-h-min" style={{ backgroundColor: 'white' }}>
      <div className=" overflow-hidden  aspect-h-1  ">
        <img
          src={images[0]}
          alt={`imagen representativa excursión: ${name}`}
          className="object-center rounded-l-lg w-62 h-40 object-cover group-hover:opacity-75"
        />
      </div>
      <div className='pl-6 mt-5'>
        <h3 className="mt-1 text-lg text-center font-bold text-gray-700">{name}</h3>
        <h4 className="mt-2 text-sm font-semibold text-gray-700">{location}</h4>
        <h4 className="mt-1 text-sm font-semibold text-gray-700">{excursionType}</h4>
        <h4 className="mt-1 text-sm font-semibold text-gray-700">{date.join(', ')}</h4>
        
      </div>
      <div className='mt-6 w-11/12 text-right'>
        <NavLink key={id} to={`/excursion/detalle/${id}`}>
          <button
            className="bg-sky-500 hover:bg-sky-600 text-white shadow-lg hover:shadow-md hover:shadow-black font-bold rounded-md px-4 py-1 h-8"
          >
            Ver más
          </button>
        </NavLink>
        <p className="mt-12 text-lg font-medium text-gray-900"> Precio por persona {'$' + price}</p>
      </div>
    </div>
  )
}
