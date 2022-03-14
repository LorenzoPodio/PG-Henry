import { useExcursionsContext } from "../../context/ExcursionsContext";

export default function SortByPrice() {
  const { handlePriceOrder , data } = useExcursionsContext();

  return (
    <div>
      <select name="sort-prices" id="s2" onChange={(e) => handlePriceOrder(e)} disabled={data === "Excursiones no encontradas"}>
        <option value="intial">Ordenar por precio</option>
        <option value="low">Menor - Mayor</option>
        <option value="top">Mayor - Menor</option>
      </select>
    </div>
  );
}

