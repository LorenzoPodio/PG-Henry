// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Checkout from "../"

export default function Payment({ handleClick }) {
//   const [data, setData] = useState(""); //Estado para setear la respuesta de mercado pago

//   //  IMPLEMENTACION DE MP
//   useEffect(() => {
//     axios
//       .post("http://localhost:3001/mercadopago")
//       .then((data) => {
//         setData(data.data);
//         console.info("Contenido de data:", data);
//       })
//       .catch((err) => console.error(err));
//   }, []);
//   //Products ---> Serian los productos que estan en la tabla Order relacionadas al usuario.
//   const products = [
//     { title: "Producto 1", quantity: 5, price: 10.52 },
//     { title: "Producto 2", quantity: 15, price: 100.52 },
//     { title: "Producto 3", quantity: 6, price: 200 },
//   ];
//   ////////////////////

  return (
    <div>
      <div>
        Pequeño Cart con excursion su cantidad y precio, y el precio total +
        boton de volver al step 1
        <button onClick={() => handleClick("PersonalDetails")}>
          Modificar datos personales
        </button>
      </div>
      Checkout para pagar, aca va mercado pago!
      {/* <Checkout /> */}
    </div>
  );
}
