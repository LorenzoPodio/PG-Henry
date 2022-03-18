import { useEffect } from "react";

export default function Checkout({ products, data }) {
  useEffect(() => {
    const script = document.createElement("script"); //Crea un elemento html script

    const attr_data_preference = document.createAttribute("data-preference-id"); //Crea un nodo atribute
    attr_data_preference.value = data.id; //Le asigna como valor el id que devuelve MP

    //Agrega atributos al elemento script
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
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
    <div className="flex justify-around">
      <form id="form1">
        <div>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-md sm:rounded-lg">
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
                      {products?.map((producto,i) => {
                        return(
                      <tr key={i} className="bg-white border-b dark:bg-white-800 dark:border-white-700 bg-sky-400">
                        <td className="py-4 px-6 text-sm font-medium text-white-900 whitespace-nowrap dark:text-white bg-sky-400">
                        {producto.product.name}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-white-500 whitespace-nowrap dark:text-white-400 bg-sky-400">
                        {producto.quantity} 
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-white-500 whitespace-nowrap dark:text-white-400 bg-sky-400">
                          {producto.product.time} hs
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-white-500 whitespace-nowrap dark:text-white-400 bg-sky-400">
                        {"$ " + producto.price}
                        </td>                      
                      </tr>
                      )})}
                    </tbody>
                  </table>
                    <div className="py-3 px-6 text-xs font-medium tracking-wider text-rigth text-gray-700 uppercase dark:text-black-400">{"Precio a abonar total: $" + totalbuy}</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </form>
    </div>
  );
}
