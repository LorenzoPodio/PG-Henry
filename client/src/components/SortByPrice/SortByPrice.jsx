import { useExcursionsContext } from "../../context/ExcursionsContext";

export default function SortByPrice() {
  const { handlePriceOrder , data } = useExcursionsContext();

  return (
    <div>
      <select name="sort-prices" id="s2" onChange={(e) => handlePriceOrder(e)} disabled={data === "Excursiones no encontradas"} className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="intial">Ordenar por precio</option>
        <option value="low">Menor - Mayor</option>
        <option value="top">Mayor - Menor</option>
      </select>
    </div>
  );
}

