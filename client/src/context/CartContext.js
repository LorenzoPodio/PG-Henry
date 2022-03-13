// context >> cartContext

import { useEffect, useState, useContext, createContext } from 'react';
import { useExcursionsContext,ExcurcionsContext } from "../context/ExcursionsContext";

export const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({children}) => {


    const [cartItems, setCartItems] = useState(() => {
        try {
            // Usa localStorage para no perder la info del carrito !
            const  productsLocalStorage = localStorage.getItem('cartProducts')
            return productsLocalStorage ? JSON.parse(productsLocalStorage) : []
        } catch (error) {
            return [];
        }
    });

 /* Cada vez que se actualize el carrito seteamos el local storage para guardar los productos */
    // useEffect(() => {
    //     localStorage.setItem('cartProducts',JSON.stringify(cartItems)) // localStorage solo recibe strings !
    // }, [cartItems]);

    // Agregar al carrito:
    const addItemToCart = (product) => {
        /* Recibimos un producto y nos fijamos si ya esta en el carrito */
        const inCart = cartItems.find(
            (productInCart) => productInCart.id === product.id
        );
        // Si está en el carrito, recorremos el carrito y al producto le sumamos uno a la cantidad, sino retornamos el carrito como estaba
        if(inCart) {
            setCartItems(
                cartItems.map((productInCart) => {
                    if(productInCart.id === product.id) {
                        console.log("soy CartItems",cartItems)
                        return {...inCart, amount: inCart.amount + 1};
                    } else {
                        return productInCart;   
                    }
                })
            );

        } else {
            setCartItems(
                [...cartItems, {...product, amount: 1}]
            );
        }
        console.log(cartItems);
    };

    // Sacar del carrito:
    const deleteItemToCart = (product) => {
        const inCart = cartItems.find(
            (productInCart) => productInCart.id === product.id
        );
        
        if(inCart.amount === 1) {
            setCartItems(
                cartItems.filter((productInCart) => productInCart.id !== product.id)
            );
        } else {
            setCartItems((productInCart) => {
                if(productInCart.id === product.id) {
                    return { ...inCart, amount: inCart.amount -1}
                } else {
                    return productInCart
                }
            })
        }
    };

    return(
        <CartContext.Provider 
            value={{
                    cartItems,
                    addItemToCart,
                    deleteItemToCart,
                  }}
            >
            { children }
        </CartContext.Provider>
    )
};