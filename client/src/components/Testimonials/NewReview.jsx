import React, { useState } from "react";
import swal from "sweetalert";
import { useExcursionsContext } from "../../context/ExcursionsContext";
import { useCartContext } from "../../context/CartContext";
import "./NewReview.css";

const star = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

function NewReview({ id }) {
  const { user } = useCartContext();
  const { addReview } = useExcursionsContext();
  const [input, setInput] = useState({
    rating: 1,
    description: "",
    email: user?.email,
  });

  function handleChange(e) {
    e.preventDefault(e);
    setInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleSubmit(e) {
    if (!input.description) {
      e.preventDefault();
      swal({
        title: "Complete todos los campos",
        icon: "error",
      });
    } else {
      e.preventDefault();
      addReview(id, input);
      setInput({
        description: "",
      });
    }
  }

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md w-96 ">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group mb-6">
          <h1>Puntuación</h1>
          <div
            className="flex flex-row-reverse w-full justify-center items-center pt-6"
            onChange={(e) => handleChange(e)}
          >
            <input id="radio1" type="radio" name="rating" value="5" />
            <label htmlFor="radio1">{star}</label>
            <input id="radio2" type="radio" name="rating" value="4" />
            <label htmlFor="radio2">{star}</label>
            <input id="radio3" type="radio" name="rating" value="3" />
            <label htmlFor="radio3">{star}</label>
            <input id="radio4" type="radio" name="rating" value="2" />
            <label htmlFor="radio4">{star}</label>
            <input id="radio5" type="radio" name="rating" value="1" />
            <label htmlFor="radio5">{star}</label>
          </div>
        </div>
        <div className="mb-4">
          <h1 className="py-4">Tu opinión:</h1>
          <textarea
            className="
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
            id="description"
            name="description"
            rows="3"
            placeholder="Contá tu experiencia"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button
          type="submit"
          className="
          w-full
          px-6
          py-2.5
          bg-blue-600
      text-white
      font-medium
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
          Enviar
        </button>
      </form>
    </div>
  );
}
export default NewReview;
