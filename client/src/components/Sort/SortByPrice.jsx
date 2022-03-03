import React, { useState } from "react";
import { SortBy_Price } from '../../context/util/sortBy_Price';
import { useExcursionsContext } from '../../context/ExcursionsContext';

export default function SortByPrice() {
    const { allExcursions } = useExcursionsContext();

    console.log("soy EL allExcursions !!!! >>> ", allExcursions);

    
    
    // eslint-disable-next-line
    const [order, setOrder] = useState("");

    function handlePriceOrder(e) {
        e.preventDefault();
            { 
                allExcursions?.sort((a, b) => {
                if(a.price < b.price) {
                    return e.target.value === 'low' ? -1 : 1;
                }
                if(a.price > b.price) {
                    return e.target.value === 'top' ? -1 : 1;
                }
                return 0;
              })
            }
        // SortBy_Price(e.target.value);
        console.log(e.target.value);
        setOrder(e.target.value);
    };

    return (
        <div>
            <p><u>Order by:</u></p>
            <select name="sort-prices" id="s2" onChange={(e) => handlePriceOrder(e)} >
            <option value="intial">Price</option>
                <option value="low">Lower Price</option>
                <option value="top">Top Price</option>
            </select>
        </div>
    );
};