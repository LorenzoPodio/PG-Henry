import { ArrowNarrowDownIcon } from "@heroicons/react/solid";
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
  useEffect(() => {
    if (dataUser) {
      axios
        .get(
          `/cart/getcartuserid?email=${dataUser.email}&status=cancelled`
        )
        .then((resp) => setCancelled(() => resp.data));
      axios
        .get(
          `/cart/getcartuserid?email=${dataUser.email}&status=completed`
        )
        .then((resp) => setCompleted(() => resp.data));
      axios
        .get(
          `/cart/getcartuserid?email=${dataUser.email}`
        )
        .then((resp) => setCurrentOrders(() => resp.data));
    }
    // eslint-disable-next-line
  }, [dataUser])
  const handleChange = (e) => {
    setDataUser((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const handleClick = () => {
    submitData(dataUser);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#D8D2CB' }}>
      <div className="flex justify-center text-center mx-auto py-9 w-full">
        <div className="w-72">
          <h1 className="grid rounded-md shadow-lg shadow-gray-500 px-3 py-3 text-white bg-sky-600 font-bold text-xl">
            TU PERFIL
          </h1>
        </div>
      </div>
      <div className="flex justify-around pb-8">
        <div className="shadow-lg shadow-gray-500 rounded-lg ml-10 h-fit w-1/3" style={{ backgroundColor: '#EEEEEE' }}>
          <div className="flex px-4 py-5 sm:px-6 items-center justify-center">
            <img src={user?.picture} alt="perfil" className="rounded-md" />
            <h3 className="text-3xl font-medium ml-4">
              {user?.sub?.search("google") === -1
                ? dataUser?.name + " " + dataUser?.lastName
                : user?.name}
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl className="text-center">
              <div className="bg-gray-50 px-4 py-5 flex sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-left w-36 text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 h-10 w-full sm:mt-0">
                  {dataUser?.email}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 flex sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-left w-36 text-gray-500">Direccion</dt>
                <input
                  className="shadow-lg hover:shadow-black shadow-gray-500 rounded-md h-10 w-full px-1"
                  value={dataUser?.adress}
                  name="adress"
                  placeholder="Dirección"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="bg-gray-50 px-4 py-5 flex sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-left w-36 text-gray-500">DNI</dt>
                <input
                  className="shadow-lg hover:shadow-black shadow-gray-500 rounded-md h-10 w-full px-1"
                  value={dataUser?.dni}
                  name="dni"
                  placeholder="Dni"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <button className="my-4 px-4 py-2 rounded-md shadow-lg hover:shadow-black shadow-gray-500 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={() => handleClick()}
              >
                Editar
              </button>
            </dl>
          </div>
        </div>
        <br />
        {/* {order section} */}
        <div className="shadow-lg shadow-gray-500 overflow-y-auto mx-7 rounded-lg w-1/3 h-fit" style={{ backgroundColor: '#EEEEEE' }}>
          <div className="text-center px-4 py-5 bg-sky-600 w-full">
            <h3 className="text-xl leading-6 font-semibold text-white">
              Compras canceladas
            </h3>
          </div>
          {cancelled.length < 1 ? (
            <div className="text-base py-3 text-center leading-6 font-medium text-gray-900">
              No hay compras canceladas
            </div>
          ) : (
            <div className="border-t border-gray-200">
              <dl>
                {cancelled?.map((o, i) => (
                  <div style={{ backgroundColor: '#EEEEEE' }} key={i}>
                    <div className="flex justify-evenly text-lg font-medium text-red-600" style={{ backgroundColor: '#D8D2CB' }}>
                      <ArrowNarrowDownIcon className="w-8 h-8"/> CANCELADO <ArrowNarrowDownIcon className="w-8 h-8"/>
                    </div>
                    <div className="px-4 py-2 flex sm:gap-4 sm:px-6">
                      <dt className="w-24 text-sm font-medium text-gray-500">Orden</dt>
                      <dd className="text-sm text-gray-900">
                        {o.id}
                      </dd>
                    </div>
                    <div className="px-4 py-2 flex sm:gap-4 sm:px-6">
                      <dt className="w-24 text-sm font-medium text-gray-500">Fecha</dt>
                      <dd className="text-sm text-gray-900">
                        {o.date}
                      </dd>
                    </div>
                    {o?.products?.map((ods, i) => (
                      <div className="bg-white" key={i}>
                      <div className="px-4 py-1 flex sm:gap-4 border-y border-gray-400 sm:px-6">
                        <dd className="text-base font-medium text-center w-full text-gray-500">
                          {ods?.name}
                        </dd>
                      </div>
                      <div className="px-4 py-2 flex sm:gap-4 sm:px-6">
                        <dt className="w-24 text-sm font-medium text-gray-500">
                          Dia
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {ods?.date.slice(1,11).split('-').reverse().join('/')}
                        </dd>
                      </div>
                      <div className="px-4 py-2 flex sm:gap-4 sm:px-6">
                        <dt className="w-24 text-sm font-medium text-gray-500">
                          Hora
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {ods?.time}
                        </dd>
                      </div>
                      <div className="px-4 py-2 flex sm:gap-4 sm:px-6">
                        <dt className="w-24 text-sm font-medium text-gray-500">
                          Personas
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {ods?.order_detail?.quantity}
                        </dd>
                      </div>
                      <div className="px-4 py-2 flex sm:gap-4 sm:px-6">
                        <dt className="w-24 text-sm font-medium text-gray-500">
                          Precio
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {ods?.order_detail?.price}
                        </dd>
                      </div>
                      <div className="px-4 pt-2 flex sm:gap-4 sm:px-6">
                        <dt className="w-24 text-sm font-medium text-gray-500">
                          Subtotal
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {ods?.order_detail?.totalPrice}
                        </dd>
                      </div>
                    </div>
                    ))}
                    <div className="px-4 py-3 border-b border-b-gray-400 flex justify-center text-red-600 uppercase font-medium sm:gap-4 sm:px-6" style={{ backgroundColor: '#D8D2CB' }}>
                      <dt>
                        Precio total
                      </dt>
                      <dd>
                      ${o?.products.reduce((accumulator, curr) =>
                          accumulator + parseInt(curr.order_detail.totalPrice), 0
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
        <div className="shadow-lg shadow-gray-500 overflow-y-auto h-fit mr-10 rounded-lg w-1/3" style={{ backgroundColor: '#EEEEEE' }}>
          <div className="text-center px-4 py-5 bg-sky-600 w-full">
            <h3 className="text-xl leading-6 font-semibold text-white">
              Compras completadas
            </h3>
          </div>
          {completed.length < 1 ? (
            <div className="text-lg text-center leading-6 font-medium text-gray-900">
              <div className="text-base py-3 text-center leading-6 font-medium text-gray-900">
                No hay compras completadas aun
              </div>
              <Link to="/excursiones">
                <button
                  type="reset"
                  className="mb-5 px-8 py-6 bg-green-600 text-white text-2xl leading-tight uppercase rounded-md shadow-lg 
                  hover:bg-green-700 focus:bg-blue-700 focus:outline-none focus:ring-0 shadow-gray-500 hover:shadow-black"
                >
                  Comprar Excursiones
                </button>
              </Link>
            </div>
          ) : (
            <div className="border-t border-gray-200">
              <dl>
                {completed?.map((o, i) => (
                  <div style={{ backgroundColor: '#EEEEEE' }} key={i}>
                    <div className="flex justify-evenly text-lg font-medium text-green-600" style={{ backgroundColor: '#D8D2CB' }}>
                      <ArrowNarrowDownIcon className="w-8 h-8"/> COMPRADO <ArrowNarrowDownIcon className="w-8 h-8"/>
                    </div>
                    <div className="px-4 py-2 flex sm:gap-4 sm:px-6">
                      <dt className="w-24 text-sm font-medium text-gray-500">Orden</dt>
                      <dd className="text-sm text-gray-900">
                        {o.id}
                      </dd>
                    </div>
                    <div className="px-4 py-2 flex sm:gap-4 sm:px-6">
                      <dt className="w-24 text-sm font-medium text-gray-500">Fecha</dt>
                      <dd className="text-sm text-gray-900">
                        {o.date}
                      </dd>
                    </div>
                    {o?.products?.map((ods, i) => (
                      <div className="bg-white" key={i}>
                        <div className="px-4 py-1 flex sm:gap-4 border-y border-gray-400 sm:px-6">
                          <dd className="text-base font-medium text-center w-full text-gray-500">
                            {ods?.name}
                          </dd>
                        </div>
                        <div className="px-4 py-2 flex sm:gap-4 sm:px-6">
                          <dt className="w-24 text-sm font-medium text-gray-500">
                            Dia
                          </dt>
                          <dd className="text-sm text-gray-900">
                            {ods?.date.slice(1,11).split('-').reverse().join('/')}
                          </dd>
                        </div>
                        <div className="px-4 py-2 flex sm:gap-4 sm:px-6">
                          <dt className="w-24 text-sm font-medium text-gray-500">
                            Hora
                          </dt>
                          <dd className="text-sm text-gray-900">
                            {ods?.time}
                          </dd>
                        </div>
                        <div className="px-4 py-2 flex sm:gap-4 sm:px-6">
                          <dt className="w-24 text-sm font-medium text-gray-500">
                            Personas
                          </dt>
                          <dd className="text-sm text-gray-900">
                            {ods?.order_detail?.quantity}
                          </dd>
                        </div>
                        <div className="px-4 py-2 flex sm:gap-4 sm:px-6">
                          <dt className="w-24 text-sm font-medium text-gray-500">
                            Precio
                          </dt>
                          <dd className="text-sm text-gray-900">
                            {ods?.order_detail?.price}
                          </dd>
                        </div>
                        <div className="px-4 pt-2 flex sm:gap-4 sm:px-6">
                          <dt className="w-24 text-sm font-medium text-gray-500">
                            Subtotal
                          </dt>
                          <dd className="text-sm text-gray-900">
                            {ods?.order_detail?.totalPrice}
                          </dd>
                        </div>
                      </div>
                    ))}
                    <div className="px-4 py-3 border-b border-b-gray-400 flex justify-center text-green-600 uppercase font-medium sm:gap-4 sm:px-6" style={{ backgroundColor: '#D8D2CB' }}>
                      <dt>
                        Precio total
                      </dt>
                      <dd>
                        ${o?.products.reduce((accumulator, curr) =>
                          accumulator + parseInt(curr.order_detail.totalPrice), 0
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
    </div>
  );
}
