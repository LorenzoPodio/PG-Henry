import { useEffect } from "react";

export default function Comprar({ products, data }) {
  useEffect(() => {
    const script = document.createElement("script"); //Crea un elemento html script

    const attr_data_preference = document.createAttribute("data-preference-id"); //Crea un nodo atribute
    attr_data_preference.value = data.id; //Le asigna como valor el id que devuelve MP

    //Agrega atributos al elemento script
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.setAttributeNode(attr_data_preference);

    console.log(data);

    //Agrega el script como nodo hijo del elemento form
    document.getElementById("form1").appendChild(script);
    return () => { //Este return cumple funcion de componentWillUnmount
      //Elimina el script como nodo hijo del elemento form
      document.getElementById("form1").removeChild(script);
    };
  }, [data]);
  return (
    <div>
      <form id="form1">
        <h4>Checkout</h4>
        <div>
          {products?.map((producto, i) => {
            return (
              <div>
                <ul>
                  <li>{producto.title}</li>
                  <li>{"$" + producto.price}</li>
                  <li>{producto.quantity}</li>
                </ul>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
}
