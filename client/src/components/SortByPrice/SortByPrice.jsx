import { useExcursionsContext } from "../../context/ExcursionsContext";

export default function SortByPrice() {
  const { handlePriceOrder , data } = useExcursionsContext();

  return (
    <div className="mx-1 my-2" >
      <select className="shadow-lg shadow-gray-400 w-full hover:bg-sky-500 hover:text-white hover:shadow-md hover:shadow-black mx-1 text-center text-sm font-semibold rounded-md h-9" 
        name="sort-prices" id="s2" onChange={(e) => handlePriceOrder(e)} disabled={data === "Excursiones no encontradas"} 
      >
        <option value="intial">Ordenar por precio</option>
        <option value="low">Menor - Mayor</option>
        <option value="top">Mayor - Menor</option>
      </select>
    </div>
  );
}

