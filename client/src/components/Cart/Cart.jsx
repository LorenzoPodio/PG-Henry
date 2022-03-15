// comp Cart.jsx

import { useCartContext } from "../../context/CartContext";
import { CartCard } from "./CartCard";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems } = useCartContext();

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          {cartItems && typeof data !== "string" ? (
            cartItems?.map((e, i) => {
              return (
                <CartCard
                  // id={e.id}
                  key={i}
                  name={e.name}
                  // images={e.Images}
                  // location={e.location}
                  date={e.date}
                  price={e.order_detail.price + `*` + e.order_detail.quantity + ` = ` +e.order_detail.price * e.order_detail.quantity}
                  quantity={e.quantity}
                  // excursionType={e.excursionType}
                />
              );
            })
          ) : (
            <div>
              <div className="w-full lg:w-1/2">
                <img
                  className="hidden lg:block"
                  src="https://i.ibb.co/v30JLYr/Group-192-2.png"
                  alt=""
                />
                <img
                  className="hidden md:block lg:hidden"
                  src="https://i.ibb.co/c1ggfn2/Group-193.png"
                  alt=""
                />
                <img
                  className="md:hidden"
                  src="https://i.ibb.co/8gTVH2Y/Group-198.png"
                  alt=""
                />
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
      </div>
      <Link to="/checkout">
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-400 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Terminar compra
        </button>
      </Link>
    </div>
  );
}
export default Cart;
