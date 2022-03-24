import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useAuth0 } from "@auth0/auth0-react";

export const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);
  const [dataUser, setDataUser] = useState({
    adress: "",
    dni: "",
    email: "",
    id: 3,
    isAdmin: false,
    isBanned: false,
    lastName: "",
    name: "s",
  });
 
  useEffect(() => {
    if (user) {
      axios

        .get(`/cart/getorderid/${user?.email}`)

        .then((resp) => {
          return setCartItems(() => resp.data);
        })
        .catch((e) => console.log("error en getorderid ", e)); //Harcodeamos el id del carrito
      axios
        .get(`/getusers?email=${user?.email}`)
        .then((resp) => {
          setIsAdmin(() => resp.data.isAdmin);
        })
        .catch((e) => console.log("error en getusers", e));
    }
  }, [user]);

  const addItemToCart = (item) => {
    axios
      .post("/cart/addcart", item)
      .then((resp) => {
        swal("Excursion agregada al carrito", {
          icon: "success",
        });
        return setCartItems(() => resp.data);
      })
      .catch((e) => {
        swal("Error, porfavor vuelva a intentarlo", {
          icon: "error",
        });
        return console.log(e);
      });
  };

  //Función para traer datos de el usuario actualmente logeado.
  function getDataUser() {
    if (typeof user?.email !== "undefined") {
      axios
        .get(`/getusers?email=${user?.email}`)
        .then((resp) => {
          setDataUser(() => resp.data);
        })
        .catch((e) => console.log("error en getusers", e));
    }
  }

  const removeItemFromCart = async (item) => {
    try {

      const { data } = await axios.put('/cart/substractcart', item);

      return setCartItems(() => data);
    } catch (error) {
      swal("Algo salió mal", error, {
        icon: "error",
      });
      return console.log("ERROR:", error);
    }
  };

  const createCart = (email) => {
    let mail = {};
    mail.email = email;
    return axios
      .post("/cart/orderpost", mail)
      .then((response) => response.data)
      .catch((err) => {});
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        createCart,
        setLoading,
        loading,
        user,
        removeItemFromCart,
        isAdmin,
        getDataUser,
        dataUser,
        setDataUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
