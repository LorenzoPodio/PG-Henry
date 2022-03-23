import React, { createContext, useContext, useEffect, useState } from "react";
import { getExcursions } from "./util/getExcursions";
import { getAllUsers } from "./util/getAllUsers";
import axios from "axios";
import swal from "sweetalert";
import { useCartContext } from "./CartContext";

export const ExcurcionsContext = createContext();

export const useExcursionsContext = () => useContext(ExcurcionsContext);

export const ExcursionsProvider = ({ children }) => {
  const [users, setUsers] = useState(); //constante que contiene todos los users

  const [allExcursions, setAllExcursions] = useState(); //Constante que va a contener a todas las excursiones
  const [data, setData] = useState(); //Excursiones que se van a renderizar,
  const [excursionFiltered, setExcursionFiltered] = useState(); //Excursiones filtradas para utilizar en los ordenamientos
  const [URL, setURL] = useState(`http://localhost:3001/getexcursion?&`); //URL dinamica para solapar todos los filtros
  const [excursionByid, setExcursionByid] = useState();
  const [allOrders, setAllOrders] = useState();
  const [isBanned, setIsBanned] = useState(true);
  const [reviews, setReviews] = useState([]);
  const { setLoading, user } = useCartContext();

  useEffect(() => {
    getExcursions().then((r) => {
      return (
        setAllExcursions(r),
        setData(r),
        setExcursionFiltered(r),
        setLoading(false)
      );
    });
    getAllUsers().then((r) => {
      return setUsers(r);
    });
    getAllOrders();
    // eslint-disable-next-line
  }, []);

  //banUser
  const banUser = (id) => {
    return axios
      .put(`http://localhost:3001/banuser/${id}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {});
  };
  //

  //UnbanUser
  const UnbanUser = (id) => {
    return axios
      .put(`http://localhost:3001/unbanuser/${id}`)
      .then((response) => {
        return setUsers(response.data);
      })
      .catch((err) => {});
  };
  //

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getusers?email=${user?.email}`)
      .then((resp) => {
        setIsBanned(() => resp.data?.isBanned);
      })
      .catch((e) => console.log("error en getusers", e));
    // eslint-disable-next-line
  }, [banUser, UnbanUser]);

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

  const getExcursionById = async (id) => {
    try {
      const { data } = await axios(
        `http://localhost:3001/getexcursion?id=${id}`
      );
      return setExcursionByid(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  //Función para traer todas las reviews.
  const getReviews = (id) => {
    axios
      .get(`http://localhost:3001/getreviews/${id}`)
      .then((resp) => setReviews(() => resp.data))
      .catch((e) => console.log(e));
  };
  //Funcion para agregar una review. Devuelve array con todas las reviews.
  const addReview = (id, dataUser) => {
    axios
      .post(`http://localhost:3001/addreview/${id}`, dataUser)
      .then((resp) =>
        setReviews(() => {
          swal({
            title: "Respuesta enviada",
            icon: "success",
            text: "Gracias por compartir su experiencia",
          });

          return resp.data;
        })
      )
      .catch((e) => {
        swal({
          title: "Ops...",
          icon: "error",
          text: "Hubo un inconveniente",
        });
        return console.log(e);
      });
  };

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

  //postUser antes era addAdmin
  const addUser = (user) => {
    return axios
      .post("http://localhost:3001/addUsers", user)
      .then((response) => response.data)
      .catch((err) => {});
  };
  //

  //agregar dni y direccion a los datos de usuario para confirmar compra
  const submitDates = (dates) => {
    return axios
      .put("http://localhost:3001/changedatesUser", dates)
      .then((res) => res.data)
      .catch((err) => {});
  };

  //postExcursion
  const addExcursion = (excursion) => {
    return axios
      .post("http://localhost:3001/addexcursion", excursion)
      .then((response) => response.data)
      .catch((err) => {});
  };
  //

  //deleteExcursion
  const deleteExcursion = (id) => {
    return axios
      .delete(`http://localhost:3001/deleteexcursion?id=${id}`)
      .then((response) => {
        return (
          setData(response.data),
          setAllExcursions(response.data),
          setExcursionFiltered(response.data)
        );
      })
      .catch((err) => {});
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
      .catch((err) => {});
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

  //cancelled order
  const cancelledOrder = (id) => {
    return axios
      .put(`http://localhost:3001/cart/canceledorder/${id}`)
      .then((response) => {
        setAllOrders(response.data);
      })
      .catch((err) => {});
  };

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/cart/getallorders"
      );
      return setAllOrders(() => data);
    } catch (error) {
      swal("Algo salió mal!", error, { icon: "error" });
      return console.log("ERROR: ", error);
    }
  };

  const contactUs = (dates) => {
    return axios
      .post("http://localhost:3001/contactmail", dates)
      .then((response) => response.data)
      .catch((err) => {});
  };

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
        addUser,
        users,
        setAllExcursions,
        setExcursionFiltered,
        addExcursion,
        deleteExcursion,
        editExcursion,
        cancelledOrder,
        banUser,
        UnbanUser,
        allOrders,
        submitDates,
        getAllOrders,
        contactUs,
        isBanned,
        getReviews,
        reviews,
        addReview,
      }}
    >
      {children}
    </ExcurcionsContext.Provider>
  );
};
