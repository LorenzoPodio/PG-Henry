import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

export const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

// export const CartProvider = ({children}) => {

//     const [cartItems, setCartItems] = useState(() => {
//         try {
//             // Usa localStorage para no perder la info del carrito !
//             const  productsLocalStorage = localStorage.getItem('cartProducts')
//             return productsLocalStorage ? JSON.parse(productsLocalStorage) : []
//         } catch (error) {
//             return [];
//         }
//     });

//  /* Cada vez que se actualize el carrito seteamos el local storage para guardar los productos */
//     // useEffect(() => {
//     //     localStorage.setItem('cartProducts',JSON.stringify(cartItems)) // localStorage solo recibe strings !
//     // }, [cartItems]);

//     // Agregar al carrito:
//     const addItemToCart = (product) => {
//         /* Recibimos un producto y nos fijamos si ya esta en el carrito */
//         const inCart = cartItems.find(
//             (productInCart) => productInCart.id === product.id
//         );
//         // Si está en el carrito, recorremos el carrito y al producto le sumamos uno a la cantidad, sino retornamos el carrito como estaba
//         if(inCart) {
//             setCartItems(
//                 cartItems.map((productInCart) => {
//                     if(productInCart.id === product.id) {
//                         console.log("soy CartItems",cartItems)
//                         return {...inCart, amount: inCart.amount + 1};
//                     } else {
//                         return productInCart;
//                     }
//                 })
//             );

//         } else {
//             setCartItems(
//                 [...cartItems, {...product, amount: 1}]
//             );
//         }
//         console.log(cartItems);
//     };

//     // Sacar del carrito:
//     const deleteItemToCart = (product) => {
//         const inCart = cartItems.find(
//             (productInCart) => productInCart.id === product.id
//         );

//         if(inCart.amount === 1) {
//             setCartItems(
//                 cartItems.filter((productInCart) => productInCart.id !== product.id)
//             );
//         } else {
//             setCartItems((productInCart) => {
//                 if(productInCart.id === product.id) {
//                     return { ...inCart, amount: inCart.amount -1}
//                 } else {
//                     return productInCart
//                 }
//             })
//         }
//     };

//     return(
//         <CartContext.Provider
//             value={{
//                     cartItems,
//                     addItemToCart,
//                     deleteItemToCart,
//                   }}
//             >
//             { children }
//         </CartContext.Provider>
//     )
// };

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:3001/cart/orderpost", {
      email: "djdjhdjhn@hotmail.com",
    }); //Podriamos modificar la ruta del back para que este post devuelva todo el carrito del usuario.
    axios
      .get(`http://localhost:3001/cart/getorderid/1`)
      .then((resp) => {
        return setCartItems(() => resp.data.products); //[{name, date, order_detail:{price, quantity}}]
      })
      .catch((e) => console.log("error en getorderid ", e)); //Harcodeamos el id del carrito
  }, []);

  const addItemToCart = (item) => {
    // const itemIndex = cartItems.findIndex( //logica para no repetir excursiones en el carrito
    //   (item) => item.props.id === items.props.id //hay que acceder al id dentro del item, reemplezar props por lo que corresponda
    // );
    // if (itemIndex > -1) {
    //   alert("Ya tienes la excursion en el carrito!")
    //   }
    //   else {
    //     alert (`La cantidad seleccionada supera el stock disponible del producto`)
    //   }
    // } else {
    //   setCartList([...cartList, items]);
    // }
    axios
      .post("http://localhost:3001/cart/addcart", item)
      .then((resp) => {
        swal("Excursion agregada al carrito", {
          icon: "success",
        });
        return setCartItems((prevState) => [
          ...prevState,
          {
            ...item,
            order_detail: { price: item.price, quantity: item.quantity },
          },
        ]);
      })
      .catch((e) => {
        swal("Error, porfavor vuelva a intentarlo", {
          icon: "error",
        });
        return console.log(e);
      });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        // deleteItemToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// const [cartItems, setCartItems] = useState(() => {
//     try {
//       // Usa localStorage para no perder la info del carrito !
//       const productsLocalStorage = localStorage.getItem("cartProducts");
//       return productsLocalStorage ? JSON.parse(productsLocalStorage) : [];
//     } catch (error) {
//       return [];
//     }
//   });

//   /* Cada vez que se actualize el carrito seteamos el local storage para guardar los productos */
//   useEffect(() => {
//     localStorage.setItem("cartProducts", JSON.stringify(cartItems)); // localStorage solo recibe strings !
//   }, [cartItems]);

//   // Agregar al carrito:
//   const addItemToCart = (product) => {
//     /* Recibimos un producto y nos fijamos si ya esta en el carrito */
//     const inCart = cartItems.find(
//       (productInCart) => productInCart.id === product.id
//     );
//     // Si está en el carrito, recorremos el carrito y al producto le sumamos uno a la cantidad, sino retornamos el carrito como estaba
//     if (inCart) {
//       setCartItems(
//         cartItems.map((productInCart) => {
//           if (productInCart.id === product.id) {
//             return { ...inCart, amount: inCart.amount + 1 };
//           } else {
//             return productInCart;
//           }
//         })
//       );
//     } else {
//       setCartItems([...cartItems, { ...product, amount: 1 }]);
//     }
//   };

//   // Sacar del carrito:
//   const deleteItemToCart = (product) => {
//     const inCart = cartItems.find(
//       (productInCart) => productInCart.id === product.id
//     );

//     if (inCart.amount === 1) {
//       setCartItems(
//         cartItems.filter((productInCart) => productInCart.id !== product.id)
//       );
//     } else {
//       setCartItems((productInCart) => {
//         if (productInCart.id === product.id) {
//           return { ...inCart, amount: inCart.amount - 1 };
//         } else {
//           return productInCart;
//         }
//       });
//     }
//   };
