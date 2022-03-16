import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useAuth0 } from "@auth0/auth0-react";

export const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3001/cart/getorderid/${user.email}`)
        .then((resp) => {
          console.log(resp, "resp del lamado al back")
          return setCartItems(() => resp.data);
        })
        .catch((e) => console.log("error en getorderid ", e)); //Harcodeamos el id del carrito
    }
  }, [user]);


  const addItemToCart = (item) => {
    axios
      .post("http://localhost:3001/cart/addcart", item)
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

  const createCart = (email) => {
    let mail = {};
    mail.email = email;
    console.log(mail);
    return axios
      .post("http://localhost:3001/cart/orderpost", mail)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        createCart,
        user,
        // deleteItemToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
