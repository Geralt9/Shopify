import { Link,Outlet, useMatch, useResolvedPath } from "react-router-dom"

import {useCart} from './CartContext.jsx'

import {useState , useEffect, createContext} from "react"


import {Route , Router, Routes } from "react-router-dom"

import './Keyboards.css'

import MyCart from './MyCart.jsx'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping, faCircleCheck} from '@fortawesome/free-solid-svg-icons';

import SearchBar from './SearchBar.jsx'


export default function Keyboards(){

 {/*   const [Itemstate, SetItemState] = useState([]) */}
        const {Itemstate, Submit, Items,FilteredItems, Confirmed}  = useCart();
     
    {/* function Submit(id){

            if(!Itemstate.includes(id)){
                SetItemState([...Itemstate, id])
            }

        }*/}
       
     
     

    return <>

            {Confirmed ? <div className= "Successful" > Successful &nbsp; <FontAwesomeIcon icon={faCircleCheck} /> </div> : <div className="unPoped"></div> }

         <section className="header"  > 
                        
                    <div className="Title" > <Link to={"/Shopify"}>  Shopify </Link> <FontAwesomeIcon icon={faCartShopping}  className="Cart_icon" /> </div>
        
                    <div className="Keyboard" id="header_item"  ><Link to={"/Keyboards"}> Keyboards </Link></div>
                    <div className="Mouse"  id="header_item" >  <Link to={"/Mouses"}> Mouses  </Link></div>
                    <div className="Headset"  id="header_item" > <Link to={"/Headsets"}> Headsets </Link></div>
        
                    <div className="Cart" id="header_item" ><Link to={"/MyCart"}> My cart  </Link> </div>
        
             </section>

            <section className="Search_Section" > 
                
                <SearchBar></SearchBar>

            </section>

            <div className="Title_Keyboard" > Keyboards : </div>

        <section className="Products_Container"   > 

        {FilteredItems.map ( item=>(
            <div className="Board1" id="Keyboard" key={item.id} > 

                <div className="Im1Cont"  >  <img className="image1" id="Image" src={item.image}   />  </div>
                <div className="Description"  > {item.Description} </div> 
                <div className="Price" > <div className='miniPrice' > ${item.Price} </div> &nbsp; <s> {item.Discount} </s>  <div className="Sale"> {item.Promotion}  </div> </div>
        
             {/* --------------------------------Submit butts--------------------------------------------- */} 

                <button className="Add" onClick={ ()=>Submit(item)  }    > Add to cart </button>
                <button className="Review" > Review Product </button> 

            </div> 
     
         ))}    

         

            </section>

       


              

    </>

}    