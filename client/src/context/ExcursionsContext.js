import React, { createContext, useContext, useEffect, useState } from "react";
import { getExcursions } from "./util/getExcursions";
import axios from "axios";

export const ExcurcionsContext = createContext();

export const useExcursionsContext = () => useContext(ExcurcionsContext);

export const ExcursionsProvider = ({ children }) => {
  const [allExcursions, setAllExcursions] = useState(); //Constante que va a contener a todas las excursiones
  const [data, setData] = useState(); //Excursiones que se van a renderizar,
  const [excursionFiltered, setExcursionFiltered] = useState(); //Excursiones filtradas para utilizar en los ordenamientos

  useEffect(() => {
    getExcursions().then((r) => {
      return (setAllExcursions(r), setData(r), setExcursionFiltered(r));
    });
  }, []);

  //feature_filter-implemented
  const handlerFilterByLocation = (value) => {
    if (value === "allItems") {
      return (
        setData((prevState) => allExcursions),
        setExcursionFiltered((prevState) => allExcursions)
      );
    }
    axios(`http://localhost:3001/getexcursion?location=${value}`).then(
      (response) => {
        return (
          setData((prevState) => response.data),
          setExcursionFiltered((prevState) => response.data)
        );
      }
    );
  };
  const handlerFilterByDate = (value) => {
    if (value === "allItems") {
      return (
        setData((prevState) => allExcursions),
        setExcursionFiltered((prevState) => allExcursions)
      );
    }
    axios(`http://localhost:3001/getexcursion?date=${value}`).then(
      (response) => {
        return (
          setData((prevState) => response.data),
          setExcursionFiltered((prevState) => response.data)
        );
      }
    );
  };
  const handlerFilterByType = (value) => {
    if (value === "allItems") {
      return (
        setData((prevState) => allExcursions),
        setExcursionFiltered((prevState) => allExcursions)
      );
    }
    axios(`http://localhost:3001/getexcursion?excursionType=${value}`).then(
      (response) => {
        return (
          setData((prevState) => response.data),
          setExcursionFiltered((prevState) => response.data)
        );
      }
    );
  };
  //

  // Feature Sort
  function handlePriceOrder(e) {
    e.preventDefault();

    if (e.target.value === "low") {
      return setData((prevState) =>
        excursionFiltered?.slice().sort((a, b) => {
          return a.price - b.price;
        })
      );
    }
    if (e.target.value === "top") {
      return setData((prevState) =>
        excursionFiltered?.slice().sort((a, b) => {
          return b.price - a.price;
        })
      );
    }

    return setData((prevState) => setData(() => excursionFiltered));
  }
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
        handlePriceOrder,
      }}
    >
      {children}
    </ExcurcionsContext.Provider>
  );
};
