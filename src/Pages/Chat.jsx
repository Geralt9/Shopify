import { Link,Outlet, useMatch, useResolvedPath } from "react-router-dom"
import {useState , useEffect, useRef} from "react"


import {Route , Router, Routes } from "react-router-dom"
import {io} from 'socket.io-client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping, faCircleCheck, faPaperPlane} from '@fortawesome/free-solid-svg-icons';

import './Chat.css' 


import {useCart} from './CartContext.jsx'


export default function Chat(){

    const{Socket, ChatInput,messages,Setmessages,Handlesubmit, input , Setinput,messagesREf,HandleKeypress, Socket2, ChatInput2, input2, Setinput2 } =useCart() ;

   Socket;

    

      return <>
  {/*---------------------------------------------------User1 / Client----------------------------------------------------------------*/} 

        <div className="Chat_box" >  

            <div className="Chat_Title" > You are chatting currently with Tarik </div>

   <div className="Messages_box" >


             {messages.map( (elements , index) =>(

              <div  className= {elements.to == 'User1' ? 'Received' : 'Sent'} key={index}>

                {elements.message}
                
              </div>

             ))}  

 </div>             
                       
                 

            <form className="Chat_form" onSubmit={Handlesubmit} >
                    <textarea  className="Text_box" id="box"  type="text"  ref={ChatInput}  onChange={e => Setinput(e.target.value) }  onKeyDown={HandleKeypress} value={input}  placeholder="Click to send a message"  />
                    <button className="Send_message" onClick={ Handlesubmit} > <FontAwesomeIcon icon={faPaperPlane} />  </button>
            </form>

        </div>

             {/*---------------------------------------------------User2 / Dashboard----------------------------------------------------------------*/} 

         <div className="Chat_box2" >  

            <div className="Chat_Title" > You are chatting currently with a client </div>

   <div className="Messages_box" >


             {messages.map( (elements , index) =>(

              <div  className= {elements.to == 'User1' ? 'Sent' : 'Received'}  key={index}>

                {elements.message}
                
              </div>

             ))}  

 </div>             
                       
                 

            <form className="Chat_form" onSubmit={Handlesubmit} >
                    <textarea  className="Text_box" id="box"  type="text"  ref={ChatInput2}  onChange={e => Setinput2(e.target.value) }  onKeyDown={HandleKeypress} value={input2}  placeholder="Click to send a message"  />
                    <button className="Send_message" onClick={ Handlesubmit} > <FontAwesomeIcon icon={faPaperPlane} /> </button>
            </form>

        </div>

    </>

}

