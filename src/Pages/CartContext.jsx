import {useState , useEffect, createContext, useContext, Children, useRef, useCallback  } from "react"



import {Items} from './Items.js'
import {Mouses} from './Items.js'
import { Headsets } from "./Items.js";

import {io} from 'socket.io-client'
import Chat from "./Chat.jsx";


const CartContext = createContext();


export const  CartProvider = ({children})=>{
    
    const [Itemstate, SetItemState] = useState([]) ;
    

    const[ ItemId , SetId ] = useState() ;
    const [PopUp , SetPopUp] = useState(false) ;   
    const [Confirmed, SetConfirmed] = useState(false);

   //-----------Search Logic--------------------------------- 

    const [query , Setquery] = useState("")
    const InputRef = useRef()

    const FilteredItems = Items.filter(item =>
        item.Description.toLowerCase().includes(query.toLowerCase())
    );

    const FilteredMouses = Mouses.filter(item => 
        item.Description.toLowerCase().includes(query.toLowerCase())
    )
    const FilteredHeadsets = Headsets.filter(item => 
        item.Description.toLowerCase().includes(query.toLowerCase())
    )


    
   //--------------The confirmed Pop-Up

   const Timeref = useRef(null);

   //--------------

    function Confirm(id){

        SetPopUp(true);
        SetId(id);
       
    }  

//Add Products Button ---------------


/*useEffect( ()=>{
} ,[Confirmed] )*/






    function Submit(item){

        SetConfirmed(true)

        if(  !Itemstate.includes(item) ){
            
            SetItemState([...Itemstate, item])

        } 

        Timeref.current = setTimeout( ()=>{

            SetConfirmed(false);
            
            return  clearTimeout(Timeref.current);
        
        } , 1000)
        console.log(Itemstate)
    }


    function Remove(item){
        
      if( Itemstate.includes(item)  ){

     SetItemState( Itemstate.filter(element => element!== item ))
    
     SetPopUp(false);
     
}       
        
    }

    
    let value = 0 ;

    Itemstate.map( Prices =>(

        value += parseFloat( Prices.Price )
        
    ))


    //--------------------------------------------------The Chat code----------------------------------------------------------------//

    const [Socket , setSocket] = useState('');
    const [Socket2 , setSocket2] = useState('');


    const [ input , Setinput] = useState('') ;   
    const [input2 , Setinput2] = useState('');

    const messageData = { to: 'User2' ,
        message: input }
    const messageData2 = {to: 'User1',
        message :input2        
    }
    const [messages , Setmessages] = useState([]); // messages array
    

   
    
    const ChatInput = useRef([]) ;
    const ChatInput2 = useRef([]) ;
    

            //Receiving messages-----------------User1

    useEffect(()=>{

        const ioUrl = io('https://server-vercel-deployment.vercel.app/')
        const ioUrl2 =  io('https://server-vercel-deployment.vercel.app/')

        setSocket( ioUrl );
        setSocket2(ioUrl2);
      
        const userID = 'User1' ;
        const userID2 = 'User2' ;    

        ioUrl.emit('register' , userID  );
        ioUrl2.emit('register' , userID2 );

        

        return () => {
            ioUrl.disconnect(); 
            ioUrl2.disconnect();
          };
    }, [])

            //sending messages -------------------

   
           
                

    const messagesREf = useRef([messageData]) ;   
    const messagesREf2 = useRef([messageData2]);

 function Handlesubmit(e){
    if (e) e.preventDefault();
   
            if(Socket && input.trim()) {
            

                      //  messagesREf.current = [...messagesREf.current , messageData ]
                        
                        
                 Setmessages( data=>{

                   return  [...data, messageData]
                 }) 

                    console.log(messages) ; 

                  Socket.emit( 'direct_message', messageData ) ;

                  Setinput('')    
                  
            }else if(Socket2 && input2.trim()) {
                
    
               // messagesREf2.current = [...messagesREf2.current , messageData2]
                     
                      
               Setmessages( data =>{
                 return [...data, messageData2]
               }) 

               console.log(messages)

                Socket.emit( 'direct_message', messageData2 ) ;

                Setinput2('')    
                
          }
            else{
                return console.log('something s not right')
            }
            
        
    }

    

    

    function HandleKeypress(e){

                if(e.key === 'Enter' ){
                    if(e.shiftKey){
                        e.preventDefault()
                        Setinput(Prev=>{

                                return Prev + "\n"; })

                               
                    }else {
                        e.preventDefault()
                        Handlesubmit();
                        
                    }
                }
    }



    //-------------------------------------------------------------------------------------------------------------------------------//




    return (
        <CartContext.Provider value={{Submit , Itemstate , SetItemState , Items, Remove, value, Confirm, ItemId, PopUp, SetPopUp, query, Setquery, InputRef,FilteredItems, Confirmed, Mouses, FilteredMouses, Headsets, FilteredHeadsets,
         Socket,ChatInput,messages,Setmessages, Handlesubmit, input , Setinput, messagesREf,HandleKeypress, Socket2, ChatInput2, input2, Setinput2
         }} >
            {children}
        </CartContext.Provider>
    )

}

export const useCart = ()=> useContext(CartContext)  ;

