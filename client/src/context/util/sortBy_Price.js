import React from "react";
import { useExcursionsContext } from '../../context/ExcursionsContext';

export const SortBy_Price = ({children}) => {
    // const { allExcursions } = useExcursionsContext();

    // console.log("soy allExcursions !!!! >>> ", children);

  

    return(
        <div>
            {/* { allExcursions?.sort((a, b) => {
                                    if(a.rating < b.rating) {
                                        return value === 'low' ? -1 : 1;
                                    }
                                    if(a.rating > b.rating) {
                                        return value === 'top' ? -1 : 1;
                                    }
                                    return 0;
                                })} */}
        </div>
    )
}



















// return(
//     <div>
//         {/* <pre>{JSON.stringify(sortedExc, null, 2)}</pre> */}
//         {
//         let sortedExc = allExcursions?.sort((a, b) => {
//                 if(a.rating < b.rating) {
//                     return  'low' ? -1 : 1;
//                 }
//                 if(a.rating > b.rating) {
//                     return  'top' ? -1 : 1;
//                 }
//                 return 0;
//             })
//         }

//     </div>
// )
// }