import { useState , useRef } from "react"
import  './SearchBar.css' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { useCart } from "./CartContext";




export default function Search(){

    const {query , Setquery, InputRef} = useCart();

    return <>

                

            <label htmlFor='Search'  >  <FontAwesomeIcon icon={faMagnifyingGlass} className="Magnify" /> </label>
            <input className="SearchBar"  id="Search" type="text" placeholder="Type to search" ref={InputRef} onChange={ e => Setquery( e.target.value ) }  value={query}  /> 
          
          
    </>

}


