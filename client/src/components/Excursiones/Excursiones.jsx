import React from 'react';
import { useExcursionesContext } from '../../context/ExcursionesContext';

export const Excursiones = () => {
  const {getExcursiones, data} = useExcursionesContext();

  getExcursiones();

  return (
    <div>
      <h1>Excursiones</h1>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}
