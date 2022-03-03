import React, { createContext, useContext, useEffect, useState } from "react";
import { getExcursions } from "./util/getExcursions";
import axios from "axios";

export const ExcurcionsContext = createContext();

export const useExcursionsContext = () => useContext(ExcurcionsContext);

export const ExcursionsProvider = ({ children }) => {
  const [allExcursions, setAllExcursions] = useState(); //Constante que va a contener a todas las excursiones
  const [data, setData] = useState(); //Excursiones que se van a renderizar,

  useEffect(() => {
    getExcursions().then((r) => {
      return setAllExcursions(r), setData(r);
    });
  }, []);

  //feature_filter-implemented
  const handlerFilterByLocation = (value) => {
    if (value === "allItems") {
      return setData((prevState) => allExcursions);
    }
    axios(`http://localhost:3001/getexcursion?location=${value}`).then(
      (response) => {
        return setData((prevState) => response.data);
      }
    );
  };
  const handlerFilterByDate = (value) => {
    if (value === "allItems") {
      return setData((prevState) => allExcursions);
    }
    axios(`http://localhost:3001/getexcursion?date=${value}`).then(
      (response) => {
        return setData((prevState) => response.data);
      }
    );
  };
  const handlerFilterByType = (value) => {
    if (value === "allItems") {
      return setData((prevState) => allExcursions);
    }
    axios(`http://localhost:3001/getexcursion?excursionType=${value}`).then(
      (response) => {
        return setData((prevState) => response.data);
      }
    );
  };
  //

  return (
    <ExcurcionsContext.Provider
      value={{
        data,
        allExcursions,
        setData,
        getExcursions,
        handlerFilterByLocation,
        handlerFilterByDate,
        handlerFilterByType,
      }}
    >
      {children}
    </ExcurcionsContext.Provider>
  );
};
