import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { useExcursionsContext } from "../../context/ExcursionsContext";

export function Profile() {
  const { submitData } = useExcursionsContext();
  const { user, dataUser, setDataUser, getDataUser } = useCartContext();
  const [completed, setCompleted] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  // eslint-disable-next-line
  const [currentOrders, setCurrentOrders] = useState([]);


  useEffect(() => {
    getDataUser();
    // eslint-disable-next-line
  }, [user]);
  useEffect(()=>{
    if (dataUser) {
      axios
        .get(
          `http://localhost:3001/cart/getcartuserid?email=${dataUser.email}&status=cancelled`
        )
        .then((resp) => setCancelled(() => resp.data));
      axios
        .get(
          `http://localhost:3001/cart/getcartuserid?email=${dataUser.email}&status=completed`
        )
        .then((resp) => setCompleted(() => resp.data));
      axios
        .get(
          `http://localhost:3001/cart/getcartuserid?email=${dataUser.email}`
        )
        .then((resp) => setCurrentOrders(() => resp.data));
    }
    // eslint-disable-next-line
  },[dataUser])
  const handleChange = (e) => {
    setDataUser((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const handleClick = () => {
    submitData(dataUser);
  };

  // const currentOrders = [];
  // // const cancelled = [];
  // // const completed = [];
  

  // eslint-disable-next-line
  // allOrders?.map((o) => {
  //   if (o?.user?.email === user?.email) {
  //     return currentOrders.push(o);
  //   }
  // });
  // // eslint-disable-next-line
  // currentOrders?.map((o) => {
  //   if (o.status === "completed") {
  //     return setCompleted((prevState) => {
  //       return [...prevState, o];
  //     });
  //   } else if (o.status === "cancelled") {
  //     return setCancelled((prevState) => {
  //       return [...prevState, o];
  //     });
  //   }
  // });


  return (
    <div className="grid place-content-center">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <img src={user?.picture} alt="" />
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.sub?.search("google") === -1
                  ? dataUser?.name + " " + dataUser?.lastName
                  : user?.name}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {dataUser?.email}
              </dd>
            </div>

            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Direccion</dt>
              <input
                className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                value={dataUser?.adress}
                name="adress"
                placeholder="Dirección"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">DNI</dt>
              <input
                className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                value={dataUser?.dni}
                name="dni"
                placeholder="Dni"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <button onClick={() => handleClick()}>Editar</button>
          </dl>
        </div>
      </div>
      <br />
      {/* {order section} */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Compras canceladas
          </h3>
        </div>
        {cancelled.length < 1 ? (
          <div className="text-lg leading-6 font-medium text-gray-900">
            No hay compras canceladas
          </div>
        ) : (
          <div className="border-t border-gray-200">
            <dl>
              {cancelled?.map((o, i) => (
                <div key={i}>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Orden</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {o.id}
                    </dd>
                    <dt className="text-sm font-medium text-gray-500">Fecha</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {o.date}
                    </dd>
                  </div>

                  {o?.products?.map((ods, i) => (
                    <div key={i}>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Excursion
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {ods?.name}
                        </dd>
                      </div>

                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Cantidad
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {ods?.order_detail?.quantity}
                        </dd>
                      </div>

                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Precio
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {ods?.order_detail?.price}
                        </dd>
                      </div>

                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Precio total de la excursion
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {ods?.order_detail?.totalPrice}
                        </dd>
                      </div>
                    </div>
                  ))}
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Precio total final
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {cancelled?.reduce((accumulator, curr) => 
                       accumulator + parseInt(curr.order_details[0].totalPrice),0
                    )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Compras completadas
          </h3>
        </div>
        {completed.length < 1 ? (
          <div className="text-lg leading-6 font-medium text-gray-900">
            <p>No hay compras completadas aun</p>
            <Link to="/excursiones">
              <button
                type="reset"
                className="
                inset-y-0 right-0 
                px-8
                py-6
                bg-blue-600
                text-white
                text-2xl
                text-xs
                leading-tight
                uppercase
                rounded
                shadow-md
                hover:bg-blue-700 hover:shadow-lg
                focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-blue-800 active:shadow-lg
                transition
                duration-150
                ease-in-out"
              >
                Comprar Excursiones
              </button>
            </Link>
          </div>
        ) : (
          <div className="border-t border-gray-200">
            <dl>
              {completed?.map((o, i) => (
                <div key={i}>
                 <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Orden</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {o.id}
                    </dd>     
                    <dt className="text-sm font-medium text-gray-500">Fecha</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {o.date}
                    </dd>
                  </div>

                  {o?.products?.map((ods, i) => (
                    <div key={i}>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Excursion
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {ods?.name}
                        </dd>
                      </div>

                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Cantidad
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {ods?.order_detail?.quantity}
                        </dd>
                      </div>

                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Precio
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {ods?.order_detail?.price}
                        </dd>
                      </div>

                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Precio total de la excursion
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {ods?.order_detail?.totalPrice}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          ------------------------
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          -------------------------------------------------------------
                        </dd>
                      </div>
                    </div>
                  ))}
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Precio total final
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {completed?.reduce((accumulator, curr) => 
                       accumulator + parseInt(curr.order_details[0].totalPrice),0
                    )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
