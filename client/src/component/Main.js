import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//react toast
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GlobalContext } from '../GlobalContext'
import ProtectedRoute from '../middleware/ProtectedRoute'

import AdminDashboard from './Admin/AdminDashboard'
import AllUsers from './Admin/AllUsers'
import CreateProduct from './Admin/CreateProduct'
import OrderList from './Admin/OrderList'
import UpdateProduct from './Admin/UpdateProduct'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Cart from './Product/Cart'
import Checkout from './Product/Checkout'
import ProductDetails from './Product/ProductDetails'
import About from './Screens/About'
import Contact from './Screens/Contact'
import Home from './Screens/Home'
import Menu from './Screens/Menu'
import Order from './Screens/Order'
import Profile from './Screens/Profile'
import UserDashboard from './User/UserDashboard'
import Pnf from './Util/Pnf'



function Main(props) {
  const context = useContext(GlobalContext)

  const [isLogged, setIsLogged] = context.authApi.isLogged;
  const [isAdmin, setIsAdmin] = context.authApi.isAdmin;
  const [isUser, setIsUser] = context.authApi.isUser;
  return (
    <Router>
      <Menu/>
      <ToastContainer autoClose={1500} position='top-center' />
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/about'} element={<About/>}/>
        <Route path={'/contact'} element={<Contact/>}/>
        <Route path={'/login'} element={isLogged ? <Pnf/> :<Login/>}/>
        <Route path={'/register'} element={isLogged ? <Pnf/> :<Register/>}/>
        <Route path={'/user/dashboard'} element={
          <ProtectedRoute auth={isLogged}>
            <UserDashboard/>            
          </ProtectedRoute>
        }/>
        <Route path={'/admin/dashboard'} element={
          <ProtectedRoute auth={isLogged}>            
            <AdminDashboard/>
          </ProtectedRoute>
        }/>
        <Route path={'/admin/allOrders'} element={
          <ProtectedRoute auth={isLogged}>            
            <OrderList/>
          </ProtectedRoute>
        }/>
        <Route path={'/admin/allUsers'} element={
          <ProtectedRoute auth={isLogged}>            
            <AllUsers/>
          </ProtectedRoute>
        }/>
        <Route path={'/profile'} element={
          <ProtectedRoute auth={isLogged}>            
            <Profile/>
          </ProtectedRoute>
        }/>
        <Route path={'/orders'} element={
          <ProtectedRoute auth={isLogged}>            
            <Order/>
          </ProtectedRoute>
        }/>
         <Route path={`/product/details/:id`} element={
          <ProtectedRoute auth={isLogged}>            
            <ProductDetails/>
          </ProtectedRoute>
        }/>
        <Route path={`/product/create`} element={
          <ProtectedRoute auth={isLogged}>            
            <CreateProduct/>
          </ProtectedRoute>
        }/>
         <Route path={`/product/update/:id`} element={
          <ProtectedRoute auth={isLogged}>            
            <UpdateProduct/>
          </ProtectedRoute>
        }/>
         <Route path={`/product/cart`} element={
          <ProtectedRoute auth={isLogged}>            
            <Cart/>
          </ProtectedRoute>
        }/>
         <Route path={`/checkout`} element={
          <ProtectedRoute auth={isLogged}>            
            <Checkout/>
          </ProtectedRoute>
        }/>
        <Route path={`/*`} element={<Pnf/>}/>
      </Routes>
    </Router>
  )
}

export default Main
