
import { Link,Outlet, useMatch, useResolvedPath } from "react-router-dom"

import {useState , useEffect} from "react"

import { loadStripe } from '@stripe/stripe-js';


import {Route , Router, Routes } from "react-router-dom"

import './MyCart.css'

import {useCart} from './CartContext.jsx'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';

export default function MyCart(){

            const{ Itemstate , SetItemState , Items, Remove, value, Confirm, ItemId, PopUp, SetPopUp, } =useCart() ;

                
          
    

 var taxes = value * 20/100 ;

 var Total = value + taxes;

 

    /*-------------------------------------------------Testing section------------------------------------------------------*/ 

     {/* const Show = async function(){
        try {
          

          const response =  await fetch( 'http://localhost:8000/api/CartItems' , {
             method: 'POST',
             headers: { 'Content-Type' : 'application/json' } ,
             body : JSON.stringify({ CartProds: Itemstate }),
          })
         

          if(response.ok){

            console.log("data sent successfully")

          }else{
            console.log('Error')
          }

    } catch (error) {
        console.error ;
    }
      }
    */}
    /*-------------------------------------------------------------------------------------------------------*/ 
   
     async function AcceptPayments(){
    try {
          const stripe = await loadStripe("pk_test_51QalBkGRFBRGJCgCXAjcV5qvO6C9oPzzkpIeWf0wCEIUsSsImBVhHXHcN6LvhpjwP15t9z0HTTYkTRjIM57O5kv000r3n3t4Ye")  

          const body ={
            CartProds: Itemstate, 
            Total : taxes
          }

          const response =  await fetch( 'http://localhost:8000/Api/MyCart' , {
             method: 'POST',
             headers: { 'Content-Type' : 'application/json' } ,
             body : JSON.stringify(body),
          })

    
         

    const session = await response.json() ;
    console.log(session)

    await stripe.redirectToCheckout({
      sessionId : session.id ,
    })

    if( !response.ok ){
      console.log('The request isnt completed')
  }
    if(!session.id){
      console.log('no session id received from the backend')
    }
  

  } catch (error) {
    console.error(error) ;
}

   }
   
  

    
    return <>

     {/*----------------------------------------The confirmation Pop-Up---------------------------------------------------------------*/} 

                                        { PopUp? <div className="PopUp" > 

                                          <div  className= { `${PopUp? 'Options' : 'Options_hidden' }` }  >   

                                            <div className="confirmaiton_text" > Removing the item from your cart ? </div>

                                          <div className="Confirmation_Boxes" > 

                                          
                                            <button   className="Confirm"  id="Final_Butt" onClick={ ()=> Remove(ItemId) } > Confirm </button>
                                            <button  className="Cancel"   id="Final_Butt" onClick={()=> SetPopUp(false) } > Cancel </button> 

                                          
                                          
                                          </div>

                                            </div>      

                                      </div> : <div className="FalsePop" > </div>   }


             <section className="header" > 
                            
                        <div className="Title" > <Link to={"/"}>  Shopify </Link> <FontAwesomeIcon icon={faCartShopping}  className="Cart_icon" /> </div>
            
                        <div className="Keyboard" id="header_item"  ><Link to={"/Keyboards"}> Keyboards </Link></div>
                        <div className="Mouse"  id="header_item" >  <Link to={"/Mouses"}> Mouses  </Link></div>
                        <div className="Headset"  id="header_item" > <Link to={"/Headsets"}> Headsets </Link></div>
            
                        <div className="Cart" id="header_item" ><Link to={"/MyCart"}> My cart </Link> </div>
            
                 </section>

                  

                     <section  className="Added_Prods"  >

                          <div className="Prods_Cont">         
                            {Itemstate.map(item=>(
                                      
                                          
                                      
                                          <div className="Products" key={item.id} > 

                                            <div className="Prod_Image" >  <img className="Img" src={item.image} />   </div>
                                            <div className="Prod_description" > {item.Description}  </div>
                                            <div className="Prod_price" > ${item.Price} </div>

                                            <div className="Availibility">  Stock :  &nbsp;<span style={{color:"#87D300"}} > {item.Stock} </span></div>  

                                                  <button className="Inspect" onClick={()=> Confirm(item) } > Remove </button>
                                                 
                                         

                                          </div>  
                                        
                                    
                            ))}   

                          </div>

                              

      

                           {Itemstate.some((element)=> element) ? <> <div className="Summary" > 
                                
                              <h2 className="SummaryTit">  Summary  </h2>
                              <hr/>

                                

                         <div className="Subtotal" > Subtotal : &nbsp;  <div className="RealP" > ${value.toFixed(2)} </div> </div>
                         <div className="Total"> Total :  &nbsp;   <div className="RealP"> ${ Total.toPrecision(5) } </div> </div>                                           
                         <div className="Taxes"> Taxes : &nbsp;  <div className="RealP"> ${taxes.toPrecision(4)}</div></div>     


                          <button className="Checkout"  onClick={AcceptPayments}  > Checkout </button>             

                              </div>

                            <div className="Cart_Title"> Cart({Itemstate.length}) <FontAwesomeIcon icon={faCartShopping}/> </div> </> : 
                           
                           <div className="NoItemsPage">  <FontAwesomeIcon icon={faCartShopping} className="EmptyCart"  /> &nbsp; No element Added yet </div> } 

                     </section>

           

    </>

}    