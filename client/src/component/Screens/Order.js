import React, {useEffect, useState, useContext} from 'react'
import { GlobalContext } from '../../GlobalContext'
import axios from 'axios';
import {NavLink} from 'react-router-dom'

function Order() {
  const context = useContext(GlobalContext);
  const [token] = context.token
  const [userData] = context.authApi.userData

  const [orders, setOrders] = useState([])

  useEffect(()=> {
    const getOrders = async () => {
      let  res = await axios.get(`/api/v1/auth/orders`, {
        headers: { Authorization: token}
      })
      setOrders(res.data.orders)
    }
    getOrders()
  },[])

 

  if(orders.length ===0){
    return(
      <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3 text-warning">Hi, {userData.name}No Orders</h3>
          <h5 className='text-secondary'>Happy Shopping</h5>
          <NavLink to={'/'} className='btn btn-secondary'>Keep Shopping</NavLink>
        </div>
      </div>
    </div>
    )
  }
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3 text-secondary">Orders</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mt-2">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>OrderId</th>
                <th>Date</th>
                <th>Address</th>
                <th>Status</th>
                <th>Cart</th>
                <th>Total</th>
                <th>PaymentStatus</th>
              </tr>
            </thead>
            <tbody>
              {
                orders && orders.map((item, index) => {
                  return(
                    <tr className='text-center' key={index}>
                      <td>{item.orderId}</td>
                      
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <th>{item.address}</th>
                      <td>{item.orderStatus}</td>
                      <td>
                       
                            <details>
                              <summary>Show Cart</summary>
                              {
                                            item.cart.map((item, index)=>{
                                            return(
                                              <div className="card mb-3" key={index}>
                                                <div className="row 
                                                g-0">
                                                  <div className="col-md-4 col-sm-4">
                                                    <img src={item.image.url} alt='' className='img-fluid rounded-start'/>
                                                  </div>
                                                  <div className="col-md-8">
                                                    <div className="card-body">
                                                      <h5 className="card-title text-uppercase">{item.title}</h5>
                                                      <p>
                                                        <span className='float-start'>&#8377;{item.price}</span>
                                                        <span className='text-center'>&#8377;{item.quantity}</span>
                                                        <span className='float-end'>{item.qnty}</span>
                                                      </p>

                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          })
                                        }
                            </details>
                                    
                        </td>
                        <td>
                          <strong className='text-success'> &#8377; {item.finalTotal}</strong>
                        </td>
                        <td>
                          {item.paymentStatus}
                        </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }

    export default Order















///modal if you want to write write it


    // <button data-bs-toggle='modal' data-bs-target='#cartModal' className="btn btn-secondary btn-sm">view</button>

    // <React.Fragment>
    //         <div className="modal fade" id="cartModal">
    //           <div className='modal-dialog modal-fullscreen modal-dialog-scrollable' role='document'>
    //             <div className='modal-content'>
    //               <div className='modal-header'>
    //                 <h5 className='modal-title text-center'>Cart</h5>
    //                 <button className='btn-close' data-bs-dismiss='modal' aria-label='close'>
    //                 </button>
    //               </div>
    //               <div className='modal-body'>
                   
    //               </div>
    //               <div className='modal-footer'></div>
    //             </div>
    //           </div>
    //             </div>
    //  </React.Fragment>