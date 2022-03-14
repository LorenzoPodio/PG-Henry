import React, { useState } from 'react';
import { useExcursionsContext } from "../../context/ExcursionsContext";
import axios from "axios";
import swal from 'sweetalert';

export default function SearchBar(props){
    const [query, setQuery] = useState('');
    // console.log(query, 'eesteeee')
    
    const { 
            data, setData, setExcursionFiltered,
                            } = useExcursionsContext();
        
// Feature Search by Query:
  const handleQuerySearched = () => {
    axios(`http://localhost:3001/getexcursion?name=${query}`)
    .then(resp => {
            return (setData(resp.data), setExcursionFiltered(resp.data), console.log(resp.data));      
      })
      .catch((e)=>
      { console.log(e,'esteeeee')
        axios(`http://localhost:3001/getexcursion?location=${query}`)
        .then(resp => {
                return (setData(resp.data), setExcursionFiltered(resp.data), console.log(resp.data));      
          }).catch((e) => 
          {swal({text:"No se encontraron datos con su busqueda",
                 icon: "error"
            });
            ;
            setData()})
      }
      )
   
  };

    const searchQueryHandler = () => {
        handleQuerySearched(query);
        };

    function handleInputChanges(e) {
        e.preventDefault();
        setQuery(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        if(!query?.length ){
            swal(
               { icon: "warning",
                text: "Ingrese un valor para realizar una busqueda"})
        } else {
            handleQuerySearched(query);
             e.target.reset()
        }
    };

    return <div  
            style={{margin:'2.5px 3.5px', border:'solid black 1.95px',borderRadius:'6px', padding:'5px 10px', width:'305px'}}
                >
            {
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input  style={{border:'solid black 1.8px',borderRadius:'8px', marginRight:'8px', paddingLeft:'4px'}}
                        type="text"   name="search"   pattern=".*\S.*"  
                        placeholder=" Ingrese un nombre..."
                        onChange={handleInputChanges}
                    />
                    <button     style={{margin:'5px 5px', border:'solid orange 1.6px',borderRadius:'4px' , padding:'1.5px 3.6px', }}
                        type="submit" 
                        onClick={searchQueryHandler}>
		                <span>Buscar</span>
                    </button>
                </form>
            }
        </div>
}