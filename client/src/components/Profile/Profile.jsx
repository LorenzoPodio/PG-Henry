import React, { useEffect } from "react";
import { useCartContext } from "../../context/CartContext";
import { useExcursionsContext } from "../../context/ExcursionsContext";

export function Profile() {
  const { allOrders, allExcursions } = useExcursionsContext();
  const { user, dataUser, getDataUser } = useCartContext();

  useEffect(()=> {
    getDataUser()
    // eslint-disable-next-line
  }, [])
  

  const currentOrders = [];
  const cancelled = [];
  const completed = [];
  let totalPurchase = 0;

  // eslint-disable-next-line
  allOrders?.map((o) => {
    if (o?.user?.email === user?.email) {
      return currentOrders.push(o);
    }
  });
  // eslint-disable-next-line
  currentOrders?.map((o) => {
    if (o.status === "completed") {
      return completed.push(o);
    } else if (o.status === "cancelled") {
      return cancelled.push(o);
    }
  });

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
                {user?.email}
              </dd>
            </div>

            {dataUser?.adress && dataUser?.dni ? (
              <>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Direccion
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.adress}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">DNI</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.dni}
                  </dd>
                </div>
              </>
            ) : (
              <></>
            )}
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

                {o?.order_details?.map((ods, i) => (
                  <div key={i}>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Excursion
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {allExcursions[ods?.productId]?.name}
                      </dd>
                    </div>

                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Cantidad
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {ods.quantity}
                      </dd>
                    </div>

                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Precio
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {ods.price}
                      </dd>
                    </div>

                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Precio total de la excursion
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {ods.totalPrice}
                      </dd>
                    </div>
                  </div>
                ))}
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Precio total final
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentOrders?.map((o) => {
                      return o.order_details.forEach(
                        (od) => (totalPurchase += od.totalPrice)
                      );
                    })}
                    {totalPurchase}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Compras completadas
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            {completed?.map((o, i) => (
              <div key={i}>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Orden</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {o.id}
                  </dd>
                </div>

                {o?.order_details?.map((ods, i) => (
                  <div key={i}>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Excursion
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {allExcursions[ods?.productId]?.name}
                      </dd>
                    </div>

                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Cantidad
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {ods.quantity}
                      </dd>
                    </div>

                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Precio
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {ods.price}
                      </dd>
                    </div>

                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Precio total de la excursion
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {ods.totalPrice}
                      </dd>
                    </div>
                  </div>
                ))}
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Precio total final
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentOrders?.map((o) => {
                      return o.order_details.forEach(
                        (od) => (totalPurchase += od.totalPrice)
                      );
                    })}
                    {totalPurchase}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
