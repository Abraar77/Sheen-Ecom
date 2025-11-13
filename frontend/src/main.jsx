import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import AdminRoute from './pages/admin/AdminRoute.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Profile from './pages/User/Profile.jsx';
import UserList from './pages/admin/userList.jsx';
import CategoryList from './pages/admin/CategoryList.jsx';
import ProductList from './pages/admin/ProductList.jsx';
import ProductUpdate from './pages/admin/ProductUpdate.jsx';
import AllProducts from './pages/admin/AllProducts.jsx';
import Home from "./pages/Home"
import Favorites from './pages/Products/Favorites.jsx';
import ProductDetails from './pages/Products/ProductDetails.jsx';
import Cart from './pages/Cart';
import Shop from './pages/Shop.jsx';
import Shipping from './pages/orders/Shipping.jsx';
import PlaceOrder from './pages/orders/PlaceOrder.jsx';
import {PayPalScriptProvider} from "@paypal/react-paypal-js"
import Order from './pages/orders/Order.jsx';
import UserOrder from './pages/User/UserOrder.jsx';
import OrderList from './pages/admin/OrderList.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import SearchProduct from './pages/Products/SearchProduct.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/favorites' element={<Favorites/>}/>
      <Route path='/product/:id' element={<ProductDetails/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='search' element={<SearchProduct/>}/>
      <Route path='/user-orders' element={<UserOrder/>}/>

      <Route path='/' element={<Home/>}/>
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/shipping' element= {<Shipping/>}/>
        <Route path='/placeorder' element= {<PlaceOrder/>}/>
        <Route path='/order/:id' element= {<Order/>}/>
      </Route>

        <Route path='/admin' element= {<AdminRoute/>}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProducts />} />
      
        <Route path="orderlist" element={<OrderList />} />
        <Route path="productlist/:pageNumber" element={<ProductList />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PayPalScriptProvider>
    <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
)
