import React, { createContext, useContext, useState } from 'react';
import { hardExcursions } from './infoHard'
import { getExcursions } from './util/getExcursions';

export const ExcurcionsContext = createContext();



export const useExcursionsContext = () => useContext(ExcurcionsContext);

export const ExcursionsProvider = ({ children }) => {
  const [data, setData] = useState(hardExcursions)

  return (
    <ExcurcionsContext.Provider value= {{data, setData, getExcursions}}>
      {children}
    </ExcurcionsContext.Provider>
  )
}
