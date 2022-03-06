import React, { useEffect } from 'react';
import { useExcursionsContext } from "../../context/ExcursionsContext";
import { useParams } from "react-router-dom";
import Example from '../InputSelect/InputSelect';

export const ExcursionDetail = () => {
  const { id } = useParams();
  const {
    excursionByid,
    getExcursionById
  } = useExcursionsContext();

  useEffect(() => {
    getExcursionById(id)
  }, [])
  // const {Images, createdInDb, date, description, excursionType, extra, location, name, price, time} = excursionByid;
  return (
    <div className="md:flex items-start justify-center py-2 px-2">
      <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
        <img className="w-full" alt="img excursion" src={excursionByid?.Images[0]} />
        <img className="mt-2 w-full" alt="img excursion" src={excursionByid?.Images[1]} />
      </div>
      <div className="md:hidden">
        <img className="w-full" alt="img excursion" src={excursionByid?.Images[0]} />
        <img className="mt-6 w-full" alt="img excursion" src={excursionByid?.Images[1]} />
      </div>
      <div className="md:w-3/5 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div className="border-b border-gray-200 pb-3">
          <p className="text-sm leading-none text-gray-600">{excursionByid?.location}</p>
          <h1
            className="
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						"
          >
            {excursionByid?.name}
          </h1>
        </div>
        <div className='inline-flex w-1/2 border-b border-gray-200 items-center justify-between'>
          <div className="py-2 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800">Dia:</p>
            <Example/>
          </div>
          <div className="py-2 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800">Hora:</p>
          </div>
        </div>
        <button
          className="
						focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
						text-base
						flex
						items-center
						justify-center
						leading-none
						text-white
						bg-gray-800
						w-full
						py-4
						hover:bg-gray-700
					"
        >
          Agregar al Carrito
        </button>
        <div>
          <p className="max-h-60 overflow-y-scroll text-sm lg:leading-tight leading-normal text-gray-600 mt-4">{excursionByid?.description}</p>
          <p className="text-base leading-4 mt-5 text-gray-600">Tipo de Excursión: {excursionByid?.excursionType}</p>
          <p className="text-base leading-4 mt-3 text-gray-600">Extra: {excursionByid?.extra}</p>
          <p className="text-base font-bold leading-4 mt-3 text-gray-600">$ {excursionByid?.price}</p>
        </div>
      </div>
    </div>
  );
}