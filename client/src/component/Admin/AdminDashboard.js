import axios from 'axios';
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import {GlobalContext} from '../../GlobalContext'

function AdminDashboard() {
  const data = useContext(GlobalContext);
  const [products] = data.productApi.products;
  const [allUsers] = data.authApi.allUsers

 
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className='display-3'>Admin Dashboard</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header text-center">
                <h1 className="text-secondary">Total Products</h1>
              </div>
              <div className='card-body'>
                <h1 className='text-center'>{products.length}</h1>
              </div>
              <div className="card-footer">
                <NavLink to={`/product/create`} className={'btn btn-outline-success'}>Add Product</NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header text-center">
                <h1 className="text-secondary">Total Users</h1>
              </div>
              <div className='card-body'>
                <h1 className='text-center'>{allUsers.length}</h1>
              </div>
              <div className="card-footer">
                <NavLink to={`/admin/allUsers`} className={'btn btn-outline-success'}>Display</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
