// comp Cart.jsx

import { useCartContext } from "../../context/CartContext";
import { CartCard } from "./CartCard";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems } = useCartContext();
  console.log("CARTITEMS :>> ", cartItems);
  let cartTotalPrice = 0;

  cartItems?.forEach((e) => {
    cartTotalPrice += e.price * e.quantity;
  });

  return (
    <div className="flex flex-col">
      <div>
        {cartItems.length > 0 ? (
          <div className="max-h-96 overflow-y-auto">
            {cartItems?.map((e) => {
              return (
                <CartCard
                  key={e.detailId}
                  detailId={e.detailId}
                  orderId={e.orderId}
                  name={e.product.name}
                  images={e.product.Images}
                  time={e.product.time}
                  date={e.product.date}
                  price={e.price}
                  quantity={e.quantity}
                />
              );
            })}
            <div className="mt-2 text-center text-lg font-bold rounded-md bg-slate-900 text-white">
              <p>TOTAL DEL CARRITO: ${cartTotalPrice}</p>
            </div>
            <Link to="/checkout" className="text-center">
              <button className="px-4 py-2 my-2 rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600">
                Terminar compra
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex px-2 py-1 content-center justify-evenly border border-black bg-slate-200 sm:grid-rows-3">
            <p className="mt-2 text-center text-lg font-bold rounded-md max-h-96 overflow-y-auto text-black">
              Tu carrito está vacío ¿No sabés a dónde ir? ¡Elegí un destino!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Cart;
