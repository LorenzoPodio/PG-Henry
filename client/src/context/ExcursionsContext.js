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
  const [URL, setURL] = useState(`http://localhost:3001/getexcursion?&`); //URL dinamica para solapar todos los filtros
  const [excursionByid, setExcursionByid] = useState();

  useEffect(() => {
    getExcursions().then((r) => {
      return (
        setAllExcursions(r),
        setData(r),
        setExcursionFiltered(r)
      );
    });
    getAllUserAdmins().then((r) => {
      return setUserAdmins(r);
    });
  }, []);

  const getExcursionById = async (id) => {
    try {
      const {data} = await axios(`http://localhost:3001/getexcursion?id=${id}`);
      return setExcursionByid(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    axios(URL)
      .then((response) => {
        return (
          setData((prevState) => response.data),
          setExcursionFiltered((prevState) => response.data)
        );
      })
      .catch((e) => {
        setExcursionFiltered("Excursiones no encontradas");
        setData("Excursiones no encontradas");
      });
  }, [URL]);

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
    }
    if (value === "allItems") {
      const regex = new RegExp(`${name}[^&]*&`);
      setURL((prevState) => prevState.replace(regex, ``));
    }
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

  //postExcursion
  const addExcursion = (excursion) => {
    return axios
      .post("http://localhost:3001/addexcursion", excursion)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
      });
  };

  //

  //deleteExcursion
  const deleteExcursion = (id) => {
    return axios
      .delete(`http://localhost:3001/deleteexcursion?id=${id}`)
      .then((response) => {
        return (
          setData(response.data),
          // setData(response.data),
          setExcursionFiltered(response.data)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //

  //editExcursion
  const editExcursion = (excursion, id) => {
    return axios
      .put(`http://localhost:3001/changeexcursion/${id}`, excursion)
      .then((response) => {
        return (
          setAllExcursions(response.data),
          setData(response.data),
          setExcursionFiltered(response.data)
        );
      })
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
        excursionByid,
        setExcursionByid,
        setData,
        getExcursions,
        handleFilter,
        getExcursionById,
        handlePriceOrder,
        addAdmin,
        userAdmins,
        setAllExcursions,
        setExcursionFiltered,
        addExcursion,
        deleteExcursion,
        editExcursion,
      }}
    >
      {children}
    </ExcurcionsContext.Provider>
  );
};
