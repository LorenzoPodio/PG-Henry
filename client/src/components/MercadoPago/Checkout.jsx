import { useEffect } from "react";
import swal from "sweetalert";

export default function Checkout({ products, data }) {
  useEffect(() => {
    const script = document.createElement("script"); //Crea un elemento html script

    const attr_data_preference = document.createAttribute("data-preference-id"); //Crea un nodo atribute
    attr_data_preference.value = data.id; //Le asigna como valor el id que devuelve MP

    //Agrega atributos al elemento script
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.setAttributeNode(attr_data_preference);
    script.class =
      "px-4 py-2 rounded-md shadow-lg shadow-gray-500 hover:shadow-black text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500";
    script.setAttributeNode(attr_data_preference);

    //Agrega el script como nodo hijo del elemento form
    document.getElementById("form1").appendChild(script);
    return () => {
      //Este return cumple funcion de componentWillUnmount
      //Elimina el script como nodo hijo del elemento form
      document.getElementById("form1").removeChild(script);
    };
  }, [data]);
  const total = products.map((e) => e.totalPrice);
  const reduc = (accumulator, curr) => accumulator + curr;
  const totalbuy = total.reduce(reduc, 0);

  return (
    <div className="flex flex-col items-center relative">
      <form id="form1" className="w-fit">
        <div>
          <div className="">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-lg shadow-gray-500 sm:rounded-lg m-5">
                  <table className="min-w-full">
                    <thead className="bg-sky-600">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-white"
                        >
                          sus excursiones
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-white"
                        >
                          cantidad
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-white"
                        >
                          horario elegido
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-white "
                        >
                          precio
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {products?.map((producto, i) => {
                        return (
                          <tr
                            key={i}
                            className="border-b dark:bg-white-800 dark:border-white-700 bg-white"
                          >
                            <td className="py-4 px-6 text-sm font-medium text-white-900 whitespace-nowrap">
                              {producto.product.name}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-white-500 whitespace-nowrap">
                              {producto.quantity}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-white-500 whitespace-nowrap">
                              {producto.product.time} hs
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-white-500 whitespace-nowrap">
                              {"$ " + producto.price}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div
                    className="py-3 px-6 text-base font-medium tracking-wider text-center uppercase"
                    style={{ backgroundColor: "#D8D2CB" }}
                  >
                    {"Precio total a abonar: $" + totalbuy}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <button
      className="absolute bottom-2"
          onClick={() =>
            swal({
              title: "Instrucciones para la compra",
              text: "Debes realizar la compra desde una ventana de incognito o invitado. Guarda los siguientes datos, ya que los necesitaras para efectuar la compra... N° tarjeta: 4509 9535 6623 3704. CVC: 123. Vto: 11/25. Email: test_user_30825236@testuser.com. Password: qatest3960",
              icon: "warning",
            })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
    </div>
  );
}
