import React, { createContext, useContext, useEffect, useState } from "react";
import { getExcursions } from "./util/getExcursions";
import { getAllUserAdmins } from "./util/getAllUserAdmins";
import axios from "axios";

export const ExcurcionsContext = createContext();

export const useExcursionsContext = () => useContext(ExcurcionsContext);

export const ExcursionsProvider = ({ children }) => {
  const [userAdmins, setUserAdmins] = useState(); //constante que contiene todos los user admins
  const [allExcursions, setAllExcursions] = useState(); //Constante que va a contener a todas las excursiones
  const [data, setData] = useState(); //Excursiones que se van a renderizar,
  const [excursionFiltered, setExcursionFiltered] = useState(); //Excursiones filtradas para utilizar en los ordenamientos
  const [URL, setURL] = useState(`http://localhost:3001/getexcursion?&`);

  useEffect(() => {
    getExcursions().then((r) => {
      return setAllExcursions(r, setData(r), setExcursionFiltered(r));
    });

    getAllUserAdmins().then((r) => {
      return setUserAdmins(r);
    });
  }, []);

  //feature_filter-implemented
  const handleFilter = (name, value) => {
    if (value !== "allItems") {
      if (!URL.includes(name)) {
        setURL((prevState) => prevState.concat(`${name}=${value}&`));
      } else {
        const regex = new RegExp(`${name}[^&]*&`);
        setURL((prevState) =>
          prevState.replace(regex, `${name}=${encodeURIComponent(value)}&`)
        );
      }
      console.log(URL);
    }
    if (value === "allItems") {
      const regex = new RegExp(`${name}[^&]*&`);
        setURL((prevState) =>
          prevState.replace(regex, ``)
        );
    }

    return axios(URL).then((response) => {
      return (
        setData((prevState) => response.data),
        setExcursionFiltered((prevState) => response.data)
      );
    });
  };

  //postAdmin
  const addAdmin = (user) => {
    return axios
      .post("http://localhost:3001/addadmin", user)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
      });
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
        handleFilter,
        handlePriceOrder,
        addAdmin,
        userAdmins,
      }}
    >
      {children}
    </ExcurcionsContext.Provider>
  );
};
