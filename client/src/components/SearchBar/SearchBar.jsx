import React, { useState } from "react";
import { useExcursionsContext } from "../../context/ExcursionsContext";
import axios from "axios";
import swal from "sweetalert";

export default function SearchBar(props) {
  const [query, setQuery] = useState("");

  const { setData, setExcursionFiltered } = useExcursionsContext();

  // Feature Search by Query:
  const handleQuerySearched = () => {
    axios(`http://localhost:3001/getexcursion?name=${query}`)
      .then((resp) => {
        return (
          setData(resp.data),
          setExcursionFiltered(resp.data)
        );
      })
      .catch((e) => {
        axios(`http://localhost:3001/getexcursion?location=${query}`)
          .then((resp) => {
            return (
              setData(resp.data),
              setExcursionFiltered(resp.data)
            );
          })
          .catch((e) => {
            swal({
              text: "No se encontraron datos con su busqueda",
              icon: "error",
            });
            setData();
          });
      });
  };

  function handleInputChanges(e) {
    e.preventDefault();
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!query?.length) {
      swal({
        icon: "warning",
        text: "Ingrese un valor para realizar una busqueda",
      });
    } else {
      handleQuerySearched(query);
      e.target.reset();
    }
  }

  return (
    <div
      className="justify-self-end w-full md:w-3/5 lg:w-3/5 xl:w-3/5 mx-1 my-0 text-right"
    >
      {
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className="shadow-lg shadow-gray-400 hover:shadow-md hover:shadow-black text-center rounded-md h-9 mx-1 w-3/5"
            type="text"
            name="search"
            pattern=".*\S.*"
            placeholder=" Ingrese un nombre..."
            onChange={handleInputChanges}
          />
          <button
            className="bg-sky-500 text-white shadow-lg shadow-gray-400 hover:shadow-md hover:shadow-black font-bold rounded-md mt-1 px-4 py-1 h-8"
            type="submit"
          >
            <span>Buscar</span>
          </button>
        </form>
      }
    </div>
  );
}
