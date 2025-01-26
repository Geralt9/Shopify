import {useState , useEffect, useContext } from "react"
import './app.css' ;
import {Route , Router, Routes } from "react-router-dom"
import { Link,Outlet, useMatch, useResolvedPath } from "react-router-dom"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import SearchBar from './Pages/SearchBar'

import Chat from './Pages/Chat.jsx'

export default function Payment(){

    return <>
    
    <section className="header" > 
                
            <div className="Title" > <Link to={"/"}>  Shopify </Link> <FontAwesomeIcon icon={faCartShopping}  className="Cart_icon" /> </div>

            <div className="Keyboard" id="header_item"  ><Link  to={"/Keyboards"}> Keyboards </Link></div>
            <div className="Mouse"  id="header_item" >  <Link to={"/Mouses"}> Mouses  </Link></div>
            <div className="Headset"  id="header_item" > <Link to={"/Headsets"}> Headsets </Link></div>

            <div className="Cart" id="header_item" ><Link> My cart  </Link> </div>

     </section>


        

     <Outlet/>

        <section className="Chat_Section" > 
            
                   <Chat></Chat> 

         </section>


    </>
}

