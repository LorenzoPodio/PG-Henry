import React from 'react';
import { useExcursionsContext } from '../../context/ExcursionsContext';

export const Excursions = () => {
  const {getExcursions, data} = useExcursionsContext();

  getExcursions();

  return (
    <div>
      <h1>Excursiones</h1>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}
