import React, { createContext, useContext, useEffect, useState } from "react";
import { getExcursions } from "./util/getExcursions";
import {getAllUserAdmins} from './util/getAllUserAdmins'
import axios from "axios";

export const ExcurcionsContext = createContext();

export const useExcursionsContext = () => useContext(ExcurcionsContext);

export const ExcursionsProvider = ({ children }) => {
  const [userAdmins, setUserAdmins] = useState();//constante que contiene todos los user admins
  const [allExcursions, setAllExcursions] = useState(); //Constante que va a contener a todas las excursiones
  const [data, setData] = useState(); //Excursiones que se van a renderizar,
  const [excursionFiltered, setExcursionFiltered] = useState(); //Excursiones filtradas para utilizar en los ordenamientos

  useEffect(() => {
    getExcursions().then((r) => {
      return (setAllExcursions(r), setData(r), setExcursionFiltered(r));
    });

    getAllUserAdmins().then((r) => {return setUserAdmins(r)});
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

  //postAdmin
  const addAdmin = (user) => {
    return axios.post("http://localhost:3001/addadmin", user).then((response) =>response.data)
    .catch(err => {
      console.log(err)
    })
    }
    
  //

  //postExcursion
  const addExcursion = (excursion) => {
    return axios.post("http://localhost:3001/addexcursion", excursion).then((response) =>response.data)
    .catch(err => {
      console.log(err)
    })
    }
    
  //

  //deleteExcursion
  const deleteExcursion = (id) => {
    return axios.delete(`http://localhost:3001/deleteexcursion?id=${id}`).then((response) =>response.data)
    .catch(err => {
      console.log(err)
    })
    }
    
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
        addAdmin,
        userAdmins,
        addExcursion,
        deleteExcursion
      }}
    >
      {children}
    </ExcurcionsContext.Provider>
  );
};
