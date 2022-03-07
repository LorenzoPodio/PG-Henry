import React, { useState } from "react";
import { useExcursionsContext } from "../../context/ExcursionsContext";
import axios from "axios";

export default function SearchBar(props) {
  const [query, setQuery] = useState("");

  const { data, setData, setExcursionFiltered } = useExcursionsContext();

  // Feature Search by Query:
  const handleQuerySearched = () => {
    axios(`http://localhost:3001/getexcursion?name=${query}`)
      .then((resp) => {
        return setData(resp.data), setExcursionFiltered(resp.data);
      })
      .catch((e) =>
        alert("El nombre no coincide con una Excursión disponible!")
      );
  };

  const searchQueryHandler = () => {
    handleQuerySearched(query);
  };

  function handleInputChanges(e) {
    e.preventDefault();
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!query?.length) {
      alert("Nombre no encontrado...");
    } else {
      handleQuerySearched(query);
    }
  }

  return (
    <div
      style={{
        border: "solid black 1.95px",
        borderRadius: "3rem",
        padding: "5px 10px",
        width: "auto",
      }}
    >
      {
        <div style={{ display: "flex", flexDirection: "row" }}>
          <form onSubmit={(e) => handleSubmit(e)} style={{ display: "flex" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-9"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <input
              style={{
                border: "solid black 1.8px",
                borderRadius: "2rem 0rem 0rem 2rem",
                marginRight: "0px",
                paddingLeft: "4px",
              }}
              type="text"
              name="search"
              pattern=".*\S.*"
              placeholder=" Ingrese un nombre..."
              onChange={handleInputChanges}
            />

            <button
              style={{
                border: "solid orange 1.6px",
                borderRadius: "0rem 1rem 1rem 0rem",
                padding: "1.5px 1rem",
                backgroundColor: "orange",
              }}
              type="submit"
              onClick={searchQueryHandler}
            >
              <span style={{ fontWeight: "bold" }}>Buscar</span>
            </button>
          </form>
        </div>
      }
    </div>
  );
}
