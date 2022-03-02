import React, { createContext, useContext, useState } from 'react';
import { hardExcursiones } from './infoHard';
import {getExcursiones} from './getExcursiones';

export const ExcurcionesContext = createContext();



export const useExcursionesContext = () => useContext(ExcurcionesContext);

export const ExcursionesProvider = ({ children }) => {
  const [data, setData] = useState(hardExcursiones)

  return (
    <ExcurcionesContext.Provider value= {{data, setData, getExcursiones}}>
      {children}
    </ExcurcionesContext.Provider>
  )
}
