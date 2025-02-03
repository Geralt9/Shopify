import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Headsets from './Pages/Headsets.jsx';
import Keyboards from './Pages/Keyboards.jsx';
import Mouses from './Pages/Mouses.jsx';
import MyCart from './Pages/MyCart.jsx';

import { createBrowserRouter , RouterProvider  } from 'react-router-dom';


import Payment from './Payment.jsx';
import './app.css'

import { CartProvider } from './Pages/CartContext.jsx'


const router = createBrowserRouter([{

  path: '/Shopify',
  element: <Payment/>,

},
{
  path: '/Headsets',
  element: <Headsets/>,
},
{
  path: '/Keyboards',
  element: <Keyboards/> ,
},
{
  path: '/Mouses',
  element:<Mouses/> ,
},
{
  path: '/MyCart',
  element: <MyCart/>,
}

])


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <CartProvider>
  <RouterProvider router={router} basename="/Shopify" />
  </CartProvider>

  </StrictMode>,
)
