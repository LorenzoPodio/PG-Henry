// comp Cart.jsx

import { useCartContext } from "../../context/CartContext";
import { CartCard } from "./CartCard";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems } = useCartContext();
  console.log('CARTITEMS :>> ', cartItems);
  let cartTotalPrice = 0;

  cartItems?.forEach(e => {
    cartTotalPrice += (e.price * e.quantity)
  });

  return (
    <div className="flex flex-col">
      <div>
        {cartItems && typeof data !== "string" ? (
          <div className="max-h-96 overflow-y-auto">
            {cartItems?.map(e => {
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
          </div>
        ) : (
          <div>
            <div className="w-full lg:w-1/2">
              <img className="hidden lg:block" src="https://i.ibb.co/v30JLYr/Group-192-2.png" alt="" />
              <img className="hidden md:block lg:hidden" src="https://i.ibb.co/c1ggfn2/Group-193.png" alt="" />
              <img className="md:hidden" src="https://i.ibb.co/8gTVH2Y/Group-198.png" alt="" />
            </div>
            <div>
              <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800">
                No hay contenido para mostrar 😬{" "}
              </h1>
              <p className="py-4 text-base text-gray-800">
                Ponete en contacto con nosotros si pensas que deberíamos
                agregar un nuevo viaje
              </p>
              <p className="py-2 text-base text-gray-800">
                Podes probar cambiando los filtros nuevamente!
              </p>
              <button className="w-full lg:w-auto my-4 border rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                Escribinos!
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mt-2 text-center text-lg font-bold rounded-md bg-slate-900 text-white">
        <p>TOTAL DEL CARRITO: ${cartTotalPrice}</p>
      </div>
      <Link to="/checkout" className="text-center">
        <button className="px-4 py-2 my-2 rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600">
          Terminar compra
        </button>
      </Link>
    </div>
  );
}
export default Cart;
